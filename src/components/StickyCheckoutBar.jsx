import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  CreditCard, 
  Coins, 
  ChevronUp, 
  X, 
  Plus,
  Minus,
  Sparkles,
  Crown,
  Zap,
  RotateCcw
} from 'lucide-react';
import toast from "react-hot-toast";

const StickyCheckoutBar = () => {
  const { 
    cart, 
    credits, 
    getCartTotal, 
    cartItemCount,
    canAffordCart,
    removeFromCart,
    resetStore
  } = useContext(StoreContext);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Don't render if cart is empty
  if (cartItemCount === 0) return null;

  const total = getCartTotal();

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the store?")) {
      resetStore();
      toast.success("Store reset successfully!");
      setIsExpanded(false); // Close expanded view after reset
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Sticky Bottom Bar */}
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          {/* Background blur overlay */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-t border-white/20"></div>
          
          {/* Gradient glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10"></div>
          
          <div className="relative max-w-7xl mx-auto px-6 py-4">
            {/* Collapsed View */}
            <motion.div
              layout
              className="flex items-center justify-between"
            >
              {/* Left: Cart Summary */}
              <motion.div 
                className="flex items-center gap-4 cursor-pointer"
                onClick={toggleExpanded}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated Cart Icon */}
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-20"></div>
                  <div className="relative bg-white p-3 rounded-full shadow-lg border border-purple-100">
                    <ShoppingCart className="w-6 h-6 text-purple-600" />
                    {/* Cart count badge */}
                    <motion.div
                      key={cartItemCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
                    >
                      {cartItemCount}
                    </motion.div>
                  </div>
                </div>

                {/* Cart Details */}
                <div className="hidden sm:block">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">
                      {cartItemCount} item{cartItemCount !== 1 ? 's' : ''}
                    </span>
                    <ChevronUp 
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                      }`} 
                    />
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Coins className="w-4 h-4 text-yellow-500" />
                    <span>{total} coins total</span>
                  </div>
                </div>
              </motion.div>

              {/* Right: Credits, Reset & Checkout */}
              <div className="flex items-center gap-4">
                {/* Credits Display */}
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/40">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">Balance:</span>
                  </div>
                  <span className="font-bold text-gray-900">{credits}</span>
                  <Coins className="w-4 h-4 text-yellow-500" />
                </div>

                {/* Reset Button */}
                <motion.button
                  onClick={handleReset}
                  className="relative group p-3 bg-white/60 backdrop-blur-sm rounded-full border border-white/40 hover:bg-red-50 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Reset Store"
                >
                  <RotateCcw className="w-5 h-5 text-red-500 group-hover:text-red-600 transition-colors duration-200" />
                </motion.button>

                {/* Checkout Button */}
                <motion.button
                  onClick={handleCheckout}
                  disabled={!canAffordCart}
                  className={`relative px-8 py-3 rounded-full font-bold text-white shadow-xl transition-all duration-300 ${
                    canAffordCart
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 cursor-pointer'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                  whileHover={canAffordCart ? { scale: 1.05, y: -2 } : {}}
                  whileTap={canAffordCart ? { scale: 0.95 } : {}}
                >
                  {canAffordCart ? (
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      <span>Checkout</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <X className="w-5 h-5" />
                      <span>Insufficient Credits</span>
                    </div>
                  )}
                  
                  {/* Shimmer effect for enabled button */}
                  {canAffordCart && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Expanded View - Cart Items */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 border-t border-white/20 mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg text-gray-900">Cart Items</h3>
                      <button
                        onClick={toggleExpanded}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>

                    {/* Cart Items List */}
                    <div className="space-y-3 max-h-48 overflow-y-auto">
                      {cart.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40"
                        >
                          <div className="flex items-center gap-3">
                            {/* Template Icon */}
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${item.bgGradient || 'from-gray-100 to-gray-200'}`}>
                              {item.tag === 'Premium' && <Crown className="w-4 h-4 text-yellow-600" />}
                              {item.tag === 'Pro' && <Zap className="w-4 h-4 text-purple-600" />}
                              {item.tag === 'Free' && <Sparkles className="w-4 h-4 text-green-600" />}
                              {!['Premium', 'Pro', 'Free'].includes(item.tag) && <Sparkles className="w-4 h-4 text-blue-600" />}
                            </div>

                            {/* Template Info */}
                            <div>
                              <div className="font-semibold text-gray-900">{item.name}</div>
                              <div className="text-sm text-gray-600 flex items-center gap-1">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  item.tag === 'Free' ? 'bg-green-100 text-green-700' :
                                  item.tag === 'Premium' ? 'bg-purple-100 text-purple-700' :
                                  item.tag === 'Pro' ? 'bg-blue-100 text-blue-700' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  {item.tag}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {/* Price */}
                            <div className="text-right">
                              <div className="font-bold text-gray-900">
                                {item.cost === 0 ? 'Free' : `${item.cost} coins`}
                              </div>
                            </div>

                            {/* Remove button */}
                            <motion.button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Minus className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Total Summary */}
                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/20">
                      <div className="text-lg font-semibold text-gray-900">Total</div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">{total}</span>
                        <Coins className="w-6 h-6 text-yellow-500" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Checkout Modal Trigger */}
      {isCheckoutModalOpen && (
        <CheckoutModal 
          isOpen={isCheckoutModalOpen}
          onClose={() => setIsCheckoutModalOpen(false)}
        />
      )}
    </>
  );
};

// Mini Checkout Modal Component (we'll create a full one later)
const CheckoutModal = ({ isOpen, onClose }) => {
  const { checkout, cart, getCartTotal, credits } = useContext(StoreContext);

  const handleCheckout = async () => {
    const success = await checkout();
    if (success) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Purchase</h2>
          <p className="text-gray-600">You're about to purchase {cart.length} template{cart.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="space-y-3 mb-6">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <span className="text-gray-900">{item.name}</span>
              <span className="font-semibold">{item.cost === 0 ? 'Free' : `${item.cost} coins`}</span>
            </div>
          ))}
          <div className="border-t pt-3 flex justify-between items-center font-bold text-lg">
            <span>Total</span>
            <span>{getCartTotal()} coins</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-6 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <motion.button
            onClick={handleCheckout}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Purchase Now
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StickyCheckoutBar;