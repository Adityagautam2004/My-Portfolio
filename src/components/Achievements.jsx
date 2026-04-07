import { useEffect, useRef, useState } from 'react';

const COUNTERS = [
  { value: 400, suffix: '+', label: 'DSA Problems Solved' },
  { value: 50,  suffix: '+', label: 'Freelance Tasks Delivered' },
  { value: 10,   suffix: 'K+', label: 'Freelance Earned ($)' },
  { value: 7.45,suffix: '',  label: 'CGPA @ IIIT Ranchi', decimals: 2 },
];

const ACHIEVEMENTS = [
  {
    icon: '🏆',
    title: '2nd Runner-Up — RBI National Quiz 2024',
    desc: 'National-level recognition for expertise in banking and financial systems among 1000s of participants.',
  },
  {
    icon: '🤖',
    title: 'Microsoft Certified — Generative AI',
    desc: 'Career Essentials in Generative AI certification issued by Microsoft & LinkedIn Learning.',
  },
  {
    icon: '💻',
    title: '400+ Problems Solved',
    desc: 'Strong competitive profile across LeetCode, Codeforces, and HackerRank — rated across arrays, DP, graphs, trees.',
  },
  {
    icon: '☕',
    title: 'Alpha Course — Java with DSA',
    desc: 'Completed Apna College\'s industry-renowned deep-dive into Java fundamentals and advanced Data Structures.',
  },
];

function Counter({ value, suffix, label, decimals = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps    = 60;
          const interval = duration / steps;
          let step       = 0;
          const timer    = setInterval(() => {
            step++;
            const progress = step / steps;
            const eased    = 1 - Math.pow(1 - progress, 3);
            setCount(+(value * eased).toFixed(decimals));
            if (step >= steps) clearInterval(timer);
          }, interval);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, decimals]);

  return (
    <div className="counter-card glass-card" ref={ref}>
      <div className="counter-value">
        {decimals > 0 ? count.toFixed(decimals) : count}{suffix}
      </div>
      <div className="counter-label">{label}</div>
    </div>
  );
}

export default function Achievements() {
  const headingRef = useRef(null);
  const gridRef    = useRef(null);

  useEffect(() => {
    [headingRef, gridRef].forEach((r) => {
      const el = r.current;
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
        { threshold: 0.1 }
      );
      obs.observe(el);
      return () => obs.disconnect();
    });
  }, []);

  return (
    <section className="section" id="achievements" aria-labelledby="achievements-heading">
      <div className="container">
        <div className="reveal" ref={headingRef} style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-label">// achievements</span>
          <h2 id="achievements-heading" className="section-heading">
            Milestones &amp; Recognition
          </h2>
        </div>

        {/* Animated counters */}
        <div className="counters-grid">
          {COUNTERS.map((c) => (
            <Counter key={c.label} {...c} />
          ))}
        </div>

        {/* Achievement cards */}
        <div className="achievements-grid reveal" ref={gridRef}>
          {ACHIEVEMENTS.map((ach, i) => (
            <div
              key={ach.title}
              className="achievement-card"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="achievement-icon" aria-hidden="true">{ach.icon}</div>
              <div>
                <div className="achievement-title">{ach.title}</div>
                <div className="achievement-desc">{ach.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
