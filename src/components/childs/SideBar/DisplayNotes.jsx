import React from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonIcon from '../anonymus/ButtonIcon'

import { RiDeleteBinFill } from "react-icons/ri";
import { FaRegFilePowerpoint } from "react-icons/fa";

import { getDarkMode_action } from '../../../app/slice/allSlice';
import { useDispatch, useSelector } from 'react-redux'
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { deleteNoteItem } from '../../../app/slice/noteSlice';

const DisplayNotes = ({ allNotes }) => {
    const darkMode=useSelector(getDarkMode_action)
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const deleteNote=async(id)=>{
     try{
      await deleteDoc(doc(db,"project",id))
      dispatch(deleteNoteItem(id))
     }catch(e){
      console.log("eror")
     }
    }

    const openNote=(id)=>{
      navigate(`app/project/${id}`)
    }

  return (
    <>
      {
        allNotes.map((note)=>(
            <div key={note.id} className={`my-2 flex items-center justify-between gap-2 border-[1px] px-2 rounded-r-md animate-slow-bounce ${darkMode?"border-slate-100":"border-slate-600"}`}>
                <ButtonIcon onClick={()=>openNote(note.id)} Icon={FaRegFilePowerpoint} action={note.title.substring(0,note.title.lastIndexOf(" ",10))+"...."} className={`flex items-center gap-4 my-2`} iconClassName={`${darkMode?"text-slate-50":"text-slate-900"} lg:text-xl sm:text-lg text-sm`} actionClassName={`${darkMode?"text-slate-50":"text-slate-900"} lg:text-lg sm:text-md text-sm capitalize`} />
                <ButtonIcon onClick={()=>deleteNote(note.id)} Icon={RiDeleteBinFill} iconClassName={'text-2xl text-red-600'} />
            </div>
        ))
      }
    </>
  )
}

export default DisplayNotes
