import React, { useState } from 'react'
import Login from '../layout/Login'
import SignUp from '../layout/SignUp'
const Auth = () => {
    const [signUp,setSignUp]=useState(false)

  return (
    <main className="relative h-screen bg-gradient-to-r from-cyan-800 via-blue-900 to-cyan-700 z-10 overflow-hidden">
      {
        signUp?
        <SignUp setSignUp={setSignUp} />
        :
        <Login setSignUp={setSignUp} />
      }

      <div className="absolute left-0 top-0 h-full w-full -z-10">
        <img className="absolute left-1/2 -translate-x-1/2 bottom-10 w-[30rem] blur-3xl" src="/public/img/meatball-blob.svg" alt="" />
      </div>
    </main>
  )
}

export default Auth
