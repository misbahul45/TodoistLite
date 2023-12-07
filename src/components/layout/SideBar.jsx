import React, { useState } from 'react'
import ButtonIcon from '../childs/anonymus/ButtonIcon';

import { FiInbox,FiCalendar } from "react-icons/fi"
import { FaCalendarDay } from "react-icons/fa6";
import { BsMenuButton } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";

import {  getDarkMode_action, getNavigate_action, getSideBar_action, handleNavigation, } from '../../app/slice/allSlice';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit'
import { addDoc, collection } from 'firebase/firestore';
import { db, firebaseAuth } from '../../config/firebase';
import { addNotes, getAllNotes } from '../../app/slice/noteSlice';
import DisplayNotes from '../childs/SideBar/DisplayNotes';

const SideBar = () => {
  const getNavigation=useSelector(getNavigate_action)
  const dispatch=useDispatch()
  const getSideBar=useSelector(getSideBar_action)
  const darkMode=useSelector(getDarkMode_action)
  const navigate=useNavigate()
  const allNotes=useSelector(getAllNotes)

  const [openDisplayNote, setOpenDisplayNote]=useState(true)


  const handleNavigate=(navigation)=>{
    dispatch(handleNavigation(`/${navigation}`))
  }

  const addNewNoteProject=async()=>{
    try{
      const newProject={
        id:nanoid(),
        userId:firebaseAuth.currentUser.uid,
        title:"",
        description:[]
      }
      navigate(`app/project/${newProject.id}`)
      await addDoc(collection(db,"project"),newProject)
      dispatch(addNotes(newProject))
    }catch(e){
      console.log(e)
    }

  }

  return (
    <div className={`flex flex-col pt-20 sm:pl-2 pl-0.5 w-full h-full ${darkMode?"bg-slate-800":"bg-slate-300"} transition-all duration-700`}>
      <div className={`w-full ${getSideBar?"scale-100":"scale-0"} transition-all duration-0`}>
        <Link to={'/app/inbox'}><ButtonIcon onClick={()=>handleNavigate('app/inbox')} Icon={FiInbox} iconClassName={'text-2xl text-blue-800'} action={'Inbox'} actionClassName={`text-sm ${darkMode?"text-slate-50":"text-slate-900 group-hover:text-slate-50 transition-all duration-300"} font-semibold font-roboto`} className={`${getNavigation==="/app/inbox"?darkMode?"bg-gray-900":"bg-gray-500":""} flex items-center pl-5 gap-2 py-2 w-full ${darkMode?"hover:bg-slate-700":"hover:bg-gray-500"} transition-all duration-300 group`} /></Link>
        <Link to={'/app/today'}><ButtonIcon onClick={()=>handleNavigate('app/today')} Icon={FiCalendar} iconClassName={'text-2xl text-green-600'} action={'Today'} actionClassName={`text-sm ${darkMode?"text-slate-50":"text-slate-900 group-hover:text-slate-50 transition-all duration-300"} font-semibold font-roboto`} className={`${getNavigation==="/app/today"?darkMode?"bg-gray-900":"bg-gray-500":""} flex items-center pl-5 gap-2 py-2 w-full ${darkMode?"hover:bg-slate-700":"hover:bg-gray-500"} transition-all duration-300 group`} /></Link>
        <Link to={'/app/upcoming'}><ButtonIcon onClick={()=>handleNavigate('app/upcoming')} Icon={FaCalendarDay} iconClassName={'text-2xl text-purple-800'} action={'Upcoming'} actionClassName={`text-sm ${darkMode?"text-slate-50":"text-slate-900 group-hover:text-slate-50 transition-all duration-300"} font-semibold font-roboto`} className={`${getNavigation==="/app/upcoming"?darkMode?"bg-gray-900":"bg-gray-500":""} flex items-center pl-5 gap-2 py-2 w-full ${darkMode?"hover:bg-slate-700":"hover:bg-gray-500"} transition-all duration-300 group`} /></Link>
        <Link to={'/app/filter'}><ButtonIcon onClick={()=>handleNavigate('app/filter')} Icon={BsMenuButton} iconClassName={'text-2xl text-blue-800'} action={'Filter and Labels'} actionClassName={`text-sm ${darkMode?"text-slate-50":"text-slate-900 group-hover:text-slate-50 transition-all duration-300"} font-semibold font-roboto`} className={`${getNavigation==="/app/filter"?darkMode?"bg-gray-900":"bg-gray-500":""} flex items-center pl-5 gap-2 py-2 w-full ${darkMode?"hover:bg-slate-700":"hover:bg-gray-500"} transition-all duration-300 group`} /></Link>
      </div>
      <div className={`pt-2 ${getSideBar?"scale-100":"scale-0"} transition-all duration-0 border-t-2`}>
        <div className={`w-full flex justify-between items-center px-5 py-1.5 pl-2 cursor-pointer ${darkMode?"hover:bg-gray-600":"hover:bg-gray-500"} transition-all duration-300 group`}>
          <span className={`${darkMode?"text-slate-50":"text-slate-900 group-hover:text-slate-100"} font-semibold font-roboto transition-all duration-300 lg:text-2xl sm:text-xl text-lg`}>My Note</span>
          <div className={`flex gap-2 items-center scale-0 group-hover:scale-100 transition-all duration-300`}>
            <ButtonIcon onClick={addNewNoteProject} Icon={GoPlus} iconClassName={'text-2xl group-hover:text-slate-100'} className={'hover:bg-gray-400 transition-all duration-300 p-1 rounded-full'} />
            <ButtonIcon onClick={()=>setOpenDisplayNote(!openDisplayNote)} Icon={IoIosArrowForward} iconClassName={`${openDisplayNote?"rotate-90":"rotate-0"} text-2xl hover:scale-125 group-hover:text-slate-100 transition-all duration-200`} />
          </div>
        </div>
        <div className="pl-3 pr-4 h-full overflow-y-scroll no-scrollbar">
          {
            openDisplayNote&&
            allNotes&&
            <DisplayNotes allNotes={allNotes} />
          }
        </div>
      </div>
    </div>
  )
}

export default SideBar
