import React, { useState } from 'react'
import ButtonIcon from './ButtonIcon'

import { FaArrowAltCircleUp } from "react-icons/fa";
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db, firebaseAuth } from '../../../config/firebase';

import { nanoid } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import { addLabelItems } from '../../../app/slice/todoslice';
const AddLabel = ({setOpenForm,openForm,id}) => {
    const color=["bg-slate-800","bg-green-600","bg-red-500","bg-yellow-500","bg-blue-500","bg-orange-500","bg-purple-500"]
    const [labelName,setLabelName]=useState('')
    const [bgColor,setBgColor]=useState('')

    const dispatch=useDispatch()
    const handleAddLabel=async()=>{
        try{
          if(labelName){
            const newLabel={
                id:nanoid(),
                labelName,
                bgColor:bgColor?bgColor:"bg-red-500"
            }
            await updateDoc(doc(db,firebaseAuth.currentUser.uid,id),{
                labels:arrayUnion(newLabel)
            })
            dispatch(addLabelItems({parentId:id,labelItem:newLabel}))
            setLabelName('')
            setBgColor('')
            setOpenForm(false)
          }
        }catch(e){
            console.log(e)
        }
    }
  return (
    <form onSubmit={(e)=>e.preventDefault()} className={`w-80 bg-slate-100 shadow-lg rounded-md absolute top-3 -translate-x-1/2 left-1/2 shadow-black/30 pt-5 pb-2 z-10 ${openForm?"scale-100":"scale-0"} transition-all duration-500`}>
        <div className="relative w-full px-2">
            <input value={labelName} onChange={(e)=>setLabelName(e.target.value)} className="capitalize font-roboto text-md font-semibold text-slate-900 w-full px-2 py-1 shadow-md outline-none focus:ring-2 focus:ring-slate-500 rounded-sm" type="text" placeholder="label....." />
            <ButtonIcon onClick={handleAddLabel} Icon={FaArrowAltCircleUp} className="absolute right-3 top-1/2 -translate-y-1/2 group" iconClassName={'text-2xl text-slate-500 group-hover:text-slate-900 transition-all duration-300'}/>
        </div>
        <div className="mt-2">
            {
                color.map((col,index)=>(
                    <div onClick={()=>setBgColor(col)} key={index} className={`${bgColor===col?"bg-gray-200":""} flex items-center gap-2 py-1 px-3 cursor-pointer hover:bg-gray-200 `}>
                        <div className={`${col} w-5 h-5`}></div>
                        <div>
                            <p className="text-md font-semibold capitalize font-roboto">{col.split('').slice(col.indexOf("-")+1,col.lastIndexOf("-"))}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    </form>
  )
}

export default AddLabel
