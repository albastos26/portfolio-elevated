import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight, Star, Play } from "lucide-react";
import heroBg from "@/assets/photos/hero.jpeg";
import card1 from "@/assets/photos/tricycles.jpeg";
import card2 from "@/assets/photos/peinture.jpeg";
import card3 from "@/assets/photos/balles.jpeg";

const stats = [
  { v: "12+", l: "Années" },
  { v: "200+", l: "Familles" },
  { v: "98%", l: "Satisfaction" },
];

const marquee = [
  "Bienveillance", "★", "Créativité", "★", "Éveil", "★",
  "Sécurité", "★", "Joie", "★", "Découverte", "★",
];

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const cardA = useTransform(smx, (v) => v * 0.6);
  const cardB = useTransform(smx, (v) => -v * 0.4);
  const cardAY = useTransform(smy, (v) => v * 0.4);
  const cardBY = useTransform(smy, (v) => -v * 0.3);

  const handleMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x * 40);
    my.set(y * 30);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMove}
      className="relative min-h-screen w-full overflow-hidden bg-ink"
    >
      {/* Background image with parallax */}
      <motion.div
        style={{ y: bgY, scale: bgScale, backgroundImage: `url(${heroBg})` }}
        className="absolute inset-0 bg-cover bg-center"
      />
      {/* Dark editorial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-ink/80 via-ink/45 to-ink/85" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
      {/* Color wash */}
      <div className="absolute inset-0 bg-gradient-to-tr from-petal/25 via-transparent to-sun/20 mix-blend-overlay" />
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.18] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />

      {/* Editorial vertical markers */}
      <div className="absolute top-28 left-6 md:left-10 z-20 text-[10px] tracking-[0.4em] uppercase text-white/60 [writing-mode:vertical-rl] rotate-180 hidden sm:block">
        Est. 2013 — Kigali · RW
      </div>
      <div className="absolute top-28 right-6 md:right-10 z-20 text-[10px] tracking-[0.4em] uppercase text-white/60 [writing-mode:vertical-rl] hidden sm:block">
        Chapter 01 / L'Aube
      </div>

      {/* Hero content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 min-h-screen flex flex-col justify-between pt-28 pb-28 px-6 md:px-12"
      >
        {/* Top eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-between text-[11px] uppercase tracking-[0.35em] text-white/80"
        >
          <span className="flex items-center gap-2">
            <span className="w-8 h-px bg-white/40" />
            Une crèche · pas comme les autres
          </span>
          <span className="hidden md:flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-sun text-sun" />
            ))}
            <span className="ml-2 text-white/90">Noté 4.9</span>
          </span>
        </motion.div>

        {/* Center — editorial split with floating images */}
        <div className="grid grid-cols-12 gap-4 items-end relative">
          {/* Floating polaroid cards */}
          <motion.div
            style={{ x: cardA, y: cardAY }}
            initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block absolute right-[6%] top-[2%] w-56 xl:w-64 z-20"
          >
            <div className="bg-cream p-3 pb-10 rounded-sm shadow-glow rotate-[-6deg] hover:rotate-0 transition-transform duration-700">
              <div
                className="aspect-[4/5] bg-cover bg-center rounded-sm"
                style={{ backgroundImage: `url(${card2})` }}
              />
              <span className="absolute bottom-3 left-0 right-0 text-center font-display italic text-ink/80 text-sm">
                Petits artistes
              </span>
            </div>
          </motion.div>

          <motion.div
            style={{ x: cardB, y: cardBY }}
            initial={{ opacity: 0, scale: 0.85, rotate: 8 }}
            animate={{ opacity: 1, scale: 1, rotate: 5 }}
            transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="hidden xl:block absolute right-[28%] top-[18%] w-44 z-20"
          >
            <div className="bg-cream p-2.5 pb-8 rounded-sm shadow-glow rotate-[5deg] hover:rotate-0 transition-transform duration-700">
              <div
                className="aspect-square bg-cover bg-center rounded-sm"
                style={{ backgroundImage: `url(${card3})` }}
              />
              <span className="absolute bottom-2 left-0 right-0 text-center font-display italic text-ink/80 text-xs">
                Couleurs
              </span>
            </div>
          </motion.div>

          {/* Massive serif headline */}
          <motion.div
            style={{ x: smx }}
            className="col-span-12 lg:col-span-9 relative z-10"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="font-display font-bold text-white leading-[0.88] tracking-[-0.03em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
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
                <span className="bg-gradient-to-r from-sun via-petal to-petal-soft bg-clip-text text-transparent">
                  des pétales
                </span>
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Floating image card bottom-left (mobile + desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: -6 }}
            animate={{ opacity: 1, x: 0, rotate: -3 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ x: cardB, y: cardBY }}
            className="hidden md:block absolute left-[2%] bottom-[2%] w-48 lg:w-56 z-10"
          >
            <div className="relative group overflow-hidden rounded-2xl shadow-glow border border-white/20">
              <div
                className="aspect-[4/5] bg-cover bg-center group-hover:scale-110 transition-transform duration-1000"
                style={{ backgroundImage: `url(${card1})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-white text-[10px] uppercase tracking-[0.3em]">
                <span className="w-1.5 h-1.5 rounded-full bg-petal animate-pulse" />
                En direct · Jardin
              </div>
            </div>
          </motion.div>

          {/* Right manifesto card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            style={{ x: useTransform(smx, (v) => -v * 0.3) }}
            className="col-span-12 lg:col-span-4 lg:col-start-9 z-10 max-w-md ml-auto"
          >
            <div className="backdrop-blur-xl bg-white/10 border border-white/25 rounded-2xl p-5 shadow-glow">
              <p className="text-sm text-white/95 leading-relaxed">
                <span className="text-sun font-display italic text-2xl leading-none mr-1">"</span>
                Un sanctuaire d'enfance où chaque pétale éclôt à son propre rythme — entre rires, découvertes et tendresse.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar — CTA + stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8"
        >
          <div className="flex flex-wrap items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="group relative overflow-hidden px-7 py-4 rounded-full text-ink font-medium text-sm bg-cream flex items-center gap-3 shadow-glow"
            >
              <span className="relative z-10">Réserver une visite</span>
              <span className="relative z-10 w-8 h-8 rounded-full bg-ink text-cream flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                <ArrowUpRight className="w-4 h-4" />
              </span>
              <span className="absolute inset-0 bg-gradient-petal translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </motion.button>
            <button
              onClick={() =>
                document.querySelector("#notre-univers")?.scrollIntoView({ behavior: "smooth" })
              }
              className="group flex items-center gap-3 text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              <span className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-ink transition-all duration-500">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </span>
              Découvrir notre univers
            </button>
          </div>

          <div className="flex items-center gap-8 md:gap-12">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 + i * 0.1 }}
                className="flex flex-col"
              >
                <span className="font-display text-3xl md:text-4xl text-white font-bold leading-none">
                  {s.v}
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/70 mt-1.5">
                  {s.l}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/15 bg-ink/40 backdrop-blur-md overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-10 py-3 whitespace-nowrap font-display italic text-white/85"
        >
          {[...marquee, ...marquee, ...marquee].map((w, i) => (
            <span key={i} className={`text-base md:text-lg ${w === "★" ? "text-sun" : ""}`}>
              {w}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
