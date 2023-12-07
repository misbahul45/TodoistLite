import React from 'react'
import { RiCheckboxBlankCircleLine } from "react-icons/ri";

import { updateCheakedSubTodo } from '../../../app/slice/todoslice';
import { useDispatch } from 'react-redux';

import { arrayRemove, updateDoc, doc } from 'firebase/firestore';
import { db, firebaseAuth } from '../../../config/firebase';
import ButtonIcon from './ButtonIcon';

const SubTodoItem = ({ subTodo, todo }) => {
  const dispatch=useDispatch()
  const handleChekedSubTodo=async()=>{
    try{
    dispatch(updateCheakedSubTodo({ parentId:todo.id, idSubTodo:subTodo.id }))
    await updateDoc(doc(db,firebaseAuth.currentUser.uid,todo.id),{
      ...todo,
      endSubTodos:todo.endSubTodos+1,
      subTodos:arrayRemove(subTodo)
    }) 
    }catch(e){
      console.log(e)
    }
  }
  return (
    <div className="w-full border-2 px-4 py-3 rounded-lg mb-1 animate-input-left">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <ButtonIcon className={'rounded-full hover:bg-red-500 hover:scale-110 transition-all duration-300 group'} iconClassName={' text-2xl group-hover:opacity-0 transition-all duration-300'} Icon={RiCheckboxBlankCircleLine} onClick={handleChekedSubTodo} />
          <h1 className=" capitalize text-md font-semibold">{subTodo.taskSubName}</h1>
        </div>   
      </div>
      <p className=" first-letter:ml-9 first-letter:uppercase text-sm font-roboto text-slate-700">{subTodo.taskSubDescription}</p>
    </div>
  )
}

export default SubTodoItem
