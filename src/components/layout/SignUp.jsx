import React, { useState,useEffect } from 'react'
import { IoLogoGoogle } from 'react-icons/io'

import { createUserWithEmailAndPassword,signInWithPopup } from 'firebase/auth'
import { firebaseAuth,db,gogleProvider } from '../../config/firebase'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'

import { useNavigate } from 'react-router-dom'

const SignUp = ({setSignUp}) => {
  const [email,setEmail]=useState()
  const [password,setPassword]=useState('')


  let dbCollection;
  const navigate=useNavigate()

  useEffect(()=>{
     const nav=async()=>{
       if(firebaseAuth.currentUser){
        dbCollection= doc(db,`${firebaseAuth.currentUser.uid}`);
        await setDoc(dbCollection,{});
      }
     }
     return ()=> nav()
  },[firebaseAuth?.currentUser])

  const handleSignUpWithEmail=async()=>{
    try{
      await createUserWithEmailAndPassword(firebaseAuth,email,password)
      navigate('/app/today')
      setEmail('')
      setPassword('')
    }catch(e){
      alert(e.message)
    }
  }

  const handleSignUpWithGoggle=async()=>{
    try{
      await signInWithPopup(firebaseAuth,gogleProvider)
      navigate('/app/today')
    }catch(e){
      alert(e.message)
    }
  }


  return (
    <div className="h-full pt-10 ">
      <h1 className="text-center text-5xl font-bold text-blue-50 uppercase">Welcome</h1>
      <div className="w-full px-2 sm:px-0 flex flex-row-reverse lg:h-[calc(100vh-90px)]">
          <div className="hidden flex-1 lg:flex flex-col justify-center pl-9">
            <h1 className="text-6xl font-roboto text-slate-100 font-bold">The Best Management <span className="text-red-500">System is You</span></h1>
            <p className="text-slate-50 mt-5 text-lg font-roboto w-5/6">Time management refers to the ability to use your time in a manner that allows you to complete your tasks before they are due. Time management is a vital skill for any employee because it determines your ability to meet deadlines and operate productively. You can build time management skills over time through strategic systems and practices.</p>
          </div>
          <div className="flex-1 flex items-center justify-center sm:justify-end py-3 lg:mr-3">
            <form className="w-full max-w-md h-[100%] bg-slate-50 rounded-md shadow-cyan-900 shadow-3xl">
              <div className="h-full py-5">
                <h1 className="text-center text-slate-800 text-2xl font-semibold">We are a team</h1>
                <label className="flex flex-col px-3 py-2" htmlFor="email">
                  <span className="text-lg text-blue-950 font-semibold">Email</span>
                  <input value={email} onChange={(e)=>setEmail(e.target.value)} className=" border-[2px] border-blue-500 py-1 pl-2 outline-none rounded-tr-lg rounded-bl-lg focus:border-red-800" type="email" id="email" placeholder="example123@gmail.com"/>
                </label>
                <label className="flex flex-col px-3 py-2" htmlFor="password">
                  <span className="text-lg text-blue-950 font-semibold">Password</span>
                  <input value={password} onChange={(e)=>setPassword(e.target.value)} className="border-[2px] border-blue-500 py-1 pl-2 outline-none rounded-tr-lg rounded-bl-lg focus:border-red-800" type="password" id="password" placeholder="*********"/>
                </label>
                <button onClick={handleSignUpWithEmail} type="button" className="block mx-auto my-2 w-5/6 bg-red-600 py-2 text-white text-lg font-bold rounded-md hover:bg-red-900 transition-all duration-200">SignUp</button>
                  <p className="text-slate-900 font-bold font-roboto text-center my-2 text-2xl">Or </p> 
                <button onClick={handleSignUpWithGoggle} type="button" className="relative w-5/6 flex justify-center items-center gap-2 bg-blue-700 py-1.5 rounded-md mx-auto hover:scale-100 hover:bg-transparent transition-all duration-500 group">
                  <span className="text-white text-lg font-semibold">SignUp With</span>
                  <IoLogoGoogle className="text-white text-lg" />
                  <span className="absolute right-0 bottom-0 w-0 h-full scale-0 bg-violet-700 rounded-md -z-10 group-hover:scale-100 group-hover:w-full transition-all duration-500"></span>
                </button>
                <p className="text-slate-700 mt-3 text-center font-semibold font-roboto">have an Account? <span onClick={()=>setSignUp(false)} className="hover:underline hover:text-blue-800 cursor-pointer transition-all duration-200">Login Here</span></p>
              </div>
            </form>
          </div>
      </div>
    </div>
  )
}

export default SignUp
