import { useState, useRef, useEffect } from 'react';

const CONTACT_INFO = [
  { icon: '📧', label: 'Email', value: 'adikr2002@gmail.com', href: 'mailto:adikr2002@gmail.com', color: 'purple' },
  { icon: '📱', label: 'Phone', value: '+91-7992483617',       href: 'tel:+917992483617',        color: 'cyan'   },
  { icon: '🌍', label: 'Location', value: 'Ranchi, Jharkhand, India', href: null,             color: 'cyan'   },
  { icon: '🟢', label: 'Available For', value: 'Full-time / Internship / Freelance', href: null, color: 'green' },
];

const SOCIALS = [
  { icon: 'fa-brands fa-github',     href: 'https://github.com/adikr2002',                label: 'GitHub'   },
  { icon: 'fa-brands fa-linkedin',   href: 'https://linkedin.com/in/aditya-gautam-iiit',  label: 'LinkedIn' },
  { icon: 'fa-solid fa-envelope',    href: 'mailto:adikr2002@gmail.com',                  label: 'Email'    },
  { icon: 'fa-brands fa-twitter',    href: 'https://twitter.com/adikr2002',               label: 'Twitter'  },
];

export default function Contact() {
  const sectionRef  = useRef(null);
  const [form, setForm]         = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus]     = useState('idle'); // idle | sending | success | error

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // mailto fallback — open default mail client
    const subject = encodeURIComponent(form.subject || `Portfolio message from ${form.name}`);
    const body    = encodeURIComponent(`Hi Aditya,\n\n${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`);
    window.open(`mailto:adikr2002@gmail.com?subject=${subject}&body=${body}`);
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 800);
  };

  return (
    <section className="section" id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <div className="reveal" ref={sectionRef}>
          <span className="section-label">// contact</span>
          <h2 id="contact-heading" className="section-heading">
            Let&apos;s Build Something <span className="gradient-text">Together</span>
          </h2>
          <p className="section-subheading">
            Whether it&apos;s a full-time opportunity, internship, freelance project,
            or just a good tech conversation — my inbox is always open.
          </p>

          <div className="contact-grid">
            {/* Left — Info cards */}
            <div>
              <div className="contact-info-cards">
                {CONTACT_INFO.map((info) => (
                  <div key={info.label} className="contact-info-card">
                    <div className={`contact-info-icon ${info.color}`} aria-hidden="true">
                      {info.icon}
                    </div>
                    <div>
                      <div className="contact-info-label">{info.label}</div>
                      {info.href ? (
                        <a href={info.href} className="contact-info-value">
                          {info.value}
                        </a>
                      ) : (
                        <div className="contact-info-value">{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="contact-social" role="list" aria-label="Social links">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    aria-label={s.label}
                    title={s.label}
                    role="listitem"
                  >
                    <i className={s.icon} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right — Contact form */}
            <div className="contact-form-card">
              <form onSubmit={handleSubmit} noValidate id="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">Your Name</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      className="form-input"
                      placeholder="John Doe"
                      required
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">Email Address</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      className="form-input"
                      placeholder="john@company.com"
                      required
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-subject">Subject</label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    className="form-input"
                    placeholder="Internship Opportunity / Collaboration / etc."
                    value={form.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="form-input"
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className={`submit-btn${status === 'success' ? ' success' : ''}`}
                  id="contact-submit"
                  disabled={status === 'sending'}
                >
                  {status === 'success' ? (
                    <><i className="fa-solid fa-check" aria-hidden="true" /> Message Sent!</>
                  ) : status === 'sending' ? (
                    'Opening mail client...'
                  ) : (
                    <>Send Message 🚀</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
