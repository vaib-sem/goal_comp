import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signin = () => {
    const navigate = useNavigate()
    const [Values,setValues] =useState({
        username :'',
        password : '',
    })
    const HandleInput = ((event)=> {
        setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))
        console.log(Values)
    })
    const HandleSubmit = ((events) =>{
        events.preventDefault()
        navigate('/dashboard')
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
    
                <p className='pt-4 pb-2 text-sm text-[#b6b7c4]'>Password</p>
                <input onChange={HandleInput} type='password' placeholder='Enter Password' name='password' className='w-full h-[2.2rem] rounded-lg px-4 text-white text-sm bg-[#5c5e7b] border-[#4A4D6D] border-2 '></input>
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