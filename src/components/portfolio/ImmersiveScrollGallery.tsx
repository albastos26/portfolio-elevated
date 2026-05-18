import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

interface Pic { src: string; alt: string; }

const DEFAULT_IMAGES: Pic[] = [
  { src: "https://images.unsplash.com/photo-1567746455504-cb3213f8f5b8?w=1600&q=85", alt: "Classroom" },
  { src: "https://images.unsplash.com/photo-1607211851821-8be3cd6146f0?w=1600&q=85", alt: "Painting" },
  { src: "https://images.unsplash.com/photo-1600880291319-1a7499c191e8?w=1600&q=85", alt: "Joy" },
  { src: "https://images.unsplash.com/photo-1599689868384-59cb2b01bb21?w=1600&q=85", alt: "Reading" },
  { src: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1600&q=85", alt: "Toys" },
  { src: "https://images.unsplash.com/photo-1578349035260-9f3d4042f1f7?w=1600&q=85", alt: "Playing" },
  { src: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=1600&q=85", alt: "Learning" },
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
