import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">TechStore</h3>
            <p className="text-gray-400">
              Your one-stop shop for all tech products and electronics.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-primary">Home</a></li>
              <li><a href="/products" className="text-gray-400 hover:text-primary">Products</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-primary">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-primary">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary text-xl"><FaGithub /></a>
              <a href="#" className="text-gray-400 hover:text-primary text-xl"><FaTwitter /></a>
              <a href="#" className="text-gray-400 hover:text-primary text-xl"><FaLinkedin /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} TechStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 