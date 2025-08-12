// src/components/Cart.jsx
import React, { useContext, useMemo, useState, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";
import Confetti from "react-confetti";

export default function Cart() {
  const { cart, credits, removeFromCart, checkout } = useContext(StoreContext);
  const [open, setOpen] = useState(true);
  const [lastCredits, setLastCredits] = useState(credits);
  const [showConfetti, setShowConfetti] = useState(false);

  const total = useMemo(() => cart.reduce((s, t) => s + t.cost, 0), [cart]);

  // Animate pulse when credits change
  useEffect(() => {
    if (credits !== lastCredits) {
      setLastCredits(credits);
    }
  }, [credits, lastCredits]);

  // Run confetti on successful checkout
  const handleCheckout = () => {
    if (total > 0 && total <= credits) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      checkout();
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 8, scale: 0.98 },
    show: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 160, damping: 18 } },
    exit: { opacity: 0, x: 8, scale: 0.98, transition: { duration: 0.18 } },
  };

  return (
    <div className="relative">
      {showConfetti && <Confetti numberOfPieces={120} recycle={false} />}

      {/* mini header toggle */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button
          onClick={() => setOpen((s) => !s)}
          className="text-sm text-slate-600 bg-white/70 px-3 py-1 rounded-md shadow-sm"
        >
          {open ? "Hide" : "Show"}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white/90 rounded-2xl p-5 shadow-lg border border-white/30"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="text-base text-slate-600">Balance</div>
          <motion.div
            key={credits} // triggers animation on change
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.4 }}
            className="font-bold text-lg"
          >
            {credits} coins
          </motion.div>
        </div>

        <div className="min-h-[140px]">
          <AnimatePresence>
            {cart.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="text-center text-slate-500 py-10"
              >
                <div className="mb-2 text-2xl">🛒</div>
                <div className="font-medium text-lg">Your cart is empty</div>
                <div className="text-sm mt-1">Add subtitle styles to test them out</div>
              </motion.div>
            ) : (
              cart.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="flex items-center justify-between py-4 border-b last:border-0"
                >
                  <div>
                    <div className="font-medium text-base">{item.name}</div>
                    <div className="text-sm text-slate-500">
                      {item.cost === 0 ? "Free" : `${item.cost} coins`}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-3 rounded-md hover:bg-red-50 text-red-600"
                      title="Remove"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-base text-slate-700 mb-4">
            <span>Total</span>
            <span className="font-semibold">{total} coins</span>
          </div>

          <motion.button
            onClick={handleCheckout}
            whileTap={{ scale: 0.98 }}
            disabled={total === 0 || total > credits}
            className={`w-full py-3 rounded-lg text-white font-semibold transition text-lg ${
              total === 0
                ? "bg-slate-300 cursor-not-allowed"
                : total > credits
                ? "bg-amber-500 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-emerald-500 hover:brightness-105"
            }`}
          >
            Checkout
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
