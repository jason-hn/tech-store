import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import FormInput from '../components/common/FormInput'
import Button from '../components/common/Button'
import Error from '../components/common/Error'

const Checkout = () => {
  const navigate = useNavigate()
  const cart = useStore(state => state.cart)
  const user = useStore(state => state.user)
  const createOrder = useStore(state => state.createOrder)
  const clearCart = useStore(state => state.clearCart)
  const isLoading = useStore(state => state.isLoading)
  const error = useStore(state => state.error)
  
  // Redirect if cart is empty
  if (cart.items.length === 0) {
    navigate('/cart')
  }
  
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'PayPal' // Default payment method
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Create order object with all required fields
    const orderData = {
      orderItems: cart.items.map(item => ({
        product: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      })),
      shippingAddress: {
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country
      },
      paymentMethod: formData.paymentMethod,
      taxPrice: 0, // You could calculate tax based on cart items
      shippingPrice: 0, // You could calculate shipping cost
      totalPrice: cart.total
    }
    
    const result = await createOrder(orderData)
    if (result) {
      clearCart()
      navigate('/checkout/success', { state: { order: result } })
    }
  }
  
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      {error && <Error message={error} />}
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            
            <FormInput
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your street address"
              required
            />
            
            <FormInput
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              required
            />
            
            <FormInput
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Enter your postal code"
              required
            />
            
            <FormInput
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter your country"
              required
            />
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="PayPal"
                  checked={formData.paymentMethod === 'PayPal'}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-primary"
                />
                <span>PayPal or Credit Card</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Stripe"
                  checked={formData.paymentMethod === 'Stripe'}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-primary"
                />
                <span>Stripe</span>
              </label>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              {cart.items.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.quantity} × {item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 flex justify-between font-bold">
              <span>Total:</span>
              <span>${cart.total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              type="submit"
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? 'Processing...' : 'Place Order'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Checkout 