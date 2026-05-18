import { motion } from "motion/react";
import { Heart, Instagram, Facebook, Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const go = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="relative bg-ink text-white py-20 overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-petal/20 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-mint/15 rounded-full blur-3xl animate-blob" style={{ animationDelay: "4s" }} />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-display text-3xl font-bold mb-4 text-sun">L'Aube des Pétales</h3>
            <p className="text-white/70 leading-relaxed mb-6 max-w-sm">
              Un lieu d'éveil, de bienveillance et de joie où chaque enfant grandit en confiance.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="w-11 h-11 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-petal transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-xl font-bold mb-6">Liens rapides</h4>
            <ul className="space-y-3">
              {[
                { label: "Notre Univers", href: "#notre-univers" },
                { label: "Nos Valeurs", href: "#nos-valeurs" },
                { label: "Activités", href: "#activites" },
                { label: "Galerie", href: "#galerie" },
                { label: "Contact", href: "#contact" },
              ].map((l) => (
                <li key={l.href}>
                  <button onClick={() => go(l.href)} className="story-link text-white/70 hover:text-sun transition-colors text-sm">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xl font-bold mb-6">Nous contacter</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              <li>Kigali, Rwanda</li>
              <li>+250 XXX XXX XXX</li>
              <li>contact@aubedespetales.rw</li>
              <li>Lun – Ven · 7h – 18h</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>© {year} L'Aube des Pétales. Tous droits réservés.</p>
          <p className="flex items-center gap-2">
            Créé avec <Heart className="w-4 h-4 text-petal fill-petal" /> pour nos petits explorateurs
          </p>
        </div>
      </div>
    </footer>
  );
}
