import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Play } from "lucide-react";
import heroBg from "@/assets/photos/hero.jpeg";

const stats = [
  { v: "12+", l: "Années d'expérience" },
  { v: "200+", l: "Familles accompagnées" },
  { v: "98%", l: "Parents satisfaits" },
];

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-ink"
    >
      {/* Background image */}
      <motion.div
        style={{ y: bgY, scale: bgScale, backgroundImage: `url(${heroBg})` }}
        className="absolute inset-0 bg-cover bg-center"
      />

      {/* Asymmetric editorial scrim — heavy on the left, fades to the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/65 to-ink/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/40" />

      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />

      {/* Vertical edge markers */}
      <div className="absolute top-32 left-5 z-20 text-[10px] tracking-[0.4em] uppercase text-cream/55 [writing-mode:vertical-rl] rotate-180 hidden md:block">
        Est. 2013 · Kigali — RW
      </div>
      <div className="absolute bottom-32 right-5 z-20 text-[10px] tracking-[0.4em] uppercase text-cream/55 [writing-mode:vertical-rl] hidden md:block">
        Scroll to discover
      </div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 md:px-14 lg:px-20"
      >
        {/* Eyebrow — solid pill for legibility on any background */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-cream text-ink text-[10px] uppercase tracking-[0.3em] font-semibold shadow-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-petal animate-pulse" />
            Crèche & Éveil · Kigali
          </span>
        </motion.div>

        {/* Headline */}
        <div className="max-w-5xl">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="font-display font-bold text-cream leading-[0.92] tracking-[-0.03em]"
          >
            <motion.span
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="block text-[clamp(2.75rem,9vw,8.5rem)]"
            >
              L'aube
            </motion.span>
            <motion.span
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="block italic font-light text-[clamp(2.75rem,9vw,8.5rem)] -mt-1 md:-mt-3 text-sun"
            >
              des pétales.
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.85 }}
            className="mt-8 max-w-xl text-base md:text-lg text-cream/85 leading-relaxed"
          >
            Un sanctuaire d'enfance où chaque pétale éclôt à son propre rythme —
            entre rires, découvertes et tendresse.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="group relative overflow-hidden px-7 py-4 rounded-full text-ink font-medium text-sm bg-cream flex items-center gap-3 shadow-glow hover:scale-[1.03] active:scale-[0.97] transition-transform"
            >
              <span className="relative z-10">Réserver une visite</span>
              <span className="relative z-10 w-8 h-8 rounded-full bg-ink text-cream flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>
            <button
              onClick={() =>
                document.querySelector("#notre-univers")?.scrollIntoView({ behavior: "smooth" })
              }
              className="group flex items-center gap-3 text-sm font-medium text-cream/90 hover:text-cream transition-colors"
            >
              <span className="w-11 h-11 rounded-full border border-cream/40 flex items-center justify-center group-hover:bg-cream group-hover:text-ink group-hover:border-cream transition-all duration-500">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </span>
              Découvrir notre univers
            </button>
          </motion.div>
        </div>

        {/* Footer — stats + scroll cue */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-t border-cream/15 pt-8"
        >
          <div className="grid grid-cols-3 gap-8 md:gap-14">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 + i * 0.1 }}
                className="flex flex-col"
              >
                <span className="font-display text-2xl md:text-4xl text-cream font-bold leading-none">
                  {s.v}
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-cream/65 mt-2">
                  {s.l}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="hidden md:flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-cream/70">
            <span>Faites défiler</span>
            <span className="relative w-px h-10 bg-cream/25 overflow-hidden">
              <motion.span
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-x-0 top-0 h-1/2 bg-cream"
              />
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
