import { Navigate, useLocation } from 'react-router-dom'
import { useStore } from '../../store'

const ProtectedRoute = ({ children }) => {
  const user = useStore(state => state.user)
  const location = useLocation()
  
  if (!user) {
    // Redirect to login and remember where they were trying to go
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }
  
  return children
}

export default ProtectedRoute 