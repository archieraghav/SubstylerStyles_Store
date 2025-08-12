import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function CreditDisplay() {
  const { credits, resetStore } = useContext(StoreContext);

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the store?")) {
      resetStore();
      toast.success("Store reset successfully!");
    }
  };

  return (
    <motion.div
      className="flex items-center justify-between p-4 bg-white rounded-xl shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <span className="font-bold text-lg text-gray-800">
        💰 Credits: {credits} coins
      </span>
      <button
        onClick={handleReset}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition-transform transform hover:scale-105"
      >
        Reset Store
      </button>
    </motion.div>
  );
}

