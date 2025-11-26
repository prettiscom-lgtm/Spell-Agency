import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      const computed = window.getComputedStyle(target);
      
      setIsPointer(
        computed.cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea'
      );
    };
    
    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseEnter = () => setIsHidden(false);
    const onMouseLeave = () => setIsHidden(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.body.addEventListener('mouseenter', onMouseEnter);
    document.body.addEventListener('mouseleave', onMouseLeave);
    
    return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mouseup', onMouseUp);
        document.body.removeEventListener('mouseenter', onMouseEnter);
        document.body.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  if (isHidden) return null;

  return (
    <>
      <style>{`
        body { cursor: none !important; }
        a, button, input, textarea { cursor: none !important; }
      `}</style>
      
      {/* Main Dot */}
      <div 
        className="fixed top-0 left-0 w-3 h-3 bg-brand-dark dark:bg-brand-blue rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-75 ease-out"
        style={{ 
            transform: `translate(${position.x - 6}px, ${position.y - 6}px) scale(${isClicking ? 0.8 : isPointer ? 1.5 : 1})`,
        }}
      />
      
      {/* Trailing Ring */}
      <div 
        className="fixed top-0 left-0 w-8 h-8 border border-brand-dark dark:border-brand-blue rounded-full pointer-events-none z-[9999] transition-all duration-300 ease-out opacity-50"
        style={{ 
            transform: `translate(${position.x - 16}px, ${position.y - 16}px) scale(${isClicking ? 1.2 : isPointer ? 1.8 : 1})`,
            borderColor: isPointer ? 'transparent' : undefined,
            backgroundColor: isPointer ? 'rgba(160, 216, 239, 0.1)' : 'transparent'
        }}
      />
    </>
  );
};

export default CustomCursor;