import React,{ useState } from 'react'

import TodoItem from '../anonymus/TodoItem'
import ButtonIcon from '../anonymus/ButtonIcon'
import AddForm from '../anonymus/AddForm';

import { LuListPlus } from "react-icons/lu";

import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db, firebaseAuth } from '../../../config/firebase';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { addSubTodo } from '../../../app/slice/todoslice';

const Top = ({ todo, changeItem }) => {
  const [openForm, setOpenForm]=useState(false)
  const dispatch=useDispatch()
  const id=nanoid()

  const [taskSubName, setTaskSubName]=useState('')
  const [taskSubDescription, setTaskSubDescription]=useState('')
  const [day,setDay]=useState('Today')
  const [Priority,setPriority]=useState('Priority')
  const [time,setTime]=useState("Morning")

  const handleAddSubtest=async()=>{
      try{
          const newSubTodo={
            id,
            taskSubName,
            taskSubDescription,
            day,
            isFinished:false,
            priority:Priority!=="Priority"?Priority:"Priority-1",
            time,
          }
         await updateDoc(doc(db,firebaseAuth.currentUser.uid,todo.id),{
          subTodos:arrayUnion(newSubTodo)
         })
          dispatch(addSubTodo({parentId:todo.id,subTodo:newSubTodo}))
          setTaskSubName('')
          setTaskSubDescription('')
          setDay('Today')
          setPriority('Priority')
          setTime('Time')
      }catch(e){
        console.log(e)
      }
  }
  
  return (
    <div className="overflow-y-scroll h-auto max-w-50% no-scrollbar px-3">
      <div className={`mb-2 ${changeItem?"animate-input-bottom":""}`}>
        <TodoItem todo={todo?todo:[]} display={'task'} route={'today'}  />
        <ButtonIcon onClick={()=>setOpenForm(true)} Icon={LuListPlus} action={'Add Sub Task'} className={'w-full flex items-center mt-3 gap-2 border-b-2 pb-2 group'} iconClassName={'text-xl group-hover:scale-125 group-hover:text-red-600 transition-all duration-300'} actionClassName={'text-sm font-semibold text-slate-700 group-hover:text-red-600 transition-all duration-300'} />
        <AddForm onClick={handleAddSubtest} openForm={openForm} setOpenForm={setOpenForm} taskName={taskSubName} setTaskName={setTaskSubName} description={taskSubDescription} setDescription={setTaskSubDescription} day={day} setDay={setDay} Priority={Priority} setPriority={setPriority} time={time} setTime={setTime}  />
      </div>
    </div>
  )
}

export default Top

