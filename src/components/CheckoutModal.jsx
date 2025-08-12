import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CreditCard, 
  Coins, 
  ShoppingCart, 
  Check, 
  AlertCircle, 
  Crown,
  Sparkles,
  Zap,
  Star,
  ArrowRight,
  Gift,
  Trash2,
  Eye
} from 'lucide-react';

const CheckoutModal = ({ isOpen, onClose }) => {
  const { 
    cart, 
    credits, 
    checkout, 
    getCartTotal, 
    removeFromCart,
    isLoading,
    templates 
  } = useContext(StoreContext);

  const [checkoutStep, setCheckoutStep] = useState('review'); // 'review', 'processing', 'success', 'error'
  const [purchasedItems, setPurchasedItems] = useState([]);

  const total = getCartTotal();
  const canAfford = total <= credits;

  // Reset modal state when opened
  useEffect(() => {
    if (isOpen) {
      setCheckoutStep('review');
      setPurchasedItems([]);
    }
  }, [isOpen]);

  const handleCheckout = async () => {
    if (!canAfford || cart.length === 0) return;

    setCheckoutStep('processing');
    setPurchasedItems([...cart]); // Store items before cart is cleared

    try {
      const success = await checkout();
      if (success) {
        setCheckoutStep('success');
        // Auto close after success (optional)
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setCheckoutStep('error');
      }
    } catch (error) {
      setCheckoutStep('error');
    }
  };

  const getTemplateIcon = (template) => {
    switch (template.tag) {
      case 'Premium': return <Crown className="w-5 h-5 text-yellow-600" />;
      case 'Pro': return <Zap className="w-5 h-5 text-purple-600" />;
      case 'Free': return <Gift className="w-5 h-5 text-green-600" />;
      case 'Popular': return <Star className="w-5 h-5 text-orange-500" />;
      default: return <Sparkles className="w-5 h-5 text-blue-600" />;
    }
  };

  const getStepProgress = () => {
    switch (checkoutStep) {
      case 'review': return 25;
      case 'processing': return 75;
      case 'success': return 100;
      case 'error': return 50;
      default: return 0;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Progress Bar */}
          <div className="h-1 bg-gray-200">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: '25%' }}
              animate={{ width: `${getStepProgress()}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Header */}
          <div className="relative p-6 border-b border-gray-100">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="pr-12">
              {checkoutStep === 'review' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
                      <ShoppingCart className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Review Your Order</h2>
                      <p className="text-gray-600">
                        {cart.length} template{cart.length !== 1 ? 's' : ''} ready for purchase
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {checkoutStep === 'processing' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full w-fit mx-auto mb-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <CreditCard className="w-6 h-6 text-blue-600" />
                    </motion.div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Processing Purchase</h2>
                  <p className="text-gray-600">Please wait while we process your order...</p>
                </motion.div>
              )}

              {checkoutStep === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full w-fit mx-auto mb-3">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Purchase Successful!</h2>
                  <p className="text-gray-600">Your templates are now available in your library</p>
                </motion.div>
              )}

              {checkoutStep === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <div className="p-3 bg-gradient-to-r from-red-100 to-pink-100 rounded-full w-fit mx-auto mb-3">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Purchase Failed</h2>
                  <p className="text-gray-600">Something went wrong. Please try again.</p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {checkoutStep === 'review' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* Cart Items */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-gray-600" />
                    Items in Cart
                  </h3>
                  
                  {cart.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        {/* Template Preview */}
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${item.bgGradient || 'from-gray-100 to-gray-200'}`}>
                          {getTemplateIcon(item)}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{item.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.tag === 'Free' ? 'bg-green-100 text-green-700' :
                              item.tag === 'Premium' ? 'bg-purple-100 text-purple-700' :
                              item.tag === 'Pro' ? 'bg-blue-100 text-blue-700' :
                              item.tag === 'Popular' ? 'bg-orange-100 text-orange-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {item.tag}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{item.description || item.preview}</p>
                          
                          {/* Live Preview */}
                          <div className="mt-2 p-3 bg-gray-900 rounded-lg">
                            <div style={item.cssStyle} className="text-sm">
                              {item.demoText || item.preview}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-bold text-lg text-gray-900">
                            {item.cost === 0 ? (
                              <span className="text-green-600">Free</span>
                            ) : (
                              <div className="flex items-center gap-1">
                                <span>{item.cost}</span>
                                <Coins className="w-4 h-4 text-yellow-500" />
                              </div>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                          title="Remove from cart"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                  <h3 className="font-semibold text-lg text-gray-900 mb-4">Order Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Subtotal ({cart.length} items)</span>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">{total}</span>
                        <Coins className="w-4 h-4 text-yellow-500" />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-green-600">
                      <span>Platform fee</span>
                      <span className="font-semibold">Free</span>
                    </div>
                    
                    <div className="border-t border-purple-200 pt-3 flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">{total}</span>
                        <Coins className="w-6 h-6 text-yellow-500" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Credit Balance */}
                <div className="flex items-center justify-between p-4 bg-white border-2 border-dashed border-gray-200 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <Coins className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Your Balance</div>
                      <div className="text-sm text-gray-600">Available credits</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{credits}</div>
                    <div className={`text-sm font-medium ${canAfford ? 'text-green-600' : 'text-red-600'}`}>
                      {canAfford ? 'Sufficient balance' : `Need ${total - credits} more`}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {checkoutStep === 'processing' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Coins className="w-10 h-10 text-white" />
                </motion.div>
                <div className="space-y-2">
                  <div className="text-lg text-gray-600">Verifying payment...</div>
                  <div className="text-lg text-gray-600">Unlocking templates...</div>
                  <div className="text-lg text-gray-600">Almost done...</div>
                </div>
              </motion.div>
            )}

            {checkoutStep === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="mb-6"
                >
                  <div className="text-6xl">🎉</div>
                </motion.div>
                
                <div className="space-y-4">
                  <div className="text-lg text-gray-600">
                    Successfully purchased {purchasedItems.length} template{purchasedItems.length !== 1 ? 's' : ''}!
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                    <div className="flex items-center justify-center gap-2 text-green-700">
                      <Check className="w-5 h-5" />
                      <span className="font-semibold">Templates added to your library</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">
                    Remaining balance: {credits - total} coins
                  </div>
                </div>
              </motion.div>
            )}

            {checkoutStep === 'error' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <div className="text-6xl mb-4">😞</div>
                <div className="space-y-4">
                  <div className="text-lg text-gray-600">
                    We couldn't complete your purchase
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                    <div className="text-red-700 text-sm">
                      Please check your balance and try again
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            {checkoutStep === 'review' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4"
              >
                <button
                  onClick={onClose}
                  className="flex-1 py-4 px-6 border-2 border-gray-200 rounded-2xl font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Continue Shopping
                </button>
                <motion.button
                  onClick={handleCheckout}
                  disabled={!canAfford || cart.length === 0 || isLoading}
                  className={`flex-1 py-4 px-6 rounded-2xl font-bold text-white transition-all ${
                    canAfford && cart.length > 0 && !isLoading
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                  whileHover={canAfford && cart.length > 0 ? { scale: 1.02, y: -1 } : {}}
                  whileTap={canAfford && cart.length > 0 ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <CreditCard className="w-5 h-5" />
                        </motion.div>
                        <span>Processing...</span>
                      </>
                    ) : !canAfford ? (
                      <>
                        <AlertCircle className="w-5 h-5" />
                        <span>Insufficient Credits</span>
                      </>
                    ) : (
                      <>
                        <span>Complete Purchase</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </div>
                </motion.button>
              </motion.div>
            )}

            {(checkoutStep === 'success' || checkoutStep === 'error') && (
              <motion.button
                onClick={onClose}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {checkoutStep === 'success' ? 'Continue Shopping' : 'Try Again'}
              </motion.button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CheckoutModal;