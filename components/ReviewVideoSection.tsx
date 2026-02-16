import React from 'react';
import { Instagram, Facebook, Globe } from 'lucide-react'; // icons jodi na thake install korun: npm install lucide-react

export const ReviewVideoSection = () => {
  const reviews = [
    { id: 1, src: "/videos/review1.mp4" },
    { id: 2, src: "/videos/review2.mp4" },
    { id: 3, src: "/videos/review3.mp4" },
  ];

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header Part */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">Grahokder Motamot</h2>
          
        </div>

        {/* 3 Reel Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {reviews.map((video) => (
            <div key={video.id} className="relative aspect-[9/16] rounded-3xl overflow-hidden shadow-xl bg-black border-4 border-gray-50">
              <video 
                className="w-full h-full object-cover" 
                controls 
                loop
                muted
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center items-center gap-8 py-6 border-t border-gray-100">
          <a href="https://google.com" target="_blank" className="flex flex-col items-center gap-2 group">
            <div className="p-3 bg-gray-100 rounded-full group-hover:bg-blue-100 transition-colors">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-semibold text-gray-500">Google</span>
          </a>

          <a href="https://facebook.com" target="_blank" className="flex flex-col items-center gap-2 group">
            <div className="p-3 bg-gray-100 rounded-full group-hover:bg-blue-600 transition-colors">
              <Facebook className="w-6 h-6 text-gray-400 group-hover:text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-500">Facebook</span>
          </a>

          <a href="https://instagram.com" target="_blank" className="flex flex-col items-center gap-2 group">
            <div className="p-3 bg-gray-100 rounded-full group-hover:bg-pink-100 transition-colors">
              <Instagram className="w-6 h-6 text-pink-600" />
            </div>
            <span className="text-xs font-semibold text-gray-500">Instagram</span>
          </a>
        </div>

      </div>
    </section>
  );
};