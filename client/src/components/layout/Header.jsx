import { Link } from 'react-router-dom'
import { useStore } from '../../store'
import { FaShoppingCart, FaUser } from 'react-icons/fa'

const Header = () => {
  const cart = useStore(state => state.cart)
  const user = useStore(state => state.user)
  const logout = useStore(state => state.logout)

  return (
    <header className="bg-dark text-light shadow-md">
      <nav className="container-custom py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">TechStore</Link>
        
        <div className="flex items-center space-x-6">
          <Link to="/products" className="hover:text-primary">Products</Link>
          
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-xl" />
            {cart.items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.items.length}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="relative group">
              <div className="flex items-center space-x-2 cursor-pointer">
                <FaUser />
                <span>{user.name}</span>
              </div>
              <div className="absolute w-full h-3 bottom-0 left-0 transform translate-y-full"></div>
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-10">
                <Link to="/profile" className="block px-4 py-2 text-dark hover:bg-gray-100">Profile</Link>
                <button onClick={logout} className="block w-full text-left px-4 py-2 text-dark hover:bg-gray-100">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">Login</Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header 