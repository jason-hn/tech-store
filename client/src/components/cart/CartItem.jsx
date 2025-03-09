import { useStore } from '../../store'
import { formatCurrency } from '../../utils/formatters'
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa'

const CartItem = ({ item }) => {
  const updateCartItemQuantity = useStore(state => state.updateCartItemQuantity)
  const removeFromCart = useStore(state => state.removeFromCart)

  const handleQuantityChange = (newQuantity) => {
    updateCartItemQuantity(item.id, newQuantity)
  }

  return (
    <div className="flex items-center py-4 px-6 border-b hover:bg-gray-50">
      <div className="flex-shrink-0 w-20 h-20">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover rounded"
        />
      </div>
      
      <div className="flex-grow ml-4">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-gray-600 text-sm">{formatCurrency(item.price)} each</p>
      </div>
      
      <div className="flex items-center mr-4">
        <button 
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="w-8 h-8 flex items-center justify-center rounded border hover:bg-gray-100 disabled:opacity-50"
        >
          <FaMinus className="text-xs" />
        </button>
        
        <span className="mx-2 w-8 text-center">{item.quantity}</span>
        
        <button 
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-8 h-8 flex items-center justify-center rounded border hover:bg-gray-100"
        >
          <FaPlus className="text-xs" />
        </button>
      </div>
      
      <div className="text-right mr-4 font-medium">
        {formatCurrency(item.price * item.quantity)}
      </div>
      
      <button 
        onClick={() => removeFromCart(item.id)}
        className="text-danger hover:text-danger-dark p-1"
        title="Remove item"
      >
        <FaTrash />
      </button>
    </div>
  )
}

export default CartItem 