import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ProductColor = 'Titanium Black' | 'Titanium Silver' | 'Titanium Gold'
export type ProductSize = 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13
export type ProductModel = 'PulseRing Basic' | 'PulseRing Pro'

export interface CartItem {
  id: string
  model: ProductModel
  color: ProductColor
  size: ProductSize
  price: number
  quantity: number
  image: string
}

export interface WishlistItem {
  id: string
  model: ProductModel
  color: ProductColor
  price: number
  image: string
}

interface StoreState {
  // Cart
  cart: CartItem[]
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  
  // Wishlist
  wishlist: WishlistItem[]
  isWishlistOpen: boolean
  openWishlist: () => void
  closeWishlist: () => void
  toggleWishlist: (item: Omit<WishlistItem, 'id'>) => void
  
  // Product Modal
  isProductModalOpen: boolean
  selectedProductModel: ProductModel | null
  openProductModal: (model: ProductModel) => void
  closeProductModal: () => void
}

const generateId = (model: string, color: string, size: number) => `${model}-${color}-${size}`.replace(/\s+/g, '-').toLowerCase()
const generateWishlistId = (model: string, color: string) => `${model}-${color}`.replace(/\s+/g, '-').toLowerCase()

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // --- CART ---
      cart: [],
      isCartOpen: false,
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      addToCart: (item) => {
        const id = generateId(item.model, item.color, item.size)
        const currentCart = get().cart
        const existingItem = currentCart.find((i) => i.id === id)
        
        if (existingItem) {
          set({
            cart: currentCart.map((i) => 
              i.id === id ? { ...i, quantity: i.quantity + 1 } : i
            ),
            isCartOpen: true
          })
        } else {
          set({
            cart: [...currentCart, { ...item, id, quantity: 1 }],
            isCartOpen: true
          })
        }
      },
      removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((i) => i.id !== id) })),
      updateQuantity: (id, quantity) => set((state) => ({
        cart: state.cart.map((i) => i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i)
      })),
      clearCart: () => set({ cart: [] }),

      // --- WISHLIST ---
      wishlist: [],
      isWishlistOpen: false,
      openWishlist: () => set({ isWishlistOpen: true }),
      closeWishlist: () => set({ isWishlistOpen: false }),
      toggleWishlist: (item) => {
        const id = generateWishlistId(item.model, item.color)
        const currentWishlist = get().wishlist
        const exists = currentWishlist.some((i) => i.id === id)
        
        if (exists) {
          set({ wishlist: currentWishlist.filter((i) => i.id !== id) })
        } else {
          set({ wishlist: [...currentWishlist, { ...item, id }] })
        }
      },

      // --- PRODUCT MODAL ---
      isProductModalOpen: false,
      selectedProductModel: null,
      openProductModal: (model) => set({ isProductModalOpen: true, selectedProductModel: model }),
      closeProductModal: () => set({ isProductModalOpen: false, selectedProductModel: null }),
    }),
    {
      name: 'pulsering-storage', // name of the item in the storage (must be unique)
      partialize: (state) => ({ cart: state.cart, wishlist: state.wishlist }), // Only save cart and wishlist
    }
  )
)
