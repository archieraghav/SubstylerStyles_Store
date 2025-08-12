import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import {
  ClassicIcon,
  BackdropIcon,
  HighlightIcon,
  GlowIcon,
  MonoIcon,
  ElegantIcon,
  ComicIcon,
  MinimalIcon
} from "./icons";

const TemplateIcon = ({ name, className = "" }) => {
  const iconProps = {
    className: `w-5 h-5 ${className}`
  };

  switch(name) {
    case 'Classic': return <ClassicIcon {...iconProps} />;
    case 'Backdrop': return <BackdropIcon {...iconProps} />;
    case 'Highlight': return <HighlightIcon {...iconProps} />;
    case 'Glow': return <GlowIcon {...iconProps} />;
    case 'Mono': return <MonoIcon {...iconProps} />;
    case 'Elegant': return <ElegantIcon {...iconProps} />;
    case 'Comic': return <ComicIcon {...iconProps} />;
    case 'Minimal': return <MinimalIcon {...iconProps} />;
    default: return <ClassicIcon {...iconProps} />;
  }
};

export default function TemplateGrid() {
  const { templates, addToCart, purchased, credits } = useContext(StoreContext);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 140, damping: 16 },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Templates Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:col-span-3"
      >
        {templates.map((template) => {
          const isPurchased = purchased.includes(template.id);
          const canAfford = credits >= template.cost;
          
          return (
            <motion.div
              key={template.id}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className={`rounded-2xl overflow-hidden shadow-lg transition cursor-pointer border ${
                hoveredTemplate === template.id 
                  ? 'border-indigo-300 shadow-indigo-100' 
                  : 'border-gray-100'
              } ${template.bgGradient}`}
              onMouseEnter={() => {
                setHoveredTemplate(template.id);
                setSelectedTemplate(template);
              }}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              {/* Template Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${template.iconColor}/20`}>
                    <TemplateIcon name={template.name} className={template.iconColor} />
                  </div>
                  <h3 className="font-semibold">{template.name}</h3>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  template.cost === 0 ? 'bg-green-100 text-green-800' : 'bg-indigo-100 text-indigo-800'
                }`}>
                  {template.cost === 0 ? "FREE" : `${template.cost} coins`}
                </span>
              </div>

              {/* Preview Area */}
              <div className="relative bg-gray-900 h-40 flex items-center justify-center">
                <div 
                  className="text-center px-4 py-2"
                  style={template.cssStyle}
                >
                  {template.demoText}
                </div>
                {template.cost > 0 && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                    {template.tag}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 flex items-center justify-between">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(template);
                  }}
                  disabled={isPurchased || !canAfford}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm ${
                    isPurchased
                      ? 'bg-gray-100 text-gray-500'
                      : !canAfford
                        ? 'bg-rose-100 text-rose-600'
                        : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                  }`}
                >
                  <ShoppingCart size={16} />
                  {isPurchased ? 'Purchased' : 'Add'}
                </motion.button>

                <div className="flex gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Heart size={16} />
                    {template.popularity}%
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={16} />
                    {template.views || 0}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Live Preview Panel */}
      <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6 sticky top-8 h-fit border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <TemplateIcon 
            name={selectedTemplate.name} 
            className={`w-6 h-6 ${selectedTemplate.iconColor}`} 
          />
          <h2 className="font-semibold text-lg">Live Preview</h2>
        </div>
        
        <div className="bg-gray-800 rounded-lg h-48 flex items-center justify-center mb-4">
          <div style={selectedTemplate.cssStyle}>
            {selectedTemplate.demoText}
          </div>
        </div>
        
        <h3 className="font-medium">{selectedTemplate.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{selectedTemplate.description}</p>
        
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Category:</span>
            <span className="font-medium">{selectedTemplate.category}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Best for:</span>
            <span className="font-medium text-right">
              {selectedTemplate.useCases?.join(', ') || 'All content'}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Popularity:</span>
            <div className="w-20 bg-gray-200 rounded-full h-1.5 mt-1">
              <div 
                className="bg-indigo-500 h-1.5 rounded-full" 
                style={{ width: `${selectedTemplate.popularity}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}