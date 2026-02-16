import React from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
  scrollY: number;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, scrollY }) => {
  
  const winH = typeof window !== 'undefined' ? window.innerHeight : 1000;
  
  // Hero Opacity & Scale
  const heroOpacity = Math.max(0, 1 - (scrollY / (winH * 0.5)));
  const heroScale = 1 + (scrollY * 0.0005);
  
  // Features Transition
  const featureProgress = (scrollY - (winH * 0.5)) / winH;
  let featureOpacity = 0;
  let featureX = -50;
  
  if (scrollY > winH * 0.5 && scrollY < winH * 1.8) {
      if (featureProgress < 0.3) {
          featureOpacity = featureProgress / 0.3;
          featureX = -50 * (1 - featureOpacity);
      } else if (featureProgress > 0.8) {
          featureOpacity = 1 - ((featureProgress - 0.8) / 0.2);
          featureX = 0;
      } else {
          featureOpacity = 1;
          featureX = 0;
      }
  }

  // Roadmap Transition
  const roadmapStart = winH * 1.8;
  const roadmapProgress = (scrollY - roadmapStart) / (winH * 0.5);
  let roadmapOpacity = Math.max(0, Math.min(1, roadmapProgress));
  let roadmapX = 50 * (1 - roadmapOpacity);

  return (
    <div className="relative z-10 w-full overflow-hidden">
      
      {/* Background Parallax Orbs - Pushed further back */}
      <div className="absolute top-0 left-0 w-full h-[300vh] overflow-hidden -z-20 pointer-events-none">
         <div 
           className="absolute top-[5%] left-[10%] w-[40vw] h-[40vw] bg-amber-100/30 rounded-full blur-[100px] mix-blend-multiply transition-transform duration-75 ease-linear"
           style={{ transform: `translate3d(0, ${scrollY * 0.5}px, 0)` }}
         ></div>
      </div>

      {/* SECTION 1: HERO - CENTER ALIGNED & RESPONSIVE */}
      {/* Changed h-screen to min-h-[90vh] and added pt-32 to fix the "Gap" and visual balance */}
      <div 
        className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 md:px-6 pt-24 md:pt-32 pb-12"
        style={{ opacity: heroOpacity, transform: `scale(${heroScale})`, pointerEvents: heroOpacity > 0.1 ? 'auto' : 'none' }}
      >
          <div className="mb-6 md:mb-8 relative animate-float">
             <div className="absolute -inset-4 bg-amber-200/20 blur-xl rounded-full animate-pulse"></div>
             <div className="relative inline-flex items-center space-x-3 border border-stone-200 bg-white/60 backdrop-blur-md rounded-full px-4 py-2 shadow-sm">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>
                <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase text-stone-600">Divine Engine Active</span>
             </div>
          </div>
          
          {/* Responsive Typography: clamp() equivalent using Tailwind sizes */}
          <h1 className="text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] font-black tracking-tighter text-stone-900 leading-[0.9] font-display mb-6 md:mb-8 mix-blend-darken drop-shadow-sm">
            BUILD <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-500 to-amber-700">LEGACY</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-stone-600 max-w-xl mx-auto font-light mb-10 leading-relaxed px-4">
            The Operating System for Visionaries. <br className="hidden md:inline"/>
            <span className="font-medium text-stone-900">vickyiitp</span> combines AI foresight with legal armor.
          </p>
          
          <button
              onClick={onGetStarted}
              className="px-8 py-4 md:px-10 md:py-5 bg-stone-900 text-white text-xs md:text-sm font-bold uppercase tracking-widest rounded-full hover:bg-amber-600 hover:scale-105 transition-all shadow-2xl z-20"
          >
              Start Building
          </button>
      </div>

      {/* SECTION 2: FEATURES */}
      <div 
        className="absolute top-[100vh] w-full min-h-screen flex items-center"
        style={{ 
            opacity: featureOpacity, 
            transform: `translate3d(${featureX}px, 0, 0)`,
            pointerEvents: featureOpacity > 0.1 ? 'auto' : 'none'
        }}
      >
         <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="text-left md:pr-12 bg-white/50 md:bg-transparent backdrop-blur-sm p-6 md:p-0 rounded-3xl">
                  <h2 className="text-4xl md:text-6xl font-black text-stone-900 font-display mb-8 md:mb-12 leading-none">
                    THE <span className="text-amber-600">TRISHUL</span><br/>PROTOCOL
                  </h2>
                  
                  <div className="space-y-6">
                     {[
                         { id: '01', title: 'GENERATE', desc: 'AI-powered ideation and market gap analysis.' },
                         { id: '02', title: 'VALIDATE', desc: 'Stress-test your business model before writing code.' },
                         { id: '03', title: 'DOMINATE', desc: 'Legal structuring and execution roadmaps.' }
                     ].map((item) => (
                        <div key={item.id} className="group border-b border-stone-200 pb-6 hover:pl-4 transition-all duration-300 cursor-default">
                            <span className="text-xs font-bold text-amber-600 mb-1 block tracking-widest">{item.id}</span>
                            <h3 className="text-2xl md:text-3xl font-bold text-stone-800 mb-2 font-display">{item.title}</h3>
                            <p className="text-sm md:text-base text-stone-500 font-light">{item.desc}</p>
                        </div>
                     ))}
                  </div>
              </div>
              <div>{/* Spacer for Trisula */}</div>
            </div>
         </div>
      </div>

      {/* SECTION 3: ROADMAP */}
      <div 
        className="absolute top-[200vh] w-full min-h-screen flex items-center pb-20"
        style={{ 
            opacity: roadmapOpacity, 
            transform: `translate3d(${roadmapX}px, 0, 0)`,
            pointerEvents: roadmapOpacity > 0.1 ? 'auto' : 'none'
        }}
      >
         <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>{/* Spacer for Trisula */}</div>
               
               <div className="text-right md:pl-12 flex flex-col items-end bg-white/50 md:bg-transparent backdrop-blur-sm p-6 md:p-0 rounded-3xl">
                  <h2 className="text-4xl md:text-6xl font-black text-stone-900 font-display mb-8 md:mb-12 leading-none">
                    DIVINE <span className="text-orange-600">PATH</span>
                  </h2>
                  
                  <div className="grid gap-4 w-full">
                    {['Ideation Phase', 'Market Validation', 'Legal Structure', 'Scale Operations'].map((step, i) => (
                      <div key={i} className="bg-white/60 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-stone-100 flex items-center justify-between hover:shadow-lg hover:border-amber-200 transition-all">
                         <span className="text-3xl md:text-4xl font-black text-stone-200">0{i+1}</span>
                         <h3 className="text-sm md:text-lg font-bold text-stone-800 uppercase tracking-widest">{step}</h3>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 md:mt-16 w-full md:w-auto">
                    <button onClick={onGetStarted} className="w-full md:w-auto px-12 py-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-black text-lg md:text-xl rounded-lg hover:shadow-orange-500/30 hover:shadow-2xl hover:-translate-y-1 transition-all uppercase tracking-widest">
                       Begin Your Journey
                    </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
      
      {/* Height Spacer to allow scrolling */}
      <div className="h-[320vh]"></div>

    </div>
  );
};

export default LandingPage;