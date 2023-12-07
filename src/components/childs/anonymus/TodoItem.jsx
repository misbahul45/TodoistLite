import React, { useEffect, useState } from 'react'
import ButtonIcon from './ButtonIcon'

import { FaInbox } from "react-icons/fa";
import { CiCircleMore, CiEdit, CiSun } from "react-icons/ci";
import { FaUnlockAlt,FaLock } from "react-icons/fa";
import { LuMoonStar,LuThermometerSun } from "react-icons/lu";


import { db, firebaseAuth } from '../../../config/firebase';

import { doc,updateDoc } from 'firebase/firestore';
import TodoMore from './TodoMore';
import { useDispatch, useSelector } from 'react-redux';
import { updateChecked } from '../../../app/slice/todoslice';
import { getDarkMode_action, getNavigate_action } from '../../../app/slice/allSlice';
const TodoItem = ({todo, display, handleEditTodo }) => {
  const [openMore,setOpenMore]=useState(false)
  const [lengthDes,setLengthDes]=useState(150)

  const dispatch=useDispatch()
  const route=useSelector(getNavigate_action).split('').slice(5).join('')
  const darkMode=useSelector(getDarkMode_action)

  const handleIsFinished=async()=>{
    try{
      await updateDoc(doc(db,firebaseAuth.currentUser.uid,todo.id),{
        ...todo,
        isFinished:!todo.isFinished
      })
        dispatch(updateChecked({...todo, isFinished:!todo.isFinished}))
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{
    if(screen.width<=620){
      setLengthDes(70)
    }else if(screen.width<=1000){
      setLengthDes(120)
    }
  },[screen.width])

  if(display==="task"){
    return(
      <div className="relative w-full pt-10">
        <ButtonIcon onClick={handleIsFinished} Icon={FaInbox}  iconClassName={`text-2xl text-blue-500`} className={`absolute top-2 right-3 flex flex-col justify-center items-center bg-slate-300 px-5 py-0.5 rounded-sm shadow-md shadow-black/50 cursor-default`}/>
        <ButtonIcon onClick={handleIsFinished} Icon={todo.isFinished?FaLock:FaUnlockAlt} iconClassName={`text-lg ${todo.isFinished?"text-red-600":"text-slate-800"} group-hover:text-slate-100 transition-all durtaion-300`} className={`absolute top-2 -left-1 cursor-grab rounded-full p-2 ${todo.isFinished?"hover:bg-red-600":"hover:bg-gray-800"} hover:scale-125 transition-all duration-300 group`}/>
         <div>
            <h1 className={`font-roboto text-lg ${todo.isFinished?"text-gray-500 line-through italic":"text-slate-900 font-semibold"} font-roboto capitalize`}>{todo.taskName}</h1>
            <p className={` font-roboto ${todo.isFinished?todo.description?"line-through italic text-slate-500":"text-slate-400":todo.description?"text-slate-700 first-letter:uppercase":"text-slate-400"}`}>{todo.description!==undefined?todo.description:"empty description"}</p>
            <div className="mt-1 flex items-center gap-1">
              <span>{todo.time==="Morning"?<CiSun className="text-xl text-yellow-500" />:todo.time==="Afternoom"?<LuThermometerSun className="text-xl text-orange-500" />:<LuMoonStar className="text-xl text-slate-950" />}</span>
              <span className="text-slate-800 font-bold">{todo.time}</span>
            </div>
         </div>
      </div>
    )
  }else{
    return (
      <div className={` animate-slow-bounce relative w-full bg-slate-200 rounded-lg shadow-lg ${darkMode?"shadow-white/20":"shadow-black/20"} px-5 pt-10 pb-2 border-2 ${todo.isFinished?"border-red-300 hover:border-red-700":"border-slate-300 hover:border-slate-700"} transition-all duration-500`}>
          <ButtonIcon onClick={handleIsFinished} Icon={todo.isFinished?FaLock:FaUnlockAlt} iconClassName={`text-lg ${todo.isFinished?"text-red-600":"text-slate-800"} group-hover:text-slate-100 transition-all durtaion-300`} className={`absolute top-2 left-5 rounded-full p-2 ${todo.isFinished?"hover:bg-red-600":"hover:bg-gray-800"} hover:scale-125 transition-all duration-300 group`}  />
         <div>
            <h1 className={` font-roboto text-lg ${todo.isFinished?"text-gray-500 line-through italic":"text-slate-900 font-semibold"} font-roboto capitalize`}>{todo.taskName}</h1>
            <p className={`font-roboto ${todo.isFinished ? "text-slate-500 line-through italic" : "text-slate-400"} ${todo.description ? "text-slate-700 first-letter:uppercase" : ""}`}>
              {todo.description ? (
                todo.description.length > 150 ? (
                  <>
                    {todo.description.substring(0, todo.description.lastIndexOf(" ", lengthDes))}.....
                  </>
                ) : (
                  todo.description
                )
              ) : (
                "empty description"
              )}
            </p>
            <div className=" mt-1 flex items-center gap-1">
              <span>{todo.time==="Morning"?<CiSun className="text-xl text-yellow-500" />:todo.time==="Afternoom"?<LuThermometerSun className="text-xl text-orange-500" />:<LuMoonStar className="text-xl text-slate-950" />}</span>
              <span className="text-slate-800 font-bold">{todo.time}</span>
            </div>
         </div>
         <div>
            <div className="absolute right-3 top-2 flex items-center gap-3">
                <ButtonIcon onClick={handleEditTodo} Icon={CiEdit} action={'Edit Todo'} className={`relative group ${todo.isFinished?"hidden":"block"}`} iconClassName={'text-3xl'} actionClassName={'scale-0 absolute -left-8 -botoom-10 w-20 bg-slate-800 text-slate-100 py-1 rounded-md shadow-md shadow-slate-700 group-hover:scale-100 transition-all duration-200'} />
                <div className="relative transition-all duration-300">
                  <ButtonIcon onClick={()=>setOpenMore(!openMore)} Icon={CiCircleMore} action={'More'} className={'relative group'} iconClassName={'text-2xl'} actionClassName={'hidden sm:block scale-0 absolute -left-3 -top-8 w-16 bg-slate-800 text-slate-100 py-1 rounded-md shadow-md shadow-slate-700 group-hover:scale-100 transition-all duration-200'} />
                  <TodoMore todoId={todo.id} openMore={openMore} route={route} />  
                </div>
            </div>
         </div>
      </div>
    )
  }
}

export default TodoItem
