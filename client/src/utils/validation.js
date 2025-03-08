/**
 * Check if email is valid
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(String(email).toLowerCase())
}

/**
 * Check if password meets requirements
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: 'Password is required' }
  }
  
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters' }
  }
  
  // Add more password requirements as needed
  // const hasUpperCase = /[A-Z]/.test(password)
  // const hasLowerCase = /[a-z]/.test(password)
  // const hasNumbers = /\d/.test(password)
  // const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  
  return { isValid: true, message: '' }
}

/**
 * Validate login form
 * @param {Object} formData - Form data with email and password
 * @returns {Object} Validation errors object
 */
export const validateLoginForm = (formData) => {
  const errors = {}
  
  if (!formData.email) {
    errors.email = 'Email is required'
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Invalid email format'
  }
  
  const passwordValidation = validatePassword(formData.password)
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.message
  }
  
  return errors
}

/**
 * Validate registration form
 * @param {Object} formData - Form data
 * @returns {Object} Validation errors object
 */
export const validateRegistrationForm = (formData) => {
  const errors = {}
  
  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Name is required'
  }
  
  if (!formData.email) {
    errors.email = 'Email is required'
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Invalid email format'
  }
  
  const passwordValidation = validatePassword(formData.password)
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.message
  }
  
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }
  
  return errors
} 