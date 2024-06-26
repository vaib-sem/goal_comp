import React,{useEffect, useState} from 'react'
import { Link, resolvePath, useNavigate } from 'react-router-dom'
import loginvalidation from './validation/loginvalidation'
import axios from 'axios'

const Signin = () => {
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [Values,setValues] =useState({
        username :'',
        password : '',
    })
    const [Errors,setErrors] =useState({})
    const HandleInput = ((event)=> {
        setValues(prev => ({...prev,[event.target.name]:event.target.value}))
    })
    useEffect(() => {
        if (Object.keys(Errors).length === 0 && isSubmitting) { 
          axios.post('http://localhost:3000/api/v1/user/signin', Values)
            .then((res) => {
                let text = res.data.message;
                if (text === 'Incorrect inputs') {
                    alert('Incorrect inputs');
                } else if (text === 'User does not exist ,Please signup') {
                    alert('User does not exist ,Please signup');
                } else if (text === 'Incorrect Password') {
                    alert('Incorrect password');
                } else if( text === 'Internal server error'){
                  alert('Internal server error')
                }else if (text === 'User Successfully Logged In') {
                  alert('User Successfully Logged In')
                  localStorage.setItem("token", res.data.token)
                  navigate("/dashboard")
                
                }
            
            }).catch((err) => {
              console.error('Error during API call:', err.response ? err.response.data : err.message);
              if (err.response) {
                  // Server responded with a status other than 200 range
                  alert(`Error: ${err.response.data.message}`);
              } else if (err.request) {
                  // Request was made but no response received
                  alert('Error: No response from server.');
              } else {
                  // Something happened in setting up the request that triggered an Error
                  alert(`Error: ${err.message}`);
              }
          }).finally(() => setIsSubmitting(false));

        }},[Errors, isSubmitting, Values, navigate])
    const HandleSubmit = ((events) =>{
        events.preventDefault()
        setErrors(loginvalidation(Values));
        setIsSubmitting(true);
    })
    
    
    
    
      return (
        <div class="flex justify-center items-center ">
        <div class=" w-2/3 h-[38rem]"> 
            <div className='w-full text-center h-[8rem]'>
                <p className='text-5xl text-[#b6b7c4] font-bold mb-4'> Welcome Back</p>
                <p className='text-lg text-[#b6b7c4] font-medium'>Ready to <strong>COMPETE</strong> again</p>
            </div>
            <div className='flex justify-center '>
            <div className='bg-[#5c5e7b] mt-2 p-6  text-center  rounded-2xl w-1/2 h-[20rem]'>
              <form action='POST' onSubmit={HandleSubmit}>
                <p className='pt-4 pb-2 text-sm text-[#b6b7c4]'>E-mail</p>
                <input onChange={HandleInput} type='email' placeholder='XYZ@gmail.com' name='username' className='w-full h-[2.2rem] rounded-lg px-4 text-white text-sm bg-[#5c5e7b] border-[#4A4D6D] border-2'></input>
                {Errors.username && <p className='text-red-500 text-xs'>{Errors.username}</p>}
                <br></br>
    
                <p className='pt-4 pb-2 text-sm text-[#b6b7c4]'>Password</p>
                <input onChange={HandleInput} type='password' placeholder='Enter Password' name='password' className='w-full h-[2.2rem] rounded-lg px-4 text-white text-sm bg-[#5c5e7b] border-[#4A4D6D] border-2 '></input>
                {Errors.password && <p className='text-red-500 text-xs'>{Errors.password}</p>}
                <br></br>
    
                <button type='submit' className=' w-full  rounded-2xl h-[3rem] mt-10 bg-[#DBF4A7] hover:bg-[#C5DB96] text-center font-semibold text-lg text-[#4A4D6D]'>LOGIN</button>
              </form>
                <Link to='/signup' className=' w-full rounded-2xl h-[2rem]  mt-3 text-center text-sm font-light bg-[#5c5e7b] hover:bg-[#424562] text-white'>Don't have an account? Signup</Link>
            </div>
            </div>
            
        </div>
      </div>
      )
    }
    
    export default Signin