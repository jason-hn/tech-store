import { Link } from 'react-router-dom'
import Button from '../components/common/Button'

const NotFound = () => {
  return (
    <div className="text-center py-16">
      <h1 className="text-5xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8">
        The page you were looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  )
}

export default NotFound 