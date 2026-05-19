import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Palette, Music, BookOpen, Puzzle, Rocket, Sun } from "lucide-react";
import imgPeinture from "@/assets/photos/peinture.jpeg";
import imgBalles from "@/assets/photos/balles.jpeg";
import imgPlay2 from "@/assets/photos/play2.jpeg";
import imgPlay3 from "@/assets/photos/play3.jpeg";
import imgTricycles from "@/assets/photos/tricycles.jpeg";
import imgHero from "@/assets/photos/hero.jpeg";

const activites = [
  { icon: Palette, title: "Arts & Créativité", description: "Peinture, dessin, modelage… libre cours à l'imagination.", image: imgPeinture, color: "bg-petal" },
  { icon: Music, title: "Éveil Sensoriel", description: "Découverte des sons, couleurs et textures.", image: imgBalles, color: "bg-mint" },
  { icon: BookOpen, title: "Histoires & Lecture", description: "Des moments de lecture pour développer le langage.", image: imgPlay2, color: "bg-lavender" },
  { icon: Puzzle, title: "Jeux Éducatifs", description: "Apprentissage ludique adapté à chaque âge.", image: imgPlay3, color: "bg-sun" },
  { icon: Rocket, title: "Activités Motrices", description: "Coordination et équilibre par le jeu.", image: imgTricycles, color: "bg-sky" },
  { icon: Sun, title: "Jeux en Plein Air", description: "Cour aménagée, sécurisée et stimulante.", image: imgHero, color: "bg-petal-soft" },
];

export function Activites() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="activites" ref={ref} className="relative py-28 md:py-40 bg-gradient-dawn overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-20"
        >
          <span className="inline-block mb-4 text-xs uppercase tracking-[0.3em] text-petal font-semibold">
            03 — Activités
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-ink mb-6">
            Un programme <span className="italic">riche & vivant</span>
          </h2>
          <p className="text-lg md:text-xl text-ink-soft max-w-3xl mx-auto leading-relaxed">
            Pour éveiller tous les sens et révéler les talents de chaque enfant.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activites.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl shadow-soft hover:shadow-glow transition-shadow cursor-pointer aspect-[4/5]"
            >
              <motion.img
                src={a.image}
                alt={a.title}
                whileHover={{ scale: 1.12 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />

              <div className={`absolute top-5 right-5 w-14 h-14 rounded-2xl ${a.color} flex items-center justify-center shadow-soft backdrop-blur-md`}>
                <a.icon className="w-7 h-7 text-white" />
              </div>

              <div className="absolute bottom-0 inset-x-0 p-7 text-white">
                <h3 className="font-display text-2xl font-bold mb-2">{a.title}</h3>
                <p className="text-white/90 leading-relaxed text-sm transform translate-y-2 group-hover:translate-y-0 opacity-90 group-hover:opacity-100 transition-all duration-500">
                  {a.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
