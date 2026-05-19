import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, Sparkles } from "@react-three/drei";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight, Star } from "lucide-react";
import * as THREE from "three";

/* ---------- 3D Scene: Realistic Teddy Bear ---------- */

function TeddyBear({ mouse }: { mouse: { x: number; y: number } }) {
  const group = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Mesh>(null);
  const rightArm = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        mouse.x * 0.6,
        0.05
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        mouse.y * 0.25,
        0.05
      );
    }
    if (head.current) {
      head.current.rotation.z = Math.sin(t * 0.8) * 0.08;
      head.current.rotation.y = Math.sin(t * 0.5) * 0.15;
    }
    // Waving arm
    if (leftArm.current) {
      leftArm.current.rotation.z = 0.4 + Math.sin(t * 3) * 0.6;
    }
    if (rightArm.current) {
      rightArm.current.rotation.z = -0.5 + Math.sin(t * 1.2) * 0.1;
    }
  });

  // Fur-like material
  const fur = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#c8956d",
        roughness: 0.95,
        sheen: 1,
        sheenColor: new THREE.Color("#f3d6b0"),
        sheenRoughness: 0.4,
        clearcoat: 0.1,
      }),
    []
  );
  const darkFur = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#8b5e3c",
        roughness: 0.9,
        sheen: 0.8,
        sheenColor: new THREE.Color("#d4a574"),
      }),
    []
  );
  const snoutMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#f0dcc0",
        roughness: 0.85,
        sheen: 0.6,
      }),
    []
  );
  const eyeMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#1a1208",
        roughness: 0.15,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        metalness: 0.2,
      }),
    []
  );
  const noseMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#1a1208",
        roughness: 0.25,
        clearcoat: 0.8,
      }),
    []
  );
  const bowMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#FF8A80",
        roughness: 0.4,
        sheen: 1,
        sheenColor: new THREE.Color("#FFE66D"),
        clearcoat: 0.5,
      }),
    []
  );

  return (
    <group ref={group} position={[0, -0.6, 0]} scale={1.15}>
      {/* Body */}
      <mesh material={fur} position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[1, 64, 64]} />
      </mesh>
      {/* Belly patch */}
      <mesh material={snoutMat} position={[0, -0.1, 0.78]} scale={[0.7, 0.85, 0.4]}>
        <sphereGeometry args={[0.55, 48, 48]} />
      </mesh>

      {/* Head group */}
      <group ref={head} position={[0, 1.25, 0.1]}>
        <mesh material={fur} castShadow>
          <sphereGeometry args={[0.78, 64, 64]} />
        </mesh>
        {/* Ears */}
        <mesh material={fur} position={[-0.6, 0.55, 0]}>
          <sphereGeometry args={[0.25, 32, 32]} />
        </mesh>
        <mesh material={darkFur} position={[-0.6, 0.55, 0.08]} scale={[0.7, 0.7, 0.3]}>
          <sphereGeometry args={[0.25, 32, 32]} />
        </mesh>
        <mesh material={fur} position={[0.6, 0.55, 0]}>
          <sphereGeometry args={[0.25, 32, 32]} />
        </mesh>
        <mesh material={darkFur} position={[0.6, 0.55, 0.08]} scale={[0.7, 0.7, 0.3]}>
          <sphereGeometry args={[0.25, 32, 32]} />
        </mesh>
        {/* Snout */}
        <mesh material={snoutMat} position={[0, -0.15, 0.6]} scale={[1, 0.8, 0.7]}>
          <sphereGeometry args={[0.32, 48, 48]} />
        </mesh>
        {/* Nose */}
        <mesh material={noseMat} position={[0, 0.02, 0.85]}>
          <sphereGeometry args={[0.08, 32, 32]} />
        </mesh>
        {/* Eyes */}
        <mesh material={eyeMat} position={[-0.26, 0.18, 0.66]}>
          <sphereGeometry args={[0.07, 32, 32]} />
        </mesh>
        <mesh material={eyeMat} position={[0.26, 0.18, 0.66]}>
          <sphereGeometry args={[0.07, 32, 32]} />
        </mesh>
        {/* Eye highlights */}
        <mesh position={[-0.24, 0.21, 0.72]}>
          <sphereGeometry args={[0.018, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.28, 0.21, 0.72]}>
          <sphereGeometry args={[0.018, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Arms */}
      <mesh ref={leftArm} material={fur} position={[-0.95, 0.35, 0.15]}>
        <capsuleGeometry args={[0.28, 0.5, 16, 32]} />
      </mesh>
      <mesh ref={rightArm} material={fur} position={[0.95, 0.35, 0.15]}>
        <capsuleGeometry args={[0.28, 0.5, 16, 32]} />
      </mesh>

      {/* Legs */}
      <mesh material={fur} position={[-0.55, -1.05, 0.1]} rotation={[0.2, 0, -0.1]}>
        <capsuleGeometry args={[0.32, 0.5, 16, 32]} />
      </mesh>
      <mesh material={fur} position={[0.55, -1.05, 0.1]} rotation={[0.2, 0, 0.1]}>
        <capsuleGeometry args={[0.32, 0.5, 16, 32]} />
      </mesh>
      {/* Foot pads */}
      <mesh material={snoutMat} position={[-0.55, -1.35, 0.32]} scale={[0.8, 0.4, 0.6]}>
        <sphereGeometry args={[0.25, 32, 32]} />
      </mesh>
      <mesh material={snoutMat} position={[0.55, -1.35, 0.32]} scale={[0.8, 0.4, 0.6]}>
        <sphereGeometry args={[0.25, 32, 32]} />
      </mesh>

      {/* Bow tie */}
      <group position={[0, 0.62, 0.78]} rotation={[0, 0, 0]}>
        <mesh material={bowMat} position={[-0.18, 0, 0]} rotation={[0, 0, 0.4]}>
          <coneGeometry args={[0.14, 0.3, 4]} />
        </mesh>
        <mesh material={bowMat} position={[0.18, 0, 0]} rotation={[0, 0, -0.4]}>
          <coneGeometry args={[0.14, 0.3, 4]} />
        </mesh>
        <mesh material={bowMat}>
          <sphereGeometry args={[0.07, 16, 16]} />
        </mesh>
      </group>
    </group>
  );
}

function Scene({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 6, 5]} intensity={1.4} color="#FFE4B5" castShadow />
      <pointLight position={[-5, 3, 3]} intensity={1.6} color="#FF8A80" />
      <pointLight position={[5, -2, 2]} intensity={1} color="#A8D5BA" />
      <pointLight position={[0, 2, 5]} intensity={0.7} color="#FFE66D" />

      <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.5}>
        <TeddyBear mouse={mouse} />
      </Float>

      <ContactShadows position={[0, -2.3, 0]} opacity={0.35} scale={8} blur={2.6} far={4} />
      <Sparkles count={80} scale={10} size={2} speed={0.3} color="#FFB4A2" />
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
