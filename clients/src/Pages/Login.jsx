import 'react'
import { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'


const Login = () => {

  const [state, setState] = useState('Sign Up')
  const navigate= useNavigate()

  const[name,setName]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <div className='bg-slate-900 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm p-6'>
        <h2 className='text-3xl font-semibold text-white text-center mb-3'>
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </h2>
        <p className='text-center text-sm mb-6'>
          {state === 'Sign Up' ? 'Create Your Account' : 'Login to your account ?'}
        </p>
        
        {/* Form */}
        <form action="">
        {
      state === 'Sign Up' && (<div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]'>
        <img src={assets.person_icon} alt="Person Icon" className='w-5 h-5' />
        <input 
          type="text" 
          placeholder='Enter Your Full Name' 
          required 
          className='bg-transparent outline-none w-full text-white' 
          onChange={()=>setName(e.target.value)}
          value={name}
        />
      </div>)
    }
          {/* Full Name Input */}
        
          {/* Email Input */}
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]'>
            <img src={assets.mail_icon} alt="Mail Icon" className='w-5 h-5' />
            <input 
              type="email" 
              placeholder='Enter email' 
              required 
              className='bg-transparent outline-none w-full text-white' 
              onChange={()=>setEmail(e.target.value)}
          value={email}
            />
          </div>

          {/* Password Input */}
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]'>
            <img src={assets.lock_icon} alt="Lock Icon" className='w-5 h-5' />
            <input 
              type="password" 
              placeholder='Enter your Password' 
              required 
              className='bg-transparent outline-none w-full text-white' 
              onChange={()=>setPassword(e.target.value)}
          value={password}
            />
          </div>

          {/* Forgot Password Link */}
          <div className='text-center mb-6'>
            <p onClick={()=>navigate('/reset-password')} className='text-sm text-blue-400 hover:underline cursor-pointer'>
              Forgot Password?
            </p>
          </div>

          {/* Submit Button */}
          <button className='w-full py-2.5 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-900 text-white font-medium'>
            {state}
          </button>
        </form>

        {state=== 'Sign Up' ? (<p className='text-gray-400 text-xs'>
            Already have an account?{' '}
            <span onClick={()=>setState('Login')} className='text-blue-400 cursor-pointer hover:underline'>
              login here
            </span>
          </p>) : ( <p className='text-gray-400 text-xs mt-2'>
            Don&apos;t have an account?{' '}
            <span onClick={()=>setState('Sign Up')} className='text-blue-400 cursor-pointer hover:underline'>
              Sign Up
            </span>
          </p>)}
      
      </div>
    </div>
  )
}

export default Login
