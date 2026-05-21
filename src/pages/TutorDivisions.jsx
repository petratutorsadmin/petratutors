import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import styles from './TutorDivisions.module.css';

const VALID_CODES = ['petracrew', 'petratutors', 'petradivisions'];

export default function TutorDivisions() {
  const { t } = useTranslation();
  const [passcode, setPasscode] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const auth = sessionStorage.getItem('tutor_access_authorized');
    if (auth === 'true') {
      setIsAuthorized(true);
    }
  }, []);

  const handleVerify = (e) => {
    e.preventDefault();
    const cleanCode = passcode.trim().toLowerCase();
    if (VALID_CODES.includes(cleanCode)) {
      sessionStorage.setItem('tutor_access_authorized', 'true');
      setIsAuthorized(true);
      setError('');
    } else {
      setError(t('divisions.portal_invalid', 'Invalid access code. Please try again.'));
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('tutor_access_authorized');
    setIsAuthorized(false);
    setPasscode('');
  };

  if (!isAuthorized) {
    return (
      <>
        <SEO 
          title="Tutor Portal | Petra Tutors"
          description="Restricted access tutor portal."
          path="/apply/divisions"
        />
        <div className={styles.gateWrapper}>
          <div className={styles.gateCard}>
            <h1 className={styles.gateTitle}>{t('divisions.portal_title', 'Petra Tutor Portal')}</h1>
            <p className={styles.gateSubtitle}>
              {t('divisions.portal_subtitle', 'Please enter the access code to view the Contribution Divisions.')}
            </p>
            <form onSubmit={handleVerify} className={styles.gateForm}>
              <input 
                type="password" 
                placeholder={t('divisions.portal_placeholder', 'Access Code')}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className={styles.gateInput}
                autoFocus
              />
              <button type="submit" className={styles.gateButton}>
                {t('divisions.portal_verify', 'Verify')}
              </button>
            </form>
            {error && <p className={styles.gateError}>{error}</p>}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Petra Contribution Divisions | Petra Tutors"
        description="Optional internal groups where tutors, mentors, and contributors can help shape Petra beyond individual lessons."
        path="/apply/divisions"
      />

      <div className={styles.portalContainer}>
        {/* Top Control Bar */}
        <div className="container">
          <div className={styles.controlBar}>
            <span className={styles.badge}>{t('divisions.page_tag', 'INTERNAL PORTAL')}</span>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Editorial Header */}
        <header className={styles.portalHeader}>
          <div className="container">
            <h1 className={styles.portalTitleText}>
              Petra Contribution Divisions
            </h1>
            <p className={styles.portalSubtitleText}>
              Petra Contribution Divisions give tutors and contributors the opportunity to help build Petra beyond individual lessons. Through curriculum development, student success, media, social content, editorial writing, and academic research, members of Petra can contribute to the institution’s educational culture while developing meaningful experience for their own future.
            </p>
          </div>
        </header>

        {/* Narrative Introduction */}
        <section className={styles.introSection}>
          <div className="container">
            <div className={styles.introText}>
              <p className={styles.leadParagraph}>
                At Petra, tutors are not treated simply as lesson providers.
              </p>
              <p>
                We believe that good education is built by people who think carefully about learning, students, language, culture, motivation, and growth. That is why Petra offers several Contribution Divisions: optional internal groups where tutors, mentors, fellows, and contributors can help shape Petra beyond individual lessons.
              </p>
              <p>
                These divisions allow members of Petra to contribute to curriculum design, student success, educational media, social media, writing, and long-term academic research.
              </p>
              <p>
                They are not management roles, and they do not involve finance, operations, or internal systems. Instead, they are spaces for academic contribution, creativity, collaboration, and institutional development.
              </p>
              <p>
                For tutors, these divisions can also become meaningful experience for CVs, university applications, internships, graduate school, and future careers in education, media, research, business, or public communication.
              </p>
            </div>
          </div>
        </section>

        {/* Divisions Section */}
        <section className={styles.divisionsSection}>
          <div className="container">
            <div className={styles.editorialGrid}>
              
              {/* 1. Academic Curriculum Division */}
              <div className={styles.divisionItem}>
                <div className={styles.divHeader}>
                  <span className={styles.divNumber}>01</span>
                  <h2 className={styles.divTitle}>Academic Curriculum Division</h2>
                </div>
                <div className={styles.divBody}>
                  <p className={styles.divIntro}>
                    The Academic Curriculum Division focuses on improving the quality, structure, and consistency of Petra lessons.
                  </p>
                  <p className={styles.divDesc}>
                    This division helps develop the academic foundation behind Petra’s teaching. Members may contribute ideas for lesson structures, study systems, worksheets, vocabulary frameworks, reading exercises, writing tasks, exam preparation methods, and subject-specific resources. The goal is not to create a rigid script for every tutor. Instead, the division helps build a shared Petra methodology: a flexible but serious educational approach that supports both tutor creativity and student progress.
                  </p>
                  
                  <div className={styles.divColumns}>
                    <div className={styles.columnLeft}>
                      <h3 className={styles.columnTitle}>Main Focus Areas</h3>
                      <ul className={styles.focusList}>
                        <li>Improving lesson structures</li>
                        <li>Developing Petra’s teaching methodology</li>
                        <li>Creating study systems</li>
                        <li>Suggesting curriculum ideas</li>
                        <li>Recommending useful resources</li>
                        <li>Building worksheets and learning materials</li>
                        <li>Improving consistency across lessons</li>
                      </ul>
                    </div>
                    
                    <div className={styles.columnRight}>
                      <div className={styles.subBlock}>
                        <h4 className={styles.subBlockTitle}>Example Contributions</h4>
                        <p>A tutor in this division might help design a better IELTS writing lesson format, create a vocabulary review system for younger students, recommend resources for EIKEN preparation, or propose a clearer structure for beginner English lessons.</p>
                      </div>
                      <div className={styles.subBlock}>
                        <h4 className={styles.subBlockTitle}>Ideal For</h4>
                        <p>This division is ideal for tutors who enjoy lesson planning, pedagogy, curriculum design, academic structure, or thinking deeply about how students actually learn.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Student Success Division */}
              <div className={styles.divisionItem}>
                <div className={styles.divHeader}>
                  <span className={styles.divNumber}>02</span>
                  <h2 className={styles.divTitle}>Student Success Division</h2>
                </div>
                <div className={styles.divBody}>
                  <p className={styles.divIntro}>
                    The Student Success Division focuses on how students stay motivated, engaged, and supported over time.
                  </p>
                  <p className={styles.divDesc}>
                    Many students do not struggle only because they lack knowledge. They struggle because they lose confidence, do not know how to study, feel overwhelmed, or cannot see their own progress. This division thinks about the human side of learning. Members may contribute ideas for study planning, student engagement, motivation systems, learning habits, progress tracking, reflection questions, and ways to make students feel supported between lessons.
                  </p>
                  
                  <div className={styles.divColumns}>
                    <div className={styles.columnLeft}>
                      <h3 className={styles.columnTitle}>Main Focus Areas</h3>
                      <ul className={styles.focusList}>
                        <li>Study planning ideas</li>
                        <li>Student engagement</li>
                        <li>Motivation systems</li>
                        <li>Learning habits</li>
                        <li>Student confidence</li>
                        <li>Progress reflection</li>
                        <li>Accountability structures</li>
                      </ul>
                    </div>
                    
                    <div className={styles.columnRight}>
                      <div className={styles.subBlock}>
                        <h4 className={styles.subBlockTitle}>Example Contributions</h4>
                        <p>A member might design a simple weekly study planner, create reflection prompts for students, suggest better ways to encourage shy learners, or develop motivational systems for students preparing for exams.</p>
                      </div>
                      <div className={styles.subBlock}>
                        <h4 className={styles.subBlockTitle}>Ideal For</h4>
                        <p>This division is ideal for tutors who care about mentorship, student psychology, confidence-building, long-term progress, and the emotional side of education.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Media & Communications Division */}
              <div className={styles.divisionItem}>
                <div className={styles.divHeader}>
                  <span className={styles.divNumber}>03</span>
                  <h2 className={styles.divTitle}>Media & Communications Division</h2>
                </div>
                <div className={styles.divBody}>
                  <p className={styles.divIntro}>
                    The Media & Communications Division helps Petra communicate its educational values to the outside world.
                  </p>
                  <p className={styles.divDesc}>
                    This division focuses on long-form and brand-building content, such as Instagram posts, tutor interviews, blog articles, study tips, student stories, educational explanations, and public-facing materials. The goal is to help families understand what Petra does, what makes our tutors different, and why our approach to education matters.
                  </p>
                  
                  <div className={styles.divColumns}>
                    <div className={styles.columnLeft}>
                      <h3 className={styles.columnTitle}>Main Focus Areas</h3>
                      <ul className={styles.focusList}>
                        <li>Instagram posts</li>
                        <li>Tutor interviews</li>
                        <li>Blog posts</li>
                        <li>Study tips</li>
                        <li>Student stories</li>
                        <li>Educational content</li>
                        <li>Brand communication</li>
                      </ul>
                    </div>
                    
                    <div className={styles.columnRight}>
                      <div className={styles.subBlock}>
                        <h4 className={styles.subBlockTitle}>Example Contributions</h4>
                        <p>A contributor might help write a tutor interview, prepare a post about how to study for IELTS, create a student success story, or help explain Petra’s lesson philosophy in a clear and human way.</p>
                      </div>
                      <div className={styles.subBlock}>
                        <h4 className={styles.subBlockTitle}>Ideal For</h4>
                        <p>This division is ideal for tutors interested in writing, branding, communication, marketing, public relations, education content, or storytelling.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Social Media Division */}
              <div className={styles.divisionItem}>
                <div className={styles.divHeader}>
                  <span className={styles.divNumber}>04</span>
                  <h2 className={styles.divTitle}>Social Media Division</h2>
                </div>
                <div className={styles.divBody}>
                  <p className={styles.divIntro}>
                    The Social Media Division focuses on short-form, culture-building content.
                  </p>
                  <p className={styles.divDesc}>
                    While Media & Communications handles broader communication, the Social Media Division focuses more specifically on platforms such as Instagram Reels, TikTok-style videos, tutor introductions, day-in-the-life content, study advice, and informal content that makes Petra feel alive and human. This division helps show the people behind Petra.
                  </p>
                  
                  <div className={styles.divColumns}>
                    <div className={styles.columnLeft}>
                      <h3 className={styles.columnTitle}>Main Focus Areas</h3>
                      <ul className={styles.focusList}>
                        <li>Reels</li>
                        <li>Tutor introductions</li>
                        <li>Day-in-the-life content</li>
                        <li>Short study advice videos</li>
                        <li>Petra culture content</li>
                        <li>Behind-the-scenes content</li>
                        <li>Student-friendly educational content</li>
                      </ul>
                    </div>
                    
                    <div className={styles.columnRight}>
                      <div className={styles.subBlock}>
                        <h4 className={styles.subBlockTitle}>Example Contributions</h4>
                        <p>A tutor might film a short introduction, share a study tip, appear in a “day in the life of a Petra tutor” video, help plan Reel ideas, or create content explaining common English mistakes.</p>
                      </div>
                      <div className={styles.subBlock}>
                        <h4 className={styles.subBlockTitle}>Ideal For</h4>
                        <p>This division is ideal for tutors who enjoy social media, video, design, student culture, communication, or making education feel more approachable.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Keystone Editorial Division */}
              <div className={styles.divisionItem}>
                <div className={styles.divHeader}>
                  <span className={styles.divNumber}>05</span>
                  <h2 className={styles.divTitle}>Keystone Editorial Division</h2>
                </div>
                <div className={styles.divBody}>
                  <p className={styles.divIntro}>
                    The Keystone Editorial Division connects Petra’s educational work with writing, publishing, and intellectual culture.
                  </p>
                  <p className={styles.divDesc}>
                    Through The Keystone, contributors can write articles, essays, interviews, study guides, opinion pieces, cultural commentary, or educational reflections. This gives tutors and students a space to develop their public voice and build a real writing portfolio. This division is not only about marketing. It is about creating a serious student-facing publication culture connected to education, ideas, and public discussion.
                  </p>
                  
                  <div className={styles.divColumns}>
                    <div className={styles.columnLeft}>
                      <h3 className={styles.columnTitle}>Main Focus Areas</h3>
                      <ul className={styles.focusList}>
                        <li>Writing for The Keystone</li>
                        <li>Essays and articles</li>
                        <li>Educational commentary</li>
                        <li>Interviews</li>
                        <li>Student writing</li>
                        <li>Opinion pieces</li>
                        <li>Study guides and academic advice</li>
                      </ul>
                    </div>
                    
                    <div className={styles.columnRight}>
                      <div className={styles.subBlock}>
                        <h4 className={styles.subBlockTitle}>Example Contributions</h4>
                        <p>A contributor might write an article about university applications, interview a tutor, publish a study guide, write about education systems, or contribute an opinion piece on language learning, exams, or student life.</p>
                      </div>
                      <div className={styles.subBlock}>
                        <h4 className={styles.subBlockTitle}>Ideal For</h4>
                        <p>This division is ideal for tutors interested in journalism, writing, editing, publishing, politics, culture, education, or building a public portfolio.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6. Academic Research & Development Division */}
              <div className={styles.divisionItem}>
                <div className={styles.divHeader}>
                  <span className={styles.divNumber}>06</span>
                  <h2 className={styles.divTitle}>Academic Research & Development Division</h2>
                </div>
                <div className={styles.divBody}>
                  <p className={styles.divIntro}>
                    The Academic Research & Development Division explores Petra’s long-term educational direction.
                  </p>
                  <p className={styles.divDesc}>
                    This is the most theoretical and future-facing division. It focuses on pedagogy, learning science, educational philosophy, study methodology, academic systems, and new ideas for improving how Petra teaches. The goal is to think beyond immediate lessons and ask deeper questions: How do students learn best? How should progress be measured? What makes tutoring humane and effective? How can Petra build better systems without making education feel mechanical?
                  </p>
                  
                  <div className={styles.divColumns}>
                    <div className={styles.columnLeft}>
                      <h3 className={styles.columnTitle}>Main Focus Areas</h3>
                      <ul className={styles.focusList}>
                        <li>Pedagogy</li>
                        <li>Educational philosophy</li>
                        <li>Learning science</li>
                        <li>Study methodology</li>
                        <li>Academic systems ideas</li>
                        <li>Long-term educational innovation</li>
                        <li>Research-informed teaching practices</li>
                      </ul>
                    </div>
                    
                    <div className={styles.columnRight}>
                      <div className={styles.subBlock}>
                        <h4 className={styles.subBlockTitle}>Example Contributions</h4>
                        <p>A contributor might research spaced repetition, compare different language learning methods, propose improvements to Petra’s reporting system, examine motivation theory, or write internal notes on how Petra should approach student progress.</p>
                      </div>
                      <div className={styles.subBlock}>
                        <h4 className={styles.subBlockTitle}>Ideal For</h4>
                        <p>This division is ideal for tutors interested in education research, psychology, philosophy, pedagogy, learning systems, policy, or long-term academic development.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Closing Important Note */}
        <section className={styles.noteSection}>
          <div className="container">
            <div className={styles.noteBox}>
              <h3 className={styles.noteTitle}>Important Note</h3>
              <p>Petra Contribution Divisions are not compulsory management structures.</p>
              <p>They are optional spaces for contribution, learning, creativity, and institutional development. Tutors may choose to participate based on their interests, availability, and strengths.</p>
              <p>Core operations, systems, finance, legal structure, and business administration remain separate from these divisions. The purpose of the Contribution Divisions is to give tutors and contributors a meaningful way to help build Petra as an educational institution, while preserving clarity, professionalism, and trust.</p>
            </div>
          </div>
        </section>

        {/* CTA Panel */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaBox}>
              <h3 className={styles.ctaTitle}>
                Interested in Contributing?
              </h3>
              <p className={styles.ctaDesc}>
                Tutors are invited to join any division where they want to make an impact. There is no application form. Simply reach out to us directly via Google Chat to get started.
              </p>
              <div className={styles.ctaActionHint}>
                <span>Message us on Google Chat</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
