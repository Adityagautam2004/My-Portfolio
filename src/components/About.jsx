import { useEffect, useRef } from 'react';

function useReveal(options = {}) {
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
      { threshold: 0.12, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function About() {
  const revealLeft   = useReveal();
  const revealRight  = useReveal();

  return (
    <section className="section" id="about" aria-labelledby="about-heading">
      <div className="container">
        <div className="about-grid">
          {/* Left — Avatar */}
          <div className="about-left reveal-left" ref={revealLeft}>
            <div className="avatar-card">
              <div style={{ position: 'relative' }}>
                {/* Spinning gradient border */}
                <div className="avatar-glow" aria-hidden="true" />
              <div className="avatar-inner" role="img" aria-label="Aditya Gautam avatar">
                <img
                  src="/photo.jpg"
                  alt="Aditya Gautam"
                  className="avatar-photo"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                <span className="avatar-initials" style={{ display: 'none' }}>AG</span>
              </div>

                {/* Floating badges */}
                <div className="avatar-float-badge float-badge-react" aria-hidden="true">⚛️ React</div>
                <div className="avatar-float-badge float-badge-code"  aria-hidden="true">💻 Code</div>
                <div className="avatar-float-badge float-badge-cloud" aria-hidden="true">☁️ Cloud</div>
                <div className="avatar-float-badge float-badge-rocket" aria-hidden="true">🚀 Ship</div>
              </div>

              {/* Social links */}
              <div className="avatar-social">
                <a href="https://github.com/Adityagautam2004" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
                  <i className="fa-brands fa-github" aria-hidden="true" />
                </a>
                <a href="https://www.linkedin.com/in/aditya-gautam-2371b2204/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
                  <i className="fa-brands fa-linkedin-in" aria-hidden="true" />
                </a>
                <a href="mailto:adikr2002@gmail.com" aria-label="Email Aditya" title="Email">
                  <i className="fa-solid fa-envelope" aria-hidden="true" />
                </a>
                <a href="https://leetcode.com/adikr2002" target="_blank" rel="noopener noreferrer" aria-label="LeetCode" title="LeetCode">
                  <i className="fa-solid fa-code" aria-hidden="true" />
                </a>
              </div>

              {/* Stats pills */}
              <div className="about-stats">
                <div className="stat-pill">
                  <strong>2+</strong>
                  Years Coding
                </div>
                <div className="stat-pill">
                  <strong>400+</strong>
                  DSA Problems
                </div>
                <div className="stat-pill">
                  <strong>7.45</strong>
                  CGPA
                </div>
              </div>
            </div>
          </div>

          {/* Right — Bio */}
          <div className="about-right reveal-right" ref={revealRight}>
            <span className="section-label">// about me</span>
            <h2 id="about-heading" className="section-heading" style={{ marginBottom: 28 }}>
              Crafting Digital Experiences,<br />
              <span className="gradient-text">One Line at a Time</span>
            </h2>

            <div className="about-bio">
              <p>
                I&apos;m a <strong>3rd-year (Pre-Final Year)</strong> Computer Science student at IIIT Ranchi, currently
                working as a <strong>Software Engineering Intern at Target Board</strong>,
                where I&apos;m building infrastructure for platforms serving{' '}
                <strong>7 Lakh+ students</strong> with high availability.
              </p>
              <p>
                My passion lies at the intersection of scalable backend systems and
                pixel-perfect frontends. I love building things that are{' '}
                <em>fast, accessible, and beautifully engineered</em>.
              </p>
              <p>
                When I&apos;m not coding, I&apos;m grinding DSA on LeetCode/Codeforces,
                managing media events at college, or exploring the latest in AI and
                cloud infrastructure.
              </p>
            </div>

            {/* Education card */}
            <div className="education-card">
              <div className="edu-icon" aria-hidden="true">🎓</div>
              <div className="edu-info">
                <div className="edu-degree">B.Tech in Computer Science &amp; Engineering</div>
                <div className="edu-school">Indian Institute of Information Technology, Ranchi</div>
                <div className="edu-meta">2023 – 2027 &nbsp;·&nbsp; CGPA: 7.45</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
