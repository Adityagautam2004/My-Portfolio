export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-text">
          <p>
            Designed &amp; Built by{' '}
            <span>Aditya Gautam</span> © {year}
          </p>
          <p style={{ marginTop: 4, fontSize: '0.8rem' }}>
            Made with ❤️ + ☕ + countless Stack Overflow tabs
          </p>
        </div>
      </div>
    </footer>
  );
}
