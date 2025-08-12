import React, { useContext, useState } from 'react';
import { StoreContext } from '..context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ClassicIcon,
  BackdropIcon,
  HighlightIcon,
  GlowIcon,
  MonoIcon,
  ElegantIcon,
  ComicIcon,
  MinimalIcon
} from './icons';

const TemplateIcon = ({ name }) => {
  const iconProps = {
    className: "w-6 h-6 flex-shrink-0"
  };

  switch(name) {
    case 'Classic': return <ClassicIcon {...iconProps} />;
    case 'Backdrop': return <BackdropIcon {...iconProps} />;
    case 'Highlight': return <HighlightIcon {...iconProps} />;
    case 'Glow': return <GlowIcon {...iconProps} className={`${iconProps.className} text-cyan-400`} />;
    case 'Mono': return <MonoIcon {...iconProps} />;
    case 'Elegant': return <ElegantIcon {...iconProps} />;
    case 'Comic': return <ComicIcon {...iconProps} />;
    case 'Minimal': return <MinimalIcon {...iconProps} />;
    default: return <ClassicIcon {...iconProps} />;
  }
};

export default function TemplateCard({ template }) {
  const { addToCart, purchased, credits } = useContext(StoreContext);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isPurchased = purchased.includes(template.id);
  const canAfford = credits >= template.cost;

  const handleAdd = () => {
    if (!isPurchased && canAfford) {
      setIsAnimating(true);
      addToCart(template);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const bgColors = {
    default: `bg-gradient-to-br ${template.bgGradient}`,
    hover: `bg-gradient-to-br ${template.bgGradient.replace('100', '200').replace('200', '300')}`
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-2xl p-5 shadow-lg overflow-hidden relative border border-gray-100 transition-all duration-300 ${isHovered ? bgColors.hover : bgColors.default}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Premium Tag */}
      {template.cost > 0 && (
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs px-3 py-1 rounded-full font-bold z-10 shadow-md"
        >
          {template.tag || 'Premium'}
        </motion.div>
      )}

      {/* Header with Icon */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${template.iconColor}/10`}>
            <TemplateIcon name={template.name} />
          </div>
          <h3 className="font-bold text-xl text-gray-800">{template.name}</h3>
        </div>
        <span className={`text-sm font-bold px-3 py-1 rounded-full ${
          template.cost === 0 ? 'bg-green-100 text-green-800' : 'bg-indigo-100 text-indigo-800'
        }`}>
          {template.cost === 0 ? 'FREE' : `${template.cost} credits`}
        </span>
      </div>

      {/* Preview Container */}
      <div className="relative rounded-xl overflow-hidden mb-4 h-48 bg-gray-900 flex items-center justify-center">
        <p 
          className={`text-center text-white text-lg ${template.style}`}
          style={template.cssStyle}
        >
          {template.demoText || template.preview || "Sample subtitle text"}
        </p>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {template.description}
      </p>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <motion.button
          disabled={isPurchased || !canAfford}
          onClick={handleAdd}
          whileTap={!isPurchased && canAfford ? { scale: 0.95 } : {}}
          className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all relative overflow-hidden ${
            isPurchased 
              ? 'bg-gray-100 text-gray-500'
              : !canAfford
                ? 'bg-rose-100 text-rose-600'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-md'
          }`}
        >
          {isPurchased && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute left-3"
            >
              ✓
            </motion.span>
          )}
          <span className="block truncate">
            {isPurchased 
              ? 'Purchased' 
              : !canAfford
                ? 'Need More Credits'
                : isAnimating
                  ? 'Adding...'
                  : 'Add to Cart'}
          </span>
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 rounded-lg bg-white/80 hover:bg-white flex items-center justify-center text-gray-600 border border-gray-200 backdrop-blur-sm"
          title="View Details"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <path d="M14 2v6h6M12 18v-6M9 15h6"/>
          </svg>
        </motion.button>
      </div>

      {/* Popularity Indicator */}
      <div className="mt-3">
        <div className="flex items-center gap-2">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-indigo-500 h-1.5 rounded-full" 
              style={{ width: `${template.popularity}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-500">{template.popularity}%</span>
        </div>
      </div>
    </motion.div>
  );
}