import { useState, useEffect, useRef } from 'react';

const SKILLS = {
  Languages: [
    { name: 'Java',       icon: '☕' },
    { name: 'Python',     icon: '🐍' },
    { name: 'JavaScript', icon: '✨' },
    { name: 'TypeScript', icon: '🔷' },
    { name: 'SQL',        icon: '🗄️' },
    { name: 'C++',        icon: '⚡' },
  ],
  Frontend: [
    { name: 'React.js',  icon: '⚛️' },
    { name: 'Next.js',   icon: '▲' },
    { name: 'HTML5',     icon: '🌐' },
    { name: 'CSS3',      icon: '🎨' },
    { name: 'Tailwind',  icon: '💨' },
    { name: 'Redux',     icon: '🔄' },
    { name: 'GSAP',      icon: '🎬' },
  ],
  Backend: [
    { name: 'Node.js',    icon: '🟢' },
    { name: 'Express.js', icon: '⚙️' },
    { name: 'REST APIs',  icon: '🔗' },
    { name: 'WebSockets', icon: '📡' },
    { name: 'JWT',        icon: '🔐' },
  ],
  'Cloud & DevOps': [
    { name: 'AWS S3',          icon: '☁️' },
    { name: 'CloudFront',      icon: '🌍' },
    { name: 'Docker',          icon: '🐳' },
    { name: 'GitHub Actions',  icon: '🤖' },
    { name: 'Serverless',      icon: '⚡' },
    { name: 'Vercel',          icon: '▲' },
  ],
  Databases: [
    { name: 'MongoDB',    icon: '🍃' },
    { name: 'MySQL',      icon: '🐬' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'Redis',      icon: '🔴' },
  ],
  'Core CS': [
    { name: 'DSA',           icon: '🧮' },
    { name: 'System Design', icon: '🏗️' },
    { name: 'DBMS',          icon: '💾' },
    { name: 'OOPs',          icon: '🧩' },
    { name: 'OS',            icon: '🖥️' },
    { name: 'LLD',           icon: '📐' },
    { name: 'Networking',    icon: '🌐' },
  ],
};

const CATEGORIES = Object.keys(SKILLS);

/* ── Shared Pill ─────────────────────────────────────────────── */
function Pill({ skill, visible, delay }) {
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
      <span className="skill-icon" aria-hidden="true">{skill.icon}</span>
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
