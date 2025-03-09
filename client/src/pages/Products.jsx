import { useEffect, useState } from 'react'
import { useStore } from '../store'
import ProductCard from '../components/product/ProductCard'
import Loading from '../components/common/Loading'
import Error from '../components/common/Error'

const Products = () => {
  const products = useStore(state => state.products)
  const fetchProducts = useStore(state => state.fetchProducts)
  const isLoading = useStore(state => state.isLoading)
  const error = useStore(state => state.error)

  const [filters, setFilters] = useState({
    category: '',
    priceRange: ''
  })

  // Debugging state
  const [debug, setDebug] = useState({
    apiChecked: false,
    apiResponse: null
  })

  useEffect(() => {
    console.log('Products component mounted, calling fetchProducts()');
    fetchProducts();
    
    // Comment out or remove this debug code in production
    // Or update it to use the API_URL from environment
    /* 
    fetch('http://localhost:5002/api/products')
      .then(res => res.json())
      .then(data => {
        console.log('Direct API fetch result:', data);
        setDebug({
          apiChecked: true,
          apiResponse: data
        });
      })
      .catch(err => {
        console.error('Direct API fetch error:', err);
        setDebug({
          apiChecked: true,
          apiResponse: err.message
        });
      });
    */
  }, [fetchProducts]);

  console.log('Current products in store:', products);

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  // Simple filtering logic - would be better on the server in production
  const filteredProducts = products.filter(product => {
    let matchesCategory = true
    let matchesPriceRange = true
    
    if (filters.category && product.category) {
      matchesCategory = product.category === filters.category
    }
    
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number)
      matchesPriceRange = product.price >= min && (max ? product.price <= max : true)
    }
    
    return matchesCategory && matchesPriceRange
  })

  // Get unique categories from products
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))]

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      
      {/* Debug information - remove in production
      {process.env.NODE_ENV !== 'production' && (
        <div className="bg-blue-50 p-4 mb-4 rounded">
          <h3 className="font-bold">Debug Info:</h3>
          <div>Products in store: {products.length}</div>
          <div>API checked: {debug.apiChecked ? 'Yes' : 'No'}</div>
          <div>API response: {debug.apiResponse ? 
            (Array.isArray(debug.apiResponse) ? 
              `Array with ${debug.apiResponse.length} items` : 
              JSON.stringify(debug.apiResponse).substring(0, 100) + '...') : 
            'None'
          }</div>
        </div>
      )} */}
      
      {error && <Error message={error} />}
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-4">Filters</h3>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="form-input"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Price Range</label>
              <select
                name="priceRange"
                value={filters.priceRange}
                onChange={handleFilterChange}
                className="form-input"
              >
                <option value="">Any Price</option>
                <option value="0-100">$0 - $100</option>
                <option value="100-500">$100 - $500</option>
                <option value="500-1000">$500 - $1000</option>
                <option value="1000">$1000+</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="flex-1">
          {isLoading ? (
            <Loading />
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No products found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Products 