import { useEffect, useRef } from 'react';

const EXPERIENCES = [
  {
    role: 'Software Developer',
    company: 'TeachMantra (Target Board)',
    type: 'Remote',
    period: 'Jan 2026 – Present',
    tags: ['EdTech', '700K+ Users', 'RBAC', 'Redis', 'Real-Time'],
    emoji: '🏢',
    points: [
      'Own systems design, backend structuring, and optimization across the flagship app (1M+ Play Store downloads, 700K+ students) and multiple associated web platforms — shipping end-to-end via sprint planning, design review, and peer code review.',
      'Reduced API response times from 800ms to 100ms (87.5% improvement) at 50K–70K peak concurrent users through query optimization, Redis-backed caching, request throttling, and debouncing.',
      'Architected the 20+ module admin service platform — RBAC, test management, stream configuration, payments, and push notifications — backed by REST APIs and unit-tested service logic.',
      'Built and operate the real-time service layer: live-class delivery, Socket.io/WebSocket chat sustaining tens of thousands of concurrent sessions, and Firebase push fan-out to 700K+ users.',
    ],
  },
  {
    role: 'Full Stack Developer Intern',
    company: 'ExamAdda',
    type: 'Remote',
    period: 'June 2025 – Jan 2026',
    tags: ['Micro-frontend', 'Next.js', 'AWS', 'SSG/ISR', 'SEO'],
    emoji: '🏢',
    points: [
      'Proposed and led the refactor of a monolithic application into 5 independently deployable modules (admin, tech docs, current affairs, DSA visualizer, main app), improving maintainability and release velocity.',
      'Cut average page load from 3.5s to under 200ms and platform quality scores from 40–50 to 90+ via SSG/ISR rendering, caching, and CDN delivery.',
      'Built an in-browser code execution service with queue-based request management for a DSA/technical practice module.',
    ],
  },
];

function TimelineCard({ exp, direction }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
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

  return (
    <div className={`timeline-item reveal-${direction}`} ref={ref}>
      <div className="timeline-dot" aria-hidden="true" />
      <article className="timeline-card">
        <div className="timeline-header">
          <div>
            <div className="timeline-role">
              {exp.emoji} {exp.role}
            </div>
            <div className="timeline-company">
              {exp.company} · {exp.type}
            </div>
          </div>
          <div className="timeline-date">{exp.period}</div>
        </div>

        <div className="timeline-tags">
          {exp.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        <ul className="timeline-points">
          {exp.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </article>
    </div>
  );
}

export default function Experience() {
  const headingRef = useRef(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section" id="experience" aria-labelledby="experience-heading">
      <div className="container">
        <div className="reveal" ref={headingRef} style={{ textAlign: 'center', marginBottom: 60 }}>
          <span className="section-label">// experience</span>
          <h2 id="experience-heading" className="section-heading">Where I&apos;ve Worked</h2>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            A track record of shipping real products, leading initiatives, and
            growing fast.
          </p>
        </div>

        <div className="timeline" role="list">
          {EXPERIENCES.map((exp, i) => (
            <TimelineCard
              key={exp.company + exp.period}
              exp={exp}
              direction={i % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
