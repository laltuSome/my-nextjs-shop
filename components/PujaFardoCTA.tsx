import React from 'react';
import { ArrowRight, ClipboardList, CheckCircle2 } from 'lucide-react';

export const PujaFardoCTA = () => {
  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
          
          {/* Background Abstract Design */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/20 transition-all duration-500"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/5 rounded-full -ml-20 -mb-20 blur-2xl"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
            
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-sm font-medium mb-6">
                <ClipboardList className="w-4 h-4" />
                <span>Puja Items Organizer</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                Nijer Proyojon Moto <br /> Puja Fardo Banan
              </h2>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-orange-50 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-orange-200" />
                  Sob Pujar alada alada list
                </li>
                <li className="flex items-center gap-3 text-orange-50 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-orange-200" />
                  Gram ba KG select korar suvidha
                </li>
              </ul>
            </div>

            <div className="flex-shrink-0">
              <a 
                href="/puja-fardo" 
                className="inline-flex items-center gap-3 bg-white text-orange-600 font-black py-5 px-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 text-xl group"
              >
                Fardo Toiri Korun
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};