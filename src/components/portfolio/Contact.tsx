import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const info = [
  { icon: MapPin, title: "Adresse", content: "Kigali, Rwanda", bg: "bg-petal" },
  { icon: Phone, title: "Téléphone", content: "+250 XXX XXX XXX", bg: "bg-mint" },
  { icon: Mail, title: "Email", content: "contact@aubedespetales.rw", bg: "bg-lavender" },
  { icon: Clock, title: "Horaires", content: "Lun – Ven · 7h – 18h", bg: "bg-sun" },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Merci ! Nous vous contacterons bientôt.");
    setForm({ nom: "", email: "", telephone: "", message: "" });
  };

  return (
    <section id="contact" ref={ref} className="relative py-28 md:py-40 bg-gradient-dawn overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-20"
        >
          <span className="inline-block mb-4 text-xs uppercase tracking-[0.3em] text-petal font-semibold">
            05 — Contact
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-ink mb-6">
            Parlons de votre <span className="italic">enfant</span>
          </h2>
          <p className="text-lg md:text-xl text-ink-soft max-w-3xl mx-auto leading-relaxed">
            Nous serions ravis de vous accueillir et de répondre à toutes vos questions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="space-y-4">
            {info.map((it, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                whileHover={{ x: 6 }}
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-soft hover:shadow-glow transition-shadow flex items-center gap-5 border border-white"
              >
                <div className={`w-14 h-14 rounded-xl ${it.bg} flex items-center justify-center flex-shrink-0 shadow-soft`}>
                  <it.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-ink-soft">{it.title}</p>
                  <p className="text-lg font-semibold text-ink">{it.content}</p>
                </div>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="rounded-3xl overflow-hidden h-64 bg-gradient-meadow flex items-center justify-center relative"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.4),transparent_70%)]" />
              <div className="text-center relative">
                <MapPin className="w-14 h-14 text-white mx-auto mb-2" />
                <p className="text-white font-display text-2xl">Kigali, Rwanda</p>
              </div>
            </motion.div>
          </div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white rounded-[2rem] p-8 md:p-10 shadow-glow space-y-5"
          >
            <h3 className="font-display text-3xl font-bold text-ink mb-2">Envoyez-nous un message</h3>
            {[
              { id: "nom", label: "Nom complet", type: "text", placeholder: "Votre nom", required: true },
              { id: "email", label: "Email", type: "email", placeholder: "votre.email@exemple.com", required: true },
              { id: "telephone", label: "Téléphone", type: "tel", placeholder: "+250 XXX XXX XXX", required: false },
            ].map((f) => (
              <div key={f.id}>
                <label htmlFor={f.id} className="block text-sm font-medium text-ink mb-2">{f.label}</label>
                <input
                  id={f.id}
                  name={f.id}
                  type={f.type}
                  required={f.required}
                  placeholder={f.placeholder}
                  value={form[f.id as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-cream focus:border-petal focus:ring-4 focus:ring-petal/15 outline-none transition"
                />
              </div>
            ))}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">Message</label>
              <textarea
                id="message"
                rows={5}
                required
                placeholder="Votre message…"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-cream focus:border-petal focus:ring-4 focus:ring-petal/15 outline-none transition resize-none"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-4 rounded-full text-white font-semibold bg-gradient-petal shadow-soft hover:shadow-glow transition-shadow flex items-center justify-center gap-2"
            >
              Envoyer le message
              <Send className="w-5 h-5" />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
