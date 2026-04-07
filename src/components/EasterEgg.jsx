import { useEffect, useRef, useState } from 'react';

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
const CONFETTI_COLORS = ['#6C63FF','#00D4FF','#FF6B9D','#00FF88','#FF9F43','#ffffff'];

function spawnConfetti() {
  const COUNT = 80;
  for (let i = 0; i < COUNT; i++) {
    const el  = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.left           = `${Math.random() * 100}vw`;
    el.style.background     = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    el.style.width          = `${Math.random() * 10 + 6}px`;
    el.style.height         = `${Math.random() * 10 + 6}px`;
    el.style.animationDuration = `${Math.random() * 2 + 2}s`;
    el.style.animationDelay    = `${Math.random() * 1}s`;
    el.style.borderRadius   = Math.random() > 0.5 ? '50%' : '2px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }
}

export default function EasterEgg() {
  const [active, setActive]   = useState(false);
  const indexRef              = useRef(0);
  const overlayRef            = useRef(null);

  // Konami code listener
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === KONAMI[indexRef.current]) {
        indexRef.current++;
        if (indexRef.current === KONAMI.length) {
          indexRef.current = 0;
          setActive(true);
          spawnConfetti();
        }
      } else {
        indexRef.current = 0;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Logo click easter egg from Navbar
  useEffect(() => {
    const handler = () => { setActive(true); spawnConfetti(); };
    document.addEventListener('easter-egg-trigger', handler);
    return () => document.removeEventListener('easter-egg-trigger', handler);
  }, []);

  if (!active) return null;

  return (
    <div
      className={`easter-egg-overlay${active ? ' active' : ''}`}
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Easter egg surprise"
      onClick={() => setActive(false)}
    >
      <div className="easter-egg-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ fontSize: '4rem', marginBottom: 16 }}>🎉</div>
        <h2>You found the Easter Egg!</h2>
        <p>
          Psst — you either know the Konami Code{' '}
          <code style={{ color: 'var(--accent-cyan)' }}>↑↑↓↓←→←→BA</code>
          {' '}or you clicked the logo 5× like a curious dev.
          <br /><br />
          Either way, I&apos;m impressed. That&apos;s exactly the kind of energy
          I bring to every project. 🚀
          <br /><br />
          <strong style={{ color: 'var(--accent-purple)' }}>— Aditya</strong>
        </p>
        <button
          className="egg-close-btn btn btn-primary"
          onClick={() => setActive(false)}
          id="easter-egg-close"
        >
          Back to the portfolio 😄
        </button>
      </div>
    </div>
  );
}
