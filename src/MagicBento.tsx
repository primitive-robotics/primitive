import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react';
import { Activity, Layers, ShieldCheck, Zap, Cpu, Box } from 'lucide-react';

interface MagicBentoProps {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  glowColor?: string;
  disableAnimations?: boolean;
}

const BentoCard = ({ 
  children, 
  className = "", 
  title, 
  description, 
  icon: Icon,
  glowColor,
  enableSpotlight,
  spotlightRadius,
  enableBorderGlow,
  textAutoHide,
  disableAnimations
}: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={disableAnimations ? undefined : { opacity: 0, y: 20 }}
      whileInView={disableAnimations ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative group overflow-hidden glass-panel border-white/5 p-8 flex flex-col justify-between h-full transition-all duration-500 ${className}`}
    >
      {/* Spotlight Effect */}
      {enableSpotlight && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(${spotlightRadius}px circle at ${mouseX}px ${mouseY}px, rgba(${glowColor}, 0.15), transparent 80%)`,
          }}
        />
      )}

      {/* Border Glow */}
      {enableBorderGlow && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(${glowColor}, 0.4), transparent 40%)`,
            maskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '1px'
          }}
        />
      )}

      <div className="relative z-10">
        <div className="mb-4 inline-flex p-3 rounded-lg bg-white/5 text-accent group-hover:scale-110 transition-transform duration-500">
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-display font-black uppercase tracking-tight mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <motion.p 
          initial={textAutoHide ? { opacity: 0, height: 0 } : { opacity: 0.4 }}
          animate={textAutoHide ? (isHovered ? { opacity: 0.6, height: 'auto' } : { opacity: 0, height: 0 }) : { opacity: 0.4 }}
          className="text-sm font-light leading-relaxed overflow-hidden"
        >
          {description}
        </motion.p>
      </div>

      <div className="relative z-10 mt-8">
        {children}
      </div>
    </motion.div>
  );
};

const MagicBento: React.FC<MagicBentoProps> = ({
  textAutoHide = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  spotlightRadius = 400,
  glowColor = "59, 130, 246", // Default Blue
  disableAnimations = false,
}) => {
  return (
    <section id="product" className="py-24 px-6 md:px-12 bg-industrial-950">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-accent font-mono text-sm tracking-widest uppercase mb-4 block">The Hardware</span>
          <h2 className="text-5xl md:text-7xl font-display font-black uppercase leading-tight">
            Standardized <br />
            <span className="text-white/20">Intelligence.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
          {/* 01. The Arm */}
          <BentoCard
            className="md:col-span-2"
            title="01. The Arm"
            description="Standard 6-axis industrial precision. Cloning hands, not replacing him. High-torque, high-speed, and ready for 24/7 operation."
            icon={Activity}
            glowColor={glowColor}
            enableSpotlight={enableSpotlight}
            spotlightRadius={spotlightRadius}
            enableBorderGlow={enableBorderGlow}
            textAutoHide={textAutoHide}
            disableAnimations={disableAnimations}
          >
            <div className="flex items-center gap-4">
              <div className="px-3 py-1 bg-accent/10 border border-accent/20 rounded text-[10px] font-mono text-accent uppercase">6-Axis Precision</div>
              <div className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-white/40 uppercase">IP67 Rated</div>
            </div>
          </BentoCard>

          {/* 02. The Base */}
          <BentoCard
            title="02. The Base"
            description="Roll-in, plug-in deployment. No fixed infrastructure or expensive integrators."
            icon={Layers}
            glowColor={glowColor}
            enableSpotlight={enableSpotlight}
            spotlightRadius={spotlightRadius}
            enableBorderGlow={enableBorderGlow}
            textAutoHide={textAutoHide}
            disableAnimations={disableAnimations}
          >
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-accent" 
                animate={{ width: ["0%", "100%"] }} 
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} 
              />
            </div>
          </BentoCard>

          {/* 03. The Vision */}
          <BentoCard
            title="03. The Vision"
            description="Real-time spatial intelligence. Resilient to real-world drops and misalignment."
            icon={Cpu}
            glowColor={glowColor}
            enableSpotlight={enableSpotlight}
            spotlightRadius={spotlightRadius}
            enableBorderGlow={enableBorderGlow}
            textAutoHide={textAutoHide}
            disableAnimations={disableAnimations}
          >
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full border-2 border-accent flex items-center justify-center">
                <div className="w-4 h-4 bg-accent rounded-full animate-ping" />
              </div>
            </div>
          </BentoCard>

          {/* Fully Integrated */}
          <BentoCard
            className="md:col-span-2"
            title="Fully Integrated"
            description="A productized service that owns the outcome. Deploy in a week, pay monthly. Includes safety rails, recovery logic, and natural language interface."
            icon={Zap}
            glowColor={glowColor}
            enableSpotlight={enableSpotlight}
            spotlightRadius={spotlightRadius}
            enableBorderGlow={enableBorderGlow}
            textAutoHide={textAutoHide}
            disableAnimations={disableAnimations}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 glass-panel border-white/5">
                <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Safety</div>
                <div className="text-accent font-bold flex items-center gap-2">
                  <ShieldCheck size={14} /> NOMINAL
                </div>
              </div>
              <div className="p-4 glass-panel border-white/5">
                <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Recovery</div>
                <div className="text-accent font-bold flex items-center gap-2">
                  <Zap size={14} /> AUTO-RESUME
                </div>
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
};

export default MagicBento;
