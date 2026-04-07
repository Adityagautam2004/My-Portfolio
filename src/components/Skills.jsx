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
    { name: 'React.js',    icon: '⚛️' },
    { name: 'Next.js',     icon: '▲' },
    { name: 'HTML5',       icon: '🌐' },
    { name: 'CSS3',        icon: '🎨' },
    { name: 'Tailwind',    icon: '💨' },
    { name: 'Redux',       icon: '🔄' },
    { name: 'GSAP',        icon: '🎬' },
  ],
  Backend: [
    { name: 'Node.js',    icon: '🟢' },
    { name: 'Express.js', icon: '⚙️' },
    { name: 'REST APIs',  icon: '🔗' },
    { name: 'WebSockets', icon: '📡' },
    { name: 'JWT',        icon: '🔐' },
  ],
  'Cloud & DevOps': [
    { name: 'AWS S3',        icon: '☁️' },
    { name: 'CloudFront',    icon: '🌍' },
    { name: 'Docker',        icon: '🐳' },
    { name: 'GitHub Actions',icon: '🤖' },
    { name: 'Serverless',    icon: '⚡' },
    { name: 'Vercel',        icon: '▲' },
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

export default function Skills() {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);
  const gridRef   = useRef(null);
  const sectionRef = useRef(null);

  // Animate pills in when section is visible
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Stagger animate pills when tab changes
  useEffect(() => {
    const pills = gridRef.current?.querySelectorAll('.skill-pill') ?? [];
    pills.forEach((p, i) => {
      p.classList.remove('visible');
      setTimeout(() => p.classList.add('visible'), i * 60 + 50);
    });
  }, [activeTab]);

  return (
    <section className="section" id="skills" aria-labelledby="skills-heading">
      <div className="container">
        <div className="reveal" ref={sectionRef}>
          <span className="section-label">// tech stack</span>
          <h2 id="skills-heading" className="section-heading">Tools I Build With</h2>
          <p className="section-subheading">
            A curated collection of technologies I use to craft fast, scalable, and
            delightful digital products.
          </p>
        </div>

        {/* Tabs */}
        <div className="skills-tabs" role="tablist" aria-label="Skill categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`skills-tab-btn${activeTab === cat ? ' active' : ''}`}
              onClick={() => setActiveTab(cat)}
              role="tab"
              aria-selected={activeTab === cat}
              id={`skills-tab-${cat.replace(/\s/g, '-').toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Pills */}
        <div
          ref={gridRef}
          className="skills-grid"
          role="tabpanel"
          aria-label={`${activeTab} skills`}
        >
          {SKILLS[activeTab].map((skill) => (
            <div
              key={skill.name}
              className="skill-pill"
              title={skill.name}
              role="listitem"
            >
              <span className="skill-icon" aria-hidden="true">{skill.icon}</span>
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
