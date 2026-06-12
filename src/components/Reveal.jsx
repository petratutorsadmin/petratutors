import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Reveal({ children, delay = 0, y = 50, duration = 0.8, stagger = 0, className = "" }) {
    const containerRef = useRef(null);

    useGSAP(() => {
        // Find children or use the container itself if no specific children to stagger
        const elements = containerRef.current.children.length > 0 && stagger > 0 
            ? containerRef.current.children 
            : containerRef.current;

        gsap.from(elements, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 85%', // Trigger when the top of the element hits 85% down the viewport
                toggleActions: 'play none none none' // Play once, don't reverse
            },
            y: y,
            opacity: 0,
            duration: duration,
            delay: delay,
            stagger: stagger,
            ease: 'power3.out',
            clearProps: 'all' // Clean up inline styles after animation so it doesn't break flex/grid layouts
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}
