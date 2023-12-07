import React, { useState } from 'react'

import ButtonIcon from '../anonymus/ButtonIcon'
import AddForm from '../anonymus/AddForm';
import TodoItem from '../anonymus/TodoItem';

import { FaPlus } from "react-icons/fa6";
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db, firebaseAuth } from '../../../config/firebase';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, updateTodoItem } from '../../../app/slice/todoslice';
import { getDarkMode_action } from '../../../app/slice/allSlice';

const Middle = ({ allTodo }) => {
  const dispatch=useDispatch()
  const darkMode=useSelector(getDarkMode_action)

  const [edit, setEdit]=useState(false) 
  const [openForm, setOpenForm]=useState(false)
  const [openFormEdit, setOpenFormEdit]=useState(false)
  const [editingItemId, setEditingItemId]=useState()

  const [taskName, setTaskName]=useState('')
  const [description, setDescription]=useState('')
  const [day, setDay]=useState('Today')
  const [Priority, setPriority]=useState("Priority")
  const [time, setTime]=useState("Morning") 
  const [inbox, setInbox]=useState(true)

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
    <div className={`mt-2 w-full bg-cove`}>
      <div className="h-auto flex flex-col gap-2">
        {allTodo&&
          allTodo.map((todo)=>(
            <div className="w-full" key={todo.id}>
                {editingItemId!==todo.id?
                  <TodoItem todo={todo} handleEditTodo={()=>handleEditing(todo)} />
                  :
                  <AddForm setEditingItemId={setEditingItemId} setEdit={setEdit} edit={edit} inbox={inbox} setInbox={setInbox} onClick={()=>handleEditTodo(todo)} setOpenForm={setOpenFormEdit} openForm={openFormEdit} setDescription={setDescription} description={description} taskName={taskName} setTaskName={setTaskName} day={day} setDay={setDay} Priority={Priority} setPriority={setPriority} time={time} setTime={setTime} />
                }
            </div>
          ))
        }
      </div>
      <div className={`relative w-full flex flex-col gap-2 mt pb-5 ${allTodo.length>0?"mt-5":""}`}>
        <ButtonIcon onClick={()=>setOpenForm(true)} Icon={FaPlus} action={'Add Task'} className={`w-full flex items-center group ${allTodo.length>0?"border-t-2 border-slate-600 pt-2":""}`} iconClassName={`${darkMode?"text-slate-300":"text-slate-700"} group-hover:text-red-600 transition-all duration-300`} actionClassName={`${darkMode?"text-slate-300":"text-slate-700"} text-sm group-hover:text-red-600 transition-all duration-300`} />
        <AddForm inbox={inbox} setInbox={setInbox} onClick={handleAddTodo} setOpenForm={setOpenForm} openForm={openForm} setDescription={setDescription} description={description} taskName={taskName} setTaskName={setTaskName} day={day} setDay={setDay} Priority={Priority} setPriority={setPriority} time={time} setTime={setTime} />
      </div>
    </div>
  )
}

export default Middle
