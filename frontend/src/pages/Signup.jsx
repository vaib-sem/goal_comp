import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import registerValidation from './validation/registervalidation'
import axios from 'axios'

const Signup = () => {
const navigate = useNavigate()
const [Values,setValues] =useState({
    username :'',
    firstName :'',
    lastName : '',
    password : '',
    password2 : ''
})

const [Errors,setErrors] =useState({})
const HandleInput = ((event)=> {
    setValues(prev => ({...prev,[event.target.name]:event.target.value}))
    console.log(Values) 
})

useEffect(() => {
  if (Object.keys(Errors).length === 0) {
       axios.post('http://localhost:3000/api/v1/user/signup', Values)
          .then((res) => {
              console.log(res);
              let text = res.data.message;
              if (text === 'Email already taken') {
                  alert('User already exists');
              } else if (text === 'Error creating user') {
                  alert('Error creating user');
              } else if (text === 'User created successfully') {
                  alert('User registered successfully');
                  navigate('/signin');
              }
          }).catch((err) => {
              console.log(err);
          });
  }
}, [Errors]);

const HandleSubmit = (event) => {
  event.preventDefault();
  setErrors(registerValidation(Values));
};




  return (
    <div class="flex justify-center items-center ">
    <div class=" w-2/3 h-[38rem]"> 
        <div className='w-full text-center h-[8rem]'>
            <p className='text-5xl text-[#b6b7c4] font-bold mb-4'> Save your progress</p>
            <p className='text-lg text-[#b6b7c4] font-medium'>Create your <strong>GOAL</strong> and compete with friends</p>
        </div>
        <div className='flex justify-center '>
        <div className='bg-[#5c5e7b] mt-1 pb-6 px-6 pt-3 text-center  rounded-2xl w-1/2 h-[30rem]'>
          <form action='POST' onSubmit={HandleSubmit}>
            <p className='pt-3 pb-1 text-sm text-[#b6b7c4]'>E-mail</p>
            <input onChange={HandleInput} type='email' placeholder='XYZ@gmail.com' name='username' className='w-full h-[2.2rem] rounded-lg px-4 text-white text-sm bg-[#5c5e7b] border-[#4A4D6D] border-2'></input>
            {Errors.username && <p className='text-red-500 text-xs'>{Errors.username}</p>}
            <br></br>

            <p className='pt-3 pb-1 text-sm text-[#b6b7c4]'>First Name</p>
            <input onChange={HandleInput} type='firstName' placeholder='Jhon' name='firstName' className='w-full h-[2.2rem] rounded-lg px-4 text-white text-sm bg-[#5c5e7b] border-[#4A4D6D] border-2'></input>
            {Errors.firstName && <p className='text-red-500 text-xs'>{Errors.firstName}</p>}
            <br></br>

            <p className='pt-3 pb-1 text-sm text-[#b6b7c4]'>Last Name</p>
            <input onChange={HandleInput} type='lastName' placeholder='Doe' name='lastName' className='w-full h-[2.2rem] rounded-lg px-4 text-white text-sm bg-[#5c5e7b] border-[#4A4D6D] border-2 '></input>
            {Errors.lastName && <p className='text-red-500 text-xs'>{Errors.lastName}</p>}
            <br></br>

            <p className='pt-3 pb-1 text-sm text-[#b6b7c4]'>Password</p>
            <input onChange={HandleInput} type='password' placeholder='Enter Password' name='password' className='w-full h-[2.2rem] rounded-lg px-4 text-white text-sm bg-[#5c5e7b] border-[#4A4D6D] border-2 '></input>
            {Errors.password && <p className='text-red-500 text-xs'>{Errors.password}</p>}
            <br></br>

            <p className='pt-3 pb-1 text-sm text-[#b6b7c4]'>Conform Password</p>
            <input onChange={HandleInput} type='password' placeholder='Confirm Password' name='password2' className='w-full h-[2.2rem] rounded-lg px-4 text-white text-sm bg-[#5c5e7b] border-[#4A4D6D] border-2 '></input>
            {Errors.password2 && <p className='text-red-500 text-xs'>{Errors.password2}</p>}
            <br></br>

            <button type='submit' className=' w-full  rounded-2xl h-[3rem] mt-8 bg-[#DBF4A7] hover:bg-[#C5DB96] text-center font-semibold text-lg text-[#4A4D6D]'>SIGNUP</button>
          </form>
            <Link to='/signin' className=' w-full rounded-2xl h-[2rem]  mt-3 text-center text-sm font-light bg-[#5c5e7b] hover:bg-[#424562] text-white'>Already have an account?Login</Link>
        </div>
        </div>
        
    </div>
  </div>
  )
}

export default Signup