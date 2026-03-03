import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { 
  Cpu, 
  ShieldCheck, 
  Box, 
  ArrowRight, 
  Play, 
  MessageSquare,
  Truck,
  Settings2,
  Maximize2,
  ChevronDown,
  Activity,
  Zap,
  Layers
} from "lucide-react";
import ModelViewer from './components/ModelViewer';
import MagicBento from './MagicBento';

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-6">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]">P</div>
      <span className="text-2xl font-display font-black tracking-tight uppercase">Primitive</span>
    </div>
    <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-white/60">
      <a href="#product" className="hover:text-white transition-colors">Product</a>
      <a href="#problem" className="hover:text-white transition-colors">The Gap</a>
      <a href="#process" className="hover:text-white transition-colors">Deployment</a>
      <button className="px-5 py-2 bg-accent text-white rounded-full font-bold hover:bg-success transition-all shadow-lg shadow-accent/20">
        Rent an Employee
      </button>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-industrial-950">
    {/* Full Background Model */}
    <div className="absolute inset-0 z-0 opacity-80">
      <ModelViewer
        url="https://raw.githubusercontent.com/primitive-robotics/source/main/robotic_arm.glb"
        width="100%"
        height="100%"
        modelXOffset={0.8}
        modelYOffset={-0.2}
        enableMouseParallax
        enableHoverRotation
        environmentPreset="studio"
        fadeIn={true}
        autoRotate={true}
        autoRotateSpeed={0.1}
        showScreenshotButton={false}
      />
    </div>

    {/* Minimalistic Content Overlay */}
    <div className="relative z-10 w-full px-6 pointer-events-none">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-6xl md:text-9xl font-display font-bold tracking-tighter text-white text-glow leading-none mb-4">
          Robots that <br />
          work for you.
        </h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-sm md:text-base font-mono uppercase tracking-[0.3em] text-white/60"
        >
          Primitive Robotics — The Future of Uptime
        </motion.p>
      </motion.div>
    </div>

    {/* Minimalist Screenshot Button (Top Right) */}
    <div className="absolute top-8 right-8 z-20">
      <button 
        onClick={() => {
          const canvas = document.querySelector('.model-viewer-container canvas');
          if (canvas) {
            const link = document.createElement('a');
            link.download = 'primitive-robot.png';
            link.href = (canvas as HTMLCanvasElement).toDataURL();
            link.click();
          }
        }}
        className="px-6 py-2 border border-white/20 rounded-full text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-all pointer-events-auto"
      >
        Take Screenshot
      </button>
    </div>

    <motion.div 
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/10"
    >
      <ChevronDown size={24} />
    </motion.div>
  </section>
);

const ProblemSection = () => (
  <section id="problem" className="py-24 px-6 md:px-12 bg-industrial-950">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <div>
        <span className="text-accent font-mono text-sm tracking-widest uppercase mb-4 block">The Problem</span>
        <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 uppercase leading-tight">
          Idle machines <br />
          <span className="text-white/20">cost everything.</span>
        </h2>
        <p className="text-xl text-white/70 font-light leading-relaxed mb-8">
          The gap isn't that robot arms are unavailable. The gap is that nobody has packaged the missing middle into a product.
        </p>
        <div className="space-y-6">
          {[
            { title: "Hiring doesn't scale", desc: "Operators are scarce and expensive Swiss-Army-Knives." },
            { title: "Traditional automation fails", desc: "Integrator cells are slow, CapEx-heavy, and rigid." },
            { title: "The 'No-Code' Lie", desc: "Drag-and-drop is still logic. SMEs need outcomes, not tools." }
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="mt-1 text-accent"><ShieldCheck size={24} /></div>
              <div>
                <h4 className="font-bold uppercase tracking-tight">{item.title}</h4>
                <p className="text-white/40 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative">
        <div className="aspect-square glass-panel overflow-hidden relative group border-white/5">
          <img 
            src="https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=1000" 
            className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000"
            alt="Machine Shop"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-accent/5 mix-blend-overlay" />
          <div className="absolute bottom-8 left-8 right-8 p-6 glass-panel border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase text-accent">Machine Status</span>
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </div>
            <div className="text-2xl font-display font-bold uppercase">IDLE: 16:50:12</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ProductSpecs = () => (
  <section id="product" className="py-24 px-6 md:px-12 bg-industrial-900 overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-5xl md:text-7xl font-display font-bold uppercase mb-6">The Robot Employee</h2>
        <p className="text-xl text-white/60 max-w-2xl mx-auto font-light">
          A standardized, outcome-owned station sold as OpEx with uptime accountability.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <Maximize2 className="text-accent" />,
            title: "Form Factor",
            desc: "Standard 6-axis arm on a heavy rolling base + safety scanner + camera + compute box."
          },
          {
            icon: <MessageSquare className="text-success" />,
            title: "Interface",
            desc: "Natural language + guided workflows. Operate it like a power tool, not a programming environment."
          },
          {
            icon: <Cpu className="text-accent" />,
            title: "Core Tech",
            desc: "Deterministic safety sandbox + constrained motion generation + runtime guards + incident replay."
          }
        ].map((spec, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className="p-10 glass-panel border-white/5 hover:border-accent/30 transition-all"
          >
            <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit">{spec.icon}</div>
            <h3 className="text-2xl font-display font-bold uppercase mb-4">{spec.title}</h3>
            <p className="text-white/50 leading-relaxed">{spec.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ProcessSection = () => (
  <section id="process" className="py-24 px-6 md:px-12 bg-industrial-950">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <span className="text-accent font-mono text-sm tracking-widest uppercase mb-4 block">The Workflow</span>
          <h2 className="text-5xl md:text-7xl font-display font-bold uppercase leading-tight">
            Quiz to <span className="text-accent italic">Ship Kit</span>
          </h2>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { step: "01", icon: <Settings2 />, title: "Select Job", desc: "Lathe, Mill, or End-of-Line Stacking." },
          { step: "02", icon: <Play />, title: "Upload Video", desc: "10-20s phone video + 3 photos of the task." },
          { step: "03", icon: <Box />, title: "Get Kit", desc: "System recommends 1 of 5 standardized kits." },
          { step: "04", icon: <Truck />, title: "Self-Install", desc: "Roll-in, plug-in, calibrate. Ready in hours." }
        ].map((item, i) => (
          <div key={i} className="relative group">
            <div className="p-8 glass-panel h-full border-white/5 group-hover:border-accent/50 transition-all">
              <div className="text-4xl font-display font-bold text-white/5 mb-6 group-hover:text-accent/10 transition-colors">{item.step}</div>
              <div className="mb-4 text-accent">{item.icon}</div>
              <h4 className="text-xl font-display font-bold uppercase mb-2">{item.title}</h4>
              <p className="text-sm text-white/40">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-32 px-6 md:px-12 bg-industrial-900 text-white overflow-hidden relative">
    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 opacity-5">
      <h2 className="text-[20vw] font-display font-black uppercase leading-none">PRIMITIVE</h2>
    </div>
    
    <div className="max-w-7xl mx-auto relative z-10 text-center">
      <h2 className="text-5xl md:text-8xl font-display font-bold uppercase mb-12 leading-[0.85]">
        Stop babysitting <br />
        <span className="text-gradient italic">your machines.</span>
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <button className="px-12 py-6 bg-accent text-white rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-2xl shadow-accent/20">
          Rent an Employee Today
        </button>
        <button className="px-12 py-6 border-2 border-white/10 glass-panel rounded-full font-bold text-xl hover:bg-white/10 transition-all">
          Talk to an Engineer
        </button>
      </div>
      <p className="mt-12 text-sm font-mono uppercase tracking-widest font-bold opacity-40">
        No CapEx. No Programming. Just Uptime.
      </p>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 px-6 md:px-12 bg-industrial-950 border-t border-white/5">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-accent rounded-sm flex items-center justify-center font-bold text-white text-xs">P</div>
        <span className="text-lg font-display font-bold tracking-tighter uppercase">Primitive Robotics</span>
      </div>
      <div className="flex gap-8 text-xs font-mono uppercase tracking-widest text-white/40">
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
        <a href="#" className="hover:text-white transition-colors">Support</a>
        <span>© 2026 Primitive Robotics Inc.</span>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <main className="selection:bg-accent selection:text-white">
      <Navbar />
      <Hero />
      <MagicBento 
        textAutoHide={true}
        enableStars={false}
        enableSpotlight
        enableBorderGlow={true}
        enableTilt={false}
        enableMagnetism={false}
        clickEffect
        spotlightRadius={400}
        particleCount={12}
        glowColor="59, 130, 246"
        disableAnimations={false}
      />
      <ProblemSection />
      <ProductSpecs />
      <ProcessSection />
      <CTASection />
      <Footer />
    </main>
  );
}
