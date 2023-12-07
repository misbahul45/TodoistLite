import React,{ useState} from 'react'
import ButtonIcon from './ButtonIcon'

import { IoIosArrowDropright, IoIosRemoveCircleOutline } from "react-icons/io";
import { MdOutlineNewLabel,MdModeEdit } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

import { useSelector } from 'react-redux'
import { getDarkMode_action } from '../../../app/slice/allSlice';
import { getAlltodo } from '../../../app/slice/todoslice';

import { useDispatch } from 'react-redux'
import { arrayUnion, deleteDoc ,doc, updateDoc} from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { nanoid } from '@reduxjs/toolkit'

import { addingLabel, deleteFilterLabel, setNameLabel, updateFilterName } from '../../../app/slice/filterSlice';
import DisplaySubsFilter from './DisplaySubsFilter';
const DisplayFilterName = ({ id,name,labelName }) => {
      const [openDisplayFilter,setOpenDisplayFilter]=useState(name)
      const [nameFilter,setNameFilter]=useState(name)
      const [editFilterName,setEditFilterName]=useState('')

      const [addingNewlabel,setAddingNewLabel]=useState('')

      const darkMode=useSelector(getDarkMode_action)
      const allTodos=useSelector(getAlltodo)
      const dispatch=useDispatch()

      const filteringTodos=(labelAction)=>{
        return allTodos.filter((todo)=>todo.labels.some((label)=>label.labelName===labelAction))
      }
      const handleDeletFilter=async()=>{
        try{
          await deleteDoc(doc(db,"filter",id))
          dispatch(deleteFilterLabel(id))
        }catch(e){
          console.log(e)
        }
      }
      const handleEditFilterName=async()=>{
        try{
          updateDoc(doc(db,"filter",id),{
            titleName:nameFilter
          })
          dispatch(updateFilterName({ id,name:nameFilter }))
          setEditFilterName('')
        }catch(e){
          console.log(e)
        }
      }
      const handleAddLabelToFilter=async()=>{
        try{
          const newLabelFilter={
            id:nanoid(),
            label:""
          }
          await updateDoc(doc(db,"filter",id),{
            labelName:arrayUnion(newLabelFilter)
          })
          dispatch(addingLabel({ id, newLabel:newLabelFilter }))
        }catch(e){
          console.log(e)
        }
      }
      const handleSetNameLabel=async(idLabel)=>{
        try{
          const newLabelFilter={
            id:idLabel,
            label:addingNewlabel
          }
          await updateDoc(doc(db,"filter",id),{
            labelName:[
              ...labelName.filter((label)=>label.id!==idLabel),
              newLabelFilter
            ]
          })
          dispatch(setNameLabel({id, idLabel, name:addingNewlabel}))
          setAddingNewLabel('')
        }catch(e){
          console.log(e)
        }
      }

  return (
    <>
        <div className="flex justify-between w-full pr-10 group">
          <div className={`flex items-center gap-2 pt-3`}>
            <ButtonIcon onClick={()=>openDisplayFilter?setOpenDisplayFilter(''):setOpenDisplayFilter(name)} Icon={IoIosArrowDropright} className={`group`} iconClassName={`lg:text-2xl text-xl ${openDisplayFilter?"rotate-90":"rotate"} ${darkMode?"text-slate-100":"text-slate-900"} group-hover:scale-110 group-hover:text-red-500 transition-all duration-300`} />
            {
              editFilterName===name?
              <form className="relative">
                <input className={`pb-0.5 pl-2 pr-5 w-full outline-none bg-transparent border-b-2 capitalize font-roboto lg:text-sm text-xs ${darkMode?nameFilter.length>20?"text-slate-100 border-red-500":"text-slate-100 border-green-500":nameFilter.length>20?"text-slate-900 border-red-500":"text-slate-900 border-blue-500"}`} type="text" value={nameFilter.length>=20?nameFilter.split('').slice(0,20).join(''):nameFilter} onChange={(e)=>setNameFilter(e.target.value)} />
                <ButtonIcon
                onClick={(e)=>{
                  e.preventDefault()
                  handleEditFilterName()
                  }} Icon={FaCheckCircle} className="absolute -top-1 right-0 font-semibold font-roboto p-1 rounded-full text-sm text-slate-100 hover:scale-105 transition-all duration-300" iconClassName={`${darkMode?"text-slate-100":"text-slate-900"} text-xl`}  />
              </form>
              :
              <span className={`sm:text-lg text-sm capitalize ${darkMode?openDisplayFilter?"text-orange-400":"text-slate-100":openDisplayFilter?"text-blue-800":"text-slate-800"} font-semibold`}>{name}</span>
            }
          </div>
            <div className="gap-3 hidden group-hover:flex">
                <ButtonIcon onClick={handleDeletFilter} Icon={IoIosRemoveCircleOutline} iconClassName={`text-lg ${darkMode?"text-slate-100 hover:text-blue-500":"text-slate-600 hover:text-slate-900"} hover:scale-120 transition-all duration-300`} />
                <ButtonIcon onClick={()=>setEditFilterName(name)} Icon={MdModeEdit} iconClassName={`text-lg ${darkMode?"text-slate-100 hover:text-blue-500":"text-slate-600 hover:text-slate-900"} hover:scale-120 transition-all duration-300`} />
                <ButtonIcon onClick={handleAddLabelToFilter} Icon={MdOutlineNewLabel} iconClassName={`text-lg ${darkMode?"text-slate-100 hover:text-blue-500":"text-slate-600 hover:text-slate-900"} hover:scale-120 transition-all duration-300`} />
            </div>
        </div>
        {
            openDisplayFilter===name&&
            labelName.map((label)=>{
              const getTodos=filteringTodos(label.label)
                return(
                 <DisplaySubsFilter key={label.id} idParent={id} label={label} getTodos={getTodos} darkMode={darkMode} addingNewlabel={addingNewlabel} setAddingNewLabel={setAddingNewLabel} handleSetNameLabel={handleSetNameLabel} />
                )
            })
        }
    </>
  )
}

export default DisplayFilterName
