import { useState, useEffect, useRef } from 'react';
import {
  FaJava, FaJs, FaPython, FaDatabase,
  FaReact, FaNodeJs, FaNetworkWired, FaKey, FaLayerGroup,
  FaAws, FaDocker, FaGitAlt, FaVial,
  FaCubes, FaSitemap, FaDraftingCompass, FaServer, FaShareAlt, FaSyncAlt,
} from 'react-icons/fa';
import {
  SiTypescript, SiNextdotjs, SiRedux, SiExpress, SiSocketdotio, SiRedis,
  SiJest, SiPostman, SiGithubactions,
  SiPostgresql, SiMongodb, SiFirebase,
} from 'react-icons/si';

const SKILLS = {
  Languages: [
    { name: 'Java',       icon: FaJava,       color: '#E76F00' },
    { name: 'JavaScript', icon: FaJs,         color: '#F7DF1E' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'Python',     icon: FaPython,     color: '#3776AB' },
    { name: 'SQL',        icon: FaDatabase,   color: '#00D4FF' },
  ],
  Frontend: [
    { name: 'React.js',      icon: FaReact,     color: '#61DAFB' },
    { name: 'Next.js',       icon: SiNextdotjs },
    { name: 'Redux Toolkit', icon: SiRedux,     color: '#764ABC' },
  ],
  'Backend & Services': [
    { name: 'Node.js',   icon: FaNodeJs,       color: '#339933' },
    { name: 'Express.js',icon: SiExpress },
    { name: 'REST APIs', icon: FaNetworkWired, color: '#00D4FF' },
    { name: 'Socket.io', icon: SiSocketdotio },
    { name: 'OAuth 2.0', icon: FaKey,          color: '#FF9F43' },
    { name: 'BullMQ',    icon: FaLayerGroup,   color: '#FF6B9D' },
    { name: 'Redis',     icon: SiRedis,        color: '#DC382D' },
  ],
  'Testing & Quality': [
    { name: 'Playwright',     icon: FaVial,          color: '#2EAD33' },
    { name: 'Jest',           icon: SiJest,          color: '#C21325' },
    { name: 'Postman',        icon: SiPostman,       color: '#FF6C37' },
    { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088FF' },
  ],
  'Cloud & DevOps': [
    { name: 'AWS',        icon: FaAws,        color: '#FF9900' },
    { name: 'Docker',     icon: FaDocker,     color: '#2496ED' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
    { name: 'MongoDB',    icon: SiMongodb,    color: '#47A248' },
    { name: 'Firebase',   icon: SiFirebase,   color: '#FFCA28' },
    { name: 'Git',        icon: FaGitAlt,     color: '#F05032' },
  ],
  'Core CS': [
    { name: 'OOP Design',         icon: FaCubes,           color: '#6C63FF' },
    { name: 'DSA',                icon: FaSitemap,         color: '#00D4FF' },
    { name: 'System Design',      icon: FaDraftingCompass, color: '#00FF88' },
    { name: 'Operating Systems',  icon: FaServer,          color: '#FF9F43' },
    { name: 'DBMS',               icon: FaDatabase,        color: '#FF6B9D' },
    { name: 'Networking',         icon: FaNetworkWired,    color: '#6C63FF' },
    { name: 'Distributed Systems',icon: FaShareAlt,        color: '#00D4FF' },
    { name: 'Agile / Scrum',      icon: FaSyncAlt,         color: '#00FF88' },
  ],
};

const CATEGORIES = Object.keys(SKILLS);

/* ── Shared Pill ─────────────────────────────────────────────── */
function Pill({ skill, visible, delay }) {
  const Icon = skill.icon;
  return (
    <div
      className="skill-pill"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.85)',
        transition: `opacity 0.35s ease ${delay}ms, transform 0.35s ease ${delay}ms`,
      }}
      title={skill.name}
    >
      <span className="skill-icon" style={{ color: skill.color }} aria-hidden="true">
        <Icon />
      </span>
      <span className="skill-name">{skill.name}</span>
    </div>
  );
}

/* ── Desktop: All categories visible at once ─────────────────── */
function SkillsDesktop({ visible }) {
  return (
    <div className="skills-all-categories">
      {CATEGORIES.map((cat, catIdx) => (
        <div key={cat} className="skills-category-block">
          <div className="skills-category-title">{cat}</div>
          <div className="skills-category-pills">
            {SKILLS[cat].map((skill, i) => (
              <Pill
                key={skill.name}
                skill={skill}
                visible={visible}
                delay={catIdx * 40 + i * 55}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Mobile: Tabbed interface ────────────────────────────────── */
function SkillsMobile() {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);
  const [pillVisible, setPillVisible] = useState(true);
  const gridRef = useRef(null);

  // Re-animate pills when tab changes
  const switchTab = (cat) => {
    setPillVisible(false);
    setTimeout(() => {
      setActiveTab(cat);
      setPillVisible(true);
    }, 120);
  };

  return (
    <>
      <div className="skills-tabs" role="tablist" aria-label="Skill categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`skills-tab-btn${activeTab === cat ? ' active' : ''}`}
            onClick={() => switchTab(cat)}
            role="tab"
            aria-selected={activeTab === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      <div
        ref={gridRef}
        className="skills-grid"
        role="tabpanel"
        aria-label={`${activeTab} skills`}
      >
        {SKILLS[activeTab].map((skill, i) => (
          <Pill
            key={skill.name}
            skill={skill}
            visible={pillVisible}
            delay={i * 60}
          />
        ))}
      </div>
    </>
  );
}

/* ── Main Export ─────────────────────────────────────────────── */
export default function Skills() {
  const sectionRef = useRef(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section" id="skills" aria-labelledby="skills-heading">
      <div className="container">
        <div
          ref={sectionRef}
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <span className="section-label">// tech stack</span>
          <h2 id="skills-heading" className="section-heading">Tools I Build With</h2>
          <p className="section-subheading">
            A curated collection of technologies I use to craft fast, scalable,
            and delightful digital products.
          </p>

          {/* Desktop: all at once */}
          <div className="skills-desktop-only">
            <SkillsDesktop visible={sectionVisible} />
          </div>

          {/* Mobile: tabbed */}
          <div className="skills-mobile-only">
            <SkillsMobile />
          </div>
        </div>
      </div>
    </section>
  );
}
