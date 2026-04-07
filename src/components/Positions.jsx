import { useEffect, useRef } from 'react';

const POSITIONS = [
  {
    icon: '🎯',
    title: 'Media Council Coordinator',
    org: 'IIIT Ranchi',
    desc: 'Organized Faculty Development Programs, College Rival events, alumni engagement initiatives, and managed media for 1000+ student community.',
  },
  {
    icon: '📣',
    title: 'Media Lead',
    org: 'PreCollege',
    desc: 'Led and managed the full media & marketing team as a core member — content strategy, social media, and brand communications.',
  },
];

export default function Positions() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section" aria-labelledby="positions-heading">
      <div className="container">
        <div className="reveal" ref={sectionRef}>
          <span className="section-label">// leadership</span>
          <h2 id="positions-heading" className="section-heading">
            Positions of Responsibility
          </h2>
          <p className="section-subheading">
            Beyond the code — leading communities and driving real-world impact.
          </p>

          <div className="positions-grid">
            {POSITIONS.map((pos) => (
              <div className="position-card" key={pos.title}>
                <div className="position-icon" aria-hidden="true">{pos.icon}</div>
                <div>
                  <div className="position-title">{pos.title}</div>
                  <div className="position-org">{pos.org}</div>
                  <div className="position-desc">{pos.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
