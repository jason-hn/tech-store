import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../utils/api'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api'

export const useStore = create(
  persist(
    (set, get) => ({
      // Auth state
      user: null,
      isLoading: false,
      error: null,

      // Cart state
      cart: {
        items: [],
        total: 0,
      },

      // Products state
      products: [],
      currentProduct: null,

      // Auth actions
      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.post('/auth/login', { email, password })
          set({ user: response.data.user, isLoading: false })
          localStorage.setItem('token', response.data.token)
          return true
        } catch (err) {
          set({ error: err.response?.data?.message || 'Login failed', isLoading: false })
          return false
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.post('/auth/register', userData)
          set({ user: response.data.user, isLoading: false })
          localStorage.setItem('token', response.data.token)
          return true
        } catch (err) {
          set({ error: err.response?.data?.message || 'Registration failed', isLoading: false })
          return false
        }
      },

      logout: () => {
        localStorage.removeItem('token')
        set({ user: null })
      },

      updateProfile: async (userData) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.put('/users/profile', userData)
          set({ user: response.data, isLoading: false })
          return true
        } catch (err) {
          set({ 
            error: err.response?.data?.message || 'Failed to update profile', 
            isLoading: false 
          })
          return false
        }
      },

      // Cart actions
      addToCart: (product, quantity = 1) => {
        const cart = get().cart
        const existingItem = cart.items.find(item => item.id === product.id)
        
        let newItems
        if (existingItem) {
          newItems = cart.items.map(item => 
            item.id === product.id 
              ? { ...item, quantity: item.quantity + quantity } 
              : item
          )
        } else {
          newItems = [...cart.items, { ...product, quantity }]
        }
        
        const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        set({ cart: { items: newItems, total } })
      },

      removeFromCart: (productId) => {
        const cart = get().cart
        const newItems = cart.items.filter(item => item.id !== productId)
        const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        set({ cart: { items: newItems, total } })
      },

      updateCartItemQuantity: (productId, quantity) => {
        const cart = get().cart
        const newItems = cart.items.map(item => 
          item.id === productId 
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        )
        const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        set({ cart: { items: newItems, total } })
      },

      clearCart: () => {
        set({ cart: { items: [], total: 0 } })
      },

      // Checkout actions
      createOrder: async (orderData) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.post('/orders', orderData)
          set({ isLoading: false })
          return response.data
        } catch (err) {
          set({ 
            error: err.response?.data?.message || 'Failed to create order', 
            isLoading: false 
          })
          return null
        }
      },

      // Product actions
      fetchProducts: async (filters = {}) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.get('/products', { params: filters })
          set({ products: response.data, isLoading: false })
        } catch (err) {
          set({ 
            error: err.response?.data?.message || 'Failed to fetch products', 
            isLoading: false 
          })
        }
      },

      fetchProductById: async (id) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.get(`/products/${id}`)
          set({ currentProduct: response.data, isLoading: false })
        } catch (err) {
          set({ 
            error: err.response?.data?.message || 'Failed to fetch product', 
            isLoading: false 
          })
        }
      },

      // Review actions
      addReview: async (productId, reviewData) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.post(`/products/${productId}/reviews`, reviewData)
          
          // Update the current product with the new review
          const currentProduct = get().currentProduct
          if (currentProduct && currentProduct.id === productId) {
            set({ 
              currentProduct: {
                ...currentProduct,
                reviews: [...currentProduct.reviews, response.data]
              }
            })
          }
          
          set({ isLoading: false })
          return true
        } catch (err) {
          set({ 
            error: err.response?.data?.message || 'Failed to add review', 
            isLoading: false 
          })
          return false
        }
      },
    }),
    {
      name: 'tech-store-storage',
      partialize: (state) => ({ user: state.user, cart: state.cart }),
    }
  )
)

export default useStore 