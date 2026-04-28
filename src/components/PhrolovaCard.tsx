'use client';

import { useRef, useState, useMemo, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { DoubleSide, AdditiveBlending, MathUtils } from 'three';
import type { Mesh, Points, Group } from 'three';
import { OrbitControls, Float, useTexture } from '@react-three/drei';

/* ═══════════════════════════════════════════════════════════
   PHROLOVA CARD — Interactive Three.js 3D Card
   
   ASSETS:
   • Card front: /public/assets/phrolova-card-front.png
   • Card back:  /public/assets/phrolova-card-back.png
   ═══════════════════════════════════════════════════════════ */

/* ── Particle System — Frequency Wave Particles ── */
function FrequencyParticles() {
  const pointsRef = useRef<Points>(null);
  const count = 200;

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
      spd[i] = 0.2 + Math.random() * 0.8;
    }
    return [pos, spd];
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const t = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArray[i3 + 1] += speeds[i] * 0.003;
      posArray[i3] += Math.sin(t * speeds[i] + i) * 0.001;
      posArray[i3 + 2] += Math.cos(t * speeds[i] + i) * 0.001;
      if (posArray[i3 + 1] > 3) {
        posArray[i3 + 1] = -3;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#c91440"
        transparent
        opacity={0.6}
        blending={AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Glowing Edge Ring ── */
function GlowRing() {
  const ringRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z = clock.getElapsedTime() * 0.2;
    const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.02;
    ringRef.current.scale.set(scale, scale * 1.5, 1);
  });

  return (
    <mesh ref={ringRef} position={[0, 0, -0.02]}>
      <ringGeometry args={[1.35, 1.42, 64]} />
      <meshBasicMaterial
        color="#c91440"
        transparent
        opacity={0.15}
        side={DoubleSide}
        blending={AdditiveBlending}
      />
    </mesh>
  );
}

/* ── Holographic Shine Shader Material ── */
function HolographicMaterial() {
  const ref = useRef<any>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
    }),
    []
  );

  return (
    <shaderMaterial
      ref={ref}
      transparent
      depthWrite={false}
      blending={AdditiveBlending}
      uniforms={uniforms}
      vertexShader={`
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `}
      fragmentShader={`
        uniform float time;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          float shine = sin((vUv.x + vUv.y) * 8.0 - time * 2.0) * 0.5 + 0.5;
          shine = pow(shine, 8.0);
          
          vec3 color = vec3(
            sin(vUv.x * 6.28 + time) * 0.5 + 0.5,
            sin(vUv.y * 6.28 + time * 1.3) * 0.5 + 0.5,
            sin((vUv.x + vUv.y) * 6.28 + time * 0.7) * 0.5 + 0.5
          );
          
          float edgeFade = smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x)
                         * smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
          
          float alpha = shine * 0.12 * edgeFade;
          gl_FragColor = vec4(color, alpha);
        }
      `}
    />
  );
}

/* ── The Card Mesh (with textures loaded via useTexture) ── */
function CardWithTextures({ flipped, onFlip }: { flipped: boolean; onFlip: () => void }) {
  const meshRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const targetFlip = useRef(0);

  // useTexture from drei — properly handles loading inside Suspense
  const [frontTexture, backTexture] = useTexture([
    '/assets/phrolova-card-front.png',
    '/assets/phrolova-card-back.png',
  ]);

  useFrame(() => {
    if (!meshRef.current) return;
    targetFlip.current = MathUtils.lerp(
      targetFlip.current,
      flipped ? Math.PI : 0,
      0.05
    );
    meshRef.current.rotation.y = targetFlip.current;

    const targetScale = hovered ? 1.03 : 1;
    meshRef.current.scale.x = MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1);
    meshRef.current.scale.y = MathUtils.lerp(meshRef.current.scale.y, targetScale, 0.1);
  });

  const w = 2.2;
  const h = 3.3;
  const depth = 0.02;

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
        {/* Card front */}
        <mesh
          onClick={onFlip}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          castShadow
        >
          <boxGeometry args={[w, h, depth]} />
          <meshStandardMaterial
            map={frontTexture}
            metalness={0.3}
            roughness={0.4}
            side={DoubleSide}
          />
        </mesh>

        {/* Card back */}
        <mesh position={[0, 0, -0.011]} rotation={[0, Math.PI, 0]} onClick={onFlip}>
          <planeGeometry args={[w, h]} />
          <meshStandardMaterial
            map={backTexture}
            metalness={0.2}
            roughness={0.5}
            side={DoubleSide}
          />
        </mesh>

        {/* Holographic shine overlay */}
        <mesh position={[0, 0, 0.012]}>
          <planeGeometry args={[w, h]} />
          <HolographicMaterial />
        </mesh>

        {/* Edge glow */}
        <GlowRing />
      </Float>
    </group>
  );
}

/* ── Fallback card (no textures, gradient placeholder) ── */
function CardFallback({ flipped, onFlip }: { flipped: boolean; onFlip: () => void }) {
  const meshRef = useRef<Group>(null);
  const targetFlip = useRef(0);

  useFrame(() => {
    if (!meshRef.current) return;
    targetFlip.current = MathUtils.lerp(
      targetFlip.current,
      flipped ? Math.PI : 0,
      0.05
    );
    meshRef.current.rotation.y = targetFlip.current;
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
        <mesh onClick={onFlip} castShadow>
          <boxGeometry args={[2.2, 3.3, 0.02]} />
          <meshStandardMaterial color="#1a0f2e" metalness={0.3} roughness={0.4} side={DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 0.012]}>
          <planeGeometry args={[2.2, 3.3]} />
          <HolographicMaterial />
        </mesh>
        <GlowRing />
      </Float>
    </group>
  );
}

/* ── Card wrapper with error boundary ── */
function CardLoader() {
  const [flipped, setFlipped] = useState(false);
  const handleFlip = useCallback(() => setFlipped((f) => !f), []);

  return (
    <Suspense fallback={<CardFallback flipped={flipped} onFlip={handleFlip} />}>
      <CardWithTextures flipped={flipped} onFlip={handleFlip} />
    </Suspense>
  );
}

/* ── Main Scene ── */
function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#e0e0ea" />
      <pointLight position={[-3, 2, 4]} intensity={0.5} color="#c91440" />
      <pointLight position={[3, -2, 4]} intensity={0.3} color="#7b2d8e" />

      {/* The card with Suspense-based texture loading */}
      <CardLoader />

      {/* Ambient particles */}
      <FrequencyParticles />

      {/* Orbit controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.5}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 2.2}
      />
    </>
  );
}

/* ── Exported Component ── */
export default function PhrolovaCard() {
  return (
    <div className="three-canvas-container h-full w-full cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>

      <div className="pointer-events-none absolute bottom-4 left-0 right-0 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-silver-dark/40">
          Drag to rotate • Click to flip
        </span>
      </div>
    </div>
  );
}