import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial, Sparkles, Trail, Icosahedron, Torus } from "@react-three/drei";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight, Star } from "lucide-react";
import * as THREE from "three";

/* ---------- 3D Scene ---------- */

function MorphingCore({ mouse }: { mouse: { x: number; y: number } }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, mouse.y * 0.4 + t * 0.1, 0.05);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, mouse.x * 0.6 + t * 0.15, 0.05);
  });
  return (
    <Icosahedron ref={ref} args={[1.6, 4]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#FF8A80"
        distort={0.55}
        speed={1.4}
        roughness={0.05}
        metalness={0.4}
        clearcoat={1}
        clearcoatRoughness={0}
        emissive="#FFB4A2"
        emissiveIntensity={0.15}
      />
    </Icosahedron>
  );
}

function OrbitingPetal({ radius, speed, size, color, offset }: { radius: number; speed: number; size: number; color: string; offset: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 1.6) * 0.6;
    ref.current.rotation.x = t;
    ref.current.rotation.y = t * 0.7;
  });
  return (
    <Trail width={1.5} length={5} color={color} attenuation={(w) => w * w}>
      <mesh ref={ref}>
        <torusKnotGeometry args={[size, size * 0.3, 48, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.2} metalness={0.6} />
      </mesh>
    </Trail>
  );
}

function ParticleField() {
  const points = useMemo(() => {
    const arr = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      const r = 4 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.04;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#FFE66D" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function Ring() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.z = s.clock.elapsedTime * 0.15;
    ref.current.rotation.x = Math.PI / 2.3;
  });
  return (
    <Torus ref={ref} args={[2.6, 0.012, 16, 200]}>
      <meshStandardMaterial color="#FFE66D" emissive="#FFE66D" emissiveIntensity={1.2} />
    </Torus>
  );
}

function Scene({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#FFE66D" />
      <pointLight position={[-5, 3, 3]} intensity={2} color="#FF8A80" />
      <pointLight position={[5, -3, 2]} intensity={1.5} color="#A8D5BA" />
      <pointLight position={[0, 0, 5]} intensity={0.8} color="#E8D5F2" />

      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
        <MorphingCore mouse={mouse} />
      </Float>

      <Ring />
      <OrbitingPetal radius={2.8} speed={0.4} size={0.18} color="#FF8A80" offset={0} />
      <OrbitingPetal radius={3.2} speed={0.3} size={0.14} color="#A8D5BA" offset={2.1} />
      <OrbitingPetal radius={2.4} speed={0.55} size={0.12} color="#E8D5F2" offset={4.2} />
      <OrbitingPetal radius={3.6} speed={0.25} size={0.16} color="#FFE66D" offset={1.2} />

      <ParticleField />
      <Sparkles count={150} scale={12} size={2} speed={0.4} color="#FFB4A2" />
      <Environment preset="sunset" />
    </>
  );
}

/* ---------- UI Layer ---------- */

const stats = [
  { v: "12+", l: "Années" },
  { v: "200+", l: "Familles" },
  { v: "98%", l: "Satisfaction" },
];

const marquee = ["Bienveillance", "★", "Créativité", "★", "Éveil", "★", "Sécurité", "★", "Joie", "★", "Découverte", "★"];

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const mouseRef = useRef({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x * 30);
    my.set(y * 30);
    mouseRef.current.x = x;
    mouseRef.current.y = y;
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMove}
      className="relative min-h-screen w-full overflow-hidden bg-cream"
    >
      {/* Background grain + radial */}
      <div className="absolute inset-0 bg-gradient-dawn" />
      <div
        className="absolute inset-0 opacity-[0.18] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />
      <div className="absolute -top-40 -left-40 w-[40rem] h-[40rem] rounded-full bg-petal/20 blur-[120px] animate-blob" />
      <div className="absolute -bottom-40 -right-40 w-[40rem] h-[40rem] rounded-full bg-sun/30 blur-[120px] animate-blob" style={{ animationDelay: "4s" }} />

      {/* Editorial frame markers */}
      <div className="absolute top-28 left-6 md:left-10 z-20 text-[10px] tracking-[0.4em] uppercase text-ink/60 [writing-mode:vertical-rl] rotate-180">
        Est. 2013 — Kigali · RW
      </div>
      <div className="absolute top-28 right-6 md:right-10 z-20 text-[10px] tracking-[0.4em] uppercase text-ink/60 [writing-mode:vertical-rl]">
        Chapter 01 / L'Aube
      </div>

      {/* 3D Canvas */}
      <motion.div style={{ y: sceneY }} className="absolute inset-0 z-0">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6.5], fov: 50 }}>
          <Suspense fallback={null}>
            <Scene mouse={mouseRef.current} />
          </Suspense>
        </Canvas>
      </motion.div>

      {/* Soft bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream pointer-events-none z-[1]" />

      {/* Hero content */}
      <motion.div style={{ y: textY, opacity }} className="relative z-10 min-h-screen flex flex-col justify-between pt-28 pb-24 px-6 md:px-12 pointer-events-none">
        {/* Top eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-between text-[11px] uppercase tracking-[0.35em] text-ink/70 pointer-events-auto"
        >
          <span className="flex items-center gap-2">
            <span className="w-8 h-px bg-ink/40" />
            Une crèche · pas comme les autres
          </span>
          <span className="hidden md:flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-sun text-sun" />
            ))}
            <span className="ml-2">Noté 4.9</span>
          </span>
        </motion.div>

        {/* Center — editorial split */}
        <div className="grid grid-cols-12 gap-4 items-end relative">
          {/* Massive serif headline */}
          <motion.div
            style={{ x: smx }}
            className="col-span-12 lg:col-span-9 pointer-events-auto"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="font-display font-bold text-ink leading-[0.88] tracking-[-0.03em]"
            >
              <motion.span
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="block text-[clamp(3rem,11vw,11rem)]"
              >
                L'aube
              </motion.span>
              <motion.span
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="block italic font-light text-[clamp(3rem,11vw,11rem)] -mt-2 md:-mt-6 pl-[12vw]"
              >
                <span className="text-shimmer">des pétales</span>
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Right column — manifesto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            style={{ x: useTransform(smx, (v) => -v * 0.5) }}
            className="col-span-12 lg:col-span-3 pointer-events-auto"
          >
            <div className="backdrop-blur-xl bg-white/40 border border-white/60 rounded-2xl p-5 shadow-soft">
              <p className="text-sm text-ink leading-relaxed">
                <span className="text-petal font-display italic text-2xl leading-none">"</span>
                Un sanctuaire d'enfance où chaque pétale éclôt à son propre rythme — entre rires, découvertes et tendresse.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar — CTA + stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 pointer-events-auto"
        >
          {/* CTA */}
          <div className="flex flex-wrap items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="group relative overflow-hidden px-7 py-4 rounded-full text-white font-medium text-sm bg-ink flex items-center gap-3 shadow-glow"
            >
              <span className="relative z-10">Réserver une visite</span>
              <span className="relative z-10 w-8 h-8 rounded-full bg-white text-ink flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                <ArrowUpRight className="w-4 h-4" />
              </span>
              <span className="absolute inset-0 bg-gradient-petal translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </motion.button>
            <button
              onClick={() => document.querySelector("#notre-univers")?.scrollIntoView({ behavior: "smooth" })}
              className="story-link text-sm font-medium text-ink/80"
            >
              Découvrir notre univers
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 md:gap-12">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + i * 0.1 }}
                className="flex flex-col"
              >
                <span className="font-display text-3xl md:text-4xl text-ink font-bold leading-none">{s.v}</span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-ink/60 mt-1.5">{s.l}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-ink/10 bg-cream/60 backdrop-blur-md overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-10 py-3 whitespace-nowrap font-display italic text-ink/80"
        >
          {[...marquee, ...marquee, ...marquee].map((w, i) => (
            <span key={i} className={`text-base md:text-lg ${w === "★" ? "text-petal" : ""}`}>
              {w}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
