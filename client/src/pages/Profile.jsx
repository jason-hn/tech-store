import { useState, useEffect } from 'react'
import { useStore } from '../store'
import FormInput from '../components/common/FormInput'
import Button from '../components/common/Button'
import Error from '../components/common/Error'

const Profile = () => {
  const { user, error } = useStore(state => ({
    user: state.user,
    error: state.error
  }))

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [formErrors, setFormErrors] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        confirmPassword: ''
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const errors = {}
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    }
    
    if (formData.password && formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    // Here you would update user profile
    // This is a simplified example without actual API calls
    setMessage('Profile updated successfully')
    setIsEditing(false)
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
          
          {message && (
            <div className="mb-4 bg-green-50 text-green-600 p-3 rounded border border-green-200">
              {message}
            </div>
          )}
          
          {error && <Error message={error} />}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Full Name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                error={formErrors.name}
                disabled={!isEditing}
              />
              
              <FormInput
                label="Email Address"
                id="email"
                type="email"
                value={formData.email}
                disabled={true} // Email can't be changed
              />
              
              {isEditing && (
                <>
                  <FormInput
                    label="New Password (leave blank to keep current)"
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={formErrors.password}
                  />
                  
                  <FormInput
                    label="Confirm New Password"
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={formErrors.confirmPassword}
                  />
                </>
              )}
            </div>
            
            <div className="mt-6 flex space-x-4">
              {isEditing ? (
                <>
                  <Button type="submit">Save Changes</Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              )}
            </div>
          </form>
        </div>
      </div>
      
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Order History</h3>
        
        <div className="text-gray-500 text-center py-6">
          You haven't placed any orders yet.
        </div>
      </div>
    </div>
  )
}

export default Profile 