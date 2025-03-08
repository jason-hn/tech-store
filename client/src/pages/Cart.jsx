import { Link } from 'react-router-dom'
import { useStore } from '../store'
import Button from '../components/common/Button'
import { FaTrash } from 'react-icons/fa'

const Cart = () => {
  const cart = useStore(state => state.cart)
  const removeFromCart = useStore(state => state.removeFromCart)
  const updateCartItemQuantity = useStore(state => state.updateCartItemQuantity)
  const clearCart = useStore(state => state.clearCart)

  if (cart.items.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
        <Link to="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="hidden md:grid md:grid-cols-5 bg-gray-50 p-4 border-b">
              <div className="col-span-2 font-medium">Product</div>
              <div className="font-medium text-center">Price</div>
              <div className="font-medium text-center">Quantity</div>
              <div className="font-medium text-right">Total</div>
            </div>
            
            {cart.items.map(item => (
              <div key={item.id} className="p-4 border-b last:border-b-0 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <div className="col-span-1 md:col-span-2 flex items-center space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm text-red-500 flex items-center mt-1"
                    >
                      <FaTrash className="mr-1" size={12} />
                      Remove
                    </button>
                  </div>
                </div>
                
                <div className="text-center md:text-center">
                  <span className="md:hidden font-medium mr-2">Price:</span>
                  ${item.price.toFixed(2)}
                </div>
                
                <div className="flex justify-between md:justify-center items-center">
                  <span className="md:hidden font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-md">
                    <button 
                      className="px-3 py-1"
                      onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 border-l border-r">{item.quantity}</span>
                    <button 
                      className="px-3 py-1"
                      onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className="md:hidden font-medium mr-2">Total:</span>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
            
            <div className="p-4 bg-gray-50 flex justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
        
        {/* Cart Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${cart.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-medium">
                  {cart.total > 100 ? 'Free' : '$10.00'}
                </span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>
                    ${(cart.total > 100 ? cart.total : cart.total + 10).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            
            <Button fullWidth size="lg">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart 