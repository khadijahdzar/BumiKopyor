import { createContext, useContext, useMemo, useState, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addToCart = useCallback((product, qty = 1) => {
    if (!product?.id) return
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + qty } : i,
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          unit: product.unit,
          imageLabel: product.imageLabel || product.name,
          farmer: product.farmer,
          quantity: qty,
        },
      ]
    })
  }, [])

  const removeFromCart = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id, quantity) => {
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((i) => i.id !== id)
      return prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    })
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const cartCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  )

  const cartTotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [items, cartCount, cartTotal, addToCart, removeFromCart, updateQuantity, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart harus dipakai di dalam CartProvider')
  return ctx
}
