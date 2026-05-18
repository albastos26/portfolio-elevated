import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const menuItems = [
  { label: "Notre Univers", href: "#notre-univers" },
  { label: "Nos Valeurs", href: "#nos-valeurs" },
  { label: "Activités", href: "#activites" },
  { label: "Galerie", href: "#galerie" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/70 backdrop-blur-xl shadow-soft py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="font-display text-2xl md:text-3xl font-bold text-petal tracking-tight"
          >
            L'Aube des Pétales
          </a>

          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((it, i) => (
              <motion.button
                key={it.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i }}
                onClick={() => go(it.href)}
                className="story-link text-sm font-medium text-ink hover:text-petal transition-colors"
              >
                {it.label}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => go("#contact")}
              className="px-6 py-2.5 rounded-full text-white text-sm font-medium bg-gradient-petal shadow-soft hover:shadow-glow transition-shadow"
            >
              Nous contacter
            </motion.button>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden text-ink p-2">
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-cream md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {menuItems.map((it, i) => (
                <motion.button
                  key={it.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i }}
                  onClick={() => go(it.href)}
                  className="text-2xl font-display text-ink"
                >
                  {it.label}
                </motion.button>
              ))}
              <button
                onClick={() => go("#contact")}
                className="px-8 py-3 rounded-full text-white text-lg font-medium bg-gradient-petal shadow-soft"
              >
                Nous contacter
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
