import React, { createContext, useState, useEffect, useCallback } from 'react';
import templatesData from '../data/templates';
import toast from 'react-hot-toast';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [templates] = useState(templatesData);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize credits from localStorage with error handling
  const [credits, setCredits] = useState(() => {
    try {
      const savedCredits = localStorage.getItem('credits');
      return savedCredits ? Number(savedCredits) : 500;
    } catch (error) {
      console.warn('Failed to load credits from localStorage:', error);
      return 500;
    }
  });

  // Initialize purchased items from localStorage with error handling
  const [purchased, setPurchased] = useState(() => {
    try {
      const savedPurchased = localStorage.getItem('purchased');
      return savedPurchased ? JSON.parse(savedPurchased) : [];
    } catch (error) {
      console.warn('Failed to load purchased items from localStorage:', error);
      return [];
    }
  });

  // Save purchased list to localStorage with error handling
  useEffect(() => {
    try {
      localStorage.setItem('purchased', JSON.stringify(purchased));
    } catch (error) {
      console.error('Failed to save purchased items to localStorage:', error);
      toast.error('Failed to save purchase data');
    }
  }, [purchased]);

  // Save credits to localStorage with error handling
  useEffect(() => {
    try {
      localStorage.setItem('credits', String(credits));
    } catch (error) {
      console.error('Failed to save credits to localStorage:', error);
      toast.error('Failed to save credit data');
    }
  }, [credits]);

  // Enhanced add to cart with better validation
  const addToCart = useCallback((template) => {
    if (!template || !template.id) {
      toast.error('Invalid template');
      return false;
    }

    if (purchased.includes(template.id)) {
      toast.error(`${template.name} is already purchased!`, {
        icon: '✅',
        duration: 2000,
      });
      return false;
    }

    if (cart.find(item => item.id === template.id)) {
      toast(`${template.name} is already in your cart!`, {
        icon: '🛒',
        duration: 2000,
      });
      return false;
    }

    setCart(prevCart => [...prevCart, template]);
    toast.success(`${template.name} added to cart!`, {
      icon: '🎉',
      duration: 2000,
    });
    return true;
  }, [cart, purchased]);

  // Enhanced remove from cart
  const removeFromCart = useCallback((templateId) => {
    const templateToRemove = cart.find(item => item.id === templateId);
    
    if (!templateToRemove) {
      toast.error('Template not found in cart');
      return false;
    }

    setCart(prevCart => prevCart.filter(item => item.id !== templateId));
    toast(`${templateToRemove.name} removed from cart`, {
      icon: '🗑️',
      duration: 2000,
    });
    return true;
  }, [cart]);

  // Enhanced checkout with loading state
  const checkout = useCallback(async () => {
    if (isLoading) {
      toast.error('Please wait, processing previous transaction...');
      return false;
    }

    if (cart.length === 0) {
      toast('Your cart is empty!', {
        icon: '🛒',
        duration: 2000,
      });
      return false;
    }

    const total = cart.reduce((sum, template) => sum + template.cost, 0);
    
    if (total > credits) {
      toast.error(`Insufficient credits! You need ${total - credits} more credits.`, {
        duration: 3000,
      });
      return false;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newPurchasedIds = cart.map(item => item.id);
      setPurchased(prevPurchased => [...new Set([...prevPurchased, ...newPurchasedIds])]);
      setCredits(prevCredits => prevCredits - total);
      setCart([]);

      // Enhanced success message with details
      const purchasedNames = cart.map(item => item.name).join(', ');
      toast.success(
        `🎉 Purchase successful!\n${purchasedNames}\nRemaining credits: ${credits - total}`,
        { duration: 4000 }
      );

      return true;
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error('Purchase failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [cart, credits, isLoading]);

  // Enhanced reset store function
  const resetStore = useCallback(() => {
    try {
      // Clear specific keys to avoid clearing other app data
      localStorage.removeItem('credits');
      localStorage.removeItem('purchased');
      
      setCart([]);
      setCredits(500);
      setPurchased([]);
      
      toast.success("🔄 Store reset to default state!", {
        duration: 3000,
        icon: '🔄',
      });
      return true;
    } catch (error) {
      console.error('Failed to reset store:', error);
      toast.error('Failed to reset store. Please try again.');
      return false;
    }
  }, []);

  // Helper function to check if template is purchasable
  const canPurchaseTemplate = useCallback((templateId) => {
    return !purchased.includes(templateId) && !cart.find(item => item.id === templateId);
  }, [purchased, cart]);

  // Helper function to get cart total
  const getCartTotal = useCallback(() => {
    return cart.reduce((sum, template) => sum + template.cost, 0);
  }, [cart]);

  // Helper function to get purchased templates
  const getPurchasedTemplates = useCallback(() => {
    return templates.filter(template => purchased.includes(template.id));
  }, [templates, purchased]);

  // Helper function to get available templates (not purchased)
  const getAvailableTemplates = useCallback(() => {
    return templates.filter(template => !purchased.includes(template.id));
  }, [templates, purchased]);

  // Context value with all functions and state
  const contextValue = {
    // Core state
    templates,
    cart,
    credits,
    purchased,
    isLoading,

    // Core actions
    addToCart,
    removeFromCart,
    checkout,
    resetStore,

    // Helper functions
    canPurchaseTemplate,
    getCartTotal,
    getPurchasedTemplates,
    getAvailableTemplates,

    // Computed values
    cartItemCount: cart.length,
    cartTotal: getCartTotal(),
    purchasedCount: purchased.length,
    canAffordCart: getCartTotal() <= credits,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

