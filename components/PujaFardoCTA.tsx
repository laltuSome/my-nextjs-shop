"use client"; 

import React from 'react';
import { ArrowRight, ClipboardList, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const PujaFardoCTA = () => {
  return (
    <section className="w-full py-20 bg-white"> {/* Top padding barano hoyeche jate image jayga pay */}
      <div className="max-w-[1170px] mx-auto px-6">
        
        <div className="relative rounded-[2.5rem] bg-[#772237] p-8 md:p-14 shadow-2xl group">
          
          {/* Subtle Glow inside card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full  -mt-32 blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left order-2 md:order-1">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-white/80 text-[10px] font-bold uppercase tracking-wider mb-6">
                <ClipboardList className="w-3.5 h-3.5" />
                <span>Smart Organizer</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-serif font-black text-white mb-6 leading-tight">
                Nijer Proyojon Moto <br /> 
                <span className="text-orange-300">Puja Fardo Banan</span>
              </h2>
              
              <div className="space-y-4 mb-10 flex flex-col items-center md:items-start">
                <div className="flex items-center gap-3 text-white/90 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0" />
                  <span>Customizable List for every Puja</span>
                </div>
                <div className="flex items-center gap-3 text-white/90 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0" />
                  <span>Direct WhatsApp Sharing</span>
                </div>
              </div>

              <Link href="/puja-fardo">
                <button className="inline-flex items-center gap-3 bg-white text-[#772237] font-bold py-4 px-10 rounded-2xl hover:bg-orange-50 transition-all active:scale-95 text-lg shadow-lg group">
                  Fardo Toiri Korun
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>

            {/* Right Side: Image with ONLY Top Negative Margin */}
            <div className="flex-shrink-0 relative order-1 md:order-2 w-full md:w-auto flex justify-center">
              <div className="w-[260px] sm:w-[300px] md:w-[380px] relative">
                <img 
                  src="/images/f.webp" 
                  alt="Puja Fardo Illustration" 
                  className="w-full h-auto object-contain drop-shadow-2xl transform transition-transform duration-700 group-hover:scale-105 
                  md:-mt-40 -mt-24 mb-0" 
                  /* Ekhane sudhu negative -mt (Top Margin) dewa hoyeche jate upore bheshe thake */
                />
              </div>
              {/* Decorative Glow directly behind image */}
              <div className="absolute inset-0 bg-orange-500/30 blur-[60px] -z-10 rounded-full md:-mt-40 -mt-24"></div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};