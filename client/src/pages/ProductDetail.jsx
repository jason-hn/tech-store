import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStore } from '../store'
import Loading from '../components/common/Loading'
import Error from '../components/common/Error'
import Button from '../components/common/Button'
import { FaShoppingCart, FaStar } from 'react-icons/fa'

const ProductDetail = () => {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  
  const currentProduct = useStore(state => state.currentProduct)
  const fetchProductById = useStore(state => state.fetchProductById)
  const addToCart = useStore(state => state.addToCart)
  const isLoading = useStore(state => state.isLoading)
  const error = useStore(state => state.error)

  useEffect(() => {
    console.log('Fetching product with ID:', id);
    fetchProductById(id)
  }, [fetchProductById, id])

  const handleAddToCart = () => {
    if (currentProduct) {
      addToCart(currentProduct, quantity)
    }
  }

  if (isLoading) return <Loading />
  if (error) return <Error message={error} />
  if (!currentProduct) return <Error message="Product not found" />

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2">
            <img 
              src={currentProduct.image} 
              alt={currentProduct.name} 
              className="w-full h-auto object-cover"
              style={{ maxHeight: '500px' }}
            />
          </div>
          
          {/* Product Details */}
          <div className="p-6 md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{currentProduct.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < (currentProduct.rating || 0) ? 'text-yellow-400' : 'text-gray-300'} />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {currentProduct.numReviews || 0} reviews
              </span>
            </div>
            
            <p className="text-3xl font-bold text-primary mb-6">
              ${currentProduct.price.toFixed(2)}
            </p>
            
            <div className="mb-6 pb-6 border-b border-gray-200">
              <p className="text-gray-700">{currentProduct.description}</p>
            </div>
            
            {currentProduct.countInStock > 0 ? (
              <>
                <div className="mb-6 flex items-center">
                  <label htmlFor="quantity" className="mr-4">Quantity:</label>
                  <div className="flex items-center">
                    <button 
                      className="bg-gray-200 px-3 py-1 rounded-l-md"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <input
                      id="quantity"
                      type="number"
                      className="w-16 text-center border-t border-b border-gray-200 py-1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      max={currentProduct.countInStock}
                    />
                    <button 
                      className="bg-gray-200 px-3 py-1 rounded-r-md"
                      onClick={() => setQuantity(Math.min(currentProduct.countInStock, quantity + 1))}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <Button 
                  onClick={handleAddToCart}
                  fullWidth
                  size="lg"
                >
                  <FaShoppingCart className="inline mr-2" /> Add to Cart
                </Button>
              </>
            ) : (
              <div className="text-danger font-semibold py-2">Out of Stock</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail 