import { useState, useEffect } from 'react';

import './styles/globals.css';
import './styles/components.css';

import Loader       from './components/Loader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar       from './components/Navbar';
import Hero         from './components/Hero';
import About        from './components/About';
import Skills       from './components/Skills';
import Experience   from './components/Experience';
import Projects     from './components/Projects';
import Achievements from './components/Achievements';
import Positions    from './components/Positions';
import Contact      from './components/Contact';
import Footer       from './components/Footer';
import ScrollToTop  from './components/ScrollToTop';
import EasterEgg    from './components/EasterEgg';

// Persistent theme preference
function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('portfolio-theme') || 'dark'; }
    catch { return 'dark'; }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('portfolio-theme', theme); } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  return { theme, toggleTheme };
}

export default function App() {
  const [loaded, setLoaded]     = useState(false);
  const { theme, toggleTheme }  = useTheme();

  return (
    <>
      {/* Loading screen */}
      <Loader onComplete={() => setLoaded(true)} />

      {/* Only mount once loader is done to avoid jank */}
      {loaded && (
        <>
          {/* Global chrome */}
          <CustomCursor />
          <ScrollProgress />
          <ScrollToTop />
          <EasterEgg />

          {/* Navigation */}
          <Navbar theme={theme} toggleTheme={toggleTheme} />

          {/* Noise texture (subtle) */}
          <div className="noise-overlay" aria-hidden="true" />

          {/* Main content */}
          <main id="main-content">
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Achievements />
            {/* <Positions /> */}
            <Contact />
          </main>

          <Footer />
        </>
      )}
    </>
  );
}
