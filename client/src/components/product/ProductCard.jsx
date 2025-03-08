import { Link } from 'react-router-dom'
import { useStore } from '../../store'
import { formatCurrency } from '../../utils/formatters'

const ProductCard = ({ product }) => {
  const addToCart = useStore(state => state.addToCart)
  
  // Handle both _id and id for compatibility
  const productId = product.id || product._id
  
  const handleAddToCart = () => {
    addToCart({
      ...product,
      id: productId,
      quantity: 1
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/products/${productId}`}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
      </Link>
      
      <div className="p-4">
        <Link to={`/products/${productId}`} className="block mb-2">
          <h3 className="font-bold text-lg hover:text-primary transition">{product.name}</h3>
        </Link>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold">{formatCurrency(product.price)}</span>
          
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span>{product.rating}</span>
          </div>
        </div>
        
        <button 
          onClick={handleAddToCart}
          disabled={product.countInStock === 0}
          className={`w-full py-2 rounded-md transition ${
            product.countInStock > 0 
              ? 'bg-primary text-white hover:bg-primary-dark' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard 