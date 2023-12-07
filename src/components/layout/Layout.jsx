import React,{ useEffect, useState} from 'react'
import { Outlet, useNavigate } from 'react-router'

import AddForm from '../childs/anonymus/AddForm'
import Header from "./Header"
import SideBar from './SideBar'

import { addTodo } from '../../app/slice/todoslice'
import { useDispatch, useSelector } from 'react-redux'
import { getDarkMode_action, getSideBar_action } from '../../app/slice/allSlice'

import { db, firebaseAuth,  } from '../../config/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { nanoid } from '@reduxjs/toolkit'
const Layout = () => {
   const sideBar=useSelector(getSideBar_action)
   const darkMode=useSelector(getDarkMode_action)
   const navigate=useNavigate()
   const dispatch=useDispatch()

   
    const [openForm, setOpenForm]=useState(false)
    const [taskName, setTaskName]=useState('')
    const [description, setDescription]=useState('')
    const [day, setDay]=useState('Today')
    const [Priority, setPriority]=useState("Priority")
    const [time, setTime]=useState("Morning") 
    const [inbox, setInbox]=useState(false)

   useEffect(() => {
    if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD) {
      navigate('/app/today');
    }
  }, [navigate]);

  const handleAddTodo=async()=>{
    try{
      const newTodo={
        taskName,
        description,
        day:day?day:"Today",
        priority:Priority!=="Priority"?Priority:"Priority-1",
        time,
        isFinished:false,
        inbox,
        subTodos:[],
        endSubTodos:0,
        labels:[],
      }
      const id=nanoid()
      dispatch(addTodo(
        {
          id,
          ...newTodo
        }
      ))
      await setDoc(doc(db,firebaseAuth.currentUser.uid,id), newTodo)
      setTaskName('')
      setDescription('')
      setDay('Today')
      setPriority('Priority')
      setTime('Time')
      setOpenForm(false)
    }catch(e){
      alert(e)
    }
  }
  return (
    <>
     <Header addOnClick={()=>setOpenForm(true)} />
     <main className={`flex w-full h-screen ${darkMode ?"dark":""} `}>
         <div className={`lg:relative absolute left-0 top-0 z-20 h-full ${sideBar?"sm:w-[30%] xs:w-[50%] w-[60%] opacity-100 -z-10":"w-0 opacity-0"} transition-all drop-shadow-xl duration-500 ease-in-out`} >
           <SideBar />
          </div>
         <div className={`w-full`}>
          <Outlet />
         </div> 
        <AddForm display={'all'} inbox={inbox} setInbox={setInbox} onClick={handleAddTodo} setOpenForm={setOpenForm} openForm={openForm} setDescription={setDescription} description={description} taskName={taskName} setTaskName={setTaskName} day={day} setDay={setDay} Priority={Priority} setPriority={setPriority} time={time} setTime={setTime} />
     </main>
    </>
  )
}

export default Layout
