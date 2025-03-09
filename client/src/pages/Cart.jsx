import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import Button from '../components/common/Button'
import { FaTrash } from 'react-icons/fa'
import CartItem from '../components/cart/CartItem'
import Error from '../components/common/Error'

const Cart = () => {
  const navigate = useNavigate()
  const cart = useStore(state => state.cart)
  const user = useStore(state => state.user)
  const isLoading = useStore(state => state.isLoading)
  const error = useStore(state => state.error)

  const handleCheckout = () => {
    if (!user) {
      navigate('/login', { state: { from: '/cart' } })
      return
    }
    
    navigate('/checkout')
  }

  if (cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-xl mb-6">Your cart is empty</p>
          <Button onClick={() => navigate('/products')}>
            Browse Products
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      {error && <Error message={error} />}
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Cart Items</h2>
        </div>
        
        <div>
          {cart.items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        
        <div className="bg-gray-50 px-6 py-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-xl font-bold">${cart.total.toFixed(2)}</span>
          </div>
          
          <Button 
            onClick={handleCheckout} 
            disabled={isLoading}
            fullWidth
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Cart 