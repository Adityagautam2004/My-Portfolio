import { useEffect, useRef } from 'react';

const EXPERIENCES = [
  {
    role: 'Software Engineering Intern',
    company: 'Target Board',
    type: 'Hybrid',
    period: 'Sept 2025 – Present',
    tags: ['EdTech', 'RBAC', 'Backend', 'TP Stream', '7L+ Users'],
    emoji: '🏢',
    points: [
      'Architected backend infrastructure for an EdTech platform serving 7 Lakh+ students with high availability and low latency.',
      'Designed "Super Result" portal with Role-Based Access Control (RBAC) for admit cards and sensitive student records.',
      'Led migration from 3rd-party to native app architecture, integrating TP Stream for low-latency live classes.',
      'Achieved 40% API latency reduction (200ms → 120ms) through deep database query optimization.',
    ],
  },
  {
    role: 'Software Engineering Intern',
    company: 'ExamAdda',
    type: 'Remote',
    period: 'June 2025 – Jan 2026',
    tags: ['Micro-frontend', 'Next.js', 'AWS', 'SSG/ISR', 'SEO'],
    emoji: '🏢',
    points: [
      'Decomposed monolith into Micro-frontend Architecture: Admin, User, and Tech/News as independent Next.js projects.',
      'Implemented SSG + On-Demand ISR — boosted Core Web Vitals by 25% and improved organic SEO ranking.',
      'Deployed static assets on AWS S3 + CloudFront CDN, achieving sub-100ms global load times.',
      'Engineered RESTful API layer collaborating directly under Senior Architect.',
    ],
  },
  {
    role: 'Freelance Frontend Developer',
    company: 'Outlier AI',
    type: 'Remote',
    period: 'April 2025 – Present',
    tags: ['AI Training', 'React', 'Next.js', 'TypeScript'],
    emoji: '💻',
    points: [
      'Delivered 50+ high-impact frontend development tasks across 4+ concurrent AI training projects.',
      'Earned $5,000+ in a single month through scalable, quality development output.',
      'Specialized in training AI models to enhance frontend development workflows and code quality.',
    ],
  },
  {
    role: 'Frontend Developer Intern',
    company: 'PreCollege',
    type: 'Remote',
    period: 'June 2024 – Aug 2024',
    tags: ['React.js', 'Tailwind CSS', 'UX', 'Performance'],
    emoji: '🏢',
    points: [
      'Boosted user engagement by 20% through redesigned UI components with improved UX patterns.',
      'Reduced page load time by 30% via React state management optimization and code splitting.',
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
