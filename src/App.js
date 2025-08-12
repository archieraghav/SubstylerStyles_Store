import React, { useContext, useState } from 'react';
import { StoreProvider, StoreContext } from './context/StoreContext';
import TemplateGrid from './components/TemplateGrid';
import PurchasedPreview from './components/PurchasedPreview';
import StickyCheckoutBar from './components/StickyCheckoutBar';
import CheckoutModal from './components/CheckoutModal';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import toast from "react-hot-toast";
import { RotateCcw, Search, Sparkles, Star, Crown, MessageCircle, X, Send, Home, MessageSquare } from 'lucide-react';

// Footer with Chat Component
const FooterWithChat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Message sent:', message);
      toast.success('Message sent successfully!');
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Footer Section */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Browse Section */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Browse</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Featured products</a></li>
                <li><a href="#" className="hover:text-white transition-colors">UI Kits</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Coded Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Wireframe kits</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Illustrations</a></li>
              </ul>
              <div className="mt-6">
                <ul className="space-y-3">
                  <li><a href="#" className="hover:text-white transition-colors">Fonts</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Presentation</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Mockups</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">3D Assets</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Icon Sets</a></li>
                </ul>
              </div>
            </div>

            {/* Themes & Templates Section */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Themes & Templates</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">For Figma</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Sketch</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Lunacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Freebies</a></li>
              </ul>
            </div>

            {/* Platform Section */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">All-Access Pass</a></li>
                <li><a href="#" className="hover:text-white transition-colors">UI8 Design Studio</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Become an author</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Affiliate program</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms & Licensing</a></li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Sign up for our newsletter!</h3>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm text-gray-400 mb-2">Email</label>
                <div className="relative">
                  <input 
                    type="email" 
                    id="email"
                    placeholder="designer@example.com"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Send className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                  </button>
                </div>
              </div>

{/*connect us section */}
<div>
  <h4 className="text-white text-lg font-semibold mb-4">Connect with us</h4>
  <div className="flex space-x-3">
    {/* Instagram */}
    <a 
      href="#" 
      aria-label="Instagram"
      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors group hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-yellow-500"
    >
      <svg 
        className="w-5 h-5 text-gray-300 group-hover:text-white" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    </a>

    {/* Twitter/X */}
    <a 
      href="#" 
      aria-label="Twitter"
      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors group hover:bg-black"
    >
      <svg 
        className="w-5 h-5 text-gray-300 group-hover:text-white" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    </a>

    {/* Threads */}
    <a 
      href="#" 
      aria-label="Threads"
      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors group hover:bg-black"
    >
      <svg 
        className="w-5 h-5 text-gray-300 group-hover:text-white" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    </a>

    {/* Gmail */}
    <a 
      href="#" 
      aria-label="Email"
      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors group hover:bg-gradient-to-br hover:from-red-500 hover:to-blue-500"
    >
      <svg 
        className="w-5 h-5 text-gray-300 group-hover:text-white" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.387l-9 6.463-9-6.463V21H1.5C.649 21 0 20.35 0 19.5v-15c0-.425.162-.8.431-1.068C.7 3.16 1.076 3 1.5 3H2l10 7.25L22 3h.5c.425 0 .8.162 1.069.432.27.268.431.643.431 1.068z"/>
      </svg>
    </a>
  </div>
</div>            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-lg mr-3 flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
              <p className="text-gray-400 text-sm">© 2025, Robot Global FZCO / UI8</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Button */}
        <motion.button
          onClick={toggleChat}
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isChatOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
        </motion.button>

        {/* Chat Window */}
        {isChatOpen && (
          <motion.div 
            className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-center">
              <div className="w-12 h-12 bg-white rounded-lg mx-auto mb-3 flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <h3 className="text-white text-xl font-semibold mb-1">Need any help?</h3>
              <p className="text-blue-100 text-sm">We're just a message away!</p>
            </div>

            {/* Chat Input */}
            <div className="p-4">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Ask a question"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-12 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                <button
                  onClick={handleSendMessage}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mb-4">AI Agent and team can help</p>

              {/* Navigation Buttons */}
              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl py-3 px-4 flex flex-col items-center justify-center transition-colors">
                  <Home className="w-5 h-5 mb-1" />
                  <span className="text-sm font-medium">Home</span>
                </button>
                <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl py-3 px-4 flex flex-col items-center justify-center transition-colors">
                  <MessageSquare className="w-5 h-5 mb-1" />
                  <span className="text-sm font-medium">Messages</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

function InnerApp() {
  const storeContext = useContext(StoreContext);
  
  // Safety check for context
  if (!storeContext) {
    return <div>Loading...</div>;
  }
  
  const { resetStore } = storeContext;

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the store?")) {
      resetStore();
      toast.success("Store reset successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.header
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-between px-6 py-4 
                     bg-white/80 backdrop-blur-xl shadow-xl border-b border-white/20 
                     sticky top-0 z-40 rounded-b-2xl"
        >
          {/* Brand with Icon */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-75"></div>
              <div className="relative bg-white p-2 rounded-lg">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              SubStyler
            </div>
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Pro
            </span>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            className="hidden md:flex items-center w-full max-w-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className="relative w-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur opacity-30"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 border border-white/40 shadow-lg">
                <div className="flex items-center">
                  <Search className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="What subtitle style are you looking for?"
                    className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-400"
                  />
                  <select className="bg-transparent outline-none text-gray-500 text-sm mr-3 cursor-pointer">
                    <option>All Styles</option>
                    <option>Free</option>
                    <option>Premium</option>
                  </select>
                  <motion.button 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-2 rounded-full transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Search size={16} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.nav 
            className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <a href="#" className="hover:text-purple-600 transition-colors duration-200">Explore</a>
            <a href="#" className="hover:text-purple-600 transition-colors duration-200">Creators</a>
            <a href="#" className="hover:text-purple-600 transition-colors duration-200">Trending</a>
            <a href="#" className="hover:text-purple-600 transition-colors duration-200">Blog</a>
            <motion.button 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-full transition-all duration-200 shadow-lg"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </motion.nav>
        </motion.header>

        {/* Hero Section with Floating Elements */}
        <section className="relative text-center py-16 px-6 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-pink-200 rounded-full opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-200 rounded-full opacity-25 animate-pulse" style={{animationDelay: '0.5s'}}></div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Subtitle Styles
              <br />
              <span className="relative">
                Marketplace
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Star className="w-8 h-8 text-yellow-400" fill="currentColor" />
                </motion.div>
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Transform your videos with professionally designed subtitle templates. 
              Browse our curated collection of styles from talented creators worldwide, 
              and make your content truly stand out.
            </motion.p>

            {/* Stats or features */}
            <motion.div 
              className="flex flex-wrap justify-center gap-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="flex items-center gap-2 text-gray-600">
                <Crown className="w-5 h-5 text-yellow-500" />
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Star className="w-5 h-5 text-purple-500" />
                <span>8+ Unique Styles</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Sparkles className="w-5 h-5 text-pink-500" />
                <span>Instant Preview</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Full Width Main Content - ORIGINAL LAYOUT RESTORED */}
        <main className="px-6 pb-8">

          {/* Template Grid */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Style</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Select from our premium collection of subtitle templates. Hover over any template 
                to see a live preview of how your subtitles will look.
              </p>
            </div>
            <TemplateGrid />
          </motion.section>
        </main>

        {/* Sticky Checkout Bar */}
        <StickyCheckoutBar />

        {/* Checkout Modal */}
        <CheckoutModal />



        {/* Toast container with custom styling */}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: 'white',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: 'white',
              },
            },
          }}
        />
      </div>

      {/* Footer with Chat - Outside the max-w container for full width */}
      <FooterWithChat />
    </div>
  );
}

function App() {
  return (
    <StoreProvider>
      <InnerApp />
    </StoreProvider>
  );
}

export default App;