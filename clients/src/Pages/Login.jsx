import 'react'
import { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = () => {
  const [state, setState] = useState('Sign Up')
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext)

  // Retrieve stored emails from localStorage on component mount
  useEffect(() => {
    const storedEmails = JSON.parse(localStorage.getItem('savedEmails')) || []
    if (storedEmails.length > 0) {
      setEmail(storedEmails[0]) // Set the first email as the default (if any)
    }
  }, [])

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()

      axios.defaults.withCredentials = true
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password })

        if (data.success) {
          setIsLoggedin(true)
          getUserData()
          navigate('/')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password })

        if (data.success) {
          setIsLoggedin(true)
          getUserData()

          // Check if email is verified
          if (!data.isEmailVerified) {
            toast.info('Please verify your email before logging in.')
            navigate('/verify-email') // Redirect to the email verification page
          } else {
            navigate('/') // Navigate to the home page if email is verified
          }
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error('An error occurred')
    }
  }

  // Save email to localStorage when user changes email
  const handleEmailChange = (e) => {
    const newEmail = e.target.value
    setEmail(newEmail)

    // Get previously stored emails from localStorage
    const savedEmails = JSON.parse(localStorage.getItem('savedEmails')) || []

    // If the email is not already in the list, add it
    if (!savedEmails.includes(newEmail) && newEmail !== '') {
      savedEmails.unshift(newEmail) // Add to the beginning
      // Save updated list to localStorage (only keeping the last 5 emails)
      localStorage.setItem('savedEmails', JSON.stringify(savedEmails.slice(0, 5)))
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <div className='bg-slate-900 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm p-6'>
        <h2 className='text-3xl font-semibold text-white text-center mb-3'>
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </h2>
        <p className='text-center text-sm mb-6'>
          {state === 'Sign Up' ? 'Create Your Account' : 'Login to your account?'}
        </p>

        {/* Form */}
        <form onSubmit={onSubmitHandler}>
          {state === 'Sign Up' && (
            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]'>
              <img src={assets.person_icon} alt="Person Icon" className='w-5 h-5' />
              <input
                type="text"
                placeholder='Enter Your Full Name'
                required
                className='bg-transparent outline-none w-full text-white'
                onChange={(e) => setName(e.target.value)} // Corrected onChange
                value={name}
              />
            </div>
          )}

          {/* Email Input */}
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]'>
            <img src={assets.mail_icon} alt="Mail Icon" className='w-5 h-5' />
            <input
              type="email"
              placeholder='Enter email'
              required
              className='bg-transparent outline-none w-full text-white'
              onChange={handleEmailChange} // Updated onChange for email
              value={email}
              list="email-suggestions" // HTML5 feature for showing suggestions
            />
            <datalist id="email-suggestions">
              {/* Suggest previously entered emails from localStorage */}
              {JSON.parse(localStorage.getItem('savedEmails') || '[]').map((email, index) => (
                <option key={index} value={email} />
              ))}
            </datalist>
          </div>

          {/* Password Input */}
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]'>
            <img src={assets.lock_icon} alt="Lock Icon" className='w-5 h-5' />
            <input
              type="password"
              placeholder='Enter your Password'
              required
              className='bg-transparent outline-none w-full text-white'
              onChange={(e) => setPassword(e.target.value)} // Corrected onChange
              value={password}
            />
          </div>

          {/* Forgot Password Link */}
          <div className='text-center mb-6'>
            <p onClick={() => navigate('/reset-password')} className='text-sm text-blue-400 hover:underline cursor-pointer'>
              Forgot Password?
            </p>
          </div>

          {/* Submit Button */}
          <button className='w-full py-2.5 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-900 text-white font-medium'>
            {state}
          </button>
        </form>

        {state === 'Sign Up' ? (
          <p className='text-gray-400 text-xs'>
            Already have an account?{' '}
            <span onClick={() => setState('Login')} className='text-blue-400 cursor-pointer hover:underline'>
              login here
            </span>
          </p>
        ) : (
          <p className='text-gray-400 text-xs mt-2'>
            Don&apos;t have an account?{' '}
            <span onClick={() => setState('Sign Up')} className='text-blue-400 cursor-pointer hover:underline'>
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  )
}

export default Login
