import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store'
import ProductCard from '../components/product/ProductCard'

const Home = () => {
  const products = useStore(state => state.products)
  const fetchProducts = useStore(state => state.fetchProducts)
  const isLoading = useStore(state => state.isLoading)

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <div>
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 rounded-lg">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to TechStore</h1>
          <p className="text-xl mb-8">Your one-stop shop for the latest tech and electronics</p>
          <Link to="/products" className="bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        
        {isLoading ? (
          <div className="text-center py-8">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        <div className="text-center mt-8">
          <Link to="/products" className="text-primary font-medium hover:underline">
            View All Products →
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home 