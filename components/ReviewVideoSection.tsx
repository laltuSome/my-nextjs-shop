"use client"

import React, { useRef, useState, useEffect } from 'react';
import { Instagram, Facebook, Globe, Play, Pause, Volume2, VolumeX } from 'lucide-react';

// VideoCard Component
const VideoCard = ({ 
  src, 
  isActive, 
  onPlay 
}: { 
  src: string; 
  isActive: boolean; 
  onPlay: () => void 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(true);

  // যদি এই ভিডিওটি 'Active' না হয়, তবে এটিকে পজ করে দাও
  useEffect(() => {
    if (!isActive && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isActive]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.pause();
        onPlay(); // এটি কল করলে isActive false হয়ে যাবে (toggle effect)
      } else {
        videoRef.current.play();
        onPlay(); // অন্য সব ভিডিও পজ করে শুধু এটিকে প্লে করবে
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
      setIsMuted(newVolume === 0);
    }
  };

  return (
    <div className="relative group">
      <div className="relative aspect-[10/14] rounded-2xl overflow-hidden shadow-md bg-black border border-gray-200">
        <video 
          ref={videoRef}
          className="w-full h-full object-cover cursor-pointer" 
          onClick={togglePlay}
          loop
          muted={isMuted}
          playsInline
        >
          <source src={src} type="video/mp4" />
        </video>

        {/* Play Icon - শুধু তখনই দেখাবে যখন ভিডিও পজ থাকবে */}
        {(!isActive || (videoRef.current && videoRef.current.paused)) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none transition-opacity">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30">
              <Play className="text-white w-8 h-8 fill-white ml-1" />
            </div>
          </div>
        )}

        {/* Volume Controls */}
        <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <p className="text-white/90 text-[10px] font-bold uppercase tracking-widest">Customer Review</p>
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm p-1.5 rounded-lg border border-white/10">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} 
                className="text-white hover:text-[#ed701d]"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input 
                type="range" min="0" max="1" step="0.1" value={volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 accent-[#ed701d] cursor-pointer appearance-none bg-white/30 rounded-full"
                onClick={(e) => e.stopPropagation()} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Section Component
export const ReviewVideoSection = () => {
  // বর্তমানে কোন ভিডিওটি চলছে তার ID সেভ করার জন্য State
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);

  const reviews = [
    { id: 1, src: "/videos/review1.mp4" },
    { id: 2, src: "/videos/review2.mp4" },
    { id: 3, src: "/videos/review3.mp4" },
  ];

  return (
    <section className="w-full py-16 bg-[#fff]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-black text-[#772237] uppercase">Grahokder Motamot</h2>
          <div className="mx-auto mt-2 h-1 w-12 bg-[#ed701d]"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
          {reviews.map((video) => (
            <VideoCard 
              key={video.id} 
              src={video.src} 
              isActive={activeVideoId === video.id}
              onPlay={() => {
                if (activeVideoId === video.id) {
                  setActiveVideoId(null); // আবার ক্লিক করলে পজ হবে
                } else {
                  setActiveVideoId(video.id); // নতুন ভিডিও চালালে অন্য সব বন্ধ হবে
                }
              }}
            />
          ))}
        </div>

        {/* Social Links (Same as before) */}
        <div className="flex flex-wrap justify-center gap-6 py-8 border-t border-gray-100">
          {[
            { icon: Globe, label: 'Google', color: 'text-blue-600', link: 'https://google.com' },
            { icon: Facebook, label: 'Facebook', color: 'text-[#1877F2]', link: 'https://facebook.com' },
            { icon: Instagram, label: 'Instagram', color: 'text-[#ee2a7b]', link: 'https://instagram.com' }
          ].map((social, i) => (
            <a 
              key={i} href={social.link} target="_blank" 
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all border border-gray-100 group"
            >
              <social.icon className={`w-5 h-5 ${social.color}`} />
              <span className="text-sm font-bold text-gray-700 uppercase tracking-tight">{social.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};