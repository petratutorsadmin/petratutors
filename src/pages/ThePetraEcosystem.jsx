import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
    LineChart,
    BookOpen,
    Users,
    Compass,
    FileText,
    Activity,
    Sparkles,
    CheckCircle2,
    ArrowRight,
    GraduationCap,
    Lock,
    Send,
    RefreshCw,
    MessageSquare,
    CheckSquare,
    Square
} from 'lucide-react';
import SEO from '../components/SEO';
import styles from './ThePetraEcosystem.module.css';
import InteractiveSystemDemo from '../components/InteractiveSystemDemo';

export default function ThePetraEcosystem() {
    const { t } = useTranslation();
    const [activeNode, setActiveNode] = useState('chart');



    // --- 2. Lesson Flow Simulator States ---
    const [activeFlowStep, setActiveFlowStep] = useState(0);
    // Flashcard Flip State
    const [flippedFlashcard, setFlippedFlashcard] = useState(false);
    const [flashcardIndex, setFlashcardIndex] = useState(0);
    const flashcards = [
        { word: 'Delineate', type: 'verb [ analytical ]', definition: 'To outline, sketch, or describe with absolute precision.', sentence: 'The scholar must delineate the core arguments before proposing a synthesis.' },
        { word: 'Substantiate', type: 'verb [ analytical ]', definition: 'To provide evidence to support or prove the truth of.', sentence: 'Standard statistics are insufficient to substantiate a profound social thesis.' },
        { word: 'Juxtapose', type: 'verb [ rhetorical ]', definition: 'To place close together or side-by-side for comparison or contrast.', sentence: 'Adichie juxtaposes the religious fervor of Eugene with the warmth of Aunty Ifeoma.' }
    ];

    // Live Text Polisher State
    const [rawText, setRawText] = useState('This book is really bad because it shows how poor people struggle and makes the father look like a total tyrant who is super mean to his family.');
    const [polishedText, setPolishedText] = useState('');
    const [isPolishing, setIsPolishing] = useState(false);

    const handleUpgradeStyle = () => {
        if (!rawText.trim()) return;
        setIsPolishing(true);
        setTimeout(() => {
            setPolishedText(
                "Adichie's narrative exposes systemic socio-economic hardships, portraying the paternal figure as a tyrannical domestic authority whose dogmatic control actively oppresses the household."
            );
            setIsPolishing(false);
        }, 1200);
    };

    // --- 3. Keystone Editorial Desk States ---
    const [activePitch, setActivePitch] = useState('pearl-guide');
    const [resolvedEdits, setResolvedEdits] = useState({
        'pearl-guide': false,
        'tokyo-events': false,
        'student-opinion': false
    });
    const [isResolving, setIsResolving] = useState(false);

    const handleResolveEdit = (pitchId) => {
        setIsResolving(true);
        setTimeout(() => {
            setResolvedEdits(prev => ({ ...prev, [pitchId]: true }));
            setIsResolving(false);
        }, 1000);
    };

    // --- 4. Support Network Live Messenger ---
    const [activeMentor, setActiveMentor] = useState('mentor');
    const [chatMessages, setChatMessages] = useState({
        mentor: [
            { sender: 'mentor', text: 'Hello Kenji, I finished reviewing your weekly schedule prescription. Ready for your essay outline sync tomorrow?' }
        ],
        tutor: [
            { sender: 'tutor', text: 'Hi! Let me know if you want to review the Math HL Calculus assignment before the trial exam.' }
        ],
        advisor: [
            { sender: 'advisor', text: "I noticed some transition issues in your draft essay on post-colonial rhetoric. Let's clean that up." }
        ]
    });
    const [userQuestion, setUserQuestion] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSendMessage = () => {
        if (!userQuestion.trim()) return;
        const currentMentor = activeMentor;
        const textToSend = userQuestion;

        // Add user message
        setChatMessages(prev => ({
            ...prev,
            [currentMentor]: [...prev[currentMentor], { sender: 'user', text: textToSend }]
        }));
        setUserQuestion('');
        setIsTyping(true);

        // Simulated intelligent response
        setTimeout(() => {
            let responseText = '';
            if (currentMentor === 'mentor') {
                responseText = "Excellent question. Focus on structuring the body paragraphs using the synthesis model first. I've updated your target checklist!";
            } else if (currentMentor === 'tutor') {
                responseText = "That makes sense. We should apply the second derivative test to justify the maximum values. Let's drill this live tomorrow.";
            } else {
                responseText = 'Nice revision. Changing "bad" to "oppressive" sharpens the tone significantly. I approve this paragraph!';
            }
            setChatMessages(prev => ({
                ...prev,
                [currentMentor]: [...prev[currentMentor], { sender: 'mentor', text: responseText }]
            }));
            setIsTyping(false);
        }, 1500);
    };

    // --- 5. Pathways Target track ---
    const [activePathway, setActivePathway] = useState('ib-pearl');

    // --- 6. Academic Library categories ---
    const [activeLibraryCat, setActiveLibraryCat] = useState('essay');

    // --- 7. Philosophy Manifesto cards ---
    const [manifestoFlipped, setManifestoFlipped] = useState({
        1: false,
        2: false,
        3: false,
        4: false
    });

    const toggleManifesto = (id) => {
        setManifestoFlipped(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
    };

    // Node definitions matching SVG elements
    const nodes = [
        { id: 'keystone', name: t('ecosystem.node_keystone_name', 'インテレクチュアル・レイヤー / The Keystone'), label: 'The Keystone', element: 'The Sun (Global Voice)', color: '#8b5cf6', desc: 'The culmination of student critical thought and writing, published globally.', icon: BookOpen },
        { id: 'pathways', name: t('ecosystem.node_pathways_name', '進路ナビゲーション / Pathways'), label: 'Pathways', element: 'Constellation (Admission Target)', color: '#d97706', desc: 'Custom navigation pathways to prestigious domestic and overseas universities.', icon: Compass },
        { id: 'chart', name: t('ecosystem.node_chart_name', '学習カルテ / Learning Chart'), label: 'Learning Chart', element: 'Leaves (Growth Record)', color: '#6366f1', desc: 'Continuous skills tracking, weakness mapping, and interactive homework checks.', icon: LineChart },
        { id: 'library', name: t('ecosystem.node_library_name', 'アカデミック・ライブラリ / Library'), label: 'Library', element: 'Branches (Resource Cabinet)', color: '#0284c7', desc: 'Curated essays,Statement of Purposes, and vocabulary flashcard cabinets.', icon: FileText },
        { id: 'flow', name: t('ecosystem.node_flow_name', '指導メソッド / Lesson Flow'), label: 'Lesson Flow', element: 'Trunk (Dialectic Center)', color: '#f59e0b', desc: 'Our rigorous 5-stage dialectic lesson methodology.', icon: Activity },
        { id: 'network', name: t('ecosystem.node_network_name', '伴走ネットワーク / Support Network'), label: 'Support Network', element: 'Roots (Mentor Base)', color: '#0f172a', desc: 'Elite academic advisors, subject tutors, and editors standing by.', icon: Users },
        { id: 'manifesto', name: t('ecosystem.node_manifesto_name', 'フィロソフィー / Philosophy'), label: 'Philosophy', element: 'Soil (Nutrient Base)', color: '#ec4899', desc: 'Human-centered, non-standardized educational identity.', icon: Sparkles }
    ];

    // Pathway data
    const pathwayData = {
        'ib-pearl': {
            title: 'IB Diploma ➔ Keio PEARL',
            desc: "A pathway designed for high-scoring English-track students targeting Keio University's flagship Economics program.",
            milestones: [
                { grade: 'Grade 10', title: 'Foundational Critical Analysis', detail: 'Developing vocabulary density, reading complex historical texts, and structuring advanced essays.' },
                { grade: 'Grade 11', title: 'IB Internal Assessment (IA) & Extended Essay (EE) Prep', detail: 'Developing research methodology, learning to frame academic hypotheses, and peer reviews.' },
                { grade: 'Grade 12', title: 'PEARL Application Execution', detail: 'Drafting the Statement of Purpose (SoP), letters of reference, and perfecting standardized scores.' }
            ]
        },
        'ib-netherlands': {
            title: 'IB Diploma ➔ Netherlands Universities',
            desc: 'For students navigating European admissions (Research Universities in Amsterdam, Rotterdam, Utrecht, etc.).',
            milestones: [
                { grade: 'Grade 10', title: 'European Academic Orientation', detail: 'Subject selection advising, understanding Numerus Fixus requirements.' },
                { grade: 'Grade 11', title: 'Rigor & Standard Alignment', detail: 'Meeting mathematics entry requirements and building strong structured motivation statements.' },
                { grade: 'Grade 12', title: 'Matching Test Preparation', detail: 'Simulated math tests, admissions interviews, and university match counseling.' }
            ]
        },
        'eiken-national': {
            title: 'Eiken Grade 1 ➔ Japanese National Universities',
            desc: 'Navigating national university admissions (AO / Recommendation exams) requiring elite English proficiency.',
            milestones: [
                { grade: 'Grade 10', title: 'Eiken 1st Grade Vocabulary & Structure', detail: 'Mastering advanced socio-political expressions and structuring persuasive essays.' },
                { grade: 'Grade 11', title: 'AO Portfolio Design', detail: 'Identifying key societal problems, researching academic papers, and outline draftings.' },
                { grade: 'Grade 12', title: 'Interview & Essay Finalization', detail: 'Intense simulated academic oral interviews, and speed writing under exam conditions.' }
            ]
        }
    };

    // Library category items
    const libraryCategories = {
        'essay': {
            title: 'Academic Essay Breakdowns',
            items: [
                { title: 'IB English A LAL Essay Outline', detail: 'Analysis of narrative techniques in post-colonial literature.' },
                { title: 'Keio PEARL Sample SOP', detail: 'Example of a successful Statement of Purpose with editor notes.' }
            ]
        },
        'vocab': {
            title: 'Vocabulary Decks & Flashcards',
            items: [
                { title: 'Admissions Rhetoric Core Vocab', detail: '50 essential analytical verbs for college essays (e.g. delineate, substantiate).' },
                { title: 'IELTS Band 8 Lexical Phrases', detail: 'High-scoring cohesive phrases for Writing Task 2.' }
            ]
        },
        'guide': {
            title: 'IB & Exam Resource Guides',
            items: [
                { title: 'IB History Paper 2 Prep Guide', detail: 'Authoritative study guides and source evaluation checklists.' },
                { title: 'UCAS Personal Statement Checklist', detail: "Crucial do's and don'ts for UK application statements." }
            ]
        }
    };

    return (
        <div className={styles.pageRoot}>
            <SEO
                title={`The Petra Ecosystem | ${t('nav.petra', 'Petra Tutors')}`}
                description={t('ecosystem.subtitle')}
                path="/ecosystem"
            />

            {/* Immersive Header */}
            <div className={styles.heroSection}>
                <div className="container text-center">
                    <span className="eyebrow" style={{ marginBottom: '1rem', display: 'inline-block' }}>
                        {t('ecosystem.parent_toggle_label')}
                    </span>
                    <h1 className={styles.heroTitle}>{t('ecosystem.title')}</h1>
                    <p className={styles.heroSubtitle}>
                        {t('ecosystem.hero_subtitle')}
                    </p>
                </div>
            </div>

            {/* Growth Tree Explanation */}
            <div className={styles.growthTreeIntro}>
                <div className="container">
                    <div className={styles.growthTreeCard}>
                        <h2 className={styles.growthTreeTitle}>{t('ecosystem.growth_tree_title')}</h2>
                        <p className={styles.growthTreeDesc}>{t('ecosystem.growth_tree_desc')}</p>
                    </div>
                </div>
            </div>

            {/* Immersive Ecosystem Stage */}
            <section className={styles.splitStageSection}>
                <div className="container">
                    <div className={styles.splitStageLayout}>

                        {/* LEFT PANE: Animated SVG Biosphere Tree */}
                        <div className={styles.treePaneCard}>
                            <div className={styles.treePaneHeader}>
                                <span className={styles.paneIndicator}>Interactive Biosphere Map</span>
                                <h3 className={styles.treeTitle}>Petra Growth Tree</h3>
                            </div>

                            <div className={styles.svgWrapper}>
                                <svg viewBox="0 0 800 600" className={styles.ecosystemSvg}>
                                    <defs>
                                        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                                            <stop offset="0%" stopColor="#fff7ed" stopOpacity="1" />
                                            <stop offset="60%" stopColor="#fed7aa" stopOpacity="0.8" />
                                            <stop offset="100%" stopColor="#ff9f1c" stopOpacity="0" />
                                        </radialGradient>
                                        <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#f59e0b" />
                                            <stop offset="100%" stopColor="#c27a05" />
                                        </linearGradient>
                                        <filter id="activeNodeGlow" x="-30%" y="-30%" width="160%" height="160%">
                                            <feGaussianBlur stdDeviation="10" result="blur" />
                                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                        </filter>
                                    </defs>

                                    {/* Horizon & Soil Layer (Philosophy) */}
                                    <rect x="0" y="480" width="800" height="120" fill="#fcfbf7" />

                                    {/* Layered soil background with organic wavy shapes */}
                                    <path d="M 0 480 Q 200 465 400 480 T 800 480 L 800 600 L 0 600 Z" fill="#edebe0" opacity="0.5" />

                                    <g className={`${styles.soilGroup} ${activeNode === 'manifesto' ? styles.activeSoilGroup : ''}`} onClick={() => setActiveNode('manifesto')}>
                                        <path
                                            d="M 0 488 Q 220 472 400 488 T 800 488 L 800 600 L 0 600 Z"
                                            fill="#f5f2e9"
                                            className={styles.soilPath}
                                        />
                                        {/* Background capsule pill for visibility */}
                                        <rect x="175" y="520" width="130" height="24" rx="12" fill="#7c2d12" className={styles.labelBadge} />
                                        <text x="240" y="536" className={styles.elementLabelLight} textAnchor="middle">PHILOSOPHY</text>

                                        {/* Invisible massive click hotspot */}
                                        <path d="M 0,480 L 320,480 L 320,600 L 0,600 Z" className={styles.clickOverlay} />
                                    </g>

                                    {/* Deep Roots Layer (Support Network) */}
                                    <g className={`${styles.rootsGroup} ${activeNode === 'network' ? styles.activeRoots : ''}`} onClick={() => setActiveNode('network')}>
                                        {/* Organic tapered roots */}
                                        <path d="M 380,480 C 350,510 320,540 270,575 L 275,581 C 325,546 355,516 385,480 Z" fill="#334155" opacity="0.8" />
                                        <path d="M 420,480 C 450,510 480,540 530,575 L 525,581 C 475,546 445,516 415,480 Z" fill="#334155" opacity="0.8" />
                                        <path d="M 395,480 C 395,515 405,550 415,595 L 409,595 C 399,550 389,515 389,480 Z" fill="#1e293b" />

                                        {/* Root branching details */}
                                        <path d="M 310,545 Q 280,560 250,565" stroke="#334155" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />
                                        <path d="M 490,545 Q 520,560 550,565" stroke="#334155" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />

                                        {/* Background capsule pill for visibility */}
                                        <rect x="325" y="545" width="170" height="24" rx="12" fill="#1e293b" className={styles.labelBadge} />
                                        <text x="410" y="561" className={styles.elementLabelLight} textAnchor="middle">SUPPORT NETWORK</text>

                                        {/* Invisible massive click hotspot covering the roots */}
                                        <circle cx="410" cy="545" r="70" className={styles.clickOverlay} />
                                    </g>

                                    {/* Main Trunk Layer (Lesson Flow) */}
                                    <g className={`${styles.trunkGroup} ${activeNode === 'flow' ? styles.activeTrunk : ''}`} onClick={() => setActiveNode('flow')}>
                                        {/* Tapered curved organic trunk */}
                                        <path
                                            d="M 370,480 C 375,410 380,340 388,280 L 412,280 C 420,340 425,410 430,480 Z"
                                            fill="url(#trunkGrad)"
                                        />
                                        {/* Wood texture bark lines */}
                                        <path d="M 382,480 C 388,410 392,340 396,280" stroke="#7c2d12" strokeWidth="1.5" fill="none" opacity="0.25" />
                                        <path d="M 418,480 C 412,410 408,340 404,280" stroke="#7c2d12" strokeWidth="1.5" fill="none" opacity="0.25" />
                                        <path d="M 400,480 C 400,410 400,340 400,280" stroke="#7c2d12" strokeWidth="1" fill="none" opacity="0.15" />

                                        {/* Glowing energy pathway */}
                                        <path
                                            d="M 400,480 C 400,410 400,340 400,280"
                                            stroke="#f59e0b"
                                            strokeWidth="3.5"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeDasharray="6 8"
                                            className={styles.sapFlowLine}
                                        />

                                        {/* Background capsule pill for visibility */}
                                        <rect x="335" y="365" width="130" height="24" rx="12" fill="#7c2d12" className={styles.labelBadge} />
                                        <text x="400" y="381" className={styles.elementLabelLight} textAnchor="middle">LESSON FLOW</text>

                                        {/* Invisible massive click hotspot covering the trunk height */}
                                        <path d="M 360,280 L 440,280 L 440,480 L 360,480 Z" className={styles.clickOverlay} />
                                    </g>

                                    {/* Branches with structural taper */}
                                    <path d="M 388,285 C 330,275 270,245 208,218 L 210,212 C 272,239 332,269 392,279 Z" fill="#b45309" />
                                    <path d="M 412,285 C 470,275 530,245 592,218 L 590,212 C 528,239 468,269 408,279 Z" fill="#b45309" />

                                    {/* Constellation Star Pathways */}
                                    <g className={`${styles.starsHotspot} ${activeNode === 'pathways' ? styles.activeStars : ''}`} onClick={() => setActiveNode('pathways')}>
                                        <path d="M 520,60 L 560,85 L 600,70 L 630,100" stroke="#d97706" strokeWidth="2.2" strokeDasharray="4 4" fill="none" opacity="0.85" />

                                        {/* Glowing star clusters */}
                                        <g transform="translate(520, 60)">
                                            <circle cx="0" cy="0" r="8" fill="#d97706" opacity="0.3" className={styles.pulsingStar} />
                                            <path d="M -6,0 L 6,0 M 0,-6 L 0,6" stroke="#d97706" strokeWidth="2" />
                                            <circle cx="0" cy="0" r="3" fill="#fff" />
                                        </g>
                                        <g transform="translate(560, 85)">
                                            <circle cx="0" cy="0" r="12" fill="#d97706" opacity="0.4" className={styles.pulsingStar} />
                                            <path d="M -8,0 L 8,0 M 0,-8 L 0,8" stroke="#d97706" strokeWidth="2.5" />
                                            <circle cx="0" cy="0" r="4" fill="#fff" />
                                        </g>
                                        <g transform="translate(600, 70)">
                                            <circle cx="0" cy="0" r="8" fill="#d97706" opacity="0.3" className={styles.pulsingStar} />
                                            <path d="M -6,0 L 6,0 M 0,-6 L 0,6" stroke="#d97706" strokeWidth="2" />
                                            <circle cx="0" cy="0" r="3" fill="#fff" />
                                        </g>
                                        <g transform="translate(630, 100)">
                                            <circle cx="0" cy="0" r="16" fill="#d97706" opacity="0.4" className={styles.pulsingStar} />
                                            <path d="M -10,0 L 10,0 M 0,-10 L 0,10" stroke="#d97706" strokeWidth="3" />
                                            <circle cx="0" cy="0" r="5" fill="#fff" />
                                        </g>

                                        {/* Background capsule pill for visibility */}
                                        <rect x="535" y="120" width="110" height="24" rx="12" fill="#7c2d12" className={styles.labelBadge} />
                                        <text x="590" y="136" className={styles.elementLabelLight} textAnchor="middle">PATHWAYS</text>

                                        {/* Invisible massive click hotspot covering the constellation */}
                                        <circle cx="580" cy="80" r="65" className={styles.clickOverlay} />
                                    </g>

                                    {/* The Sun (The Keystone) */}
                                    <g className={`${styles.sunHotspot} ${activeNode === 'keystone' ? styles.activeSun : ''}`} onClick={() => setActiveNode('keystone')}>
                                        <circle cx="400" cy="90" r="80" fill="url(#sunGlow)" />

                                        {/* Radial celestial rays */}
                                        <g opacity="0.4">
                                            <line x1="400" y1="40" x2="400" y2="140" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3 3" />
                                            <line x1="350" y1="90" x2="450" y2="90" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3 3" />
                                            <line x1="365" y1="55" x2="435" y2="125" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3 3" />
                                            <line x1="365" y1="125" x2="435" y2="55" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3 3" />
                                        </g>

                                        <circle cx="400" cy="90" r="38" fill="#fff" opacity="0.95" className={styles.sunCore} />
                                        <circle cx="400" cy="90" r="30" fill="url(#sunGlow)" opacity="0.85" />

                                        {/* Background capsule pill for visibility */}
                                        <rect x="335" y="145" width="130" height="24" rx="12" fill="#7c2d12" className={styles.labelBadge} />
                                        <text x="400" y="161" className={styles.elementLabelLight} textAnchor="middle">THE KEYSTONE</text>

                                        {/* Invisible massive click hotspot */}
                                        <circle cx="400" cy="90" r="80" className={styles.clickOverlay} />
                                    </g>

                                    {/* Left Leaf Group (Learning Chart) - Multi-layered */}
                                    <g className={`${styles.leafGroupLeft} ${activeNode === 'chart' ? styles.activeLeavesLeft : ''}`} onClick={() => setActiveNode('chart')}>
                                        <path d="M180,190 C120,165 90,215 130,255 C170,295 220,245 180,190 Z" fill="#312e81" fillOpacity="0.85" />
                                        <path d="M210,210 C150,180 120,230 160,270 C200,310 250,260 210,210 Z" fill="#4f46e5" fillOpacity="0.95" />
                                        <path d="M225,195 C175,170 155,210 185,240 C215,270 255,235 225,195 Z" fill="#818cf8" fillOpacity="0.8" />

                                        {/* Leaf veins */}
                                        <path d="M 210,210 Q 180,240 160,270" stroke="#c7d2fe" strokeWidth="1.5" fill="none" opacity="0.6" />
                                        <path d="M 188,228 Q 170,225 158,228" stroke="#c7d2fe" strokeWidth="1" fill="none" opacity="0.5" />
                                        <path d="M 178,242 Q 165,245 155,250" stroke="#c7d2fe" strokeWidth="1" fill="none" opacity="0.5" />

                                        {/* Background capsule pill for visibility */}
                                        <rect x="105" y="260" width="150" height="24" rx="12" fill="#1e1b4b" className={styles.labelBadge} />
                                        <text x="180" y="276" className={styles.elementLabelLight} textAnchor="middle">LEARNING CHART</text>

                                        {/* Invisible massive click hotspot */}
                                        <circle cx="180" cy="230" r="70" className={styles.clickOverlay} />
                                    </g>

                                    {/* Right Leaf Group (Library) - Multi-layered */}
                                    <g className={`${styles.leafGroupRight} ${activeNode === 'library' ? styles.activeLeavesRight : ''}`} onClick={() => setActiveNode('library')}>
                                        <path d="M560,190 C500,165 470,215 510,255 C550,295 600,245 560,190 Z" fill="#0c4a6e" fillOpacity="0.85" />
                                        <path d="M590,210 C650,180 680,230 640,270 C600,310 550,260 590,210 Z" fill="#0284c7" fillOpacity="0.95" />
                                        <path d="M605,195 C555,170 535,210 565,240 C595,270 635,235 605,195 Z" fill="#38bdf8" fillOpacity="0.8" />

                                        {/* Leaf veins */}
                                        <path d="M 590,210 Q 620,240 640,270" stroke="#bae6fd" strokeWidth="1.5" fill="none" opacity="0.6" />
                                        <path d="M 612,228 Q 630,225 642,228" stroke="#bae6fd" strokeWidth="1" fill="none" opacity="0.5" />
                                        <path d="M 622,242 Q 635,245 645,250" stroke="#bae6fd" strokeWidth="1" fill="none" opacity="0.5" />

                                        {/* Background capsule pill for visibility */}
                                        <rect x="570" y="260" width="100" height="24" rx="12" fill="#082f49" className={styles.labelBadge} />
                                        <text x="620" y="276" className={styles.elementLabelLight} textAnchor="middle">LIBRARY</text>

                                        {/* Invisible massive click hotspot */}
                                        <circle cx="600" cy="230" r="70" className={styles.clickOverlay} />
                                    </g>
                                </svg>
                            </div>

                            {/* Mobile fallback button selection list */}
                            <div className={styles.mobileNodeSelector}>
                                {nodes.map((node) => {
                                    const Icon = node.icon;
                                    const isActive = activeNode === node.id;
                                    return (
                                        <button
                                            key={`mobile-${node.id}`}
                                            className={`${styles.mobileNodeBtn} ${isActive ? styles.activeMobileNodeBtn : ''}`}
                                            onClick={() => setActiveNode(node.id)}
                                            style={{ '--node-color': node.color }}
                                        >
                                            <Icon size={16} />
                                            <span>{node.name.split(' / ')[1] || node.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* RIGHT PANE: Interactive Active Simulator Control Center */}
                        <div className={styles.simulatorPaneCard}>
                            <AnimatePresence mode="wait">

                                {/* 1. Learning Chart Simulator */}
                                {activeNode === 'chart' && (
                                    <motion.div key="chart" className={styles.simWrapper} {...fadeInUp}>
                                        <div className={styles.simHeader}>
                                            <div className={styles.simTitleRow}>
                                                <LineChart className={styles.simIcon} size={22} style={{ color: '#6366f1' }} />
                                                <h4>学習カルテ / Learning Chart</h4>
                                            </div>
                                            <span className={styles.simViewTag}>Unified Portal View</span>
                                        </div>

                                        <div className={styles.simBody} style={{ padding: 0, background: 'transparent' }}>
                                            <InteractiveSystemDemo />
                                        </div>
                                    </motion.div>
                                )}

                                {/* 2. Lesson Flow Simulator */}
                                {activeNode === 'flow' && (
                                    <motion.div key="flow" className={styles.simWrapper} {...fadeInUp}>
                                        <div className={styles.simHeader}>
                                            <div className={styles.simTitleRow}>
                                                <Activity className={styles.simIcon} size={22} style={{ color: '#f59e0b' }} />
                                                <h4>指導メソッド / Lesson Flow</h4>
                                            </div>
                                        </div>

                                        <div className={styles.simBody}>
                                            <div className={styles.flowStagesHorizontal}>
                                                {['Warm Up', 'Learn', 'Use', 'Review', 'Wrap-up'].map((step, idx) => (
                                                    <button
                                                        key={step}
                                                        className={`${styles.flowHorizontalBtn} ${activeFlowStep === idx ? styles.activeFlowHBtn : ''}`}
                                                        onClick={() => {
                                                            setActiveFlowStep(idx);
                                                            setFlippedFlashcard(false);
                                                        }}
                                                    >
                                                        <span>0{idx + 1}</span>
                                                        <span className={styles.hBtnLabel}>{step}</span>
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Step 1: Warm Up (Flashcard Game) */}
                                            {activeFlowStep === 0 && (
                                                <div className={styles.flowStepSimulatorBox}>
                                                    <h5>Stage 1: Active Recall Flashcards</h5>
                                                    <p className={styles.simDescription}>Tap the card to perform a 3D flip and reveal definitions & academic example sentences.</p>

                                                    <div className={styles.flashcardCarousel}>
                                                        <div
                                                            className={`${styles.card3D} ${flippedFlashcard ? styles.card3DFlipped : ''}`}
                                                            onClick={() => setFlippedFlashcard(!flippedFlashcard)}
                                                        >
                                                            <div className={styles.cardFront}>
                                                                <span className={styles.cardWord}>{flashcards[flashcardIndex].word}</span>
                                                                <span className={styles.cardType}>{flashcards[flashcardIndex].type}</span>
                                                                <span className={styles.tapToFlip}>Click to Flip</span>
                                                            </div>
                                                            <div className={styles.cardBack}>
                                                                <span className={styles.cardDefTitle}>Definition</span>
                                                                <p className={styles.cardDefText}>{flashcards[flashcardIndex].definition}</p>
                                                                <span className={styles.cardExampleLabel}>Example Usage</span>
                                                                <p className={styles.cardExampleText}>"{flashcards[flashcardIndex].sentence}"</p>
                                                            </div>
                                                        </div>

                                                        <div className={styles.carouselControls}>
                                                            <button
                                                                className={styles.carouselBtn}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setFlashcardIndex(prev => (prev === 0 ? flashcards.length - 1 : prev - 1));
                                                                    setFlippedFlashcard(false);
                                                                }}
                                                            >
                                                                Prev Word
                                                            </button>
                                                            <button
                                                                className={styles.carouselBtn}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setFlashcardIndex(prev => (prev === flashcards.length - 1 ? 0 : prev + 1));
                                                                    setFlippedFlashcard(false);
                                                                }}
                                                            >
                                                                Next Word
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Step 3: Use (Live Academic Text Polisher) */}
                                            {activeFlowStep === 2 && (
                                                <div className={styles.flowStepSimulatorBox}>
                                                    <h5>Stage 3: Live Writing & Style Polishing</h5>
                                                    <p className={styles.simDescription}>
                                                        Type a simple, conversational argument block and click the button to see it restructured into high-scoring academic prose.
                                                    </p>

                                                    <div className={styles.polisherWorkspace}>
                                                        <div className={styles.inputBlock}>
                                                            <label>Draft Input (Colloquial Text)</label>
                                                            <textarea
                                                                value={rawText}
                                                                onChange={(e) => setRawText(e.target.value)}
                                                                className={styles.rawTextArea}
                                                            />
                                                        </div>

                                                        <button
                                                            className={styles.polishActionBtn}
                                                            onClick={handleUpgradeStyle}
                                                            disabled={isPolishing}
                                                        >
                                                            {isPolishing ? (
                                                                <>
                                                                    <RefreshCw className={styles.spinIcon} size={15} />
                                                                    <span>Polishing Rhetoric...</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Sparkles size={15} />
                                                                    <span>Upgrade Academic Style</span>
                                                                </>
                                                            )}
                                                        </button>

                                                        {polishedText && (
                                                            <motion.div
                                                                className={styles.polishedOutputBlock}
                                                                initial={{ opacity: 0, y: 5 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                            >
                                                                <span className={styles.outputLabel}>Upgraded Output (Academic Prose)</span>
                                                                <p className={styles.outputText}>{polishedText}</p>
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Steps 2, 4, 5 details */}
                                            {activeFlowStep !== 0 && activeFlowStep !== 2 && (
                                                <div className={styles.flowStepFallbackBox}>
                                                    <h5>Stage {activeFlowStep + 1}: {['Warm Up', 'Learn', 'Use', 'Review', 'Wrap-up'][activeFlowStep]}</h5>
                                                    <div className={styles.detailsBlock}>
                                                        {activeFlowStep === 1 && (
                                                            <>
                                                                <h6>Concept Injection</h6>
                                                                <p>Tutors introduce academic frameworks live on our digital whiteboard. For example, using the Hegelian Dialectic model to resolve structural impasses in essays.</p>
                                                            </>
                                                        )}
                                                        {activeFlowStep === 3 && (
                                                            <>
                                                                <h6>Line-by-line Editorial Comments</h6>
                                                                <p>Live reviews in shared workspaces where grammatical, stylistic, and formatting limits are highlighted and discussed instantly.</p>
                                                            </>
                                                        )}
                                                        {activeFlowStep === 4 && (
                                                            <>
                                                                <h6>Continuous Weekly Targets</h6>
                                                                <p>Dynamic homework tasks are injected directly back into your Learning Chart, completing the cycle of learning growth.</p>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {/* 3. The Keystone Simulator */}
                                {activeNode === 'keystone' && (
                                    <motion.div key="keystone" className={styles.simWrapper} {...fadeInUp}>
                                        <div className={styles.simHeader}>
                                            <div className={styles.simTitleRow}>
                                                <BookOpen className={styles.simIcon} size={22} style={{ color: '#8b5cf6' }} />
                                                <h4>インテレクチュアル・レイヤー / The Keystone</h4>
                                            </div>
                                        </div>

                                        <div className={styles.simBody}>
                                            <p className={styles.simDescription}>
                                                Experience the student publication pipeline. Click "Resolve Revision" to approve the editor feedback comments and watch the text refine.
                                            </p>

                                            <div className={styles.keystoneMiniSplit}>
                                                <div className={styles.keystonePitchesVertical}>
                                                    {['pearl-guide', 'tokyo-events', 'student-opinion'].map(pitchKey => (
                                                        <button
                                                            key={pitchKey}
                                                            className={`${styles.miniPitchBtn} ${activePitch === pitchKey ? styles.activeMiniPitch : ''}`}
                                                            onClick={() => setActivePitch(pitchKey)}
                                                        >
                                                            <h6>{pitchKey === 'pearl-guide' ? 'PEARL Survival Guide' : pitchKey === 'tokyo-events' ? 'Tokyo Circles' : 'AI in Classrooms'}</h6>
                                                            <span className={styles.miniPitchStatus}>{resolvedEdits[pitchKey] ? 'Resolved' : 'Revision Required'}</span>
                                                        </button>
                                                    ))}
                                                </div>

                                                <div className={styles.editorialPaperCard}>
                                                    <div className={styles.editorialPaperHeader}>
                                                        <h5>{activePitch === 'pearl-guide' ? 'The PEARL Survival Guide' : activePitch === 'tokyo-events' ? 'Tokyo Literature Circles & Discussion' : 'AI in the International Classroom'}</h5>
                                                        <span className={styles.paperAuthor}>Written by Class of 2026 Student</span>
                                                    </div>

                                                    <div className={styles.editorialTextWorkspace}>
                                                        {activePitch === 'pearl-guide' && (
                                                            <div className={styles.textDraftParagraph}>
                                                                {resolvedEdits['pearl-guide'] ? (
                                                                    <span className={styles.finalProse}>
                                                                        "Crucially, macroeconomic coursework requires rigorous mathematical readiness. Students should proactively master linear algebra and differential equations prior to entering the seminar."
                                                                    </span>
                                                                ) : (
                                                                    <span className={styles.draftProse}>
                                                                        "Macroeconomics is hard and needs math. Students should learn algebra before they start the class."
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )}

                                                        {activePitch === 'tokyo-events' && (
                                                            <div className={styles.textDraftParagraph}>
                                                                {resolvedEdits['tokyo-events'] ? (
                                                                    <span className={styles.finalProse}>
                                                                        "Establishing student-led literary forums fosters critical discussion beyond standardized test prep, building robust extracurricular profiles."
                                                                    </span>
                                                                ) : (
                                                                    <span className={styles.draftProse}>
                                                                        "We want to make literature circles to talk about books outside of classes so our profiles look good."
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )}

                                                        {activePitch === 'student-opinion' && (
                                                            <div className={styles.textDraftParagraph}>
                                                                {resolvedEdits['student-opinion'] ? (
                                                                    <span className={styles.finalProse}>
                                                                        "AI assists vocabulary expansion but risks eroding foundational drafting capabilities if unmonitored."
                                                                    </span>
                                                                ) : (
                                                                    <span className={styles.draftProse}>
                                                                        "AI is good for learning words but bad if students use it to write the whole essay."
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )}

                                                        {!resolvedEdits[activePitch] ? (
                                                            <div className={styles.reviewCommentCallout}>
                                                                <span className={styles.commentEditor}>Clara S. (Editor Feedback):</span>
                                                                <p>"The prose lacks lexical sophistication. Upgrade the phrasing to sound more authoritative."</p>
                                                                <button
                                                                    className={styles.applyResolveBtn}
                                                                    onClick={() => handleResolveEdit(activePitch)}
                                                                    disabled={isResolving}
                                                                >
                                                                    {isResolving ? 'Resolving Prose...' : 'Resolve Revision'}
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className={styles.resolvedSuccessBadge}>
                                                                <CheckCircle2 size={16} color="#10b981" />
                                                                <span>Revision Accepted & Ready for Publication</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* 4. Support Network Simulator */}
                                {activeNode === 'network' && (
                                    <motion.div key="network" className={styles.simWrapper} {...fadeInUp}>
                                        <div className={styles.simHeader}>
                                            <div className={styles.simTitleRow}>
                                                <Users className={styles.simIcon} size={22} style={{ color: '#0f172a' }} />
                                                <h4>伴走ネットワーク / Support Network Messenger</h4>
                                            </div>
                                        </div>

                                        <div className={styles.simBody}>
                                            <p className={styles.simDescription}>
                                                Chat directly with subject scholars and editors. Send a query about calculus, vocabulary, or essay structure to receive dynamic tutor answers.
                                            </p>

                                            <div className={styles.chatMessengerWorkspace}>
                                                <div className={styles.messengerSidemenu}>
                                                    {['mentor', 'tutor', 'advisor'].map(roleKey => (
                                                        <button
                                                            key={roleKey}
                                                            className={`${styles.messengerContactBtn} ${activeMentor === roleKey ? styles.activeContact : ''}`}
                                                            onClick={() => setActiveMentor(roleKey)}
                                                        >
                                                            <h6>{roleKey === 'mentor' ? 'Academic Mentor' : roleKey === 'tutor' ? 'Subject Tutor' : 'Writing Advisor'}</h6>
                                                            <span>Online</span>
                                                        </button>
                                                    ))}
                                                </div>

                                                <div className={styles.chatViewportWindow}>
                                                    <div className={styles.chatMessagesContainer}>
                                                        {chatMessages[activeMentor].map((msg, idx) => (
                                                            <div
                                                                key={idx}
                                                                className={`${styles.chatMessageBubble} ${msg.sender === 'user' ? styles.userBubble : styles.mentorBubble}`}
                                                            >
                                                                <p>{msg.text}</p>
                                                            </div>
                                                        ))}
                                                        {isTyping && (
                                                            <div className={styles.typingIndicatorBubble}>
                                                                <div className={styles.dot} />
                                                                <div className={styles.dot} />
                                                                <div className={styles.dot} />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className={styles.chatInputFooter}>
                                                        <input
                                                            type="text"
                                                            placeholder="Ask your tutor a question..."
                                                            value={userQuestion}
                                                            onChange={(e) => setUserQuestion(e.target.value)}
                                                            onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                                                        />
                                                        <button
                                                            className={styles.chatSendBtn}
                                                            onClick={handleSendMessage}
                                                            disabled={!userQuestion.trim()}
                                                        >
                                                            <Send size={15} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* 5. Pathways Target track */}
                                {activeNode === 'pathways' && (
                                    <motion.div key="pathways" className={styles.simWrapper} {...fadeInUp}>
                                        <div className={styles.simHeader}>
                                            <div className={styles.simTitleRow}>
                                                <Compass className={styles.simIcon} size={22} style={{ color: '#d97706' }} />
                                                <h4>進路ナビゲーション / Pathways</h4>
                                            </div>
                                        </div>

                                        <div className={styles.simBody}>
                                            <p className={styles.simDescription}>
                                                Explore how our roadmap templates guide students from Grade 10 up to global university applications. Click a pathway below to view milestones.
                                            </p>

                                            <div className={styles.pathwayTabsFlex}>
                                                {Object.keys(pathwayData).map(pKey => (
                                                    <button
                                                        key={pKey}
                                                        className={`${styles.pathwayPillBtn} ${activePathway === pKey ? styles.activePathwayPill : ''}`}
                                                        onClick={() => setActivePathway(pKey)}
                                                    >
                                                        {pathwayData[pKey].title}
                                                    </button>
                                                ))}
                                            </div>

                                            <div className={styles.pathwayMilestonesPanel}>
                                                <h5>{pathwayData[activePathway].title} Timeline</h5>
                                                <div className={styles.milestonesVerticalList}>
                                                    {pathwayData[activePathway].milestones.map((m, idx) => (
                                                        <div key={idx} className={styles.pathwayMilestoneCard}>
                                                            <span className={styles.milestoneGradePill}>{m.grade}</span>
                                                            <div className={styles.milestoneDetails}>
                                                                <h6>{m.title}</h6>
                                                                <p>{m.detail}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* 6. Academic Library categories */}
                                {activeNode === 'library' && (
                                    <motion.div key="library" className={styles.simWrapper} {...fadeInUp}>
                                        <div className={styles.simHeader}>
                                            <div className={styles.simTitleRow}>
                                                <FileText className={styles.simIcon} size={22} style={{ color: '#0284c7' }} />
                                                <h4>アカデミック・ライブラリ / Library Drawer</h4>
                                            </div>
                                        </div>

                                        <div className={styles.simBody}>
                                            <p className={styles.simDescription}>
                                                Click cabinet drawers below to pull open sample SOP papers, exam guidelines, and lexical cards.
                                            </p>

                                            <div className={styles.essayDisclosure}>
                                                <strong>{t('ecosystem.essay_disclosure_title')}</strong>
                                                <p>{t('ecosystem.essay_disclosure')}</p>
                                            </div>

                                            <div className={styles.libraryDrawersStage}>
                                                {Object.keys(libraryCategories).map(catKey => {
                                                    const isActive = activeLibraryCat === catKey;
                                                    return (
                                                        <div key={catKey} className={styles.drawerContainer}>
                                                            <button
                                                                className={`${styles.drawerHandleBtn} ${isActive ? styles.drawerOpen : ''}`}
                                                                onClick={() => setActiveLibraryCat(catKey)}
                                                            >
                                                                <div className={styles.drawerHandleMetal} />
                                                                <span>{libraryCategories[catKey].title}</span>
                                                            </button>

                                                            {isActive && (
                                                                <motion.div
                                                                    className={styles.drawerInteriorContent}
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: 'auto', opacity: 1 }}
                                                                >
                                                                    {libraryCategories[catKey].items.map((item, idx) => (
                                                                        <div key={idx} className={styles.libraryItemRow}>
                                                                            <h6>{item.title}</h6>
                                                                            <p>{item.detail}</p>
                                                                            <span className={styles.lockBadge}>
                                                                                <Lock size={10} />
                                                                                <span>Resource Locked</span>
                                                                            </span>
                                                                        </div>
                                                                    ))}
                                                                </motion.div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* 7. Philosophy Manifesto cards */}
                                {activeNode === 'manifesto' && (
                                    <motion.div key="manifesto" className={styles.simWrapper} {...fadeInUp}>
                                        <div className={styles.simHeader}>
                                            <div className={styles.simTitleRow}>
                                                <Sparkles className={styles.simIcon} size={22} style={{ color: '#ec4899' }} />
                                                <h4>フィロソフィー / Identity & Manifesto</h4>
                                            </div>
                                        </div>

                                        <div className={styles.simBody}>
                                            <p className={styles.simDescription}>
                                                Tap the manifesto cards below to flip them and uncover the educational principles behind Petra's philosophy.
                                            </p>

                                            <div className={styles.manifestoCardsGrid}>
                                                {[
                                                    { id: 1, front: 'Standardization limits potential.', back: 'We refuse one-size-fits-all curricula. Tutors design custom tracks for each individual student.' },
                                                    { id: 2, front: 'Education should be human.', back: 'We teach relationships, critical logic, and analytical expression, not just rote guidelines.' },
                                                    { id: 3, front: 'Scores do not define ability.', back: 'An exam band score is a secondary output. We focus on cultivating native curiosity and depth.' },
                                                    { id: 4, front: 'Guidance over assembly.', back: 'Elite mentorship bridges the gap between global systems (IB, AP, UK, returnee integration).' }
                                                ].map(card => {
                                                    const isFlipped = manifestoFlipped[card.id];
                                                    return (
                                                        <div
                                                            key={card.id}
                                                            className={`${styles.manifesto3DCard} ${isFlipped ? styles.manifestoFlipped : ''}`}
                                                            onClick={() => toggleManifesto(card.id)}
                                                        >
                                                            <div className={styles.manifestoFront}>
                                                                <h5>{card.front}</h5>
                                                                <span className={styles.manifestoTapMsg}>Click to Reveal</span>
                                                            </div>
                                                            <div className={styles.manifestoBack}>
                                                                <p>{card.back}</p>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
