import React,{ useState } from 'react'
import InputLabel from './InputLabel'

import { addDoc, collection} from 'firebase/firestore';
import { db, firebaseAuth } from '../../../config/firebase';
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { addFilterLabel } from '../../../app/slice/filterSlice';
const AddFilter = ({ setAddFilter, addFilter, labels}) => {
  const [label,setLabel]=useState('')
  const [titleName,setTitleName]=useState('')
  const dispatch = useDispatch()

  const handleAddLabelFilter=async()=>{
    try{
      const newFilter={
        userId:firebaseAuth.currentUser.uid,
        id:nanoid(),
        titleName,
        labelName:[
          {
            id:nanoid()
            ,label
          }
        ],
        subFilter:[]
      }
      await addDoc(collection(db,"filter"),newFilter)
      dispatch(addFilterLabel(newFilter))
      setLabel('')
      setTitleName('')
      setAddFilter(false)
    }catch(e){
      console.log(e)
    }
}  

  return (
    <form className={`${addFilter?"scale-100":"scale-0"} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-5 py-8 sm:max-w-xs max-w-[250px] h-60 bg-slate-600 rounded-lg transition-all duration-200 z-10`} onSubmit={(e)=>e.preventDefault()}>
      <h1 className="text-center text-xl font-semibold font-roboto text-slate-200">Search and Filters</h1>
      <label htmlFor="filterName" className="flex flex-col py-2 gap-0.5">
        <input autoComplete="off" onChange={(e)=>setTitleName(e.target.value)} value={titleName} id="filterName" type="text" placeholder="Title name...." className="py-1 pl-3 rounded-md outline-none font-roboto text-sm capitalize" />
      </label>
      <div className="mt-1">
        <InputLabel label={label} setLabel={setLabel} labels={labels} />
      </div>
      <button onClick={handleAddLabelFilter} className="w-32 py-[7px] bg-slate-800 text-slate-500 block mx-auto mt-7 rounded-lg font-roboto border-2 border-slate-500 hover:text-slate-200 hover:border-slate-100 hover:scale-105 transition-all duration-200">Add Filter</button>
    </form>
  )
}

export default AddFilter
