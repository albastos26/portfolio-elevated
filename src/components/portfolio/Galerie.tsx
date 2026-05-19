import { motion, AnimatePresence, useInView } from "motion/react";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import p1 from "@/assets/photos/play1.jpeg";
import p2 from "@/assets/photos/play2.jpeg";
import p3 from "@/assets/photos/play3.jpeg";
import p4 from "@/assets/photos/hero.jpeg";
import p5 from "@/assets/photos/play5.jpeg";
import p6 from "@/assets/photos/balles.jpeg";
import p7 from "@/assets/photos/peinture.jpeg";
import p8 from "@/assets/photos/tricycles.jpeg";
import p9 from "@/assets/photos/motos.jpeg";
import p10 from "@/assets/photos/quad.jpeg";

const images = [
  { url: p4, caption: "Cour de jeux extérieure" },
  { url: p1, caption: "Premiers tours de tricycle" },
  { url: p3, caption: "Partager, c'est apprendre" },
  { url: p7, caption: "Petits artistes en action" },
  { url: p2, caption: "Coin lecture & éveil" },
  { url: p6, caption: "Découverte sensorielle" },
  { url: p8, caption: "Balades à deux roues" },
  { url: p5, caption: "Curiosité à la porte" },
  { url: p9, caption: "Circuit d'aventure" },
  { url: p10, caption: "Petits pilotes" },
];

export function Galerie() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="galerie" ref={ref} className="relative py-28 md:py-40 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-20"
        >
          <span className="inline-block mb-4 text-xs uppercase tracking-[0.3em] text-petal font-semibold">
            04 — Galerie
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-ink mb-6">
            Souvenirs <span className="italic">en couleurs</span>
          </h2>
          <p className="text-lg md:text-xl text-ink-soft max-w-3xl mx-auto leading-relaxed">
            Découvrez notre univers et les sourires de nos petits explorateurs.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((img, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setSelected(img.url)}
              className={`group relative overflow-hidden rounded-3xl shadow-soft hover:shadow-glow transition-shadow ${
                i % 5 === 0 ? "md:row-span-2 aspect-[3/4] md:aspect-[3/5]" : "aspect-square"
              }`}
            >
              <motion.img
                src={img.url}
                alt={img.caption}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 inset-x-0 p-5 text-white text-left translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="font-display text-lg md:text-xl">{img.caption}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <button className="absolute top-6 right-6 text-white hover:text-petal transition-colors">
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              src={selected}
              alt="Galerie"
              className="max-w-full max-h-full rounded-2xl shadow-glow"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
