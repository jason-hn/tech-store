import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'

const CheckoutSuccess = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const order = location.state?.order
  
  useEffect(() => {
    // If no order data is found, redirect to home
    if (!order) {
      navigate('/')
    }
  }, [order, navigate])
  
  if (!order) return null
  
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-xl mb-8">Thank you for your purchase.</p>
        
        <div className="mb-8 text-left bg-gray-50 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
          <p className="mb-1"><strong>Order ID:</strong> {order._id}</p>
          <p className="mb-3"><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
          
          <h3 className="font-medium mb-2">Items:</h3>
          <ul className="list-disc pl-5">
            {order.items.map((item, index) => (
              <li key={index}>
                {item.quantity} x {item.name} - ${(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Link to="/products">
            <Button>Continue Shopping</Button>
          </Link>
          <Link to="/profile">
            <Button variant="outline">View Orders</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSuccess 