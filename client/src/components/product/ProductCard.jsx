import { Link } from 'react-router-dom'
import { useStore } from '../../store'

const ProductCard = ({ product }) => {
  const addToCart = useStore(state => state.addToCart)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/products/${product.id}`}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
      </Link>
      
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold line-clamp-1 hover:text-primary">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          
          <button 
            onClick={() => addToCart(product)}
            className="btn btn-primary text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard 