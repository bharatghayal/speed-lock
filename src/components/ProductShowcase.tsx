import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Search, 
  Sparkles, 
  Clock, 
  Droplets, 
  Thermometer, 
  ShieldAlert, 
  Layers, 
  ArrowRight, 
  X, 
  HelpCircle,
  FileText,
  TrendingDown,
  Calculator,
  Send,
  Gauge
} from 'lucide-react';
import { PRODUCTS } from '../constants';

// Detailed offline specs for our products to enrich the Interactive Modal popups
const PRODUCT_OFFLINE_SPECS: Record<string, {
  category: string;
  chemicalType: string;
  openTime: string;
  pressingTime: string;
  coverage: string;
  grade: string;
  bestFor: string[];
  tips: string;
}> = {
  aquatic: {
    category: "Waterproof Series",
    chemicalType: "Water-resistant Polyvinyl Emulsion",
    openTime: "8 to 10 Minutes",
    pressingTime: "3 to 4 Hours",
    coverage: "48 - 52 sq.ft. per kg",
    grade: "European EN 204 D3 Waterproof Standards",
    bestFor: ["Modular Kitchen furniture", "Bathroom vanity woodwork", "Under-sink storage shelves", "Coastal climate projects"],
    tips: "Ensure surfaces are clean and sanded. Avoid loading joint weight for 24 hours to gain ultimate D3 water-resistant properties."
  },
  gold: {
    category: "Premium Series",
    chemicalType: "New-Generation Hybrid Synthetic Polymer",
    openTime: "12 to 15 Minutes",
    pressingTime: "2 to 3 Hours",
    coverage: "52 - 58 sq.ft. per kg",
    grade: "Advanced Indian Multi-surface Bonding Standard",
    bestFor: ["High-end decorative laminates", "Natural wood veneers", "Framing panels", "Intricate furniture assemblies"],
    tips: "Gives superior coverage. Spread evenly with a fine notched applicator to maximize material savings up to 25%."
  },
  ultra: {
    category: "Heavy Duty",
    chemicalType: "Conforming Homopolymer Emulsion",
    openTime: "15 to 20 Minutes",
    pressingTime: "4 to 5 Hours",
    coverage: "45 - 50 sq.ft. per kg",
    grade: "Conforms strictly to DIN EN 204 standard",
    bestFor: ["Heavy load-bearing joint structures", "Main exterior/interior solid wood doors", "Staircases & railings", "Industrial furniture blocks"],
    tips: "Highly recommended for structural load setups. Keep clamps absolute and steady for continuous 4 hours for maximum security."
  },
  "super-fast": {
    category: "Specialized Rapid Series",
    chemicalType: "Rapid-Setting High-Tack Resin Blend",
    openTime: "3 to 4 Minutes",
    pressingTime: "15 to 20 Minutes",
    coverage: "55 - 60 sq.ft. per kg",
    grade: "Anti-Air Bubble, Rapid Fusion formulation",
    bestFor: ["Quick spot-repairs on site", "Vertical crown moldings & cornices", "Edge banding alignment", "Laminate touch-ups"],
    tips: "Extremely fast initial grip! Work rapidly during application as handling strength sets in under 15 minutes."
  },
  "pro-grip": {
    category: "Everyday Professional",
    chemicalType: "Synthetic Resin Wood Glue Emulsion",
    openTime: "10 to 12 Minutes",
    pressingTime: "2 to 3 Hours",
    coverage: "50 - 55 sq.ft. per kg",
    grade: "Everyday Craftsmanship Reliable Standard",
    bestFor: ["Standard plywood & wood boards", "Decorative veneers framing", "Manual daily carpentry projects", "Low-stress structural frames"],
    tips: "Excellent general-purpose viscosity. Easy squeeze-bottle application makes it extremely tidy with minimal cleanup."
  }
};

const COVERAGE_RATES_MAP: Record<string, number> = {
  aquatic: 50,
  gold: 55,
  ultra: 48,
  "super-fast": 58,
  "pro-grip": 52
};

const WOOD_COMPATIBILITY_MAP: Record<string, { label: string; pct: number }[]> = {
  aquatic: [
    { label: "Marine Plywood (Waterproof/BWP)", pct: 99 },
    { label: "Decorative Laminates & Sunmica", pct: 95 },
    { label: "Solid Teak & Premium Woods", pct: 98 },
    { label: "MDF & Particle Board", pct: 92 }
  ],
  gold: [
    { label: "Veneers & Paper Foils", pct: 99 },
    { label: "Premium Glossy Laminates", pct: 98 },
    { label: "Commercial Wood Plywood", pct: 98 },
    { label: "Teak, Pine & Hardwood Sections", pct: 94 }
  ],
  ultra: [
    { label: "Heavy Structural Timbers", pct: 99 },
    { label: "Blockboard & Massive Laminations", pct: 97 },
    { label: "Pre-polished Wood Framing Joints", pct: 95 },
    { label: "Engineered Hardwoods & Seams", pct: 96 }
  ],
  "super-fast": [
    { label: "Acrylic & Wood Edge Bands", pct: 99 },
    { label: "PVC profiles & beading trims", pct: 98 },
    { label: "Vertical Veneer moldings", pct: 94 },
    { label: "Spot-repair & Laminate chips", pct: 93 }
  ],
  "pro-grip": [
    { label: "Standard General Plywood", pct: 98 },
    { label: "Everyday Framing Carpentry", pct: 97 },
    { label: "Artisan Wood Crafts", pct: 95 },
    { label: "Softwood framing blocks", pct: 94 }
  ]
};

export default function ProductShowcase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter categories
  const categories = ['All', 'Premium', 'Waterproof', 'Heavy Duty', 'Rapid Setting'];

  // Map category tab clicks to our product details filtering
  const filteredProducts = PRODUCTS.filter(product => {
    // Search filter
    const matchesSearch = product.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category mapping
    if (activeCategory === 'All') return matchesSearch;
    if (activeCategory === 'Premium' && product.id === 'gold') return matchesSearch;
    if (activeCategory === 'Waterproof' && product.id === 'aquatic') return matchesSearch;
    if (activeCategory === 'Heavy Duty' && product.id === 'ultra') return matchesSearch;
    if (activeCategory === 'Rapid Setting' && product.id === 'super-fast') return matchesSearch;
    
    // Fallback if not matching explicitly
    return matchesSearch && (product.id === 'pro-grip' && activeCategory === 'Premium');
  });

  return (
    <section 
      id="products" 
      className="py-24 sm:py-32 bg-slate-50/70 border-b border-slate-100 relative overflow-hidden"
    >
      {/* Background Soft Glow Accents */}
      <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-[#EFF6FF] via-white to-transparent blur-[160px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 lg:px-16 relative">
        
        {/* Section Heading */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100/50 text-blue-600 text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-sm"
          >
            <Sparkles size={14} className="text-yellow-500 animate-pulse" />
            <span>Product Presentation</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-tight uppercase">
            Our Premium <br className="sm:hidden" /> Adhesive Portfolio.
          </h2>
          <p className="text-gray-500 font-medium text-base sm:text-lg max-w-2xl mx-auto">
            Discover Speed Lock's engineered series built for supreme durability, rapid-setting convenience, and unyielding water-resistance. Sirf chipkaye nahi, mazbooti ke saath jode.
          </p>
        </div>

        {/* Filter Controls Panel */}
        <div className="max-w-5xl mx-auto bg-white border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.02)] p-4 sm:p-6 rounded-[32px] gap-6 flex flex-col md:flex-row items-center justify-between mb-16 relative z-20">
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-2.5 justify-center md:justify-start w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/15 scale-102'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-[320px] group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search adhesives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 hover:bg-slate-100/75 focus:bg-white border border-slate-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-semibold text-slate-800 tracking-sm transition-all focus:outline-none placeholder:text-slate-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Products Grid Dashboard */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
              <HelpCircle size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">No adhesive matching found.</h3>
            <p className="text-slate-400 text-sm">
              We couldn't find any products matching your query. Clear search/filters to browse our standard flagship products.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredProducts.map((product) => {
              const specSet = PRODUCT_OFFLINE_SPECS[product.id];
              return (
                <motion.div
                  key={product.id}
                  id={`product-card-${product.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => {
                    window.location.hash = `#product-${product.id}`;
                  }}
                  className="bg-white border border-slate-100 rounded-[35px] overflow-hidden flex flex-col justify-between shadow-[0_12px_45px_-12px_rgba(37,99,235,0.03)] hover:shadow-[0_25px_50px_-10px_rgba(37,99,235,0.07)] transition-all group cursor-pointer"
                >
                  <div className="p-6 sm:p-8 space-y-6">
                    {/* Floating Branding Line */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {specSet?.category || "Wood Adhesive"}
                      </span>
                      <span className="text-xs font-bold text-slate-400 font-mono">
                        MODERN_BOND_0{product.id === 'aquatic' ? 1 : product.id === 'gold' ? 2 : product.id === 'ultra' ? 3 : 4}
                      </span>
                    </div>

                    {/* Highly polished image presentation */}
                    <div className="relative h-60 w-full flex items-center justify-center bg-slate-50/50 rounded-2xl overflow-hidden py-4 border border-slate-50 select-none">
                      <img 
                        src={product.image} 
                        alt={product.fullName}
                        className="h-full w-auto object-contain drop-shadow-[0_15px_22px_rgba(0,0,0,0.09)] group-hover:scale-105 group-hover:rotate-1 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      {/* Ambient Halo Glow */}
                      <div 
                        className="absolute w-36 h-36 rounded-full blur-3xl opacity-10 pointer-events-none -z-10"
                        style={{ backgroundColor: product.color }}
                      />
                    </div>

                    {/* Text Details Section */}
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-baseline gap-1 uppercase">
                        {product.fullName}
                      </h3>
                      <p className="text-xs text-slate-400 font-extrabold uppercase tracking-wider italic">
                        {product.tagline}
                      </p>
                      <p className="text-sm text-slate-500 font-semibold leading-relaxed line-clamp-3">
                        {product.description}
                      </p>
                    </div>

                    {/* Dynamic Bullet points */}
                    <div className="border-t border-slate-50 pt-4 space-y-2">
                      {product.features.slice(0, 3).map((f) => (
                        <div key={f} className="flex items-center gap-2">
                          <CheckCircle2 size={15} style={{ color: product.color }} className="flex-shrink-0" />
                          <span className="text-xs font-bold text-slate-700">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Button Action area */}
                  <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-black text-slate-400 tracking-wide">Pressing Time</span>
                      <span className="text-xs font-black text-slate-800">{specSet?.pressingTime || "2-3 Hours"}</span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.hash = `#product-${product.id}`;
                      }}
                      className="interactive flex items-center gap-2 bg-white border border-slate-200/90 hover:border-blue-300 hover:text-blue-600 text-slate-800 px-6 py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer"
                    >
                      <span>View Details</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
