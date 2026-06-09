"use client";

import { motion, Variants } from "framer-motion";
import { Shield, Cloud, Users, Check, ArrowRight, MonitorSmartphone } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#f0822a] selection:text-white">

      {/* BANDEAU EVENEMENTIEL */}
      <div className="bg-[#f0822a] text-white py-2 px-4 text-center text-xs font-semibold tracking-wide uppercase">
        Offre Spéciale Cinquantenaire ESCA
      </div>

      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo Agilly"
              width={150}
              height={50}
              className="h-10 w-auto object-contain"
              priority
            />
          </div>
          <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest border border-slate-200 px-3 py-1.5 rounded">
            Partenaire ESCA 50 ans
          </div>
        </div>
      </header>

      {/* SECTION 1 - HERO (Corporate Dark avec Image en Background) */}
      <section className="relative text-white pt-32 pb-32 lg:pt-48 lg:pb-48 px-6 overflow-hidden flex items-center justify-center min-h-[90vh]">
        {/* IMAGE DE FOND & OVERLAY */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-image.png"
            alt="Professionnels Africains"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[#0f172a]/85" /> {/* Calque d'assombrissement */}
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.h1 className="text-4xl md:text-5xl lg:text-[4rem] font-bold leading-[1.1] mb-8 tracking-tight uppercase flex flex-wrap justify-center gap-x-[0.25em] gap-y-2">
              <motion.span variants={itemVariants}>VOTRE</motion.span>
              <motion.span variants={itemVariants}>ENTREPRISE</motion.span>
              <motion.span variants={itemVariants}>EST-ELLE</motion.span>
              <motion.span variants={itemVariants}>PRÊTE</motion.span>
              <motion.span variants={itemVariants}>POUR</motion.span>
              <motion.span variants={itemVariants}>LES</motion.span>
              <motion.span variants={itemVariants} className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] drop-shadow-sm">DÉFIS</motion.span>
              <motion.span variants={itemVariants} className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] drop-shadow-sm">NUMÉRIQUES</motion.span>
              <motion.span variants={itemVariants}>DE</motion.span>
              <motion.span variants={itemVariants}>DEMAIN</motion.span>
              <motion.span variants={itemVariants}>?</motion.span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Découvrez nos offres exclusives réservées aux décideurs et visiteurs du stand AGILLY. Accélérez votre transformation digitale en toute sécurité.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20">
              <a href="#offres" className="w-full sm:w-auto px-8 py-4 bg-[#f0822a] hover:bg-[#d9751e] text-white font-semibold rounded transition-colors flex items-center justify-center gap-2">
                Découvrir les offres <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white hover:bg-white hover:text-[#0f172a] text-white font-semibold rounded transition-colors flex items-center justify-center">
                Échanger avec un expert
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TEXTE DÉFILANT (MARQUEE) */}
      <section className="bg-[#f0822a] py-4 overflow-hidden flex border-y border-[#d9751e]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex whitespace-nowrap text-white font-bold tracking-widest uppercase text-sm"
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="mx-8">•</span> CYBERSÉCURITÉ <span className="mx-8">•</span> CLOUD COMPUTING <span className="mx-8">•</span> COLLABORATION NUMÉRIQUE <span className="mx-8">•</span> TRANSFORMATION DIGITALE
            </div>
          ))}
        </motion.div>
      </section>

      {/* SECTION 2 - OFFRES */}
      <section id="offres" className="py-24 bg-slate-50 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-[#f0822a] block text-xs font-bold tracking-widest uppercase mb-3">Vos avantages exclusifs</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">3 offres exclusives pour votre entreprise</h2>
            <p className="text-slate-600">Des solutions concrètes pour sécuriser et optimiser votre infrastructure.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {/* OFFRE 1: CYBERWIZE (Thème Bleu) */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white p-10 border border-slate-200 hover:border-[#2563eb]/50 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group">
              <div className="w-14 h-14 bg-[#2563eb]/10 border border-[#2563eb]/20 rounded flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-[#2563eb]" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Cyberwize</h3>
              <div className="inline-block px-3 py-1 bg-[#2563eb]/10 text-[#2563eb] text-xs font-bold uppercase tracking-wider rounded mb-8 border border-[#2563eb]/20">
                Diagnostic offert (30 jrs)
              </div>

              <ul className="space-y-4 mb-12 flex-1">
                {["Analyse de votre exposition aux risques", "Identification des vulnérabilités", "Recommandations d'amélioration"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <Check className="w-5 h-5 text-[#f0822a] shrink-0" /> {/* Touche d'orange Agilly */}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a href="#contact" className="w-full py-4 text-center border-2 border-slate-200 hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white text-slate-900 font-bold rounded transition-colors">
                Je profite de l'offre
              </a>
            </motion.div>

            {/* OFFRE 2: DIGIWIZE PME */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white p-10 border-2 border-[#f0822a] rounded-lg shadow-xl flex flex-col relative group">
              <div className="absolute top-0 right-8 -translate-y-1/2 px-4 py-1 bg-[#f0822a] text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-md">
                Essai Gratuit
              </div>
              <div className="w-14 h-14 bg-[#f0822a] rounded flex items-center justify-center mb-8 shadow-lg shadow-[#f0822a]/40 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Digiwize PME</h3>
              <div className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded mb-8">
                30 jours d'essai gratuit
              </div>

              <ul className="space-y-4 mb-12 flex-1">
                {["Messagerie professionnelle moderne", "Outils collaboratifs", "Productivité renforcée"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <Check className="w-5 h-5 text-[#f0822a] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a href="#contact" className="w-full py-4 text-center bg-[#f0822a] hover:bg-[#d9751e] shadow-lg shadow-[#f0822a]/30 text-white font-bold rounded transition-all">
                Tester Digiwize
              </a>
            </motion.div>

            {/* OFFRE 3: AMBRA CLOUD (Thème Rouge Ambré) */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white p-10 border border-slate-200 hover:border-[#c03c0c]/50 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group">
              <div className="w-14 h-14 bg-[#c03c0c]/10 border border-[#c03c0c]/20 rounded flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Cloud className="w-6 h-6 text-[#c03c0c]" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Ambra Cloud</h3>
              <div className="inline-block px-3 py-1 bg-[#c03c0c]/10 text-[#c03c0c] text-xs font-bold uppercase tracking-wider rounded mb-8 border border-[#c03c0c]/20">
                15 jours d'hébergement
              </div>

              <ul className="space-y-4 mb-12 flex-1">
                {["Hébergement local et sécurisé", "Sauvegarde des données", "Disponibilité optimale"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <Check className="w-5 h-5 text-[#f0822a] shrink-0" /> {/* Touche d'orange Agilly */}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a href="#contact" className="w-full py-4 text-center border-2 border-slate-200 hover:border-[#c03c0c] hover:bg-[#c03c0c] hover:text-white text-slate-900 font-bold rounded transition-colors">
                Découvrir le Cloud
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - FORMULAIRE LEADS */}
      <section id="contact" className="py-24 bg-white border-t border-slate-200 px-6">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Profitez immédiatement de votre offre</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Accédez à nos offres exclusives et échangez directement avec nos experts en cybersécurité et infrastructures.
            </p>
            <div className="p-6 bg-slate-50 border border-slate-200 rounded text-sm text-slate-600">
              <strong className="block text-slate-900 mb-2">Informations requises</strong>
              En soumettant ce formulaire, nos équipes vous recontacteront dans les 24 heures pour activer votre période d'essai ou votre diagnostic.
            </div>
          </motion.div>

          <motion.form initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white p-8 md:p-10 border border-slate-200 rounded shadow-sm">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Nom complet *</label>
                <input type="text" className="w-full border border-slate-300 rounded px-4 py-3 text-sm focus:border-[#f0822a] focus:ring-1 focus:ring-[#f0822a] outline-none transition-colors" placeholder="Jean Dupont" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Entreprise *</label>
                <input type="text" className="w-full border border-slate-300 rounded px-4 py-3 text-sm focus:border-[#f0822a] focus:ring-1 focus:ring-[#f0822a] outline-none transition-colors" placeholder="Nom de l'entreprise" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Fonction</label>
                <input type="text" className="w-full border border-slate-300 rounded px-4 py-3 text-sm focus:border-[#f0822a] focus:ring-1 focus:ring-[#f0822a] outline-none transition-colors" placeholder="DSI, CEO..." />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Téléphone *</label>
                <input type="tel" className="w-full border border-slate-300 rounded px-4 py-3 text-sm focus:border-[#f0822a] focus:ring-1 focus:ring-[#f0822a] outline-none transition-colors" placeholder="+225" required />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Adresse email *</label>
                <input type="email" className="w-full border border-slate-300 rounded px-4 py-3 text-sm focus:border-[#f0822a] focus:ring-1 focus:ring-[#f0822a] outline-none transition-colors" placeholder="jean@entreprise.com" required />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Offre ciblée *</label>
                <select className="w-full border border-slate-300 rounded px-4 py-3 text-sm focus:border-[#f0822a] focus:ring-1 focus:ring-[#f0822a] outline-none transition-colors bg-white">
                  <option>Sélectionnez une offre</option>
                  <option>Cyberwize (Diagnostic)</option>
                  <option>Digiwize PME (Essai gratuit)</option>
                  <option>Ambra Cloud (Hébergement gratuit)</option>
                </select>
              </div>
              <div className="md:col-span-2 pt-4">
                <button type="submit" className="w-full py-4 bg-[#0f172a] hover:bg-[#f0822a] text-white font-bold uppercase tracking-wider text-sm rounded transition-colors flex items-center justify-center gap-2">
                  Envoyer la demande
                </button>
              </div>
            </div>
          </motion.form>
        </div>
      </section>

      {/* SECTION 5 - URGENCE */}
      <section className="bg-[#f0822a] text-white py-12 px-6 text-center border-b-4 border-[#d9751e]">
        <div className="mx-auto max-w-3xl">
          <p className="text-xl md:text-2xl font-bold uppercase tracking-wide">
            Offres valables uniquement pendant l'évènement ESCA 50 ans.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="bg-white px-3 py-1.5 rounded mb-3 inline-block">
              <Image
                src="/logo.png"
                alt="Logo Agilly"
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-sm">l’excellence numérique, en toute sérénité</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 text-sm">
            <a href="http://www.agilly.net" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">www.agilly.net</a>
            <span className="hidden sm:block text-slate-700">|</span>
            <span>+225 25 22 00 14 22</span>
            <span className="hidden sm:block text-slate-700">|</span>
            <a href="mailto:infos@agilly.net" className="hover:text-white transition-colors">infos@agilly.net</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
