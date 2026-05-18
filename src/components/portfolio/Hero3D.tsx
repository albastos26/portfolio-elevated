import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial, Sphere, Sparkles } from "@react-three/drei";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import * as THREE from "three";

function Petal({ position, color, scale = 1, speed = 1 }: { position: [number, number, number]; color: string; scale?: number; speed?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.rotation.x = t * 0.3;
    ref.current.rotation.y = t * 0.2;
    ref.current.position.y = position[1] + Math.sin(t) * 0.3;
  });
  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={1.8}>
      <Sphere ref={ref} args={[scale, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          distort={0.45}
          speed={2}
          roughness={0.15}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </Sphere>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#FFE66D" />
      <pointLight position={[-4, 2, 3]} intensity={1.5} color="#FF8A80" />
      <pointLight position={[4, -2, 2]} intensity={1} color="#A8D5BA" />

      <Petal position={[-2.4, 0.6, 0]} color="#FF8A80" scale={1.1} speed={0.5} />
      <Petal position={[2.6, -0.4, -1]} color="#FFB4A2" scale={1.3} speed={0.7} />
      <Petal position={[0, 1.4, -2]} color="#FFE66D" scale={0.9} speed={0.6} />
      <Petal position={[1.4, -1.6, 0.5]} color="#A8D5BA" scale={0.8} speed={0.9} />
      <Petal position={[-1.8, -1.2, -0.5]} color="#E8D5F2" scale={0.7} speed={0.8} />

      <Sparkles count={120} scale={10} size={3} speed={0.5} color="#FFE66D" />
      <Environment preset="sunset" />
    </>
  );
}

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-gradient-dawn">
      {/* 3D Canvas */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 50 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </motion.div>

      {/* Soft vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream/80 pointer-events-none" />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 h-full flex items-center pointer-events-none">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-3xl pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-xl bg-white/70 text-petal border border-petal/20 shadow-soft">
                <span className="w-2 h-2 rounded-full bg-petal animate-pulse" />
                Kigali, Rwanda
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-ink leading-[1.05] tracking-tight"
            >
              Grandir et apprendre
              <span className="block italic font-normal mt-2 text-shimmer">avec joie</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg md:text-xl text-ink-soft mb-10 leading-relaxed max-w-2xl"
            >
              Un environnement chaleureux et sécurisé où chaque enfant s'épanouit
              à son rythme, entouré de bienveillance et d'attention personnalisée.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToContact}
                className="group px-8 py-4 rounded-full text-white font-semibold text-base bg-gradient-petal shadow-soft hover:shadow-glow transition-shadow flex items-center justify-center gap-2"
              >
                Commencer l'aventure
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.querySelector("#notre-univers")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 rounded-full font-semibold text-base backdrop-blur-xl bg-white/80 text-ink border border-ink/10 hover:bg-white transition-colors"
              >
                Découvrir notre univers
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-ink/30 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-petal"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
