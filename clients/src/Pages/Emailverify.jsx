import axios from 'axios'
import { useContext, useRef } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Emailverify = () => {
  axios.defaults.withCredentials = true
  const { backendUrl,  getUserData } = useContext(AppContext)
  const navigate = useNavigate()

  const inputRef = useRef([])

  const handleInputChange = (e, index) => {
    // Move to next input field if a value is entered
    if (e.target.value.length === 1 && index < 5) {
      inputRef.current[index + 1].focus()
    }
  }

  const handleBackspace = (e, index) => {
    // Focus on the previous input field if backspace is pressed and the current field is empty
    if (e.key === 'Backspace' && index > 0 && e.target.value === '') {
      inputRef.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedValue = e.clipboardData.getData('Text');
    if (pastedValue.length === 6 && /^\d{6}$/.test(pastedValue)) {
      pastedValue.split('').forEach((digit, index) => {
        inputRef.current[index].value = digit;
      });
    }
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      
      // Collect OTP from all inputs and process it
      const otp = inputRef.current.map(input => input.value).join('')
      
      
        const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp })
        console.log(data)
        if (data.success) {
          toast.success(data.message)
          getUserData()
          navigate('/')
        } else {
          toast.error(data.message)
        }
       
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('An error occurred during OTP submission.')
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <form onSubmit={onSubmitHandler} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the 6 digit code sent to your email ID</p>
        
        <div 
          className='flex justify-between mb-8' 
          onPaste={handlePaste} // Add the paste event handler here
        >
          {
            // Generate 6 OTP input fields dynamically
            Array(6).fill(0).map((_, index) => (
              <input 
                type='text' 
                maxLength={1} 
                key={index} 
                className='w-12 h-12 bg-[#333a5c] text-white text-center text-xl rounded-md'
                ref={e => inputRef.current[index] = e} 
                onChange={e => handleInputChange(e, index)}
                onKeyDown={e => handleBackspace(e, index)}
              />
            ))
          }
        </div>
        
        <button type="submit" className='w-full py-2.5 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-900 text-white font-medium'>
          Submit OTP
        </button>
      </form>
    </div>
  )
}

export default Emailverify
