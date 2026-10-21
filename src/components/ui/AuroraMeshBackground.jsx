import { useEffect, useRef } from 'react';
import './AuroraMeshBackground.css';

const AuroraMeshBackground = ({ isLight = false }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            containerRef.current.style.setProperty('--cursor-x', `${x}%`);
            containerRef.current.style.setProperty('--cursor-y', `${y}%`);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={containerRef}
            className={`aurora-mesh-bg ${isLight ? 'is-light' : 'is-dark'}`}
            aria-hidden="true"
        >
            {/* Ambient Aurora Mesh Spheres */}
            <div className="aurora-orb orb-cyan" />
            <div className="aurora-orb orb-indigo" />
            <div className="aurora-orb orb-emerald" />
            <div className="aurora-orb orb-cursor" />

            {/* Architectural Grid Overlay */}
            <div className="architectural-grid" />

            {/* Subtle Radial Vignette */}
            <div className="aurora-vignette" />
        </div>
    );
};

export default AuroraMeshBackground;
