import { useState, useEffect } from 'react'
import { useStore } from '../store'
import FormInput from '../components/common/FormInput'
import Button from '../components/common/Button'
import Error from '../components/common/Error'

const Profile = () => {
  const user = useStore(state => state.user)
  const updateProfile = useStore(state => state.updateProfile)
  const isLoading = useStore(state => state.isLoading)
  const error = useStore(state => state.error)
  
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  
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
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Basic validation
    if (formData.password && formData.password !== formData.confirmPassword) {
      // You could set an error state here, but for simplicity we'll just alert
      alert('Passwords do not match')
      return
    }
    
    const userData = {
      name: formData.name,
      email: formData.email
    }
    
    // Only include password if it was provided
    if (formData.password) {
      userData.password = formData.password
    }
    
    const success = await updateProfile(userData)
    if (success) {
      setIsEditing(false)
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }))
    }
  }
  
  const handleEditClick = (e) => {
    e.preventDefault() // Add this to prevent any form submission
    console.log("Edit button clicked")
    setIsEditing(true)
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      
      {error && <Error message={error} />}
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Account Information</h2>
        
        <div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <FormInput
                label="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
              
              <FormInput
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
              
              {isEditing && (
                <>
                  <FormInput
                    label="New Password (leave blank to keep current)"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  
                  <FormInput
                    label="Confirm New Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </>
              )}
            </div>
            
            <div className="mt-6 flex space-x-4">
              {isEditing ? (
                <>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={(e) => {
                      e.preventDefault()
                      setIsEditing(false)
                    }}
                    disabled={isLoading}
                    type="button"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <div onClick={(e) => e.stopPropagation()}>
                  <Button 
                    onClick={handleEditClick}
                    type="button"
                  >
                    Edit Profile
                  </Button>
                </div>
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