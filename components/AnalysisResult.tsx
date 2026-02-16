
import React from 'react';
import { StartupAnalysis, ValidationStatus } from '../types';

interface AnalysisResultProps {
  analysis: StartupAnalysis;
  onAskQuestion?: (question: string) => void;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis, onAskQuestion }) => {
  if (!analysis.isStartupRelated) {
    return (
      <div className="glass-light p-6 md:p-10 rounded-3xl border-l-4 border-orange-500 animate-reveal">
        <h3 className="text-2xl md:text-3xl font-bold text-stone-900 font-display mb-4">System Notice</h3>
        <p className="text-stone-500 text-lg font-light">{analysis.refusalMessage || "I specialized in startup validation only."}</p>
      </div>
    );
  }

  const getStatusColor = (status?: ValidationStatus) => {
    switch (status) {
      case ValidationStatus.VALID: return 'text-emerald-600 border-emerald-500/50 bg-emerald-50';
      case ValidationStatus.INVALID: return 'text-rose-600 border-rose-500/50 bg-rose-50';
      default: return 'text-amber-600 border-amber-500/50 bg-amber-50';
    }
  };

  const statusClass = getStatusColor(analysis.validationStatus);

  return (
    <div className="space-y-12 md:space-y-16 animate-reveal pb-12 w-full max-w-full overflow-hidden">
      
      {/* 1. Verdict & Status */}
      <div className="relative">
        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-transparent"></div>
        <div className="flex items-center space-x-3 mb-4">
           <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           <h2 className="text-xs font-bold text-amber-600 uppercase tracking-[0.3em]">Analysis Report</h2>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
           <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-stone-900 font-display leading-none break-words">
              {analysis.validationStatus?.toUpperCase() || "ANALYSIS"}
           </h1>
           <div className={`self-start md:self-end px-6 py-2 rounded-full border ${statusClass}`}>
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest whitespace-nowrap">Confidence Score: High</span>
           </div>
        </div>
        
        <p className="text-lg md:text-2xl text-stone-600 font-light leading-relaxed max-w-4xl border-t border-stone-200 pt-8">
            {analysis.reasoning}
        </p>
      </div>

      {/* 2. Detailed Response (For Multi-Questions) */}
      {analysis.detailedResponse && (
        <div className="bg-white p-6 md:p-10 rounded-3xl border border-stone-100 shadow-xl shadow-stone-200/50 ring-1 ring-stone-900/5">
            <div className="flex items-center gap-3 mb-6">
               <div className="p-2 bg-stone-900 rounded-lg text-amber-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
               </div>
               <h3 className="text-2xl font-bold text-stone-900 font-display">Deep Insight</h3>
            </div>
            <div className="prose prose-stone prose-lg max-w-none font-light">
                {/* Simple markdown parser could go here, for now rendering as text with whitespace preservation */}
                <p className="whitespace-pre-wrap leading-loose">{analysis.detailedResponse}</p>
            </div>
        </div>
      )}

      {/* 3. Core Analysis Grid with Icons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Problem */}
         <div className="bg-white p-6 md:p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
               <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
               </div>
               <h3 className="text-xl font-bold text-stone-900 font-display">The Problem</h3>
            </div>
            <p className="text-stone-600 leading-relaxed">{analysis.problemAnalysis || "No specific problem defined in the request."}</p>
         </div>

         {/* Market Gap */}
         <div className="bg-white p-6 md:p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
               <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
               </div>
               <h3 className="text-xl font-bold text-stone-900 font-display">Market Gap</h3>
            </div>
            <p className="text-stone-600 leading-relaxed">{analysis.marketGap || "Analysis in progress..."}</p>
         </div>
      </div>

      {/* 4. Video Learning (New Section) */}
      {analysis.videoSearchQueries && analysis.videoSearchQueries.length > 0 && (
         <div className="bg-stone-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 blur-[100px] rounded-full"></div>
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                    <h3 className="text-xl font-bold font-display">Learn from Experts</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {analysis.videoSearchQueries.map((query, idx) => (
                        <a 
                            key={idx}
                            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-[1.02] transition-all group"
                        >
                            <span className="text-sm font-medium text-stone-300 group-hover:text-white truncate">{query}</span>
                            <span className="text-stone-500 group-hover:text-red-400">→</span>
                        </a>
                    ))}
                </div>
             </div>
         </div>
      )}

      {/* 5. The Roadmap */}
      {analysis.executionRoadmap && (
        <div className="glass-light rounded-3xl p-6 md:p-12">
           <div className="flex items-center gap-3 mb-8 md:mb-12">
              <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-stone-900 font-display">Execution Protocol</h3>
           </div>
           
           <div className="relative border-l border-stone-200 ml-4 md:ml-6 space-y-12">
              {analysis.executionRoadmap.map((phase, idx) => (
                <div key={idx} className="relative pl-8 md:pl-12 group">
                  <div className="absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full bg-amber-500 ring-4 ring-white group-hover:scale-150 transition-transform shadow-sm"></div>
                  <h4 className="text-lg md:text-xl font-bold text-stone-900 mb-2 font-display">{phase.phase}</h4>
                  <p className="text-stone-500 mb-6 font-light italic text-sm">{phase.description}</p>
                  <div className="grid grid-cols-1 gap-3">
                     {phase.steps.map((step, sIdx) => (
                        <div key={sIdx} className="bg-white p-4 rounded-xl border border-stone-100 text-sm text-stone-600 hover:border-amber-200 transition-colors shadow-sm flex items-start gap-3">
                           <span className="text-amber-500 mt-1">•</span>
                           <span>{step}</span>
                        </div>
                     ))}
                  </div>
                </div>
              ))}
           </div>
        </div>
      )}

      {/* 6. Legal Compliance */}
      {analysis.legalCompliance && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {/* Same as before but ensured it renders if present */}
           <div className="bg-white p-6 md:p-8 rounded-3xl border border-stone-100 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                 <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
                 <h4 className="text-amber-600 font-bold text-xs uppercase tracking-widest">Regulations</h4>
              </div>
              <ul className="space-y-4">
                 {analysis.legalCompliance.regulations.map((reg, i) => (
                   <li key={i} className="text-stone-800 text-sm font-medium border-b border-stone-100 pb-2">{reg}</li>
                 ))}
              </ul>
           </div>
           <div className="bg-white p-6 md:p-8 rounded-3xl border border-stone-100 shadow-sm">
               <div className="flex items-center gap-2 mb-6">
                 <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 <h4 className="text-emerald-600 font-bold text-xs uppercase tracking-widest">Govt Schemes</h4>
              </div>
              <ul className="space-y-4">
                 {analysis.legalCompliance.governmentSchemes.map((scheme, i) => (
                   <li key={i} className="text-stone-800 text-sm font-medium border-b border-stone-100 pb-2">{scheme}</li>
                 ))}
              </ul>
           </div>
           <div className="bg-white p-6 md:p-8 rounded-3xl border border-stone-100 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                 <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                 <h4 className="text-blue-600 font-bold text-xs uppercase tracking-widest">IP Strategy</h4>
              </div>
              <ul className="space-y-4">
                 {analysis.legalCompliance.ipStrategy.map((ip, i) => (
                   <li key={i} className="text-stone-800 text-sm font-medium border-b border-stone-100 pb-2">{ip}</li>
                 ))}
              </ul>
           </div>
        </div>
      )}
      
      {/* 7. Next Questions (Suggestions) */}
      {analysis.suggestedQuestions && analysis.suggestedQuestions.length > 0 && (
         <div className="mt-12 p-8 bg-stone-900 rounded-3xl text-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-stone-900 z-0"></div>
             <div className="relative z-10">
                <h3 className="text-2xl text-white font-display font-bold mb-6">What is the next process?</h3>
                <p className="text-stone-400 mb-8 max-w-2xl mx-auto">Select a question below to continue your startup journey with specific guidance.</p>
                <div className="flex flex-wrap justify-center gap-4">
                    {analysis.suggestedQuestions.map((q, idx) => (
                        <button 
                            key={idx}
                            onClick={() => onAskQuestion && onAskQuestion(q)}
                            className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-full text-white text-sm font-medium transition-all hover:-translate-y-1 hover:border-amber-500/50"
                        >
                            {q} →
                        </button>
                    ))}
                </div>
             </div>
         </div>
      )}

    </div>
  );
};

export default AnalysisResult;
