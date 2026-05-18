import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Shield, Heart, Flower2, Baby, ArrowUpRight } from "lucide-react";

const valeurs = [
  {
    num: "01",
    icon: Shield,
    title: "Sécurité",
    subtitle: "Confiance & sérénité",
    description: "Un environnement sûr, surveillé, certifié — où chaque enfant évolue en pleine confiance, à chaque instant.",
    accent: "var(--color-mint)",
    keywords: ["Surveillance · 24/7", "Locaux certifiés", "Protocole sanitaire"],
  },
  {
    num: "02",
    icon: Heart,
    title: "Bienveillance",
    subtitle: "Écoute & tendresse",
    description: "Une attention personnalisée, une écoute attentive — chaque émotion accueillie, chaque rire célébré.",
    accent: "var(--color-petal)",
    keywords: ["Écoute active", "Cadre rassurant", "Lien affectif"],
  },
  {
    num: "03",
    icon: Flower2,
    title: "Épanouissement",
    subtitle: "Créativité & éveil",
    description: "Des activités riches et variées qui stimulent l'imaginaire, la créativité et l'éveil sensoriel.",
    accent: "var(--color-lavender)",
    keywords: ["Arts plastiques", "Éveil musical", "Motricité libre"],
  },
  {
    num: "04",
    icon: Baby,
    title: "Développement",
    subtitle: "Autonomie & confiance",
    description: "Un accompagnement sur mesure qui révèle l'autonomie, la confiance et le plein potentiel de l'enfant.",
    accent: "var(--color-sun)",
    keywords: ["Suivi individuel", "Pédagogie active", "Bilans réguliers"],
  },
];

export function NosValeurs() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [active, setActive] = useState(0);

  const current = valeurs[active];

  return (
    <section
      id="nos-valeurs"
      ref={ref}
      className="relative py-32 md:py-48 bg-ink overflow-hidden"
    >
      {/* Animated mesh glow that follows the active value */}
      <motion.div
        key={active}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] rounded-full blur-[160px] pointer-events-none"
        style={{ background: current.accent }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="grid grid-cols-12 mb-20 md:mb-28 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="col-span-12 md:col-span-7"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-petal" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-petal font-semibold">
                Chapitre 02 — Nos Valeurs
              </span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-cream leading-[0.95] tracking-tight">
              Quatre piliers,
              <span className="block italic font-light text-shimmer">une promesse.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="col-span-12 md:col-span-4 md:col-start-9 flex items-end"
          >
            <p className="text-base md:text-lg text-cream/70 leading-relaxed">
              Des principes fondamentaux — vivants, incarnés, ressentis — qui guident chaque geste, chaque sourire, chaque journée.
            </p>
          </motion.div>
        </div>

        {/* Interactive split layout */}
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
          {/* Left — interactive list */}
          <div className="col-span-12 lg:col-span-7 flex flex-col">
            {valeurs.map((v, i) => {
              const isActive = active === i;
              return (
                <motion.button
                  key={i}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
                  className="group relative text-left border-t border-white/10 last:border-b py-7 md:py-9 transition-colors"
                >
                  {/* Animated bg slide */}
                  <motion.span
                    initial={false}
                    animate={{ scaleY: isActive ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-0 top-0 bottom-0 w-1 origin-top"
                    style={{ background: v.accent }}
                  />
                  <div className="flex items-center gap-6 md:gap-10 pl-6">
                    <span className="font-display italic text-2xl md:text-3xl text-white/30 group-hover:text-white/60 transition-colors">
                      {v.num}
                    </span>

                    <motion.div
                      animate={{
                        scale: isActive ? 1.1 : 1,
                        rotate: isActive ? 8 : 0,
                      }}
                      transition={{ duration: 0.5 }}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shrink-0 backdrop-blur-md border border-white/20"
                      style={{ background: isActive ? v.accent : "rgba(255,255,255,0.05)" }}
                    >
                      <v.icon className={`w-6 h-6 ${isActive ? "text-ink" : "text-white/70"} transition-colors`} />
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-display text-3xl md:text-5xl font-bold leading-none tracking-tight transition-colors duration-500"
                        style={{ color: isActive ? "var(--color-cream)" : "rgba(255,255,255,0.45)" }}
                      >
                        {v.title}
                      </h3>
                    </div>

                    <motion.div
                      animate={{ x: isActive ? 0 : -10, opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.4 }}
                      className="hidden md:flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-cream/80"
                    >
                      <span>{v.subtitle}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right — animated display panel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="col-span-12 lg:col-span-5 lg:sticky lg:top-28"
          >
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 backdrop-blur-2xl bg-white/[0.03] p-8 md:p-10 min-h-[26rem]">
              {/* Accent corner */}
              <motion.div
                key={`accent-${active}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl"
                style={{ background: current.accent }}
              />

              <motion.div
                key={`content-${active}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="font-display italic text-5xl text-cream">{current.num}</span>
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-glow"
                    style={{ background: current.accent }}
                  >
                    <current.icon className="w-8 h-8 text-ink" />
                  </div>
                </div>

                <h4 className="font-display text-4xl md:text-5xl font-bold text-cream mb-2 leading-tight">
                  {current.title}
                </h4>
                <p className="text-sm uppercase tracking-[0.3em] text-cream/50 mb-6">
                  {current.subtitle}
                </p>
                <p className="text-cream/80 leading-relaxed text-base md:text-lg mb-8">
                  {current.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {current.keywords.map((k, i) => (
                    <motion.span
                      key={k}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                      className="text-xs px-3 py-1.5 rounded-full border border-white/15 text-cream/80 bg-white/5"
                    >
                      {k}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Quote band */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-24 md:mt-32 max-w-4xl mx-auto text-center"
        >
          <p className="font-display text-2xl md:text-4xl italic text-cream/90 leading-relaxed">
            « Chaque enfant est unique. Notre mission est de révéler
            <span className="text-shimmer not-italic font-normal"> son plein potentiel </span>
            dans un cadre aimant et stimulant. »
          </p>
          <div className="w-20 h-px bg-petal mx-auto mt-8" />
          <p className="text-xs uppercase tracking-[0.4em] text-cream/50 mt-4">L'équipe — L'Aube des Pétales</p>
        </motion.div>
      </div>
    </section>
  );
}
