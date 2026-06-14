import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function Stars({ isMobile }) {
  const groupRef = useRef()
  const count = isMobile ? 55 : 120
  const goldCount = isMobile ? 12 : 22

  const whiteGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return geo
  }, [count])

  const goldGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(goldCount * 3)
    for (let i = 0; i < goldCount; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 24
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return geo
  }, [goldCount])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = t * 0.016
    groupRef.current.rotation.x = Math.sin(t * 0.011) * 0.055
    if (!isMobile) {
      groupRef.current.position.x = state.pointer.x * 0.35
      groupRef.current.position.y = state.pointer.y * 0.18
    }
  })

  return (
    <group ref={groupRef}>
      <points geometry={whiteGeo}>
        <pointsMaterial size={0.045} color="#ffffff" transparent opacity={0.38} sizeAttenuation />
      </points>
      <points geometry={goldGeo}>
        <pointsMaterial size={0.11} color="#c9a84c" transparent opacity={0.65} sizeAttenuation />
      </points>
      {!isMobile && (
        <Sparkles
          count={28}
          scale={[22, 14, 9]}
          size={1.1}
          speed={0.22}
          opacity={0.1}
          color="#c9a84c"
        />
      )}
    </group>
  )
}

export default function BlogParticles() {
  const [mounted, setMounted] = useState(false)
  const [canvasKey, setCanvasKey] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    setMounted(true)
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  if (!mounted) return null

  return (
    <Canvas
      key={canvasKey}
      camera={{ position: [0, 0, 12], fov: 48 }}
      dpr={[1, isMobile ? 1 : 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault()
          setTimeout(() => setCanvasKey(k => k + 1), 300)
        })
      }}
    >
      <ambientLight intensity={0.2} />
      <Stars isMobile={isMobile} />
    </Canvas>
  )
}
