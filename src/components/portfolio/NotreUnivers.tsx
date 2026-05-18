import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Heart, Sparkles, Users } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Un espace pensé pour l'enfant",
    description: "Nos locaux modernes et colorés sont conçus pour stimuler la curiosité et assurer le confort de chaque enfant.",
  },
  {
    icon: Sparkles,
    title: "Une approche pédagogique innovante",
    description: "Nous combinons jeux, apprentissage et créativité pour un développement harmonieux et épanouissant.",
  },
  {
    icon: Users,
    title: "Une équipe dédiée et qualifiée",
    description: "Nos éducateurs passionnés accompagnent chaque enfant avec bienveillance et professionnalisme.",
  },
];

export function NotreUnivers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="notre-univers"
      ref={ref}
      className="relative py-28 md:py-40 overflow-hidden bg-gradient-dawn"
    >
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-sky/40 blur-3xl animate-blob" />
      <div className="absolute bottom-10 right-10 w-[28rem] h-[28rem] rounded-full bg-sun/30 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="inline-block mb-4 text-xs uppercase tracking-[0.3em] text-petal font-semibold">
            01 — Notre Univers
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-ink mb-6">
            Un lieu pensé pour <span className="italic text-petal">l'enfance</span>
          </h2>
          <p className="text-lg md:text-xl text-ink-soft max-w-3xl mx-auto leading-relaxed">
            L'Aube des Pétales est bien plus qu'une crèche : un univers où chaque enfant
            est accueilli avec tendresse et où l'épanouissement est au cœur de tout.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-soft hover-lift border border-white"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 rounded-2xl bg-gradient-petal flex items-center justify-center mb-6 shadow-soft"
              >
                <f.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="font-display text-2xl font-bold text-ink mb-3">{f.title}</h3>
              <p className="text-ink-soft leading-relaxed">{f.description}</p>
              <div className="absolute inset-0 rounded-3xl bg-gradient-petal opacity-0 group-hover:opacity-[0.04] transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
