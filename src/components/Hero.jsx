import { useEffect, useRef, useState } from 'react';

const TYPEWRITER_PHRASES = [
  'Full-Stack Developer',
  'SWE Intern @ Target Board',
  'Problem Solver',
  'MERN Stack Engineer',
  'Building products that scale',
];

export default function Hero() {
  const [phrase, setPhrase]       = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting]   = useState(false);
  const particlesRef              = useRef(null);
  const particlesLoadedRef        = useRef(false);

  // Typewriter
  useEffect(() => {
    const target = TYPEWRITER_PHRASES[phraseIdx];
    let timeout;

    if (!deleting) {
      if (phrase.length < target.length) {
        timeout = setTimeout(() => setPhrase(target.slice(0, phrase.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setDeleting(true), 1800);
      }
    } else {
      if (phrase.length > 0) {
        timeout = setTimeout(() => setPhrase(phrase.slice(0, -1)), 40);
      } else {
        setDeleting(false);
        setPhraseIdx((i) => (i + 1) % TYPEWRITER_PHRASES.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [phrase, deleting, phraseIdx]);

  // tsParticles — load from CDN since npm v3 has compat issues
  useEffect(() => {
    if (particlesLoadedRef.current) return;
    if (typeof window === 'undefined') return;

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/tsparticles@2.12.0/tsparticles.bundle.min.js';
    script.async = true;
    script.onload = () => {
      if (window.tsParticles) {
        particlesLoadedRef.current = true;
        window.tsParticles.load('tsparticles', {
          fullScreen: { enable: false },
          fpsLimit: 60,
          particles: {
            number: { value: 90, density: { enable: true, area: 900 } },
            color: { value: ['#6C63FF', '#00D4FF', '#FF6B9D'] },
            links: {
              enable: true,
              color: '#6C63FF',
              distance: 150,
              opacity: 0.25,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.8,
              direction: 'none',
              random: true,
              outModes: { default: 'bounce' },
            },
            size: { value: { min: 1, max: 3 } },
            opacity: { value: { min: 0.3, max: 0.8 }, animation: { enable: true, speed: 1 } },
            shape: { type: 'circle' },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: ['grab', 'bubble'] },
              onClick: { enable: true, mode: 'push' },
            },
            modes: {
              grab: { distance: 160, links: { opacity: 0.7 } },
              bubble: { distance: 120, size: 5, duration: 0.3 },
              push: { quantity: 4 },
            },
          },
          background: { color: 'transparent' },
          detectRetina: true,
        });
      }
    };
    document.head.appendChild(script);
  }, []);

  const scrollToProjects = (e) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero" aria-label="Hero section">
      {/* tsParticles canvas */}
      <div id="tsparticles" ref={particlesRef} aria-hidden="true" />

      {/* Ambient background shapes */}
      <div className="hero-bg-shapes" aria-hidden="true">
        <div className="hero-shape hero-shape-1" />
        <div className="hero-shape hero-shape-2" />
      </div>

      <div className="hero-content">
        {/* Badge */}
        <div className="hero-badge" role="status" aria-label="Open to opportunities">
          <span className="pulse-dot" aria-hidden="true" />
          Open to Opportunities 👋
        </div>

        {/* Headline */}
        <h1 className="hero-title">
          Hi, I&apos;m{' '}
          <span className="name-highlight">Aditya Gautam</span>
        </h1>

        {/* Typewriter */}
        <div className="hero-typewriter" aria-live="polite" aria-label={`Currently: ${phrase}`}>
          <span className="tw-text">{phrase}</span>
          <span className="tw-cursor" aria-hidden="true" />
        </div>

        {/* Bio */}
        <p className="hero-bio">
          A passionate CS undergrad from IIIT Ranchi, crafting scalable web
          architectures and clean user experiences. I turn complex problems into
          elegant digital solutions.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta">
          <a
            href="#projects"
            className="btn btn-primary"
            onClick={scrollToProjects}
            id="hero-cta-work"
          >
            View My Work →
          </a>
          <a
            href="/resume.pdf"
            className="btn btn-outline"
            download="Aditya_Gautam_Resume.pdf"
            id="hero-cta-resume"
          >
            Download Resume ↓
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" aria-hidden="true">
        <span>scroll</span>
        <i className="fa-solid fa-chevron-down" />
      </div>
    </section>
  );
}
