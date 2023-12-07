import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getOneTodo } from '../../../app/slice/todoslice'

import { useParams } from 'react-router'

import ButtonIcon from '../anonymus/ButtonIcon'
import SubTodoItem from '../anonymus/SubTodoItem'
import AddLabel from '../anonymus/AddLabel'

import { MdKeyboardArrowRight } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import DisplayLabel from './viewMoreChilds/DisplayLabel'
const Bottom = ({todo}) => {
  const { id }=useParams()


  const parentTodo=useSelector((state)=>getOneTodo(state,id))
  const subAllTodo=parentTodo?parentTodo.subTodos:[]
  const subAllLabels=parentTodo?parentTodo.labels:[]

  const [showSubTodo,setShowSubTodo]=useState(subAllTodo.length==0?false:true)
  const [openForm,setOpenForm]=useState(false)

  return (
    <div className="px-3">
       <div className="max-w-[80%]">
          <ButtonIcon onClick={()=>setShowSubTodo(!showSubTodo)} Icon={MdKeyboardArrowRight} action={`Sub-tasks ${todo.endSubTodos?todo.endSubTodos:0}/${subAllTodo.length} `} className={'flex mb-1 items-center gap-0.5 group'} actionClassName={'text-xs font-semibold text-slate-400 group-hover:text-slate-800'} iconClassName={`text-3xl ${showSubTodo?"rotate-90":"rotate-0"} group-hover:scale-150 transition-all duration-300 `} />
          <div className={`${showSubTodo?"scale-100 block":"scale-0 hidden"} transition-all duration-500`}>
            {
              subAllTodo.length!==0&&
              subAllTodo.map((subTodo)=>(
                  <SubTodoItem todo={todo} key={subTodo.id} subTodo={subTodo} />
              ))
            }
          </div>
       </div>
       <div className={`w-full relative border-t-2 mt-4 pb-2 ${openForm?"h-80 pb-5":""} transition-all duration-500`}>
          <ButtonIcon onClick={()=>setOpenForm(!openForm)} Icon={FaCirclePlus} action={'Add Label'} className={'flex items-center gap-2 mt-2 ml-1 hover:scale-110 group transition-all duration-300'} iconClassName={'text-lg text-slate-500 group-hover:text-slate-900  transition-all duration-300'} actionClassName={'text-sm font-semibold text-slate-400 group-hover:text-slate-900  transition-all duration-300'} />
          <AddLabel setOpenForm={setOpenForm} id={id} openForm={openForm} />
          <DisplayLabel subAllLabels={subAllLabels} id={id} />
       </div>
    </div>
  )
}

export default Bottom
