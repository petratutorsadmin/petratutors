import { useState, useEffect, useRef, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SEO from '../components/SEO'
import { fetchPostBySlug, fetchPublishedPosts } from '../blog/airtableClient'
import styles from './BlogPost.module.css'

gsap.registerPlugin(ScrollTrigger)

const CATEGORY_COLORS = {
  IELTS:      '#4a90d9',
  IB:         '#9b59b6',
  English:    '#27ae60',
  Kids:       '#e67e22',
  University: '#e91e8c',
  Business:   '#d4a017',
  General:    '#7f8c8d',
}

function fmtDate(dateStr, lang) {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString(
      lang === 'ja' ? 'ja-JP' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    )
  } catch {
    return dateStr
  }
}

function parseBody(text) {
  if (!text) return []
  return text.split('\n\n').map((para, i) => {
    const trimmed = para.trim()
    if (!trimmed) return null
    const isHeading    = trimmed.length < 100 && trimmed.endsWith(':') && !trimmed.startsWith('"')
    const isNumbered   = /^\d+\./.test(trimmed) && !isHeading
    const isPullQuote  = trimmed.startsWith('"') && trimmed.includes('"')
    return { key: i, text: trimmed, isHeading, isNumbered, isPullQuote }
  }).filter(Boolean)
}

function buildToc(paragraphs) {
  return paragraphs
    .filter(p => p.isHeading)
    .map((p, i) => ({
      id: `section-${i}`,
      label: p.text.replace(/:$/, ''),
    }))
}

export default function BlogPost() {
  const { slug }   = useParams()
  const { i18n }   = useTranslation()
  const lang       = i18n.language.startsWith('ja') ? 'ja' : 'en'

  const [post, setPost]       = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const [activeSection, setActiveSection] = useState(0)

  const progressRef  = useRef()
  const articleRef   = useRef()

  // Derived from post — safe to memo here; parseBody/buildToc handle null gracefully
  const paragraphs = useMemo(() => parseBody(post ? (lang === 'ja' ? post.bodyJP : post.bodyEN) : ''), [post, lang])
  const toc        = useMemo(() => buildToc(paragraphs), [paragraphs])

  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetchPostBySlug(slug),
      fetchPublishedPosts(),
    ])
      .then(([p, all]) => {
        setPost(p)
        setError(p ? null : 'not-found')
        setRelated(all.filter(a => a.slug !== slug).slice(0, 2))
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [slug])

  // Reading progress bar
  useEffect(() => {
    const bar = progressRef.current
    if (!bar || !post) return
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.set(bar, { width: `${self.progress * 100}%` })
      },
    })
    return () => st.kill()
  }, [post])

  // Hero parallax
  useEffect(() => {
    if (!post) return
    const heroBg = document.querySelector('[data-hero-bg]')
    if (!heroBg) return
    const tl = gsap.to(heroBg, {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: {
        trigger: heroBg.parentElement,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
    return () => tl.scrollTrigger?.kill()
  }, [post])

  // Article content fade-in
  useEffect(() => {
    if (!post || !articleRef.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-article-el]').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.03,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, articleRef)
    return () => ctx.revert()
  }, [post])

  // TOC active section tracking
  useEffect(() => {
    if (!post) return
    const headings = document.querySelectorAll('[data-section-idx]')
    if (!headings.length) return
    const sts = Array.from(headings).map((el, i) =>
      ScrollTrigger.create({
        trigger: el,
        start: 'top 40%',
        onEnter: () => setActiveSection(i),
        onEnterBack: () => setActiveSection(i),
      })
    )
    return () => sts.forEach(s => s.kill())
  }, [post])

  if (loading) {
    return (
      <div className={styles.loadingState}>
        <div style={{ display: 'flex', gap: '0.45rem' }}>
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'inline-block', width: 7, height: 7,
              borderRadius: '50%', background: 'var(--c-gold)',
              animation: `dotPulse 1.2s ${i*0.18}s ease-in-out infinite`,
            }} />
          ))}
        </div>
        <style>{`@keyframes dotPulse{0%,80%,100%{opacity:.2;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}`}</style>
      </div>
    )
  }

  if (error === 'not-found' || !post) {
    return (
      <div className={styles.notFound}>
        <h2>Post not found</h2>
        <Link to="/blog" className={styles.notFoundLink}>← Back to Insights</Link>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.notFound}>
        <h2>Could not load post</h2>
        <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>{error}</p>
        <Link to="/blog" className={styles.notFoundLink}>← Back to Insights</Link>
      </div>
    )
  }

  const title    = lang === 'ja' ? post.titleJP   : post.titleEN
  const excerpt  = lang === 'ja' ? post.excerptJP : post.excerptEN
  const catColor = CATEGORY_COLORS[post.category] ?? '#c9a84c'

  const ctaLines = {
    IELTS:      { en: 'Want a higher IELTS band score?',       ja: 'IELTSのスコアを上げたいですか？' },
    IB:         { en: 'Need help with your IB coursework?',    ja: 'IBの学習サポートが必要ですか？' },
    English:    { en: 'Ready to level up your English?',       ja: '英語力を上げたいですか？' },
    Kids:       { en: 'Looking for a tutor for your child?',   ja: 'お子様の英語家庭教師をお探しですか？' },
    University: { en: 'Planning to apply overseas?',           ja: '海外大学への進学を検討していますか？' },
    Business:   { en: 'Need sharper business English?',        ja: 'ビジネス英語を磨きたいですか？' },
    General:    { en: 'Want to improve faster with a tutor?',  ja: '家庭教師と一緒に成長したいですか？' },
  }
  const ctaLine = ctaLines[post.category]?.[lang] ?? ctaLines.General[lang]

  let sectionIdx = 0

  return (
    <>
      <SEO
        title={`${title} | Petra Insights`}
        description={excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        articleMeta={{
          publishedTime: post.publishedAt,
          author: post.author,
          section: post.category,
        }}
        jsonLdExtra={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: title,
          description: excerpt,
          author: { '@type': 'Person', name: post.author },
          publisher: {
            '@type': 'Organization',
            name: 'Petra Tutors',
            logo: { '@type': 'ImageObject', url: 'https://www.petratutors.com/logo.png' },
          },
          datePublished: post.publishedAt,
          url: `https://www.petratutors.com/blog/${post.slug}`,
          mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.petratutors.com/blog/${post.slug}` },
          articleSection: post.category,
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.petratutors.com' },
              { '@type': 'ListItem', position: 2, name: 'Petra Insights', item: 'https://www.petratutors.com/blog' },
              { '@type': 'ListItem', position: 3, name: title, item: `https://www.petratutors.com/blog/${post.slug}` },
            ],
          },
        }}
      />

      {/* Gold reading progress bar */}
      <div ref={progressRef} className={styles.progressBar} aria-hidden="true" />

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div
          data-hero-bg
          className={styles.heroBg}
          style={{ background: post.coverGradient }}
        />
        <div className={styles.heroBgOverlay} />
        <div className={styles.heroContent}>
          <span
            className={styles.heroCat}
            style={{ '--cat-color': catColor }}
          >
            {post.category}
          </span>
          <h1 className={styles.heroTitle}>{title}</h1>
          <p className={styles.heroExcerpt}>{excerpt}</p>
          <div className={styles.heroMeta}>
            <span>{post.author}</span>
            <span className={styles.metaDot} />
            <span>{fmtDate(post.publishedAt, lang)}</span>
            <span className={styles.metaDot} />
            <span>{post.readTime} min read</span>
          </div>
        </div>
        <div className={styles.heroBottomFade} />
      </section>

      {/* ── ARTICLE + TOC ── */}
      <div className={styles.articleWrapper} ref={articleRef}>
        {/* TOC sidebar (desktop only) */}
        {toc.length > 0 && (
          <aside className={styles.toc}>
            <p className={styles.tocLabel}>
              {lang === 'ja' ? '目次' : 'IN THIS ARTICLE'}
            </p>
            <nav>
              {toc.map((item, i) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`${styles.tocItem} ${activeSection === i ? styles.tocItemActive : ''}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>
        )}

        <article className={`${styles.article} ${toc.length === 0 ? styles.articleNoToc : ''}`}>
          {paragraphs.map(({ key, text, isHeading, isNumbered, isPullQuote }) => {
            if (isHeading) {
              const idx = sectionIdx++
              const tocEntry = toc[idx]
              return (
                <h2
                  key={key}
                  id={tocEntry?.id}
                  data-section-idx={idx}
                  className={styles.articleHeading}
                  data-article-el
                >
                  {text.replace(/:$/, '')}
                </h2>
              )
            }
            if (isPullQuote) {
              return (
                <blockquote key={key} className={styles.pullQuote} data-article-el>
                  {text}
                </blockquote>
              )
            }
            if (isNumbered) {
              return (
                <p key={key} className={styles.listItem} data-article-el>{text}</p>
              )
            }
            return <p key={key} data-article-el>{text}</p>
          })}
        </article>
      </div>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <p className={styles.ctaEyebrow}>
            {lang === 'ja' ? 'ペトラチューターズ' : 'PETRA TUTORS'}
          </p>
          <h2 className={styles.ctaTitle}>{ctaLine}</h2>
          <Link to="/inquiry" className={styles.ctaBtn}>
            {lang === 'ja' ? '無料体験レッスンを申し込む' : 'Book a free trial lesson'}
          </Link>
        </div>
      </section>

      {/* ── RELATED POSTS ── */}
      {related.length > 0 && (
        <section className={styles.related}>
          <div className={styles.relatedInner}>
            <p className={styles.relatedLabel}>
              {lang === 'ja' ? '他の記事' : 'MORE FROM PETRA INSIGHTS'}
            </p>
            <div className={styles.relatedGrid}>
              {related.map(p => (
                <Link key={p.id} to={`/blog/${p.slug}`} className={styles.relatedCard}>
                  <div
                    className={styles.relatedCover}
                    style={{ background: p.coverGradient }}
                  />
                  <div className={styles.relatedContent}>
                    <span
                      className={styles.relatedCat}
                      style={{ color: CATEGORY_COLORS[p.category] ?? '#c9a84c' }}
                    >
                      {p.category}
                    </span>
                    <h3 className={styles.relatedTitle}>
                      {lang === 'ja' ? p.titleJP : p.titleEN}
                    </h3>
                    <span className={styles.relatedTime}>{p.readTime} min read</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BACK LINK ── */}
      <div className={styles.backRow}>
        <Link to="/blog" className={styles.backLink}>
          ← {lang === 'ja' ? 'インサイツに戻る' : 'Back to Insights'}
        </Link>
      </div>
    </>
  )
}
