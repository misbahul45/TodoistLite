import React, { useState } from 'react'

import ButtonIcon from '../anonymus/ButtonIcon'
import AddForm from '../anonymus/AddForm';

import { FaPlus } from "react-icons/fa6";
import { MdArrowForwardIos } from "react-icons/md";

import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db, firebaseAuth } from '../../../config/firebase';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, updateTodoItem } from '../../../app/slice/todoslice';
import { getDarkMode_action } from '../../../app/slice/allSlice';

import DisplayAllTodos from '../anonymus/DisplayAllTodos';

const Middle = ({ allTodo }) => {
  const dispatch=useDispatch()
  const darkMode=useSelector(getDarkMode_action)

  const todayTodo=allTodo.filter((todo)=>todo.day==="Today")
  const tomorowTodo=allTodo.filter((todo)=>todo.day==="Tomorrow")
  const lusaTodo=allTodo.filter((todo)=>todo.day==="Lusa")
  const [openToday,setOpenToday]=useState(todayTodo.length===0?false:true)
  const [openTomorrow,setOpenTomorrow]=useState(tomorowTodo.length===0?false:true)
  const [openLusa,setOpenLusa]=useState(lusaTodo.length===0?false:true)


  const [edit, setEdit]=useState(false) 
  const [openForm, setOpenForm]=useState(false)
  const [openFormEdit, setOpenFormEdit]=useState(false)
  const [editingItemId, setEditingItemId]=useState()

  const [taskName, setTaskName]=useState('')
  const [description, setDescription]=useState('')
  const [day, setDay]=useState('Today')
  const [Priority, setPriority]=useState("Priority")
  const [time, setTime]=useState("Morning") 
  const [inbox, setInbox]=useState(false)

  const handleEditing=(todo)=>{
    setEdit(true)
    setEditingItemId(todo.id)
    setOpenFormEdit(true)
    setTaskName(todo.taskName)
    setDescription(todo.description)
    setDay(todo.day)
    setPriority(todo.priority)
    setTime(todo.time)
    setInbox(todo.inbox)
  }

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
    }catch(e){
      alert(e)
    }
  }

  const handleEditTodo=async(todo)=>{  
    try{
      const updateTodo={
        ...todo,
        taskName,
        description,
        day,
        priority:Priority,
        time,
        inbox
      }
      dispatch(updateTodoItem(updateTodo))
      await updateDoc(doc(db,firebaseAuth.currentUser.uid,todo.id), updateTodo)
      setEditingItemId('')
      setOpenFormEdit(false)
      setTaskName('')
      setDescription('')
      setDay('Today')
      setPriority('Priority')
      setTime('Time')
    }catch(e){
      console.log(e)
    }
  }
  return (
    <div className="border-l-2 border-red-800 pt-0 sm:px-2 pl-2 mt-3  ">
      <div className={`mt-2 w-full mb-3`}>
        <div className="relative">
          <span className={`absolute sm:-left-4 -left-3 top-[3px] sm:w-3 sm:h-3 w-2 h-2 ${darkMode?"bg-slate-400":"bg-slate-800"} rounded-full`}></span>
          <ButtonIcon type={'button'} onClick={()=>setOpenToday(!openToday)} Icon={MdArrowForwardIos} action={'Today'} className={`flex items-center gap-2`} iconClassName={`text-md ${darkMode?"text-slate-100":"text-slate-800"} ${openToday?"rotate-90":"rotate-0"} transition-all duration-300`} actionClassName={`text-sm font-semibold ${darkMode?"text-slate-50":"text-slate-800"}`} />
          <DisplayAllTodos handleEditing={handleEditing} handleEditTodo={handleEditTodo} editingItemId={editingItemId} setEditingItemId={setEditingItemId} setOpenFormEdit={setOpenFormEdit} openFormEdit={openFormEdit} SlideTodoItem={todayTodo} openSlide={openToday} taskName={taskName} setTaskName={setTaskName} description={description} setDescription={setDescription} day={day} setDay={setDay} Priority={Priority} setPriority={setPriority} time={time} setTime={setTime} inbox={inbox} setInbox={setInbox}  />
        </div>
        <div className="w-full border-[1px] border-slate-400 mt-5 mb-2" />
        <div className="relative">
          <span className={`absolute sm:-left-4 -left-3 top-[3px] sm:w-3 sm:h-3 w-2 h-2 ${darkMode?"bg-slate-400":"bg-slate-800"} rounded-full`}></span>
          <ButtonIcon onClick={()=>setOpenTomorrow(!openTomorrow)} Icon={MdArrowForwardIos} action={'Tomorrow'} className={`flex items-center gap-2`} iconClassName={`text-md ${darkMode?"text-slate-100":"text-slate-800"} ${openTomorrow?"rotate-90":"rotate-0"} transition-all duration-300`} actionClassName={`text-sm font-semibold ${darkMode?"text-slate-50":"text-slate-800"}`} />
          <DisplayAllTodos handleEditing={handleEditing} handleEditTodo={handleEditTodo} editingItemId={editingItemId} setEditingItemId={setEditingItemId} setOpenFormEdit={setOpenFormEdit} openFormEdit={openFormEdit} SlideTodoItem={tomorowTodo} openSlide={openTomorrow} taskName={taskName} setTaskName={setTaskName} description={description} setDescription={setDescription} day={day} setDay={setDay} Priority={Priority} setPriority={setPriority} time={time} setTime={setTime} inbox={inbox} setInbox={setInbox}  />
        </div>
        <div className="w-full border-[1px] border-slate-400 mt-5 mb-2" />
        <div className="relative">
          <span className={`absolute sm:-left-4 -left-3 top-[3px] sm:w-3 sm:h-3 w-2 h-2 ${darkMode?"bg-slate-400":"bg-slate-800"} rounded-full`}></span>
          <ButtonIcon onClick={()=>setOpenLusa(!openLusa)} Icon={MdArrowForwardIos} action={'Lusa'} className={`flex items-center gap-2`} iconClassName={`text-md ${darkMode?"text-slate-100":"text-slate-800"} ${openLusa?"rotate-90":"rotate-0"} transition-all duration-300`} actionClassName={`text-sm font-semibold ${darkMode?"text-slate-50":"text-slate-800"}`} />
          <DisplayAllTodos handleEditing={handleEditing} handleEditTodo={handleEditTodo} editingItemId={editingItemId} setEditingItemId={setEditingItemId} setOpenFormEdit={setOpenFormEdit} openFormEdit={openFormEdit} SlideTodoItem={lusaTodo} openSlide={openLusa} taskName={taskName} setTaskName={setTaskName} description={description} setDescription={setDescription} day={day} setDay={setDay} Priority={Priority} setPriority={setPriority} time={time} setTime={setTime} inbox={inbox} setInbox={setInbox}  />
        </div>
        <div className={`relative w-full flex flex-col gap-2 mt  ${allTodo.length>0?"mt-5":""}`}>
          <ButtonIcon onClick={()=>setOpenForm(true)} Icon={FaPlus} action={'Add Task'} className={`w-full flex items-center group ${allTodo.length>0?"border-t-2 border-slate-600 pt-2":""}`} iconClassName={`${darkMode?"text-slate-300":"text-slate-700"} group-hover:text-red-600 transition-all duration-300`} actionClassName={`${darkMode?"text-slate-300":"text-slate-700"} text-sm group-hover:text-red-600 transition-all duration-300`} />
          <AddForm inbox={inbox} setInbox={setInbox} onClick={handleAddTodo} setOpenForm={setOpenForm} openForm={openForm} setDescription={setDescription} description={description} taskName={taskName} setTaskName={setTaskName} day={day} setDay={setDay} Priority={Priority} setPriority={setPriority} time={time} setTime={setTime} />
        </div>
      </div>
    </div>
  )
}

export default Middle
