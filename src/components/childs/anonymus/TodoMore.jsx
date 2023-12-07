import React from 'react'
import ButtonIcon from './ButtonIcon';

import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteDoc,doc } from 'firebase/firestore';
import { db, firebaseAuth } from '../../../config/firebase';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../../../app/slice/todoslice';
import { useNavigate } from 'react-router';
const TodoMore = ({ openMore, todoId, route }) => {
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleDelete=async()=>{
    try{
      await deleteDoc(doc(db, firebaseAuth.currentUser.uid , todoId))
      dispatch(deleteTodo(todoId))
    }catch(e){
      console.log(e)
    }
  }
  const handleView=()=>navigate(`/app/${route}/task/${todoId}`)
  return (
    <div className={`${openMore?"scale-100 translate-y-0":"-translate-y-10 scale-0"} absolute -left-20 top-8  w-40 bg-slate-400 rounded-md transition-all duration-300`}>
      <ButtonIcon onClick={handleView} Icon={FaEye} action={'View More'} className={'w-full flex items-center gap-2 px-2 hover:bg-slate-600 group py-1 rounded-t-md'} iconClassName={'text-slate-900 text-lg group-hover:text-slate-200'} actionClassName={'text-slate-900 font-semibold group-hover:text-slate-200'} />
      <ButtonIcon onClick={handleDelete} Icon={MdDelete} action={'Delete'} className={'w-full flex items-center gap-2 px-2 hover:bg-slate-200 group py-1 rounded-b-md'} iconClassName={'text-red-500 text-lg group-hover:text-red-700'} actionClassName={'text-slate-800 font-semibold group-hover:text-red-700'} />
    </div>
  )
}

export default TodoMore
