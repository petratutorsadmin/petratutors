import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layout,
  Target,
  BookOpen,
  TrendingUp,
  User,
  ChevronRight,
  Activity,
  Milestone
} from "lucide-react";
import styles from "./InteractiveSystemDemo.module.css";

const demoData = {
  student: "Demo Student",
  course: "IELTS / International Pathway",
  insight: "Focus on logical transitions and evidence-based writing. Student is excelling in verbal reasoning but needs structure in long-form output.",
  skills: [
    { name: "Reading", val: 78, change: "+4" },
    { name: "Writing", val: 62, change: "+6", alert: true },
    { name: "Speaking", val: 71, change: "+3" },
    { name: "Analysis", val: 65, change: "+5" },
  ],
  records: [
    { id: 1, date: "Oct 12", topic: "Argumentative Logic", tutor: "Alex O.", status: "Done" },
    { id: 2, date: "Oct 08", topic: "IELTS Speaking Part 3", tutor: "Sarah K.", status: "Done" },
    { id: 3, date: "Oct 05", topic: "Summary Techniques", tutor: "Alex O.", status: "Done" },
  ],
  roadmap: [
    { phase: "01", title: "Diagnostic", status: "completed" },
    { phase: "02", title: "Intensive Support", status: "current" },
    { phase: "03", title: "Final Polish", status: "upcoming" },
  ]
};

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    className={`${styles.sidebarItem} ${active ? styles.sidebarActive : ""}`}
    onClick={onClick}
  >
    <Icon size={14} />
    <span>{label}</span>
  </button>
);

const Overview = () => (
  <motion.div 
    initial={{ opacity: 0, y: 5 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0, y: -5 }}
    className={styles.viewContent}
  >
    <div className={styles.compactInsight}>
      <div className={styles.viewHeader}>
        <Activity size={14} />
        <h4>Petra Insight</h4>
      </div>
      <p>{demoData.insight}</p>
    </div>
    
    <div className={styles.statsGrid}>
      <div className={styles.miniCard}>
        <span className={styles.miniLabel}>Avg. Score</span>
        <span className={styles.miniVal}>7.5</span>
      </div>
      <div className={styles.miniCard}>
        <span className={styles.miniLabel}>Growth</span>
        <span className={styles.miniVal} style={{ color: "#2b8a3e" }}>+1.2</span>
      </div>
      <div className={styles.miniCard}>
        <span className={styles.miniLabel}>Next Milestone</span>
        <span className={styles.miniVal}>Oct 20</span>
      </div>
    </div>
  </motion.div>
);

const Diagnostics = () => (
  <motion.div 
    initial={{ opacity: 0, y: 5 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0, y: -5 }}
    className={styles.viewContent}
  >
    <div className={styles.skillStack}>
      {demoData.skills.map(s => (
        <div key={s.name} className={styles.linearSkillRow}>
          <div className={styles.skillMeta}>
            <span className={styles.skillLabel}>{s.name}</span>
            <span className={styles.skillTrend}>{s.change}</span>
          </div>
          <div className={styles.linearBar}>
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: `${s.val}%` }} 
              className={styles.linearBarFill}
              style={{ backgroundColor: s.alert ? "var(--c-gold)" : "var(--c-navy)" }}
            />
          </div>
          <span className={styles.skillVal}>{s.val}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

const Records = () => (
  <motion.div 
    initial={{ opacity: 0, y: 5 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0, y: -5 }}
    className={styles.viewContent}
  >
    <div className={styles.linearList}>
      {demoData.records.map(r => (
        <div key={r.id} className={styles.linearListItem}>
          <div className={styles.listMain}>
            <span className={styles.listDate}>{r.date}</span>
            <span className={styles.listTopic}>{r.topic}</span>
          </div>
          <div className={styles.listMeta}>
            <User size={10} />
            <span>{r.tutor}</span>
            <span className={styles.statusBadge}>{r.status}</span>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const Roadmap = () => (
  <motion.div 
    initial={{ opacity: 0, y: 5 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0, y: -5 }}
    className={styles.viewContent}
  >
    <div className={styles.roadmapFlow}>
      {demoData.roadmap.map((step, i) => (
        <div key={step.phase} className={`${styles.roadmapStep} ${styles[step.status]}`}>
          <div className={styles.stepCircle}>{step.phase}</div>
          <div className={styles.stepInfo}>
            <span className={styles.stepTitle}>{step.title}</span>
            <span className={styles.stepStatusText}>{step.status}</span>
          </div>
          {i < demoData.roadmap.length - 1 && <div className={styles.stepLine} />}
        </div>
      ))}
    </div>
  </motion.div>
);

export default function InteractiveSystemDemo() {
  const [activeTab, setActiveTab] = useState("overview");

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
              {activeTab === "overview" && <Overview key="overview" />}
              {activeTab === "diag" && <Diagnostics key="diag" />}
              {activeTab === "records" && <Records key="records" />}
              {activeTab === "roadmap" && <Roadmap key="roadmap" />}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* MOBILE VERSION (Simplified Native App Mockup) */}
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
            {activeTab === "overview" && <Overview key="overview" />}
            {activeTab === "diag" && <Diagnostics key="diag" />}
            {activeTab === "records" && <Records key="records" />}
            {activeTab === "roadmap" && <Roadmap key="roadmap" />}
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
