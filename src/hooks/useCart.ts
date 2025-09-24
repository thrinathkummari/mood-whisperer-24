import { useState, useEffect } from 'react';
import { Book, CartItem, Cart } from '@/types/product';

const CART_STORAGE_KEY = 'bookstore-cart';

export const useCart = () => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    itemCount: 0
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const calculateTotal = (items: CartItem[]) => {
    const total = items.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    return { total, itemCount };
  };

  const addToCart = (book: Book, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => item.book.id === book.id);
      let newItems: CartItem[];

      if (existingItem) {
        newItems = prevCart.items.map(item =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prevCart.items, { book, quantity }];
      }

      const { total, itemCount } = calculateTotal(newItems);
      return { items: newItems, total, itemCount };
    });
  };

  const removeFromCart = (bookId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.book.id !== bookId);
      const { total, itemCount } = calculateTotal(newItems);
      return { items: newItems, total, itemCount };
    });
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.book.id === bookId
          ? { ...item, quantity }
          : item
      );
      const { total, itemCount } = calculateTotal(newItems);
      return { items: newItems, total, itemCount };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      itemCount: 0
    });
  };

  const getItemQuantity = (bookId: string) => {
    const item = cart.items.find(item => item.book.id === bookId);
    return item ? item.quantity : 0;
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity
  };
};