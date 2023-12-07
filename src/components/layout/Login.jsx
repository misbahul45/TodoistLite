import React, { useEffect, useState } from 'react';
import { IoLogoGoogle } from "react-icons/io5";
import { firebaseAuth, gogleProvider } from '../../config/firebase';
import { signInWithEmailAndPassword, signInWithRedirect,onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
const Login = ({setSignUp}) => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()

    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          navigate('/app/today');
        }
      });
      return () => unsubscribe();
    },[navigate])

    const handleLoginWithEmail=async()=>{
      try{
        await signInWithEmailAndPassword(firebaseAuth, email, password)
      }catch(e){
        alert(e)
      }
      setEmail('')
      setPassword('')
    }
    const handleLoginWithGoggle=async()=>{
      try{
         await signInWithRedirect(firebaseAuth,gogleProvider) 
         navigate('/app/today')
      }catch(e){
        alert(e)
      }
    }
  return (
    <div className="h-full pt-10 flex flex-col items-center justify-center ">
      <h1 className=" text-center text-5xl font-bold text-blue-50">Welcome Back</h1>
      <div className="w-full flex py-5 justify-center lg:items-center lg:h-[calc(100vh-90px)]">
          <div className=" flex-1 hidden lg:flex  flex-col justify-center pl-9">
            <h1 className="text-6xl font-roboto text-slate-100 font-bold">The Best Management <span className="text-orange-500">System is You</span></h1>
            <p className="text-slate-50 mt-5 text-lg font-roboto w-5/6">Time management refers to the ability to use your time in a manner that allows you to complete your tasks before they are due. Time management is a vital skill for any employee because it determines your ability to meet deadlines and operate productively. You can build time management skills over time through strategic systems and practices.</p>
          </div>
          <div className="flex-1 px-5 lg:px-0 lg:h- flex lg:justify-start justify-center  h-auto">
            <form className="w-full max-w-sm lg:ml-12 bg-slate-50 rounded-md drop-shadow-2xl">
              <div className="py-5">
                <h1 className="text-center text-slate-800 text-2xl font-semibold">We are a team</h1>
                <label className="flex flex-col px-3 py-1" htmlFor="email">
                  <span className="text-lg text-blue-950 font-semibold">Email</span>
                  <input value={email} onChange={(e)=>setEmail(e.target.value)} className=" border-[2px] border-blue-500 py-1 pl-2 outline-none rounded-tr-lg rounded-bl-lg" type="email" id="email" placeholder="example123@gmail.com"/>
                </label>
                <label className="flex flex-col px-3 py-2" htmlFor="password">
                  <span className="text-lg text-blue-950 font-semibold">Password</span>
                  <input value={password} onChange={(e)=>setPassword(e.target.value)} className="border-[2px] border-blue-500 py-1 pl-2 outline-none rounded-tr-lg rounded-bl-lg" type="password" id="password" placeholder="*********"/>
                </label>
                <button onClick={handleLoginWithEmail} type="button" className="block mx-auto my-2 w-5/6 bg-blue-600 py-2 text-white text-lg font-bold rounded-md hover:bg-blue-900 transition-all duration-200">Login</button>
                <button onClick={handleLoginWithGoggle} type="button" className="relative w-5/6 flex justify-center items-center gap-2 bg-blue-700 py-1.5 rounded-md mx-auto hover:scale-100 hover:bg-transparent transition-all duration-500 group">
                  <span className="text-white text-lg font-semibold">Login With</span>
                  <IoLogoGoogle className="text-white text-lg" />
                  <span className="absolute right-0 bottom-0 w-0 h-full scale-0 bg-orange-500 rounded-md -z-10 group-hover:scale-100 group-hover:w-full transition-all duration-500"></span>
                </button>
                <p className="text-slate-700 mt-5 text-center font-semibold font-roboto">Don't have an Account? <span onClick={()=>setSignUp(true)} className="hover:underline hover:text-blue-800 cursor-pointer transition-all duration-200">Register Here</span></p>
              </div>
            </form>
          </div>
      </div>
    </div>
  )
}

export default Login
