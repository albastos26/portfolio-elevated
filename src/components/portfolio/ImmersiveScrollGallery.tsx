import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import g1 from "@/assets/photos/hero.jpeg";
import g2 from "@/assets/photos/peinture.jpeg";
import g3 from "@/assets/photos/play3.jpeg";
import g4 from "@/assets/photos/play2.jpeg";
import g5 from "@/assets/photos/balles.jpeg";
import g6 from "@/assets/photos/tricycles.jpeg";
import g7 from "@/assets/photos/motos.jpeg";

interface Pic { src: string; alt: string; }

const DEFAULT_IMAGES: Pic[] = [
  { src: g1, alt: "Cour" },
  { src: g2, alt: "Peinture" },
  { src: g3, alt: "Partage" },
  { src: g4, alt: "Lecture" },
  { src: g5, alt: "Balles" },
  { src: g6, alt: "Tricycles" },
  { src: g7, alt: "Motos" },
];

const STYLES = [
  "w-[25vw] h-[28vh]",
  "w-[35vw] h-[30vh] -top-[30vh] left-[5vw]",
  "w-[20vw] h-[55vh] -top-[15vh] -left-[25vw]",
  "w-[25vw] h-[25vh] left-[27.5vw]",
  "w-[20vw] h-[30vh] top-[30vh] left-[5vw]",
  "w-[30vw] h-[25vh] top-[27.5vh] -left-[22.5vw]",
  "w-[18vw] h-[22vh] top-[22.5vh] left-[25vw]",
];

export function ImmersiveScrollGallery({ images = DEFAULT_IMAGES }: { images?: Pic[] }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

  const s4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const s5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const s6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const s8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const s9 = useTransform(scrollYProgress, [0, 1], [1, 9]);
  const opacityImage = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const opacitySection = useTransform(scrollYProgress, [0.6, 0.85], [0, 1]);
  const scaleSection = useTransform(scrollYProgress, [0.6, 0.85], [0.8, 1]);

  const scales: MotionValue<number>[] = [s4, s5, s6, s5, s6, s8, s9];

  return (
    <section ref={container} className="relative h-[300vh] bg-cream">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {images.map((img, i) => (
          <motion.div
            key={i}
            style={{ scale: scales[i % 7], opacity: opacityImage }}
            className="absolute flex items-center justify-center w-full h-full top-0"
          >
            <div className={`relative ${STYLES[i % STYLES.length]}`}>
              <img src={img.src} alt={img.alt} className="object-cover w-full h-full rounded-2xl shadow-glow" />
            </div>
          </motion.div>
        ))}

        <motion.div
          style={{ opacity: opacitySection, scale: scaleSection }}
          className="relative w-full max-w-3xl mx-auto px-8 text-center"
        >
          <span className="inline-block mb-4 text-xs uppercase tracking-[0.3em] text-petal font-semibold">
            Notre univers
          </span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-ink leading-snug italic">
            Chaque instant à L'Aube des Pétales devient une découverte,
            un éclat de rire, un pas vers la confiance.
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
