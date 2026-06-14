import { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SEO from '../components/SEO'
import BlogParticles from '../components/BlogParticles'
import { fetchPublishedPosts } from '../blog/airtableClient'
import styles from './Blog.module.css'

gsap.registerPlugin(ScrollTrigger)

const CATEGORY_COLORS = {
  IELTS:        '#4a90d9',
  IB:           '#9b59b6',
  English:      '#27ae60',
  Kids:         '#e67e22',
  University:   '#e91e8c',
  Business:     '#d4a017',
  General:      '#7f8c8d',
  News:         '#0ea5e9',
  Announcement: '#10b981',
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

const HERO_WORDS_EN = ['Ideas,', 'guides', '&', 'strategies', 'for', 'ambitious', 'learners.']
const HERO_WORDS_JA = ['意欲ある', '学習者の', 'ためのアイデア', 'とガイド。']

export default function Blog() {
  const { i18n } = useTranslation()
  const lang = i18n.language.startsWith('ja') ? 'ja' : 'en'

  const [posts, setPosts]           = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')

  const heroRef = useRef()

  useEffect(() => {
    fetchPublishedPosts()
      .then(setPosts)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  // Hero entry animation
  useEffect(() => {
    if (!heroRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 })
      tl.fromTo('[data-blog-eyebrow]',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      )
      .fromTo('[data-blog-word]',
        { opacity: 0, y: 72, skewY: 4 },
        { opacity: 1, y: 0, skewY: 0, stagger: 0.07, duration: 0.9, ease: 'power4.out' },
        '-=0.35'
      )
      .fromTo('[data-blog-sub]',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' },
        '-=0.5'
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  // Card scroll animations
  useEffect(() => {
    if (loading) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-blog-card]').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            delay: (i % 3) * 0.07,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    })
    return () => ctx.revert()
  }, [loading, activeCategory, posts])

  const categories = useMemo(() => {
    const cats = [...new Set(posts.map(p => p.category))]
    return ['All', ...cats]
  }, [posts])

  const filtered = useMemo(() =>
    activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory),
    [posts, activeCategory]
  )

  const featured   = filtered[0]
  const rest       = filtered.slice(1)
  const heroWords  = lang === 'ja' ? HERO_WORDS_JA : HERO_WORDS_EN

  return (
    <>
      <SEO
        title="Petra Insights | English, IB & IELTS Guides"
        description="Expert guides on IELTS, IB, English tutoring, university admissions and kids English — by Petra Tutors, Tokyo."
        path="/blog"
        jsonLdExtra={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Petra Insights',
          description: 'Expert guides on IELTS, IB, English tutoring, university admissions and kids English.',
          url: 'https://www.petratutors.com/blog',
          publisher: {
            '@type': 'Organization',
            name: 'Petra Tutors',
            logo: { '@type': 'ImageObject', url: 'https://www.petratutors.com/logo.png' },
          },
          inLanguage: ['en', 'ja'],
        }}
      />

      {/* ── HERO ── */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroCanvas}>
          <BlogParticles />
        </div>

        <div className={styles.heroInner}>
          <div className={styles.heroEyebrowRow} data-blog-eyebrow>
            <p className={styles.eyebrow}>
              {lang === 'ja' ? 'ペトラ インサイツ' : 'PETRA INSIGHTS'}
            </p>
            <span className={styles.heroHr} />
            {posts.length > 0 && (
              <span className={styles.postCountBadge}>
                {posts.length} {lang === 'ja' ? '記事' : 'articles'}
              </span>
            )}
          </div>

          <h1 className={styles.heroTitle}>
            {heroWords.map((word, i) => (
              <span key={i} className={styles.heroWord} data-blog-word>
                {word}&nbsp;
              </span>
            ))}
          </h1>

          <div className={styles.heroFooter} data-blog-sub>
            <p className={styles.heroSub}>
              {lang === 'ja'
                ? 'IELTS・IB・英語・海外進学のプロが書く、実践的なガイド'
                : 'Practical guides by expert tutors — English, IELTS, IB & university admissions.'}
            </p>
            <div className={styles.heroScroll}>
              <span className={styles.scrollLine} />
              <span className={styles.scrollText}>{lang === 'ja' ? 'スクロール' : 'SCROLL'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── POSTS SECTION ── */}
      <section className={styles.postsSection}>
        {/* Category filter */}
        {categories.length > 1 && (
          <div className={styles.filterRow}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.filterChip} ${activeCategory === cat ? styles.filterChipActive : ''}`}
                onClick={() => setActiveCategory(cat)}
                style={
                  activeCategory === cat && cat !== 'All'
                    ? { backgroundColor: CATEGORY_COLORS[cat] ?? '#301B47', borderColor: CATEGORY_COLORS[cat] ?? '#301B47' }
                    : {}
                }
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className={styles.loadingState}>
            <div className={styles.loadingDots}>
              <span /><span /><span />
            </div>
          </div>
        )}

        {error && (
          <div className={styles.errorState}>
            <p>Could not load posts — {error}</p>
            <p>Add <code>VITE_AIRTABLE_TOKEN</code> to .env.local and restart.</p>
          </div>
        )}

        {!loading && !error && (
          <div className={`container ${styles.postsContainer}`}>

            {/* ── Featured ── */}
            {featured && (
              <Link
                to={`/blog/${featured.slug}`}
                className={styles.featured}
                data-blog-card
              >
                <div className={styles.featuredCover}>
                  <div
                    className={styles.featuredCoverBg}
                    style={{ background: featured.coverGradient }}
                  />
                  <div className={styles.featuredCoverGradient} />
                  <span
                    className={styles.catBadge}
                    style={{ '--cat-color': CATEGORY_COLORS[featured.category] ?? '#c9a84c' }}
                  >
                    {featured.category}
                  </span>
                  <div className={styles.featuredTitleOverlay}>
                    <h2 className={styles.featuredTitle}>
                      {lang === 'ja' ? featured.titleJP : featured.titleEN}
                    </h2>
                  </div>
                </div>

                <div className={styles.featuredContent}>
                  <span className={styles.featuredLabel}>
                    {lang === 'ja' ? '注目記事' : 'FEATURED'}
                  </span>
                  <p className={styles.featuredMeta}>
                    <span>{featured.author}</span>
                    <span className={styles.metaDot} />
                    <span>{fmtDate(featured.publishedAt, lang)}</span>
                    <span className={styles.metaDot} />
                    <span>{featured.readTime} min read</span>
                  </p>
                  <p className={styles.featuredExcerpt}>
                    {lang === 'ja' ? featured.excerptJP : featured.excerptEN}
                  </p>
                  <span className={styles.readMore}>
                    {lang === 'ja' ? '続きを読む →' : 'Read article →'}
                  </span>
                </div>
              </Link>
            )}

            {/* ── Grid ── */}
            {rest.length > 0 && (
              <div className={styles.grid}>
                {rest.map((post, i) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className={styles.card}
                    data-blog-card
                  >
                    <div className={styles.cardCoverWrap}>
                      <div
                        className={styles.cardCoverBg}
                        style={{ background: post.coverGradient }}
                      />
                      <span className={styles.cardNum}>
                        {String(i + 2).padStart(2, '0')}
                      </span>
                      <span
                        className={styles.catBadge}
                        style={{ '--cat-color': CATEGORY_COLORS[post.category] ?? '#c9a84c' }}
                      >
                        {post.category}
                      </span>
                    </div>
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardTitle}>
                        {lang === 'ja' ? post.titleJP : post.titleEN}
                      </h3>
                      <p className={styles.cardExcerpt}>
                        {lang === 'ja' ? post.excerptJP : post.excerptEN}
                      </p>
                      <div className={styles.cardMeta}>
                        <span>{fmtDate(post.publishedAt, lang)}</span>
                        <span className={styles.metaDot} />
                        <span>{post.readTime} min</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <p className={styles.emptyState}>No posts in this category yet.</p>
            )}
          </div>
        )}
      </section>
    </>
  )
}
