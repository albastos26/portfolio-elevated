import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Shield, Heart, Flower2, Baby } from "lucide-react";

const valeurs = [
  { icon: Shield, title: "Sécurité", description: "Un environnement sûr et surveillé où chaque enfant évolue en confiance.", bg: "bg-mint" },
  { icon: Heart, title: "Bienveillance", description: "Une attention personnalisée et une écoute attentive de chaque enfant.", bg: "bg-petal" },
  { icon: Flower2, title: "Épanouissement", description: "Des activités variées qui stimulent la créativité et le développement.", bg: "bg-lavender" },
  { icon: Baby, title: "Développement", description: "Un accompagnement sur mesure pour favoriser l'autonomie et la confiance.", bg: "bg-sun" },
];

export function NosValeurs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="nos-valeurs" ref={ref} className="relative py-28 md:py-40 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-20"
        >
          <span className="inline-block mb-4 text-xs uppercase tracking-[0.3em] text-petal font-semibold">
            02 — Nos Valeurs
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-ink mb-6">
            Quatre piliers, <span className="italic">une promesse</span>
          </h2>
          <p className="text-lg md:text-xl text-ink-soft max-w-3xl mx-auto leading-relaxed">
            Des principes fondamentaux qui guident notre engagement quotidien envers vos enfants.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valeurs.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10 }}
              className="group bg-gradient-to-br from-white to-cream rounded-3xl p-8 shadow-soft hover:shadow-glow border border-border/50 text-center transition-shadow"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto shadow-soft ${v.bg}`}
              >
                <v.icon className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="font-display text-2xl font-bold text-ink mb-3">{v.title}</h3>
              <p className="text-ink-soft leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="mt-24 max-w-4xl mx-auto"
        >
          <div className="relative bg-gradient-meadow rounded-[2.5rem] p-12 md:p-16 shadow-glow overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
            <p className="font-display text-2xl md:text-4xl text-ink italic leading-relaxed text-center relative">
              "Chaque enfant est unique. Notre mission est de révéler son plein potentiel
              dans un cadre aimant et stimulant."
            </p>
            <div className="w-20 h-0.5 bg-ink/40 mx-auto mt-8 rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
