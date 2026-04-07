import { useEffect, useRef } from 'react';

const PROJECTS = [
  {
    id: 'prescripto',
    featured: true,
    emoji: '🩺',
    banner: '',
    title: 'Prescripto — Healthcare Ecosystem',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Razorpay', 'Cloudinary'],
    description: [
      'Full-stack doctor-patient booking platform with automated scheduling, doctor dashboards, and medical record tracking.',
      'JWT + Razorpay integration for PCI-compliant secure transactions and payment flows.',
      'Cloudinary media pipeline — reduced image payload by 60% for performance on low-bandwidth networks.',
    ],
    live: 'https://prescripto-demo.vercel.app',
    github: 'https://github.com/adikr2002/prescripto',
  },
  {
    id: 'movieflix',
    featured: false,
    emoji: '🎬',
    banner: 'alt1',
    title: 'Movieflix — Discovery Platform',
    tech: ['React', 'Redux Toolkit', 'Tailwind CSS', 'TMDB API'],
    description: [
      'Feature-rich IMDb-like movie discovery app with real-time search, dynamic routing, and live API content.',
      'Redux for advanced state management; skeleton loaders + error boundaries for polished UX.',
    ],
    live: null,
    github: 'https://github.com/adikr2002/movieflix',
  },
  {
    id: 'examadda',
    featured: false,
    emoji: '📚',
    banner: 'alt2',
    title: 'ExamAdda Platform',
    tech: ['Next.js', 'AWS S3', 'CloudFront', 'REST APIs'],
    description: [
      'Micro-frontend architecture decomposed into Admin, User, and Tech/News as independent Next.js apps.',
      'SSG + On-Demand ISR boosted Core Web Vitals by 25% and improved organic SEO significantly.',
    ],
    live: 'https://examadda.in',
    github: null,
  },
];

function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const revealRef = useRef(null);

  // Scroll reveal
  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // 3D Tilt
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const onMove = (e) => {
      const rect  = card.getBoundingClientRect();
      const x     = e.clientX - rect.left;
      const y     = e.clientY - rect.top;
      const cx    = rect.width  / 2;
      const cy    = rect.height / 2;
      const rotX  = ((y - cy) / cy) * -8;
      const rotY  = ((x - cx) / cx) * 8;
      card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
    };
    const onLeave = () => {
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    };
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      className={`reveal project-card ${project.featured ? 'project-featured' : 'project-half'}`}
      ref={revealRef}
      style={{ gridColumn: project.featured ? 'span 12' : 'span 6' }}
    >
      <div ref={cardRef} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className={`project-shimmer`} aria-hidden="true" />
        <div className={`project-banner${project.banner ? ' ' + project.banner : ''}`} />
        <div className="project-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div className="project-title-row">
            <span className="project-emoji" aria-hidden="true">{project.emoji}</span>
            <h3 className="project-title">{project.title}</h3>
          </div>

          <div className="project-tech">
            {project.tech.map((t) => (
              <span key={t} className="tag tag-cyan">{t}</span>
            ))}
          </div>

          <ul className="project-desc" style={{ flex: 1 }}>
            {project.description.map((d, i) => <li key={i}>{d}</li>)}
          </ul>

          <div className="project-links">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-btn primary"
                id={`project-live-${project.id}`}
              >
                <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-btn secondary"
                id={`project-gh-${project.id}`}
              >
                <i className="fa-brands fa-github" aria-hidden="true" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
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
    <section className="section" id="projects" aria-labelledby="projects-heading">
      <div className="container">
        <div className="reveal" ref={headingRef} style={{ marginBottom: 48 }}>
          <span className="section-label">// projects</span>
          <h2 id="projects-heading" className="section-heading">Things I&apos;ve Built</h2>
          <p className="section-subheading">
            Real-world products shipped from idea to production.
          </p>
        </div>

        <div className="projects-bento">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}

          {/* More coming soon card */}
          <div
            className="project-card project-third reveal"
            style={{
              gridColumn: 'span 12',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 32,
              textAlign: 'center',
              minHeight: 140,
            }}
          >
            <div>
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>✨</div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
                More projects incoming
              </div>
              <a
                href="https://github.com/adikr2002"
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-btn secondary"
                id="project-github-all"
              >
                <i className="fa-brands fa-github" aria-hidden="true" />
                View GitHub →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
