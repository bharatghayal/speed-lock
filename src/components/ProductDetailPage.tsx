import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  CloudSun, 
  Gauge, 
  Droplets, 
  Calculator,
  Send,
  Plus,
  HelpCircle,
  FileText,
  BadgeAlert,
  Sliders,
  MessageSquare,
  Award
} from 'lucide-react';
import { PRODUCTS } from '../constants';

const TECHNICAL_SPECS_DATA: Record<string, {
  category: string;
  viscosity: string;
  solids: string;
  phValue: string;
  shelfLife: string;
  cureTime: string;
  openTime: string;
  density: string;
  coverage: string;
  grade: string;
  bestFor: string[];
  tips: string;
  woodCompatibility: { name: string; percentage: number }[];
  applicationSteps: string[];
  faqs: { q: string; a: string }[];
}> = {
  aquatic: {
    category: "Waterproof Series",
    viscosity: "28000 - 32000 CPS",
    solids: "48% ± 1%",
    phValue: "3.5 - 5.0",
    shelfLife: "18 Months from MFG",
    cureTime: "24 Hours (Full Waterproof Strength)",
    openTime: "8 - 10 Minutes",
    density: "1.06 g/cm³",
    coverage: "48 - 52 sq.ft. per kg",
    grade: "European EN 204 D3 Waterproof Standards",
    bestFor: ["Modular Kitchen Furniture", "Bathroom Woodwork", "Coastal Climate Projects", "Marine Plywood Framing"],
    tips: "Ensure surfaces are clean and sanded. Avoid loading joint weight for 24 hours to gain ultimate D3 water-resistant properties.",
    woodCompatibility: [
      { name: "Marine Plywood (BWP/BWR)", percentage: 99 },
      { name: "Teak & Hardwood Timber", percentage: 98 },
      { name: "Decorative Glossy Laminates", percentage: 95 },
      { name: "MDF & High-Density Boards", percentage: 92 }
    ],
    applicationSteps: [
      "Ensure both wooden surfaces are completely clean, planed, and dry.",
      "Apply Speed Lock Aquatic uniformly using a brush, roller, or fine notched spreader.",
      "Bring the surfaces together under clamp pressure within 8-10 minutes.",
      "Maintain continuous clamp pressure for 3-4 hours (do not shake or shift joint).",
      "Allow full curing for 24 hours to obtain premium certified D3 waterproof resistance properties."
    ],
    faqs: [
      { q: "What makes Aquatic distinct from normal PVA adhesive?", a: "Aquatic is formulated with cross-linking thermoplastic polymers that meet European D3 waterproof standards, preventing joint separation even under continuous damp and humid coastal conditions." },
      { q: "Can it be used for outdoor gazebos and pergolas?", a: "Yes, it is excellent for outdoor protected woodworking. For continuous direct contact with water (submerged surfaces), please contact our tech team." },
      { q: "What is the recommended wood moisture level?", a: "We recommend a wood moisture content between 8% to 12% for the absolute strongest cross-linked wood bond." }
    ]
  },
  gold: {
    category: "Premium Series",
    viscosity: "35000 - 40000 CPS",
    solids: "53% ± 1%",
    phValue: "4.0 - 5.5",
    shelfLife: "12 Months from MFG",
    cureTime: "12 Hours (Ultimate Multi-Surface Fusion)",
    openTime: "12 - 15 Minutes",
    density: "1.08 g/cm³",
    coverage: "52 - 58 sq.ft. per kg",
    grade: "Advanced Indian Multi-surface Bonding Standard",
    bestFor: ["Premium Decorative Veneers", "High-End Laminates (Sunmica)", "Solid Wood Joints", "Framing Panel Assemblies"],
    tips: "Gives superior coverage. Spread evenly with a fine notched applicator to maximize material savings up to 25%.",
    woodCompatibility: [
      { name: "Veneers & Natural Wood Skins", percentage: 99 },
      { name: "Decorative Laminates (>1mm)", percentage: 98 },
      { name: "Commercial & Waterproof Ply", percentage: 98 },
      { name: "Particle Boards & Medium Density Core", percentage: 94 }
    ],
    applicationSteps: [
      "Prepare laminates and plywood by sanding lightly to eliminate glossy surface sheen.",
      "Apply Speed Lock Gold with a uniform sweep (approx. 55 sq.ft. per kg coverage).",
      "Wait 2 minutes for slight tack development before joining panels.",
      "Apply balanced distributed pressure with an iron-press or roller set.",
      "Clamp woodwork for 2-3 hours. Wood is ready for safe cutting/shaping in 6 hours."
    ],
    faqs: [
      { q: "Does Speed Lock Gold emit strong toxic fumes?", a: "No, Speed Lock Gold uses a low-VOC, safe-odor formulation that ensures interior carpenters can work continuously inside compact rooms without discomfort." },
      { q: "How does it prevent wood and laminate wastage?", a: "Thanks to its higher solid content, it spreads extremely flat, preventing swelling, wavy patterns, or bubbling in delicate natural veneers." }
    ]
  },
  ultra: {
    category: "Heavy Duty",
    viscosity: "38000 - 45000 CPS",
    solids: "55% ± 1.5%",
    phValue: "4.5 - 6.0",
    shelfLife: "15 Months from MFG",
    cureTime: "16 Hours (DIN EN 204 Industrial Hold)",
    openTime: "15 - 20 Minutes",
    density: "1.10 g/cm³",
    coverage: "45 - 50 sq.ft. per kg",
    grade: "Conforms strictly to DIN EN 204 Standard",
    bestFor: ["Heavy Load-bearing Joints", "Main Entry Doors & Frames", "Wooden Staircases & Railings", "Structural Column Assemblies"],
    tips: "Highly recommended for structural load setups. Keep clamps absolute and steady for continuous 4 hours for maximum security.",
    woodCompatibility: [
      { name: "Oak, Rosewood & Dense Timber", percentage: 99 },
      { name: "Thick Blockboards & Ply Blocks", percentage: 97 },
      { name: "Pre-polished Wood Framing Joints", percentage: 95 },
      { name: "Pine & General Wood Boards", percentage: 96 }
    ],
    applicationSteps: [
      "Plane the structural timber seams to ensure 100% surface-to-surface flush contact.",
      "Spread a generous layer of Speed Lock Ultra. No water dilution is allowed.",
      "For deep jointing (like mortise & tenon), apply adhesive to both male and female pieces.",
      "Clamp tightly with heavy-duty pipe clamps for 4 hours to verify deep fiber penetration.",
      "Wait 16-24 hours before subjecting target joists to structural weight loads."
    ],
    faqs: [
      { q: "Can we dilute Speed Lock Ultra with some water?", a: "We strongly advise against water dilution! Dilution alters solids concentration and directly breaks the DIN EN 204 performance guarantees." },
      { q: "What is its resistance to high temperature?", a: "Speed Lock Ultra withstands temperatures up to 85°C continuously without bond softening, ideal for tropical Indian roofs and kitchens." }
    ]
  },
  "super-fast": {
    category: "Specialized Rapid Series",
    viscosity: "20000 - 24000 CPS",
    solids: "45% ± 1%",
    phValue: "3.5 - 4.5",
    shelfLife: "12 Months from MFG",
    cureTime: "2 Hours (Instantly Workable Alignment)",
    openTime: "3 - 4 Minutes",
    density: "1.04 g/cm³",
    coverage: "55 - 60 sq.ft. per kg",
    grade: "Anti-Air Bubble, Rapid Fusion formulation",
    bestFor: ["Quick Spot-repairs on Site", "Vertical Crown Moldings & Cornices", "Edge Banding Trims", "Laminate Touch-ups"],
    tips: "Extremely fast initial grip! Work rapidly during application as handling strength sets in under 15 minutes.",
    woodCompatibility: [
      { name: "PVC/Acrylic Edge Bands", percentage: 99 },
      { name: "Decorative MDF Mouldings", percentage: 98 },
      { name: "Plywood Strips & Beads", percentage: 94 },
      { name: "Wooden Cornices & Trims", percentage: 93 }
    ],
    applicationSteps: [
      "Have all clamps and alignment guides completely prepared BEFORE opening adhesive.",
      "Spread thin, precise coat of Super Fast Adhesive swiftly to avoid premature skinning.",
      "Bring panels together immediately and apply maximum clamping pressure within 3 mins.",
      "Press firmly by hand or mechanical roller. Handling bond sets in only 15 minutes.",
      "You can proceed to laminate routing and edge trimming immediately after 20 minutes."
    ],
    faqs: [
      { q: "What prevents bubbles when using Super Fast?", a: "It contains specific anti-foaming polymers that release trapped pocket gases instantly when initial panel pressure is rolled out." },
      { q: "Can I use this for ceiling wood work?", a: "Absolutely. The swift 15-minute hold eliminates the need for excessive ceiling props or complex overhead clamp rigging." }
    ]
  },
  "pro-grip": {
    category: "Everyday Professional",
    viscosity: "30000 - 34000 CPS",
    solids: "49% ± 1%",
    phValue: "4.0 - 5.0",
    shelfLife: "18 Months from MFG",
    cureTime: "8 Hours (Reliable Daily Assembly)",
    openTime: "10 - 12 Minutes",
    density: "1.05 g/cm³",
    coverage: "50 - 55 sq.ft. per kg",
    grade: "Everyday Craftsmanship Reliable Standard",
    bestFor: ["Standard Plywood & Boards", "Everyday Carpentry Frames", "Furniture Panels Assembly", "Wooden Handicrafts"],
    tips: "Excellent general-purpose viscosity. Easy squeeze-bottle application makes it extremely tidy with minimal cleanup.",
    woodCompatibility: [
      { name: "Standard Commercial Plywood", percentage: 98 },
      { name: "Carpentry Pine Wood Blocks", percentage: 97 },
      { name: "Artisan Wood Crafts", percentage: 95 },
      { name: "Cork & Handicraft materials", percentage: 94 }
    ],
    applicationSteps: [
      "Ensure surfaces are free from sawdust, wood shaving, and damp moisture patches.",
      "Spread Pro Grip on both surfaces for complex frames, or single side for thin sheets.",
      "Clamp securely for 2 hours with light-to-moderate woodcraft pressure.",
      "Wipe off excess wet squeeze-out glue immediately with a damp white cotton cloth.",
      "Allow 8 hours before applying stress, painting, varnishing, or staining wood sections."
    ],
    faqs: [
      { q: "Is Pro Grip suitable for laminates?", a: "Yes, it is an extremely dependable and cost-effective daily choice for general carpentry laminates and local panel setups." },
      { q: "Is the dry film color transparent?", a: "Yes, it dries to a semi-transparent, pale-amber line that hides easily inside natural wood grains." }
    ]
  }
};

interface ProductDetailPageProps {
  productId: string;
  onBack: () => void;
}

export default function ProductDetailPage({ productId, onBack }: ProductDetailPageProps) {
  const currentProduct = PRODUCTS.find(p => p.id === productId) || PRODUCTS[1]; // Fallback to Gold
  const spec = TECHNICAL_SPECS_DATA[currentProduct.id] || TECHNICAL_SPECS_DATA.gold;

  // Emulator States
  const [area, setArea] = useState<number>(200); 
  const [wasteRate, setWasteRate] = useState<number>(5); 
  const [kgNeeded, setKgNeeded] = useState<number>(4);

  // Sample submission form state
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [role, setRole] = useState('Carpenter');

  const coverageRate = currentProduct.id === 'gold' ? 55 : 
                       currentProduct.id === 'aquatic' ? 50 :
                       currentProduct.id === 'ultra' ? 48 :
                       currentProduct.id === 'super-fast' ? 58 : 52;

  useEffect(() => {
    const totalArea = area * (1 + wasteRate / 100);
    const calculated = totalArea / coverageRate;
    setKgNeeded(Math.ceil(calculated));
  }, [area, wasteRate, coverageRate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [productId]);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !pin) {
      alert("Please fill out all fields.");
      return;
    }
    setQuoteSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen pt-28 pb-20 relative overflow-hidden">
      {/* Background Soft Glows matching product identity */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute right-0 top-1/4 w-[45vw] h-[45vh] rounded-full blur-[140px] opacity-20"
          style={{ backgroundColor: currentProduct.color }}
        />
        <div className="absolute left-[-5vw] bottom-1/4 w-[35vw] h-[35vh] rounded-full bg-blue-50/60 blur-[130px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        
        {/* Navigation Breadcrumb Menu */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 border-b border-slate-100 pb-6">
          <button 
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-slate-700 hover:text-blue-600 font-extrabold text-xs uppercase tracking-widest transition-all cursor-pointer bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-xl px-5 py-3 shadow-xs hover:shadow-sm"
          >
            <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to Main Page</span>
          </button>

          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>Our Products</span>
            <span>/</span>
            <span className="text-slate-800 font-black">{currentProduct.fullName}</span>
          </div>
        </div>

        {/* Quick Product Switcher Ribbon */}
        <div className="mb-10 bg-slate-50 border border-slate-150 p-2 rounded-2xl flex flex-wrap gap-2 items-center justify-center sm:justify-start">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 py-1">Quick Switch Adhesive:</span>
          {PRODUCTS.map((p) => {
            const isSelected = p.id === currentProduct.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  window.location.hash = `#product-${p.id}`;
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-white text-slate-900 border border-slate-200/80 shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* Product Visual & Technical Specs Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Premium Product Presentation Panel & Real-time Material Calculator */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            
            {/* Elegant Product Card Visual */}
            <div className="bg-gradient-to-b from-slate-50 to-slate-100/50 rounded-[35px] border border-slate-150 p-8 sm:p-10 flex flex-col justify-between items-center text-center shadow-xs relative overflow-hidden select-none">
              
              {/* Corner tech tag */}
              <div className="absolute top-6 left-6 text-slate-400 font-mono text-[9px] uppercase tracking-widest font-black flex items-center gap-1.5">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 BOND_CLASS_A1
              </div>

              {/* Dynamic Aura Glow */}
              <div 
                className="absolute w-[240px] h-[240px] rounded-full blur-[100px] opacity-15 pointer-events-none"
                style={{ backgroundColor: currentProduct.color }}
              />

              <div className="h-80 w-full flex items-center justify-center my-6 relative z-10">
                <motion.img 
                  src={currentProduct.image} 
                  alt={currentProduct.fullName}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="h-full w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.08)] hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-2 mt-2 w-full relative z-10">
                <div className="flex justify-center">
                  <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                    {spec.category}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
                  {currentProduct.fullName}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 italic font-medium px-4">
                  “{currentProduct.tagline}”
                </p>
              </div>
            </div>

            {/* Smart Adhesive Coverage Estimator */}
            <div className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 shadow-[0_12px_30px_rgba(0,0,0,0.02)] space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                  <Calculator size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">PRO adhesive quantity ESTIMATOR</h4>
                  <p className="text-slate-400 text-[10px] font-semibold uppercase">Calculate required volume for raw plywood & laminates</p>
                </div>
              </div>

              <div className="space-y-5 pt-1">
                {/* Surface area input */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-black text-slate-700 uppercase">
                    <span>Target Surface Area</span>
                    <span className="text-blue-600 font-extrabold">{area} SQ.FT</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="1000" 
                    step="10"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>10 Sq.Ft</span>
                    <span>500 Sq.Ft</span>
                    <span>1000 Sq.Ft</span>
                  </div>
                </div>

                {/* Wastage factor buttons */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-black text-slate-700 uppercase">
                    <span>Waste & Absorption Margin</span>
                    <span className="text-amber-600 font-extrabold">{wasteRate}% Buffer</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[0, 5, 10, 15].map((w) => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => setWasteRate(w)}
                        className={`py-2 text-xs font-black rounded-lg transition-all border cursor-pointer ${
                          wasteRate === w 
                            ? 'bg-amber-50 border-amber-200 text-amber-700' 
                            : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-150/70'
                        }`}
                      >
                        {w === 0 ? "0%" : `${w}%`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Formula Output Row */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">RECOMMENDED PACKAGE WEIGHT</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-black text-slate-900 tracking-tight">{kgNeeded}</span>
                      <span className="text-xs font-black text-slate-500 uppercase">KG Required</span>
                    </div>
                  </div>
                  
                  <div className="text-right text-[10px] font-medium text-slate-500 border-l border-slate-200 pl-4">
                    <span>Average Spread Rate</span>
                    <span className="block font-black text-slate-800 text-xs mt-0.5">~{coverageRate} sqft / kg</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Deep Technical Specs & Lead Capture (7 Columns) */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Header Portrait Text */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-blue-600 font-extrabold tracking-widest uppercase text-xs">
                <Sparkles size={14} className="text-yellow-500" />
                <span>TECHNICAL PORTRAIT SHEET</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                engineered for <br className="hidden sm:inline" /> tropical woodworking.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-semibold leading-relaxed">
                {currentProduct.description} Prepared under strict chemical supervision to minimize air pocket bubbles, offer extreme wood fiber penetration, and secure premium joints indefinitely.
              </p>
            </div>

            {/* Quality Standard Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { title: "Pure Resin Base", desc: "No chalk fillers", icon: Gauge, colorClass: "text-amber-500 bg-amber-50" },
                { title: "Zero Air-Bubbles", desc: "Flat sheet finish", icon: Droplets, colorClass: "text-blue-500 bg-blue-50" },
                { title: "Termite Guarded", desc: "Chemical shield", icon: ShieldCheck, colorClass: "text-green-500 bg-green-50" },
                { title: "Eco Odor Safe", desc: "Low VOC formula", icon: CloudSun, colorClass: "text-teal-500 bg-teal-50" }
              ].map((badge, idx) => {
                const IconComponent = badge.icon;
                return (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between h-28">
                    <div className={`p-2 rounded-xl w-fit ${badge.colorClass}`}>
                      <IconComponent size={18} />
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-800 block leading-tight">{badge.title}</span>
                      <span className="text-[10px] font-semibold text-slate-400 block mt-0.5 leading-none">{badge.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Comprehensive Specs Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-400 tracking-[0.25em] uppercase">PHYSICOCHEMICAL SPECIFICATIONS</h4>
              <div className="border border-slate-150 rounded-2xl overflow-hidden bg-white shadow-3xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-[10px] text-slate-400 font-black uppercase tracking-wider">
                      <th className="py-4 px-6">PRODUCT ATTRIBUTES</th>
                      <th className="py-4 px-6 text-right">CERTIFIED INDUSTRIAL VALUES</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-bold text-slate-650">
                    <tr>
                      <td className="py-4 px-6">Polymer Compound</td>
                      <td className="py-4 px-6 text-right text-slate-900 font-extrabold">
                        {currentProduct.id === 'aquatic' ? 'D3-Waterproof Polyvinyl Cross-linker' : 'Premium Grade Synthetic Latex Hybrid'}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6">Total Solids Content</td>
                      <td className="py-4 px-6 text-right text-slate-900 font-extrabold">{spec.solids}</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6">Brookfield Viscosity (approx)</td>
                      <td className="py-4 px-6 text-right text-slate-900 font-extrabold">{spec.viscosity}</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6">pH Limits</td>
                      <td className="py-4 px-6 text-right text-slate-900 font-extrabold">{spec.phValue}</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6">Working Open Time</td>
                      <td className="py-4 px-6 text-right text-slate-900 font-extrabold">{spec.openTime}</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6">Cured Glue Film Color</td>
                      <td className="py-4 px-6 text-right text-slate-900 font-extrabold">Semi-Transparent / Glassy line</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6">Shelf Life Durability</td>
                      <td className="py-4 px-6 text-right text-slate-900 font-extrabold">{spec.shelfLife}</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6">Full Load Curing Target</td>
                      <td className="py-4 px-6 text-right text-blue-600 font-black">{spec.cureTime}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Substrate Compatibility Bars */}
            <div className="space-y-4 bg-slate-50 border border-slate-100 rounded-2xl p-6 sm:p-8">
              <h4 className="text-xs font-black text-slate-400 tracking-[0.2em] uppercase">TIMBER & SUBSTRATE COMPATIBILITY</h4>
              <div className="space-y-4">
                {spec.woodCompatibility.map((wood, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-800">
                      <span>{wood.name}</span>
                      <span className="text-blue-650 font-black">{wood.percentage}% Bond Rating</span>
                    </div>
                    {/* Compatibility progress */}
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${wood.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.08 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: currentProduct.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Steps */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-slate-400 tracking-[0.2em] uppercase">PROFESSIONAL METHOD OF USE</h4>
              <div className="space-y-3">
                {spec.applicationSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-3xs">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-650 font-black text-xs flex items-center justify-center flex-shrink-0 border border-blue-105">
                      {index + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct lead / Sample kit booking form */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-white/5 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
              
              <div className="space-y-2">
                <span className="text-[10px] font-black tracking-widest text-yellow-400 uppercase block">DEALERS & CARPENTERS EXCLUSIVE</span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-none">
                  Request Physical Test bottle
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-semibold leading-relaxed">
                  We ship mini test sample jars of <strong className="text-white">{currentProduct.fullName}</strong> to genuine retailers, distributors, architects, and master contractors. Submit your details below to activate immediate local dispatch.
                </p>
              </div>

              {quoteSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-950/60 border border-emerald-500/20 rounded-2xl p-6 text-center space-y-3"
                >
                  <CheckCircle2 className="mx-auto text-emerald-400 animate-bounce" size={32} />
                  <h4 className="text-lg font-black text-white">Sample Request Scheduled!</h4>
                  <p className="text-xs text-slate-350">
                    A company technician will dial your WhatsApp mobile shortly to verify the shipping address. Your technical adhesive welcome-pack is preparing for dispatch.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">Contact Name</label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ramesh Patel / Shree Ram Carpentry"
                        className="w-full bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-slate-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">WhatsApp Mobile</label>
                      <input 
                        type="tel" 
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 98210XXXXX"
                        className="w-full bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">Area PIN Code</label>
                      <input 
                        type="text" 
                        required
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        placeholder="e.g. 400001"
                        maxLength={6}
                        className="w-full bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-slate-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">Your Profession</label>
                      <select 
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full bg-slate-800 text-white border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                      >
                        <option value="Carpenter">Professional Carpenter</option>
                        <option value="Contractor">Interior Contractor</option>
                        <option value="Dealer">Retailer / Hardware Distributor</option>
                        <option value="Architect">Architect & Building Designer</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="interactive w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Receive Free Material Sample Jars</span>
                    <Send size={14} />
                  </button>
                </form>
              )}
            </div>

            {/* FAQs */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-slate-400 tracking-[0.2em] uppercase">PRODUCT QUESTIONS & DISCUSSIONS</h4>
              <div className="space-y-3">
                {spec.faqs.map((faq, i) => (
                  <details key={i} className="group bg-white border border-slate-150 p-5 rounded-2xl shadow-3xs cursor-pointer select-none">
                     <summary className="flex items-center justify-between text-sm sm:text-base font-black text-slate-850 list-none tracking-tight">
                      <span>{faq.q}</span>
                      <span className="p-1 rounded-full group-open:rotate-45 transition-transform text-slate-400 bg-slate-50 border border-slate-100">
                        <Plus size={16} />
                      </span>
                    </summary>
                    <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed mt-3 border-t border-slate-100 pt-3">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Full Range Family Portfolio Grid at the bottom */}
        <div className="mt-20 pt-16 border-t border-slate-100 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] font-black tracking-[0.2em] text-blue-600 bg-blue-50/80 px-4 py-1.5 rounded-full uppercase inline-block">
              Full Range Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase">
              The Speed Lock Adhesive Family
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
              Discover and compare properties of all individual products. Click any variant to immediately load its full design sheet, interactive estimators, and application manual.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {PRODUCTS.map((p) => {
              const isCurrent = p.id === currentProduct.id;
              const productSpec = TECHNICAL_SPECS_DATA[p.id] || TECHNICAL_SPECS_DATA.gold;
              
              return (
                <div 
                  key={p.id}
                  onClick={() => {
                    if (!isCurrent) {
                      window.location.hash = `#product-${p.id}`;
                    }
                  }}
                  className={`bg-slate-50/50 hover:bg-slate-50 border rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 relative group cursor-pointer ${
                    isCurrent 
                      ? 'border-blue-600 bg-blue-50/15 ring-1 ring-blue-600/35 shadow-md shadow-blue-500/5' 
                      : 'border-slate-150 hover:border-blue-300 hover:shadow-lg hover:shadow-slate-100'
                  }`}
                >
                  {/* Subtle Glow inside card */}
                  <div 
                    className="absolute inset-0 rounded-3xl blur-[40px] opacity-5 pointer-events-none transition-opacity group-hover:opacity-10"
                    style={{ backgroundColor: p.color }}
                  />

                  {/* Top Badge Info */}
                  <div className="space-y-3 relative z-10 font-sans">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[8px] font-black uppercase text-slate-400 tracking-wider">
                        {p.name}
                      </span>
                      {isCurrent ? (
                        <span className="text-[8px] font-black uppercase text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full">
                          Inspecting
                        </span>
                      ) : (
                        <span className="text-[8px] font-black uppercase text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded-full">
                          {productSpec.openTime}
                        </span>
                      )}
                    </div>

                    <div className="h-36 w-full flex items-center justify-center my-3 overflow-hidden select-none">
                      <img 
                        src={p.image} 
                        alt={p.fullName}
                        className="h-full w-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.06)] group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="space-y-1 text-center font-sans">
                      <h4 className="text-xs font-black text-slate-900 leading-tight uppercase truncate">
                        {p.fullName}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-extrabold leading-tight line-clamp-2 min-h-[2.5rem]">
                        {p.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Bottom features list/button */}
                  <div className="mt-4 pt-4 border-t border-slate-150/80 space-y-3 relative z-10 font-sans">
                    <div className="space-y-1.5">
                      {p.features.slice(0, 2).map((feat) => (
                        <div key={feat} className="flex items-center gap-1.5">
                          <CheckCircle2 size={10} className="text-emerald-500" />
                          <span className="text-[9px] font-bold text-slate-600 truncate">{feat}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      disabled={isCurrent}
                      className={`w-full py-2 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                        isCurrent
                          ? 'bg-blue-50 text-blue-600 border border-blue-200/50 cursor-default'
                          : 'bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 shadow-3xs active:scale-95 cursor-pointer'
                      }`}
                    >
                      <span>{isCurrent ? "Active Sheet" : "Inspect Sheet"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
