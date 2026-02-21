"use client"; 

import React from 'react';
import { ArrowRight, ClipboardList, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const PujaFardoCTA = () => {
  return (
    <section className="w-full py-16 bg-white"> {/* Padding barano hoyeche jate overlap image jayga pay */}
      <div className="max-w-[1170px] mx-auto px-6">
        
        {/* Main Card: Overflow remove kora hoyeche jate image baire jete pare */}
        <div className="relative rounded-[2.5rem] bg-[#772237] p-8 md:p-12 shadow-2xl group">
          
          {/* Subtle Abstract Glow - ekhon Card-er bhitore thakbe */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl overflow-hidden pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
            
            {/* Left Content */}
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-white/80 text-[10px] font-bold uppercase tracking-wider mb-5">
                <ClipboardList className="w-3.5 h-3.5" />
                <span>Smart Organizer</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-serif font-black text-white mb-6 leading-tight">
                Nijer Proyojon Moto <br /> 
                <span className="text-orange-300 ">Puja Fardo Banan</span>
              </h2>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-white/90 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 text-orange-400" />
                  <span>Customizable List for every Puja</span>
                </div>
                <div className="flex items-center gap-3 text-white/90 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 text-orange-400" />
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

            {/* Right Side: Image with Negative Margin (Pop-out effect) */}
            <div className="flex-shrink-0 relative mt-10 md:mt-0">
              <div className="w-[300px] md:w-[400px] relative">
                <img 
                  src="/images/f.webp" 
                  alt="Puja Fardo Illustration" 
                  className="w-full h-auto object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500 md:-mb-24 md:-mr-10 md:-mt-20" 
                  /* Negative margin use kora hoyeche jate image box-er upore ebong niche overlap kore */
                />
              </div>
              {/* Decorative Glow behind image */}
              <div className="absolute inset-0 bg-orange-500/20 blur-[80px] -z-10 rounded-full"></div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};