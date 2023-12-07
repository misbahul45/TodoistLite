import React, { useEffect, useState } from 'react'

import { IoMdSave } from "react-icons/io";
import { FaEdit } from "react-icons/fa";

import { useDispatch, useSelector } from 'react-redux';
import { getDarkMode_action } from '../../app/slice/allSlice';
import { useParams } from 'react-router-dom'
import { getOneNotes, saveNoteItem } from '../../app/slice/noteSlice';
import ButtonIcon from '../childs/anonymus/ButtonIcon';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const NoteProject = () => {
  const darkMode=useSelector(getDarkMode_action)
  const { id }= useParams()
  const dispatch=useDispatch()

  const note=useSelector((state)=>getOneNotes(state,id))||[]
  const [title,setTitle]=useState('')
  const [describe,setDescribe]=useState('')
  const [save,setsave]=useState(true)

  useEffect(()=>{
    setTitle(note.title?note.title:"")
    setDescribe(note.description?note.description.join('\n'):"")
  },[note])

  const handleEnter=(e)=>{
    if(e.key==="Enter"){
      setDescribe((prevDescribe)=>`${prevDescribe}\n`)
    }
  }

  const saveNote=async()=>{
    try{
      const updateNote={
        description:describe.split("\n"),
        title:title,
      }
      await updateDoc(doc(db,"project",id),updateNote)
      dispatch(saveNoteItem({id, noteItem:updateNote}))
      setsave(true)
    }catch(e){
      console.log("eror")
    }
  }

  const editNote=()=>{
    setsave(false)
  }

  return (
    <div className={`w-full h-screen overflow-y-scroll no-scrollbar pt-32 pb-10 sm:px-24 px-2 ${darkMode?"bg-slate-900":"bg-slate-200"}`}>
      <input disabled={save} value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Text Title........" type="text" className={`w-full text-center pb-1 pl-2 bg-transparent border-b-2 outline-none font-roboto capitalize ${darkMode?"border-slate-700 text-slate-50":" text-slate-800 border-slate-400"}`} />
      <textarea disabled={save} onKeyDown={handleEnter} onChange={(e)=>setDescribe(e.target.value)} value={describe}  className={`w-full h-full pl-2 bg-transparent outline-none py-3 ${darkMode?"text-slate-50":" text-slate-800 "}`} placeholder="Describe........" ></textarea>
      <div className="absolute top-24 right-16">
        <ButtonIcon onClick={save?editNote:saveNote} Icon={save?FaEdit:IoMdSave} action={save?'Edit':'Save'} className={'relative p-2 bg-gray-400 rounded-full hover:bg-gray-300 hover:scale-110 transition-all duration-300 hover:shadow-xl shadow-black group'} iconClassName={`text-xl`} actionClassName={'absolute -left-4 -bottom-9 bg-gray-600 text-slate-300 px-5 rounded-full font-semibold scale-0 group-hover:scale-100 transition-all duration-300'} />
      </div>
    </div>
  )
}

export default NoteProject
