import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial, Sparkles } from '@react-three/drei';
import gsap from 'gsap';

function AbstractShape({ isDarkRoute }) {
    const meshRef = useRef();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.1;
            meshRef.current.rotation.y += delta * 0.15;
            
            // Subtle mouse follow interaction with lerp for smoothness
            meshRef.current.position.x = gsap.utils.interpolate(
                meshRef.current.position.x, 
                (state.pointer.x * state.viewport.width) / 15, 
                0.05
            );
            meshRef.current.position.y = gsap.utils.interpolate(
                meshRef.current.position.y, 
                (state.pointer.y * state.viewport.height) / 15, 
                0.05
            );
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1} floatingRange={[-0.2, 0.2]}>
            <mesh ref={meshRef} scale={isMobile ? 0.6 : 1}>
                <icosahedronGeometry args={[2.8, 0]} />
                <MeshTransmissionMaterial 
                    backside
                    samples={4}
                    thickness={0.5}
                    roughness={0.1}
                    transmission={1}
                    ior={1.5}
                    chromaticAberration={0.04}
                    anisotropy={0.1}
                    distortion={0.1}
                    distortionScale={0.3}
                    temporalDistortion={0.1}
                    clearcoat={1}
                    attenuationDistance={0.5}
                    attenuationColor={isDarkRoute ? "#c9a84c" : "#60A5FA"}
                    color="#ffffff"
                />
            </mesh>
        </Float>
    );
}

export default function SummerHero3D() {
    const [mounted, setMounted] = useState(false);
    const [canvasKey, setCanvasKey] = useState(0);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
            <Canvas
                key={canvasKey}
                camera={{ position: [0, 0, 8], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
                onCreated={({ gl }) => {
                    gl.domElement.addEventListener('webglcontextlost', (e) => {
                        e.preventDefault();
                        // Force remount after a short delay to get a fresh context
                        setTimeout(() => setCanvasKey(k => k + 1), 300);
                    });
                }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#c9a84c" />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#60A5FA" />

                <AbstractShape isDarkRoute={true} />

                <Sparkles count={50} scale={12} size={2} speed={0.4} opacity={0.3} color="#c9a84c" />

                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
