import { useEffect, useState, useRef } from 'react';

function CustomCursor() {
  const [hover, setHover] = useState(false);
  const mainCursor = useRef({ x: 0, y: 0 });
  const trailSegments = useRef(Array.from({ length: 24 }, () => ({ x: 0, y: 0 })));
  const requestRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      mainCursor.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, input, textarea, .admin-gateway, .gallery-card, .milestones-list-item, .spec-link, .scene-nav__dot');
      if (target) setHover(true);
      else setHover(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    
    const animate = () => {
      let curX = mainCursor.current.x;
      let curY = mainCursor.current.y;

      trailSegments.current.forEach((seg, index) => {
        // Dragon physics: further segments have more lag
        const lag = 0.15 + (index * 0.01); 
        seg.x += (curX - seg.x) * (0.45 - index * 0.015);
        seg.y += (curY - seg.y) * (0.45 - index * 0.015);
        
        curX = seg.x;
        curY = seg.y;

        const el = document.getElementById(`cursor-segment-${index}`);
        if (el) {
          const scale = (1 - index * 0.04) * (hover && index === 0 ? 2.5 : 1);
          el.style.transform = `translate3d(${seg.x}px, ${seg.y}px, 0) translate(-50%, -50%) scale(${Math.max(0.1, scale)})`;
          el.style.opacity = (1 - index * 0.04).toString();
          
          if (index === 0) {
            el.style.boxShadow = hover ? '0 0 30px #fff, 0 0 60px rgba(255,255,255,0.4)' : '0 0 20px #fff';
          }
        }
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(requestRef.current);
    };
  }, [hover]);

  return (
    <div className="cursor-dragon-container">
      {trailSegments.current.map((_, i) => (
        <div 
          key={i}
          id={`cursor-segment-${i}`}
          className={`cursor-trail ${i === 0 ? 'cursor-lead' : ''} ${hover && i === 0 ? 'hover' : ''}`}
          style={{
            zIndex: 99999 - i,
            background: `rgba(255, 255, 255, ${1 - i * 0.03})`,
          }}
        />
      ))}
    </div>
  );
}

export default CustomCursor;
