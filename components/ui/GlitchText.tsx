import React, { useState, useEffect, useRef } from 'react';

interface Props {
  text: string;
  className?: string;
  speed?: number;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?';

const GlitchText: React.FC<Props> = React.memo(({ text, className = '', speed = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef<any>(null);

  const animate = () => {
    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }

      iteration += 1 / 3;
    }, speed);
  };

  useEffect(() => {
    // Initial animation on mount
    animate();
    return () => clearInterval(intervalRef.current);
  }, [text]);

  return (
    <span 
        className={`inline-block truncate ${className}`} 
        onMouseEnter={animate}
    >
      {displayText}
    </span>
  );
});

export default GlitchText;