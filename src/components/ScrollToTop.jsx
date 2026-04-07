import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`scroll-top${visible ? ' visible' : ''}`}
      onClick={handleClick}
      aria-label="Scroll to top"
      id="scroll-to-top-btn"
      title="Back to top"
    >
      <i className="fa-solid fa-arrow-up" aria-hidden="true" />
    </button>
  );
}
