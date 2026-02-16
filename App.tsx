
import React, { useState, useRef, useEffect } from 'react';
import { analyzeIdea } from './services/geminiService';
import { StartupAnalysis } from './types';
import AnalysisResult from './components/AnalysisResult';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'app'>('landing');
  const [idea, setIdea] = useState('');
  const [analysis, setAnalysis] = useState<StartupAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Textarea Limits
  const MAX_CHARS = 3000;
  
  // Physics & Animation Refs
  const trisulaRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State for Scroll
  const [scrollY, setScrollY] = useState(0);
  const [hasAttacked, setHasAttacked] = useState(false);
  
  // Dimensions
  const [winHeight, setWinHeight] = useState(1000);
  const [winWidth, setWinWidth] = useState(1000);

  useEffect(() => {
    // Initial Setup
    setWinHeight(window.innerHeight);
    setWinWidth(window.innerWidth);
    setTimeout(() => setHasAttacked(true), 100);

    const handleScroll = () => {
       setScrollY(window.scrollY);
    };
    
    const handleResize = () => {
      setWinHeight(window.innerHeight);
      setWinWidth(window.innerWidth);
    }
    
    // OPTIMIZED MOUSE MOVEMENT
    const handleMouseMove = (e: MouseEvent) => {
        if (trisulaRef.current && window.innerWidth > 768) {
             const x = (e.clientX / window.innerWidth - 0.5) * 20; 
             const y = (e.clientY / window.innerHeight - 0.5) * 20;
             trisulaRef.current.style.setProperty('--mouse-rot-y', `${x}deg`);
             trisulaRef.current.style.setProperty('--mouse-rot-x', `${-y}deg`);
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const runAnalysis = async (inputIdea: string) => {
    if (!inputIdea.trim()) return;

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeIdea(inputIdea);
      setAnalysis(result);
    } catch (err) {
      setError("Failed to analyze. Please try again or check your connection.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runAnalysis(idea);
  };

  const handleSuggestionClick = (question: string) => {
     setIdea(question);
     runAnalysis(question);
     window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [idea]);

  // --- PHYSICS CALCULATIONS ---
  const calculateTrisulaTransform = () => {
    if (!hasAttacked) {
        return { x: 0, y: 0, rotY: 0, rotX: 0, scale: 20, opacity: 0 };
    }

    const heroEnd = winHeight * 0.6;
    const featureEnd = winHeight * 1.8;
    const isMobile = winWidth < 768; 

    let x = 0; 
    let rotY = 0; 
    let rotX = 0;
    let scale = isMobile ? 0.5 : 0.9; 

    if (scrollY < heroEnd) {
        x = 0;
        rotY = scrollY * 0.05;
        scale = (isMobile ? 0.5 : 0.9) + (scrollY * 0.0002);
    } else if (scrollY >= heroEnd && scrollY < featureEnd) {
        const progress = Math.min(1, (scrollY - heroEnd) / (winHeight));
        const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
        
        if (isMobile) {
            x = 0;
            scale = 0.5 - (progress * 0.1);
        } else {
            x = 35 * ease;
            rotY = -25 * ease;
            rotX = 10 * ease;
            scale = 0.8;
        }
    } else {
        const progress = Math.min(1, (scrollY - featureEnd) / (winHeight));
        const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
        
        if (isMobile) {
             x = 0;
        } else {
            x = 35 - (70 * ease);
            rotY = -25 + (50 * ease); 
            rotX = 10 - (5 * ease);
        }
    }

    return { x, rotY, rotX, scale };
  };

  const t = calculateTrisulaTransform();
  
  const finalTransform = `
    translateX(${t.x}vw)
    rotateY(calc(${t.rotY}deg + var(--mouse-rot-y, 0deg)))
    rotateX(calc(${t.rotX}deg + var(--mouse-rot-x, 0deg)))
    scale(${t.scale})
  `;
  
  // Char Count Logic
  const charPercentage = (idea.length / MAX_CHARS) * 100;
  const isNearLimit = charPercentage > 90;

  return (
    <div className="min-h-screen relative overflow-x-hidden font-body bg-[#FDFBF7] selection:bg-amber-500 selection:text-white">
      
      {/* 3D SCENE LAYER */}
      <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 perspective-1000 overflow-hidden flex items-center justify-center">
          <div 
            ref={trisulaRef}
            className={`transform-style-3d will-change-transform ${hasAttacked ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transform: finalTransform,
              width: '500px',
              height: '1000px',
              transition: 'opacity 1s ease-out, transform 0.1s linear', 
              '--mouse-rot-y': '0deg', 
              '--mouse-rot-x': '0deg'
            } as React.CSSProperties}
          >
            {/* ... (Trisula SVG Code - kept identical to ensure previous 3D request persists) ... */}
             <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20 animate-spin-slow mix-blend-multiply">
               <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M50 0 L55 40 L50 50 L45 40 Z" fill="url(#goldMetal)" />
                  <path d="M50 100 L55 60 L50 50 L45 60 Z" fill="url(#goldMetal)" />
                  <path d="M0 50 L40 55 L50 50 L40 45 Z" fill="url(#goldMetal)" />
                  <path d="M100 50 L60 55 L50 50 L60 45 Z" fill="url(#goldMetal)" />
                  <circle cx="50" cy="50" r="30" stroke="url(#goldMetal)" strokeWidth="0.5" fill="none" strokeDasharray="1 2"/>
                  <circle cx="50" cy="50" r="40" stroke="url(#goldMetal)" strokeWidth="0.2" fill="none"/>
               </svg>
            </div>
            <svg viewBox="0 0 400 900" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl filter saturate-[1.1]">
              <defs>
                <linearGradient id="goldMetal" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#78350f" />
                  <stop offset="30%" stopColor="#fbbf24" />
                  <stop offset="50%" stopColor="#fffbeb" />
                  <stop offset="70%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#451a03" />
                </linearGradient>

                <linearGradient id="shaftDark" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1c1917" />
                  <stop offset="50%" stopColor="#44403c" />
                  <stop offset="100%" stopColor="#0c0a09" />
                </linearGradient>

                <filter id="divineGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <rect x="190" y="300" width="20" height="580" rx="10" fill="url(#shaftDark)" />
              <rect x="195" y="300" width="4" height="580" fill="rgba(255,255,255,0.1)" />
              <g transform="translate(200, 600) rotate(-10)">
                  <path d="M-30 -25 L30 -25 L0 0 L-30 -25 Z" fill="url(#shaftDark)" stroke="url(#goldMetal)" strokeWidth="2"/>
                  <path d="M-30 25 L30 25 L0 0 L-30 25 Z" fill="url(#shaftDark)" stroke="url(#goldMetal)" strokeWidth="2"/>
                  <path d="M-30 -25 Q -40 0 -30 25" stroke="#fbbf24" strokeWidth="1" fill="none" />
                  <path d="M30 -25 Q 40 0 30 25" stroke="#fbbf24" strokeWidth="1" fill="none" />
              </g>
              <path d="M160 300 Q 200 340 240 300 L 230 280 Q 200 310 170 280 Z" fill="url(#goldMetal)" filter="url(#divineGlow)" />
              <path d="M170 290 C 170 200, 80 200, 80 120 L 60 140 L 80 120 L 100 140" fill="none" stroke="url(#goldMetal)" strokeWidth="22" strokeLinecap="round" />
              <path d="M80 120 L 65 60 L 95 60 Z" fill="url(#goldMetal)" />
              <path d="M230 290 C 230 200, 320 200, 320 120 L 300 140 L 320 120 L 340 140" fill="none" stroke="url(#goldMetal)" strokeWidth="22" strokeLinecap="round" />
              <path d="M320 120 L 305 60 L 335 60 Z" fill="url(#goldMetal)" />
              <path d="M200 300 L 180 50 L 200 10 L 220 50 Z" fill="url(#goldMetal)" filter="url(#divineGlow)" />
              <g opacity="0.8">
                  <path d="M185 200 L 215 200" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
                  <path d="M185 210 L 215 210" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
                  <path d="M185 220 L 215 220" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="200" cy="210" r="4" fill="red" />
              </g>
              <circle cx="200" cy="150" r="5" fill="#fff" filter="blur(2px)" className="animate-pulse" />
            </svg>
          </div>
      </div>

      {/* HEADER */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${view === 'landing' ? 'bg-gradient-to-b from-white/80 to-transparent backdrop-blur-[2px]' : 'bg-white/90 backdrop-blur-xl border-b border-stone-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 md:h-24 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setView('landing')}>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-stone-900 rounded-lg flex items-center justify-center text-amber-500 shadow-xl border border-amber-500/30 group-hover:rotate-180 transition-transform duration-500">
               <span className="font-display font-black text-lg md:text-xl">V</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg md:text-xl font-bold text-stone-900 tracking-tighter font-display">vicky<span className="text-amber-600">iitp</span></h1>
            </div>
          </div>
          <nav className="flex gap-4 md:gap-6 items-center">
             {view === 'landing' && (
                <button 
                  onClick={() => setView('app')}
                  className="px-4 py-2 md:px-6 md:py-2 rounded-lg bg-stone-900 text-amber-500 border border-amber-500/20 hover:bg-stone-800 hover:scale-105 transition-all shadow-lg font-bold text-[10px] md:text-xs uppercase tracking-widest"
                >
                  Launch App
                </button>
             )}
             {view === 'app' && (
               <button 
                  onClick={() => setView('landing')}
                  className="text-[10px] md:text-xs font-bold text-stone-500 hover:text-amber-600 uppercase tracking-widest"
               >
                 Close
               </button>
             )}
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      {view === 'landing' ? (
        <LandingPage onGetStarted={() => setView('app')} scrollY={scrollY} />
      ) : (
        <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-32 w-full animate-reveal relative z-10">
          
          {!analysis && !loading && (
             <div className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-50/80 backdrop-blur-md shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>
                <span className="text-[10px] text-amber-800 font-bold tracking-widest uppercase">System Ready</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-bold text-stone-900 mb-8 tracking-tighter font-display leading-[0.9]">
                VALIDATE. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">EXECUTE.</span>
              </h2>
            </div>
          )}

          {/* INPUT FORM WITH REAL-TIME CHAR COUNT */}
          <div className={`transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${analysis ? 'mb-12' : 'mb-0'}`}>
            <form onSubmit={handleSubmit} className="relative group max-w-3xl mx-auto">
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500 ${loading ? 'opacity-50 animate-pulse' : ''}`}></div>
              <div className="relative bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xl">
                <div className="p-1">
                  <textarea
                    ref={textareaRef}
                    value={idea}
                    maxLength={MAX_CHARS}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="Describe your startup idea or ask multiple questions (e.g. 'How to register? AND How to market?')..."
                    className="w-full bg-white border-0 text-stone-800 placeholder:text-stone-300 focus:ring-0 text-lg md:text-xl resize-none min-h-[120px] p-6 leading-relaxed font-light font-display"
                    disabled={loading}
                    autoFocus
                  />
                </div>
                
                {/* Visual Progress Indicator */}
                <div className="h-1 w-full bg-stone-100">
                    <div 
                        className={`h-full transition-all duration-300 ${isNearLimit ? 'bg-red-500' : 'bg-amber-500'}`} 
                        style={{ width: `${charPercentage}%` }}
                    ></div>
                </div>

                <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <span className={`text-[10px] uppercase tracking-widest font-bold transition-colors ${isNearLimit ? 'text-red-500 animate-pulse' : 'text-stone-400'}`}>
                      {idea.length} / {MAX_CHARS} Chars
                    </span>
                    {idea.length === 0 && <span className="text-[10px] text-stone-300 font-bold hidden md:inline">waiting for input...</span>}
                  </div>
                  <button
                    type="submit"
                    disabled={loading || !idea.trim()}
                    className={`inline-flex items-center px-6 py-3 md:px-8 rounded-lg text-xs font-black uppercase tracking-widest transition-all transform duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none
                      ${loading || !idea.trim() 
                        ? 'bg-stone-200 text-stone-400 cursor-not-allowed' 
                        : 'bg-stone-900 text-white hover:bg-amber-600 shadow-xl'}`}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        Processing...
                      </span>
                    ) : (
                      <>Run Analysis <span className="ml-2">→</span></>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg bg-red-50 p-4 mb-8 border border-red-200 text-red-600 text-center text-sm font-medium">
              {error}
            </div>
          )}

          {/* Results */}
          {analysis && (
            <div className="mb-24">
              <AnalysisResult analysis={analysis} onAskQuestion={handleSuggestionClick} />
              <div className="mt-16 flex justify-center">
                <button 
                  onClick={() => {
                    setAnalysis(null);
                    setIdea('');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    if(textareaRef.current) textareaRef.current.focus();
                  }}
                  className="px-8 py-3 border border-stone-300 rounded-full text-stone-600 font-bold uppercase tracking-widest text-xs hover:bg-stone-900 hover:text-white transition-all duration-300"
                >
                  New Analysis
                </button>
              </div>
            </div>
          )}
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-stone-200 relative z-10 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-300">vickyiitp system v2.0</span>
        </div>
      </footer>
      
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .bg-radial-vignette { background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%); }
        @keyframes spin-slow {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
      `}</style>
    </div>
  );
};

export default App;
