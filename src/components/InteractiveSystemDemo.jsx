import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  Layout,
  Target,
  BookOpen,
  ChevronRight,
  Activity,
  Milestone
} from "lucide-react";
import styles from "./InteractiveSystemDemo.module.css";

const demoData = {
  student: "Kenji Sato",
  course: "IELTS / International Pathway",
  records: [
    { id: 1, date: "May 18", topic: "Advanced Logical Synthesis", tutor: "Alex O.", status: "Done" },
    { id: 2, date: "May 14", topic: "IELTS Speaking Part 3 Cohesion", tutor: "Sarah K.", status: "Done" },
    { id: 3, date: "May 10", topic: "Summary Techniques & Rhetoric", tutor: "Alex O.", status: "Done" },
  ],
  roadmap: [
    { phase: "01", title: "Diagnostic & Baseline", status: "completed" },
    { phase: "02", title: "Intensive Rhetoric & Outlines", status: "current" },
    { phase: "03", title: "Final Mock Polishing", status: "upcoming" },
  ]
};

// eslint-disable-next-line no-unused-vars
const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    className={`${styles.sidebarItem} ${active ? styles.sidebarActive : ""}`}
    onClick={onClick}
  >
    <Icon size={14} />
    <span>{label}</span>
  </button>
);

const Overview = ({ tasks, toggleTask, getAvgScore }) => (
  <motion.div 
    initial={{ opacity: 0, y: 5 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0, y: -5 }}
    className={styles.viewContent}
  >
    <div className={styles.compactInsight}>
      <div className={styles.viewHeader}>
        <Activity size={14} />
        <h4>Petra Diagnostic Insight</h4>
      </div>
      <p>Kenji is showing high capability in verbal reasoning but needs structure in long-form writing prompts. Check off completed daily tasks below to update diagnostic scores.</p>
    </div>

    {/* Side-by-side layout for Checklist and Stats */}
    <div className={styles.overviewLayoutGrid}>
      {/* Task Checklist */}
      <div className={styles.checklistSection}>
        <h5 className={styles.sectionHeading}>Today's Prescribed Tasks</h5>
        <div className={styles.checklistGrid}>
          {tasks.map(t => (
            <button 
              key={t.id} 
              onClick={() => toggleTask(t.id)} 
              className={`${styles.checkItem} ${t.completed ? styles.checkItemDone : ""}`}
            >
              <div className={`${styles.checkbox} ${t.completed ? styles.checkboxChecked : ""}`}>
                {t.completed && "✓"}
              </div>
              <span className={styles.taskText}>{t.text}</span>
              <span className={styles.taskReward}>+{t.val}% {t.skill}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className={styles.statsGrid}>
        <div className={styles.miniCard}>
          <span className={styles.miniLabel}>Avg. Band Score</span>
          <span className={styles.miniVal} style={{ color: "var(--c-gold)" }}>{getAvgScore()}</span>
        </div>
        <div className={styles.miniCard}>
          <span className={styles.miniLabel}>Active Tasks</span>
          <span className={styles.miniVal}>{tasks.filter(t => !t.completed).length} Left</span>
        </div>
        <div className={styles.miniCard}>
          <span className={styles.miniLabel}>Next Milestone</span>
          <span className={styles.miniVal}>May 22</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const Diagnostics = ({ skills, selectedSkill, setSelectedSkill, getSkillValue }) => {
  const currentSkillData = skills.find(s => s.name === selectedSkill) || skills[0];
  const currentVal = getSkillValue(currentSkillData.name);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 5 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -5 }}
      className={styles.viewContent}
    >
      <span className={styles.tabIntro}>Click on any skill to read tutor diagnostic recommendations.</span>
      
      <div className={styles.diagGrid}>
        <div className={styles.skillStack}>
          {skills.map(s => {
            const val = getSkillValue(s.name);
            const isActive = selectedSkill === s.name;
            return (
              <button 
                key={s.name} 
                onClick={() => setSelectedSkill(s.name)}
                className={`${styles.linearSkillRow} ${isActive ? styles.skillRowActive : ""}`}
              >
                <div className={styles.skillMeta}>
                  <span className={styles.skillLabel}>{s.name}</span>
                  <span className={styles.skillTrend}>{s.change}</span>
                </div>
                <div className={styles.linearBar}>
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${val}%` }} 
                    className={styles.linearBarFill}
                    style={{ backgroundColor: s.alert ? "var(--c-gold)" : "var(--c-navy)" }}
                  />
                </div>
                <span className={styles.skillVal}>{val}%</span>
              </button>
            );
          })}
        </div>

        <div className={styles.feedbackDetailCard}>
          <div className={styles.feedbackHeader}>
            <span className={styles.feedbackTitle}>{currentSkillData.name} Metric Focus</span>
            <span className={styles.feedbackScore}>Band Score: {(currentVal / 10).toFixed(1)}</span>
          </div>
          <p className={styles.feedbackText}>{currentSkillData.note}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Records = ({ selectedRecordId, setSelectedRecordId }) => {
  const recordDetails = {
    1: {
      summary: "Focus was advanced argument synthesis. Explored linking sentences. Cohesive flow is improving. Homework covers regional policy thesis paragraphs.",
      homework: "Compose 2 analytical paragraphs comparing regional energy policies. Apply cohesive conjuncts.",
      vocab: "substantiate, corroborate, subsequent, conversely"
    },
    2: {
      summary: "Speaking diagnostics drill covering spontaneous outline structures. Target natural cadence without self-corrections.",
      homework: "Record 2 minutes on the digital learning debate prompt.",
      vocab: "pedagogical, ubiquitous, paradigm, accentuate"
    },
    3: {
      summary: "Introductory logic diagnostics and baseline text analysis. Evaluated argumentative structures.",
      homework: "Review Keystone publication article 'The Dialectic Mind' and outline its premises.",
      vocab: "dialectic, synthesis, critique, validation"
    }
  };

  const currentRecord = recordDetails[selectedRecordId] || recordDetails[1];
  const activeItem = demoData.records.find(r => r.id === selectedRecordId) || demoData.records[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 5 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -5 }}
      className={styles.viewContent}
    >
      <span className={styles.tabIntro}>Select a lesson record to view summaries, vocabulary, and homework assignments.</span>
      
      <div className={styles.recordsLayout}>
        <div className={styles.linearList}>
          {demoData.records.map(r => {
            const isActive = selectedRecordId === r.id;
            return (
              <button 
                key={r.id} 
                onClick={() => setSelectedRecordId(r.id)}
                className={`${styles.linearListItem} ${isActive ? styles.recordItemActive : ""}`}
              >
                <div className={styles.listMain}>
                  <span className={styles.listDate}>{r.date}</span>
                  <span className={styles.listTopic}>{r.topic}</span>
                </div>
                <div className={styles.listMeta}>
                  <span>{r.tutor}</span>
                  <span className={styles.statusBadge}>{r.status}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className={styles.recordDetailView}>
          <div className={styles.recordDetailHeader}>
            <h5>Feedback: {activeItem.topic}</h5>
            <span className={styles.tutorName}>Tutor: {activeItem.tutor}</span>
          </div>
          
          <div className={styles.feedbackSection}>
            <strong>Mentor Feedback Summary:</strong>
            <p>{currentRecord.summary}</p>
          </div>

          <div className={styles.homeworkSection}>
            <strong>Prescribed Homework:</strong>
            <p>{currentRecord.homework}</p>
          </div>

          <div className={styles.vocabSection}>
            <strong>New Vocabulary:</strong>
            <div className={styles.vocabTags}>
              {currentRecord.vocab.split(', ').map(v => (
                <span key={v} className={styles.vocabTag}>{v}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Roadmap = ({ selectedPhase, setSelectedPhase }) => {
  const phaseDetails = {
    "01": {
      desc: "Baseline diagnostics to outline structural and academic syntax gaps.",
      milestones: ["Diagnostic exam complete", "Initial skill matrix set", "Mentor match resolved"],
      timeline: "Completed May 10"
    },
    "02": {
      desc: "High-intensity 1:1 training targeting cohesion, advanced rhetoric outlines, and paragraph structures.",
      milestones: ["Target IELTS score 7.0+", "Practice cohesive essay transitions", "Master rhetorical verbs"],
      timeline: "Active Phase"
    },
    "03": {
      desc: "Final polishing under timed pressure, full practice sets, and admissions essay revisions.",
      milestones: ["Submit college essay revisions", "Complete 3 timed diagnostics", "Achieve target band score 7.5+"],
      timeline: "Scheduled: June 10"
    }
  };

  const currentPhase = phaseDetails[selectedPhase] || phaseDetails["02"];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 5 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -5 }}
      className={styles.viewContent}
    >
      <span className={styles.tabIntro}>Click on any stage to explore phase milestones.</span>

      <div className={styles.roadmapLayout}>
        <div className={styles.roadmapFlow}>
          {demoData.roadmap.map((step) => {
            const isActive = selectedPhase === step.phase;
            return (
              <button 
                key={step.phase} 
                onClick={() => setSelectedPhase(step.phase)}
                className={`${styles.roadmapStep} ${styles[step.status]} ${isActive ? styles.stepActive : ""}`}
              >
                <div className={styles.stepCircle}>{step.phase}</div>
                <div className={styles.stepInfo}>
                  <span className={styles.stepTitle}>{step.title}</span>
                  <span className={styles.stepStatusText}>{step.status}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className={styles.phaseDetailCard}>
          <div className={styles.phaseDetailHeader}>
            <h5>Phase {selectedPhase}: {demoData.roadmap.find(r => r.phase === selectedPhase)?.title}</h5>
            <span className={styles.phaseTimeline}>{currentPhase.timeline}</span>
          </div>
          <p className={styles.phaseDesc}>{currentPhase.desc}</p>
          <div className={styles.milestonesList}>
            <strong>Milestone Checklist:</strong>
            <ul>
              {currentPhase.milestones.map((m, idx) => (
                <li key={idx}>{m}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function InteractiveSystemDemo() {
  const [activeTab, setActiveTab] = useState("overview");

  // Interactive Tasks Checklist State
  const [tasks, setTasks] = useState([
    { id: 1, text: "Review Alex's feedback on essay transitions", completed: false, skill: "Writing", val: 8 },
    { id: 2, text: "Study 10 words in Admissions Rhetoric deck", completed: false, skill: "Reading", val: 5 },
    { id: 3, text: "Record Speaking prompt: Cohesion Drill 2", completed: false, skill: "Speaking", val: 6 },
  ]);

  // Skill Diagnostic Base Data
  const [skills] = useState([
    { name: "Reading", val: 78, base: 78, change: "+4", note: "Reading scanning speed is high. Focus on synthesizing complex argumentative details." },
    { name: "Writing", val: 62, base: 62, change: "+6", alert: true, note: "Needs structure in argumentative logic transitions. Recommendations: Complete essay transition reviews." },
    { name: "Speaking", val: 71, base: 71, change: "+3", note: "Fluency is sound. Focus on structured topic expansions, eliminating self-corrections." },
    { name: "Analysis", val: 65, base: 65, change: "+5", note: "Logical premises are strong. Focus on linking citations back to claim premises." },
  ]);

  // Clickable tabs details states
  const [selectedSkill, setSelectedSkill] = useState("Writing");
  const [selectedRecordId, setSelectedRecordId] = useState(1);
  const [selectedPhase, setSelectedPhase] = useState("02");

  // Dynamic Skill Score calculation based on checked tasks
  const getSkillValue = (skillName) => {
    const skillObj = skills.find(s => s.name === skillName);
    if (!skillObj) return 0;
    const taskBonus = tasks
      .filter(t => t.skill === skillName && t.completed)
      .reduce((sum, t) => sum + t.val, 0);
    return Math.min(100, skillObj.base + taskBonus);
  };

  const getAvgScore = () => {
    const total = skills.reduce((sum, s) => sum + getSkillValue(s.name), 0);
    const avg = total / skills.length;
    return (avg / 10).toFixed(1);
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <>
      {/* DESKTOP VERSION */}
      <div className={`${styles.appFrame} ${styles.desktopOnly}`}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <div className={styles.appIcon}>P</div>
            <span className={styles.appName}>Petra Portal</span>
          </div>
          
          <nav className={styles.sidebarNav}>
            <div className={styles.navGroup}>
              <span className={styles.navLabel}>System</span>
              <SidebarItem 
                icon={Layout} 
                label="Overview" 
                active={activeTab === "overview"} 
                onClick={() => setActiveTab("overview")} 
              />
              <SidebarItem 
                icon={Target} 
                label="Diagnostics" 
                active={activeTab === "diag"} 
                onClick={() => setActiveTab("diag")} 
              />
            </div>
            
            <div className={styles.navGroup}>
              <span className={styles.navLabel}>Activity</span>
              <SidebarItem 
                icon={BookOpen} 
                label="Records" 
                active={activeTab === "records"} 
                onClick={() => setActiveTab("records")} 
              />
              <SidebarItem 
                icon={Milestone} 
                label="Roadmap" 
                active={activeTab === "roadmap"} 
                onClick={() => setActiveTab("roadmap")} 
              />
            </div>
          </nav>
          
          <div className={styles.sidebarFooter}>
            <div className={styles.userDot} />
            <span>{demoData.student}</span>
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.mainArea}>
          <header className={styles.mainHeader}>
            <div className={styles.breadcrumb}>
              <span>Portal</span>
              <ChevronRight size={12} />
              <span className={styles.crumbActive}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
            </div>
          </header>
          
          <div className={styles.contentBody}>
            <AnimatePresence mode="wait">
              {activeTab === "overview" && <Overview key="overview" tasks={tasks} toggleTask={toggleTask} getAvgScore={getAvgScore} />}
              {activeTab === "diag" && <Diagnostics key="diag" skills={skills} selectedSkill={selectedSkill} setSelectedSkill={setSelectedSkill} getSkillValue={getSkillValue} />}
              {activeTab === "records" && <Records key="records" selectedRecordId={selectedRecordId} setSelectedRecordId={setSelectedRecordId} />}
              {activeTab === "roadmap" && <Roadmap key="roadmap" selectedPhase={selectedPhase} setSelectedPhase={setSelectedPhase} />}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* MOBILE VERSION */}
      <div className={styles.mobileFrame}>
        {/* Mobile Header */}
        <header className={styles.mobileHeader}>
          <div className={styles.mobileUser}>
            <div className={styles.userDot} />
            <span>{demoData.student}</span>
          </div>
          <span className={styles.mobileAppName}>Petra Portal</span>
        </header>

        {/* Mobile Content Area */}
        <div className={styles.mobileContentBody}>
          <AnimatePresence mode="wait">
            {activeTab === "overview" && <Overview key="overview" tasks={tasks} toggleTask={toggleTask} getAvgScore={getAvgScore} />}
            {activeTab === "diag" && <Diagnostics key="diag" skills={skills} selectedSkill={selectedSkill} setSelectedSkill={setSelectedSkill} getSkillValue={getSkillValue} />}
            {activeTab === "records" && <Records key="records" selectedRecordId={selectedRecordId} setSelectedRecordId={setSelectedRecordId} />}
            {activeTab === "roadmap" && <Roadmap key="roadmap" selectedPhase={selectedPhase} setSelectedPhase={setSelectedPhase} />}
          </AnimatePresence>
        </div>

        {/* Mobile Bottom Tab Bar */}
        <nav className={styles.mobileTabBar}>
          <button 
            className={`${styles.tabBarItem} ${activeTab === 'overview' ? styles.tabBarActive : ''}`} 
            onClick={() => setActiveTab('overview')}
          >
            <Layout size={16} />
            <span>Overview</span>
          </button>
          <button 
            className={`${styles.tabBarItem} ${activeTab === 'diag' ? styles.tabBarActive : ''}`} 
            onClick={() => setActiveTab('diag')}
          >
            <Target size={16} />
            <span>Diag</span>
          </button>
          <button 
            className={`${styles.tabBarItem} ${activeTab === 'records' ? styles.tabBarActive : ''}`} 
            onClick={() => setActiveTab('records')}
          >
            <BookOpen size={16} />
            <span>Records</span>
          </button>
          <button 
            className={`${styles.tabBarItem} ${activeTab === 'roadmap' ? styles.tabBarActive : ''}`} 
            onClick={() => setActiveTab('roadmap')}
          >
            <Milestone size={16} />
            <span>Roadmap</span>
          </button>
        </nav>
      </div>
    </>
  );
}
