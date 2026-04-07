import { useEffect, useRef, useState } from 'react';

const TYPEWRITER_TEXTS = [
  'Initializing Aditya.exe',
  'Loading portfolio assets',
  'Brewing hot takes on tech',
  'Almost ready...',
];

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  const charIndexRef = useRef(0);
  const progressRef = useRef(0);

  // Progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      progressRef.current += Math.random() * 3 + 1;
      if (progressRef.current >= 100) {
        progressRef.current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsHidden(true);
          setTimeout(onComplete, 600);
        }, 400);
      } else {
        setProgress(progressRef.current);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  // Text cycling
  useEffect(() => {
    const text = TYPEWRITER_TEXTS[textIndex];
    charIndexRef.current = 0;
    setDisplayText('');
    const typeInterval = setInterval(() => {
      charIndexRef.current++;
      setDisplayText(text.slice(0, charIndexRef.current));
      if (charIndexRef.current >= text.length) {
        clearInterval(typeInterval);
        setTimeout(() => {
          setTextIndex((i) => (i + 1) % TYPEWRITER_TEXTS.length);
        }, 600);
      }
    }, 45);
    return () => clearInterval(typeInterval);
  }, [textIndex]);

  return (
    <div className={`loader-wrapper${isHidden ? ' hidden' : ''}`} aria-hidden="true">
      <div className="loader-logo">AG</div>
      <div className="loader-text">
        {displayText}
        <span className="cursor-blink" />
      </div>
      <div className="loader-bar-track">
        <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
