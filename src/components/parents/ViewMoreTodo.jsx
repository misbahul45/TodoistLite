import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'

import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";

import { getNextTodo, getOneTodo, getPrevTodo } from '../../app/slice/todoslice'

import Top from '../childs/ViewMore/Top';
import Bottom from '../childs/ViewMore/Bottom';

import { getDarkMode_action, getSideBar_action } from '../../app/slice/allSlice';
import ButtonIcon from '../childs/anonymus/ButtonIcon';

const ViewMoreTodo = ({route}) => {
    const { id } = useParams();
    const navigate=useNavigate()

    const [todoId,setTodoId]=useState(id)
    const [changeTodo,setChangeTodo]=useState(false)

    const nextTodo=useSelector((state)=>getNextTodo(state,todoId)) 
    const prevTodo=useSelector((state)=>getPrevTodo(state,todoId))
  
    const todo = useSelector((state) => getOneTodo(state, todoId));
    const darkMode=useSelector(getDarkMode_action)
    const sidebar=useSelector(getSideBar_action)

     useEffect(()=>{
      if(todoId!==id){
        setTodoId(id)
      }
     },[id])

     const handleNextTodo=()=>{
      if(nextTodo){
        navigate(`/app/${route}/task/${nextTodo}`)
        setChangeTodo(true)
        setTimeout(()=>{
          setChangeTodo(false)
        },600)
      }
     }
     const handlePrevTodo=()=>{
      if(prevTodo){
        navigate(`/app/${route}/task/${prevTodo}`)
        setChangeTodo(true)
        setTimeout(()=>{
          setChangeTodo(false)
        },600)
      }
     }
    return (
      <div className={`relative w-full h-full flex justify-center items-center px-3 pt-3 sm:pt-[80px] pb-5 ${darkMode?"bg-slate-900":"bg-gray-200"} transition-all duration-200`}>
           <div onClick={handlePrevTodo} className={`absolute sm:top-1/2 ${sidebar?"lg:left-10 sm:left-14 bottom-[20px] left-7":"lg:left-40 sm:left-14 bottom-[20px] left-7"} transition-all duration-300`} to={`/app/${route}`}>
                <ButtonIcon Icon={FaArrowLeftLong} iconClassName={'text-2xl'} action={'Prev Todo'} className={`relative flex items-center justify-center w-10 h-10 text-white font-semibold rounded-full shadow-md ${darkMode?"bg-slate-700 hover:bg-slate-800":"bg-red-500 hover:bg-red-800"} group`} actionClassName={'hidden sm:block bg-black/40 w-24 py-1 rounded-md absolute -bottom-[28px] scale-0 group-hover:scale-100 transition-all duration-300 text-xs'} />
              </div>
           <div onClick={handleNextTodo} className={`absolute sm:top-1/2 ${sidebar?"lg:right-10 sm:right-14 bottom-[20px] right-7":"lg:right-40 sm:right-14 bottom-[20px] right-7"}  transition-all duration-300`} to={`/app/${route}`}>
                <ButtonIcon Icon={FaArrowRight} iconClassName={'text-2xl'} action={'Next Todo'} className={`relative flex items-center justify-center w-10 h-10 text-white font-semibold rounded-full shadow-md ${darkMode?"bg-slate-700 hover:bg-slate-800":"bg-red-500 hover:bg-red-800"} group`} actionClassName={'hidden sm:block bg-black/40 w-24 py-1 rounded-md absolute -bottom-[28px] scale-0 group-hover:scale-100 transition-all duration-300 text-xs'} />
            </div>
          <div className="w-full flex items-center justify-center sm:max-w-2xl h-full">
              <div className={`sm:h-full w-full h-[80%] flex flex-col sm:flex-row overflow-y-scroll no-scrollbar ${darkMode?"shadow-white/40":"shadow-black/40"} shadow-lg sm:border-2 border-slate-600 sm:rounded-xl rounded-md ${changeTodo?"bg-green-200":"bg-slate-100"}`}>
                  <div className="w-full sm:px-4 sm:h-auto">
                    <Top todo={todo} changeItem={changeTodo}  />
                    <div className="relative">
                      <Bottom todo={todo?todo:[]}/>
                    </div>
                  </div>
              </div>
          </div>
      </div>
    );
  };
  

export default ViewMoreTodo
