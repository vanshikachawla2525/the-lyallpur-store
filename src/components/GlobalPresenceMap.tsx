import React from 'react';
import { motion } from 'motion/react';
import { Globe, Plane, ShieldCheck } from 'lucide-react';

export const GlobalPresenceMap: React.FC = () => {
  const destinations = [
    { country: 'United States', code: 'USA', hub: 'New York / California' },
    { country: 'Canada', code: 'CAN', hub: 'Toronto / Vancouver' },
    { country: 'United Kingdom', code: 'UK', hub: 'London / Birmingham' },
    { country: 'Europe', code: 'EU', hub: 'Germany / Italy' },
    { country: 'Australia', code: 'AUS', hub: 'Sydney / Melbourne' },
    { country: 'New Zealand', code: 'NZ', hub: 'Auckland' },
  ];

  return (
    <section className="py-24 bg-[#20060A] text-white relative overflow-hidden border-b border-[#3D1016]">
      {/* Subtle Radial Glow in Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle,rgba(212,175,55,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#F3E3BE] text-xs uppercase tracking-widest font-semibold mb-4">
            <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
            International Trade
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#FAF7F2]">
            From Ludhiana to the World
          </h2>
          <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto my-4" />
          <p className="text-[#E8D6C0] text-base sm:text-lg font-light leading-relaxed">
            Today, Lyallpur Sweets engages in international trade across the USA, Canada, New Zealand, Australia, and Europe. Bringing the cherished taste of Punjab to the global Indian diaspora.
          </p>
        </div>

        {/* Minimalist World Map with Animated Golden Connection Arcs */}
        <div className="relative bg-[#2D0B10]/80 rounded-2xl border border-[#D4AF37]/30 p-6 sm:p-12 overflow-hidden shadow-2xl">
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-auto drop-shadow-lg"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* World Continents Outlines (Stylized Minimalist Geometries) */}
            {/* North America */}
            <path
              d="M120,120 Q160,80 240,90 Q300,100 280,180 Q240,240 180,250 Q130,220 120,120 Z"
              fill="#3A1017"
              stroke="#D4AF37"
              strokeWidth="0.8"
              opacity="0.6"
            />
            {/* South America */}
            <path
              d="M240,260 Q280,260 300,320 Q290,400 250,440 Q220,380 230,300 Z"
              fill="#3A1017"
              stroke="#D4AF37"
              strokeWidth="0.8"
              opacity="0.5"
            />
            {/* Europe */}
            <path
              d="M460,110 Q540,100 570,140 Q550,200 480,190 Q450,150 460,110 Z"
              fill="#3A1017"
              stroke="#D4AF37"
              strokeWidth="0.8"
              opacity="0.6"
            />
            {/* Africa */}
            <path
              d="M480,200 Q560,200 570,280 Q540,370 500,380 Q460,300 480,200 Z"
              fill="#3A1017"
              stroke="#D4AF37"
              strokeWidth="0.8"
              opacity="0.4"
            />
            {/* Asia */}
            <path
              d="M580,90 Q760,80 840,150 Q850,260 750,280 Q660,240 580,180 Z"
              fill="#3A1017"
              stroke="#D4AF37"
              strokeWidth="0.8"
              opacity="0.6"
            />
            {/* Australia */}
            <path
              d="M780,330 Q870,320 880,380 Q840,430 780,410 Q760,360 780,330 Z"
              fill="#3A1017"
              stroke="#D4AF37"
              strokeWidth="0.8"
              opacity="0.6"
            />
            {/* New Zealand */}
            <path
              d="M895,400 Q910,400 905,430 Q890,430 895,400 Z"
              fill="#3A1017"
              stroke="#D4AF37"
              strokeWidth="0.8"
              opacity="0.6"
            />

            {/* ORIGIN: Ludhiana, Punjab, India (approx x: 650, y: 215) */}
            {/* Glowing Golden Pulse */}
            <circle cx="650" cy="215" r="14" fill="#D4AF37" opacity="0.25">
              <animate attributeName="r" values="8;20;8" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.05;0.4" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="650" cy="215" r="5" fill="#FCE8B6" stroke="#C21620" strokeWidth="2" />
            <text x="650" y="235" textAnchor="middle" fill="#FCE8B6" fontSize="11" fontFamily="serif" fontWeight="bold">
              Ludhiana, India
            </text>

            {/* Golden Flight Arcs from Ludhiana */}
            {/* To USA (New York) */}
            <path
              d="M650,215 Q430,40 210,140"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.8"
              strokeDasharray="5 4"
            >
              <animate attributeName="stroke-dashoffset" values="0;-40" dur="3s" repeatCount="indefinite" />
            </path>
            <circle cx="210" cy="140" r="4" fill="#FCE8B6" />
            <text x="210" y="160" textAnchor="middle" fill="#E8D19F" fontSize="10">USA</text>

            {/* To Canada */}
            <path
              d="M650,215 Q410,20 180,105"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
              strokeDasharray="5 4"
            >
              <animate attributeName="stroke-dashoffset" values="0;-40" dur="3.4s" repeatCount="indefinite" />
            </path>
            <circle cx="180" cy="105" r="4" fill="#FCE8B6" />
            <text x="180" y="95" textAnchor="middle" fill="#E8D19F" fontSize="10">Canada</text>

            {/* To UK & Europe */}
            <path
              d="M650,215 Q570,110 500,135"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.8"
              strokeDasharray="5 4"
            >
              <animate attributeName="stroke-dashoffset" values="0;-40" dur="2.6s" repeatCount="indefinite" />
            </path>
            <circle cx="500" cy="135" r="4" fill="#FCE8B6" />
            <text x="500" y="125" textAnchor="middle" fill="#E8D19F" fontSize="10">UK & Europe</text>

            {/* To Australia */}
            <path
              d="M650,215 Q740,280 820,360"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.8"
              strokeDasharray="5 4"
            >
              <animate attributeName="stroke-dashoffset" values="0;-40" dur="3.2s" repeatCount="indefinite" />
            </path>
            <circle cx="820" cy="360" r="4" fill="#FCE8B6" />
            <text x="820" y="380" textAnchor="middle" fill="#E8D19F" fontSize="10">Australia</text>

            {/* To New Zealand */}
            <path
              d="M650,215 Q790,300 895,410"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
              strokeDasharray="5 4"
            >
              <animate attributeName="stroke-dashoffset" values="0;-40" dur="3.5s" repeatCount="indefinite" />
            </path>
            <circle cx="895" cy="410" r="3.5" fill="#FCE8B6" />
            <text x="895" y="430" textAnchor="middle" fill="#E8D19F" fontSize="10">New Zealand</text>
          </svg>

          {/* International Markets Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-8 pt-8 border-t border-[#D4AF37]/20">
            {destinations.map((dest) => (
              <div
                key={dest.country}
                className="bg-[#20060A]/80 border border-[#D4AF37]/20 rounded-lg p-3 text-center hover:border-[#D4AF37]/60 transition-colors"
              >
                <span className="text-[10px] tracking-widest text-[#D4AF37] font-semibold block uppercase">
                  {dest.code}
                </span>
                <p className="text-xs sm:text-sm font-serif font-bold text-white mt-0.5">
                  {dest.country}
                </p>
                <p className="text-[10px] text-[#BCA691] mt-0.5 font-light">
                  {dest.hub}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#E5D2BA]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              FSSAI & International Export Certified
            </span>
            <span className="flex items-center gap-1.5">
              <Plane className="w-4 h-4 text-[#D4AF37]" />
              Nitrogen Flush Packaging for Crisp Freshness
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
