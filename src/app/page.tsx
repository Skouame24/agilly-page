"use client";

import React, { useRef } from "react";
import {
  motion,
  Variants,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate
} from "framer-motion";
import { Shield, Cloud, Users, Check, ArrowRight } from "lucide-react";
import Image from "next/image";

// interface for OfferCard Props
interface OfferCardProps {
  title: string;
  tag: string;
  tagStyle: string;
  icon: React.ReactNode;
  iconBgStyle: string;
  glowColor: string;
  features: string[];
  ctaText: string;
  ctaStyle: string;
  isFeatured?: boolean;
}

// 3D Tilt & Glow Interactive Card Component
function OfferCard({
  title,
  tag,
  tagStyle,
  icon,
  iconBgStyle,
  glowColor,
  features,
  ctaText,
  ctaStyle,
  isFeatured = false,
}: OfferCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Motion values for hover glow position
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  // Smooth spring damping for rotations
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 25, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { damping: 25, stiffness: 150 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Normalized position from -0.5 to 0.5
    const mouseX = (event.clientX - rect.left) / width - 0.5;
    const mouseY = (event.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);

    // Update local coordinates for radial glow
    glowX.set(event.clientX - rect.left);
    glowY.set(event.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const bgTemplate = useMotionTemplate`radial-gradient(350px circle at ${glowX}px ${glowY}px, ${glowColor}, transparent 80%)`;

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: "preserve-3d",
      }}
      variants={cardVariants}
      className={`relative rounded-2xl p-10 bg-white border border-slate-200 hover:shadow-2xl transition-shadow duration-500 flex flex-col group ${isFeatured ? "border-2 border-[#f0822a] shadow-xl" : "shadow-sm"}`}
    >
      {/* Dynamic Background Radial Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: bgTemplate,
        }}
      />

      {/* Card Content wrapper to handle physical depth projection */}
      <div className="relative z-10 flex flex-col flex-1" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
        {isFeatured && (
          <div className="absolute top-0 right-8 -translate-y-1/2 px-4 py-1 bg-[#f0822a] text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-md z-20">
            Essai Gratuit
          </div>
        )}

        <div
          className={`w-14 h-14 rounded flex items-center justify-center mb-8 transition-all duration-350 group-hover:scale-110 group-hover:rotate-6 ${iconBgStyle}`}
          style={{ transform: "translateZ(40px)" }}
        >
          {icon}
        </div>

        <h3 className="text-2xl font-bold text-slate-900 mb-2" style={{ transform: "translateZ(25px)" }}>
          {title}
        </h3>

        <div className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded mb-8 self-start ${tagStyle}`} style={{ transform: "translateZ(20px)" }}>
          {tag}
        </div>

        <ul className="space-y-4 mb-12 flex-1" style={{ transform: "translateZ(15px)" }}>
          {features.map((item, i) => (
            <motion.li
              key={i}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-start gap-3 text-sm text-slate-600 cursor-default"
            >
              <Check className="w-5 h-5 text-[#f0822a] shrink-0" />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className={`w-full py-4 text-center font-bold rounded block transition-all ${ctaStyle}`}
          style={{ transform: "translateZ(35px)" }}
        >
          {ctaText}
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Hook for page scroll-driven interactions (parallax)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacityBg = useTransform(scrollYProgress, [0, 1], [0.85, 0.95]);

  // Staggered reveal for Hero words
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      }
    }
  };

  // Modern word-reveal transition with spring, vertical slide, and blur fade
  const titleWordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.94,
      filter: "blur(8px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 14,
      }
    }
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#f0822a] selection:text-white overflow-x-hidden">

      {/* BANDEAU EVENEMENTIEL */}
      <div className="bg-[#f0822a] text-white py-2 px-4 text-center text-xs font-semibold tracking-wide uppercase relative z-50">
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
          <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest border border-slate-200 px-3 py-1.5 rounded bg-slate-55/30">
            Partenaire ESCA 50 ans
          </div>
        </div>
      </header>

      {/* SECTION 1 - HERO (Corporate Dark avec Image en Background, Parallaxe, Orbes et Flou) */}
      <section ref={heroRef} className="relative text-white pt-32 pb-32 lg:pt-48 lg:pb-48 px-6 overflow-hidden flex items-center justify-center min-h-[90vh] z-10">
        {/* PARALLAX IMAGE DE FOND & OVERLAY */}
        <motion.div style={{ y: yBg, scale: scaleBg }} className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/hero-image.png"
            alt="Professionnels Africains"
            fill
            className="object-cover object-center"
            priority
          />
          <motion.div style={{ opacity: opacityBg }} className="absolute inset-0 bg-[#0f172a]/85" />
        </motion.div>

        {/* ORBES LUMINEUSES DYNAMIQUES ET FLOTTANTES */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <motion.div
            animate={{
              x: [-20, 30, -30, -20],
              y: [-30, 15, -15, -30],
              scale: [1, 1.15, 0.95, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#f0822a]/10 blur-[100px]"
          />
          <motion.div
            animate={{
              x: [20, -30, 30, 20],
              y: [30, -15, 15, 30],
              scale: [1, 0.95, 1.15, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-[#2563eb]/10 blur-[100px]"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            {/* Title with Mask Reveal + Blur effects */}
            <motion.h1 className="text-4xl md:text-5xl lg:text-[4rem] font-bold leading-[1.1] mb-8 tracking-tight uppercase flex flex-wrap justify-center gap-x-[0.25em] gap-y-2 select-none">
              {[
                { text: "VOTRE" },
                { text: "ENTREPRISE" },
                { text: "EST-ELLE" },
                { text: "PRÊTE" },
                { text: "POUR" },
                { text: "LES" },
                { text: "DÉFIS", highlight: true },
                { text: "NUMÉRIQUES", highlight: true },
                { text: "DE" },
                { text: "DEMAIN" },
                { text: "?" },
              ].map((word, index) => (
                <span key={index} className="inline-block overflow-hidden py-1">
                  <motion.span
                    variants={titleWordVariants}
                    className={`inline-block ${word.highlight
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] drop-shadow-sm"
                        : ""
                      }`}
                  >
                    {word.text}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Découvrez nos offres exclusives réservées aux décideurs et visiteurs du stand AGILLY. Accélérez votre transformation digitale en toute sécurité.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20">
              <motion.a
                href="#offres"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 bg-[#f0822a] hover:bg-[#d9751e] text-white font-semibold rounded transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#f0822a]/20 hover:shadow-[#f0822a]/40"
              >
                Découvrir les offres
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03, y: -2, backgroundColor: "rgba(255, 255, 255, 1)", color: "#0f172a" }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white hover:bg-white hover:text-[#0f172a] text-white font-semibold rounded transition-all flex items-center justify-center"
              >
                Échanger avec un expert
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* MOUSE SCROLL DOWN INDICATOR */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Découvrir</span>
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-[#f0822a] rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* TEXTE DÉFILANT (MARQUEE) */}
      <section className="bg-[#f0822a] py-4 overflow-hidden flex border-y border-[#d9751e] relative z-20">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          className="flex whitespace-nowrap text-white font-bold tracking-widest uppercase text-sm select-none"
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="mx-8">•</span> CYBERSÉCURITÉ <span className="mx-8">•</span> CLOUD COMPUTING <span className="mx-8">•</span> COLLABORATION NUMÉRIQUE <span className="mx-8">•</span> TRANSFORMATION DIGITALE
            </div>
          ))}
        </motion.div>
      </section>

      {/* SECTION 2 - OFFRES */}
      <section id="offres" className="py-24 bg-slate-50 px-6 relative z-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-[#f0822a] block text-xs font-bold tracking-widest uppercase mb-3">Vos avantages exclusifs</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">3 offres exclusives pour votre entreprise</h2>
            <p className="text-slate-600">Des solutions concrètes pour sécuriser et optimiser votre infrastructure.</p>
          </motion.div>

          {/* Staggered Container for Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* OFFRE 1: CYBERWIZE */}
            <OfferCard
              title="Cyberwize"
              tag="Diagnostic offert (30 jrs)"
              tagStyle="bg-[#2563eb]/10 text-[#2563eb] border border-[#2563eb]/20"
              icon={<Shield className="w-6 h-6 text-[#2563eb]" />}
              iconBgStyle="bg-[#2563eb]/10 border border-[#2563eb]/20"
              glowColor="rgba(37, 99, 235, 0.12)"
              features={[
                "Analyse de votre exposition aux risques",
                "Identification des vulnérabilités",
                "Recommandations d'amélioration"
              ]}
              ctaText="Je profite de l'offre"
              ctaStyle="border-2 border-slate-200 hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white text-slate-900"
            />

            {/* OFFRE 2: DIGIWIZE PME (Featured) */}
            <OfferCard
              title="Digiwize PME"
              tag="30 jours d'essai gratuit"
              tagStyle="bg-slate-100 text-slate-600 border border-slate-200"
              icon={<Users className="w-6 h-6 text-white" />}
              iconBgStyle="bg-[#f0822a] shadow-lg shadow-[#f0822a]/40"
              glowColor="rgba(240, 130, 42, 0.12)"
              features={[
                "Messagerie professionnelle moderne",
                "Outils collaboratifs",
                "Productivité renforcée"
              ]}
              ctaText="Tester Digiwize"
              ctaStyle="bg-[#f0822a] hover:bg-[#d9751e] shadow-lg shadow-[#f0822a]/30 text-white"
              isFeatured={true}
            />

            {/* OFFRE 3: AMBRA CLOUD */}
            <OfferCard
              title="Ambra Cloud"
              tag="15 jours d'hébergement"
              tagStyle="bg-[#c03c0c]/10 text-[#c03c0c] border border-[#c03c0c]/20"
              icon={<Cloud className="w-6 h-6 text-[#c03c0c]" />}
              iconBgStyle="bg-[#c03c0c]/10 border border-[#c03c0c]/20"
              glowColor="rgba(192, 60, 12, 0.12)"
              features={[
                "Hébergement local et sécurisé",
                "Sauvegarde des données",
                "Disponibilité optimale"
              ]}
              ctaText="Découvrir le Cloud"
              ctaStyle="border-2 border-slate-200 hover:border-[#c03c0c] hover:bg-[#c03c0c] hover:text-white text-slate-900"
            />
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 - FORMULAIRE LEADS */}
      <section id="contact" className="py-24 bg-white border-t border-slate-200 px-6 relative z-10">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Profitez immédiatement de votre offre</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Accédez à nos offres exclusives et échangez directement avec nos experts en cybersécurité et infrastructures.
            </p>
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600">
              <strong className="block text-slate-900 mb-2 font-bold">Informations requises</strong>
              En soumettant ce formulaire, nos équipes vous recontacteront dans les 24 heures pour activer votre période d'essai ou votre diagnostic.
            </div>
          </motion.div>

          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="bg-white p-8 md:p-10 border border-slate-200 rounded-2xl shadow-xl relative overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-6 relative z-10">

              {/* Form fields with custom bottom line expansion animation */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Nom complet *</label>
                <div className="relative group overflow-hidden rounded">
                  <input type="text" className="w-full border border-slate-300 rounded px-4 py-3 text-sm focus:border-[#f0822a] outline-none transition-all duration-300 bg-slate-50/50 focus:bg-white" placeholder="Jean Dupont" required />
                  <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#f0822a] transition-all duration-300 ease-out group-focus-within:w-full group-focus-within:left-0" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Entreprise *</label>
                <div className="relative group overflow-hidden rounded">
                  <input type="text" className="w-full border border-slate-300 rounded px-4 py-3 text-sm focus:border-[#f0822a] outline-none transition-all duration-300 bg-slate-50/50 focus:bg-white" placeholder="Nom de l'entreprise" required />
                  <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#f0822a] transition-all duration-300 ease-out group-focus-within:w-full group-focus-within:left-0" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Fonction</label>
                <div className="relative group overflow-hidden rounded">
                  <input type="text" className="w-full border border-slate-300 rounded px-4 py-3 text-sm focus:border-[#f0822a] outline-none transition-all duration-300 bg-slate-50/50 focus:bg-white" placeholder="DSI, CEO..." />
                  <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#f0822a] transition-all duration-300 ease-out group-focus-within:w-full group-focus-within:left-0" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Téléphone *</label>
                <div className="relative group overflow-hidden rounded">
                  <input type="tel" className="w-full border border-slate-300 rounded px-4 py-3 text-sm focus:border-[#f0822a] outline-none transition-all duration-300 bg-slate-50/50 focus:bg-white" placeholder="+225" required />
                  <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#f0822a] transition-all duration-300 ease-out group-focus-within:w-full group-focus-within:left-0" />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Adresse email *</label>
                <div className="relative group overflow-hidden rounded">
                  <input type="email" className="w-full border border-slate-300 rounded px-4 py-3 text-sm focus:border-[#f0822a] outline-none transition-all duration-300 bg-slate-50/50 focus:bg-white" placeholder="jean@entreprise.com" required />
                  <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#f0822a] transition-all duration-300 ease-out group-focus-within:w-full group-focus-within:left-0" />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Offre ciblée *</label>
                <div className="relative group overflow-hidden rounded">
                  <select className="w-full border border-slate-300 rounded px-4 py-3 text-sm focus:border-[#f0822a] outline-none transition-all duration-300 bg-slate-50/50 focus:bg-white appearance-none pr-10">
                    <option>Sélectionnez une offre</option>
                    <option>Cyberwize (Diagnostic)</option>
                    <option>Digiwize PME (Essai gratuit)</option>
                    <option>Ambra Cloud (Hébergement gratuit)</option>
                  </select>
                  <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#f0822a] transition-all duration-300 ease-out group-focus-within:w-full group-focus-within:left-0" />
                  {/* Decorative dropdown arrow icon */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2050/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 pt-4">
                <motion.button
                  type="submit"
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "#f0822a",
                    boxShadow: "0 10px 20px -5px rgba(240, 130, 42, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  className="w-full py-4 bg-[#0f172a] text-white font-bold uppercase tracking-wider text-sm rounded transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Envoyer la demande
                </motion.button>
              </div>
            </div>
          </motion.form>
        </div>
      </section>

      {/* SECTION 5 - URGENCE */}
      <section className="bg-[#f0822a] text-white py-8 overflow-hidden flex border-b-4 border-[#d9751e] relative z-10 select-none">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          className="flex whitespace-nowrap text-xl md:text-2xl font-bold uppercase tracking-wider"
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="mx-12">•</span> Offres valables uniquement pendant l'évènement ESCA 50 ans
            </div>
          ))}
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-slate-400 pt-20 pb-10 px-6 relative z-10 border-t border-slate-900/60 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#f0822a]/10 blur-[100px]" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#2563eb]/10 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-slate-900/60">
            
            {/* Colonne 1: Brand & Description */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              <div className="bg-black/40 backdrop-blur px-4 py-2 rounded-xl inline-block shadow-lg border border-slate-800/80">
                <Image
                  src="/image.png"
                  alt="Logo Agilly"
                  width={130}
                  height={44}
                  className="h-9 w-auto object-contain"
                />
              </div>
              <p className="text-sm text-slate-450 text-center md:text-left leading-relaxed max-w-xs">
                L’excellence numérique, en toute sérénité. Partenaire de confiance pour votre transition cloud et votre cybersécurité.
              </p>
              {/* Réseaux Sociaux */}
              <div className="flex items-center gap-4 pt-2">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:border-[#f0822a] hover:text-[#f0822a] flex items-center justify-center transition-all duration-300">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
                <a href="http://www.agilly.net" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:border-[#f0822a] hover:text-[#f0822a] flex items-center justify-center transition-all duration-300">
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Colonne 2: Nos Offres */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-6">Offres Cinquantenaire</h4>
              <ul className="space-y-3 text-sm text-center md:text-left">
                <li>
                  <a href="#offres" className="hover:text-[#f0822a] transition-colors duration-200">Cyberwize — Diagnostic Cyber</a>
                </li>
                <li>
                  <a href="#offres" className="hover:text-[#f0822a] transition-colors duration-200">Digiwize PME — Collaboration</a>
                </li>
                <li>
                  <a href="#offres" className="hover:text-[#f0822a] transition-colors duration-200">Ambra Cloud — Hébergement Local</a>
                </li>
              </ul>
            </div>

            {/* Colonne 3: Contact & Stand */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-6">Contact & Stand</h4>
              <ul className="space-y-3 text-sm text-center md:text-left">
                <li className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f0822a]"></span>
                  <span>Stand AGILLY — Hall ESCA</span>
                </li>
                <li>
                  <a href="tel:+2252522001422" className="hover:text-white transition-colors duration-200">+225 25 22 00 14 22</a>
                </li>
                <li>
                  <a href="mailto:infos@agilly.net" className="hover:text-white transition-colors duration-200">infos@agilly.net</a>
                </li>
              </ul>
            </div>

            {/* Colonne 4: Événement ESCA */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-6">ESCA 50 Ans</h4>
              <div className="border border-slate-900 rounded-2xl p-4 bg-slate-900/40 text-center md:text-left space-y-3 w-full">
                <p className="text-xs leading-relaxed text-slate-450">
                  En partenariat officiel avec l'ESCA Business School à l'occasion de son cinquantenaire d'excellence académique.
                </p>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#f0822a] bg-[#f0822a]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  🎉 1976 - 2026
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Row */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <p className="text-slate-500 text-center md:text-left">
              &copy; {new Date().getFullYear()} AGILLY. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6 text-slate-500">
              <a href="http://www.agilly.net" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Site principal</a>
              <span>•</span>
              <span>Mentions légales</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

