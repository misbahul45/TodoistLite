import React,{useState} from 'react'

import ButtonIcon from './ButtonIcon';
import DisplayAllTodos from './DisplayAllTodos';

import { IoIosArrowDropright, IoIosRemoveCircleOutline } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";

import { useDispatch } from 'react-redux'

import { updateTodoItem } from '../../../app/slice/todoslice';
import { updateDoc,doc, arrayRemove } from 'firebase/firestore';
import { db, firebaseAuth } from '../../../config/firebase';
import { deleteLabelFilter } from '../../../app/slice/filterSlice';


const DisplaySubsFilter = ({ idParent, label, darkMode, handleSetNameLabel,addingNewlabel, setAddingNewLabel, getTodos }) => {
    const dispatch=useDispatch()

    const [openSubDisplayFilter,setOpenSubDisplayFilter]=useState()
    const [edit, setEdit]=useState(false) 
    const [openFormEdit, setOpenFormEdit]=useState(false)
    const [editingItemId, setEditingItemId]=useState()
  
    const [taskName, setTaskName]=useState('')
    const [description, setDescription]=useState('')
    const [day, setDay]=useState('Today')
    const [Priority, setPriority]=useState("Priority")
    const [time, setTime]=useState("Morning") 
    const [inbox, setInbox]=useState(false)

    const handleEditing=(todo)=>{
      setEdit(true)
      setEditingItemId(todo.id)
      setOpenFormEdit(true)
      setTaskName(todo.taskName)
      setDescription(todo.description)
      setDay(todo.day)
      setPriority(todo.priority)
      setTime(todo.time)
      setInbox(todo.inbox)
    }

    const handleEditTodo=async(todo)=>{  
      try{
        const updateTodo={
          ...todo,
          taskName,
          description,
          day,
          priority:Priority,
          time,
          inbox
        }
        dispatch(updateTodoItem(updateTodo))
        await updateDoc(doc(db,firebaseAuth.currentUser.uid,todo.id), updateTodo)
        setEditingItemId('')
        setOpenFormEdit(false)
        setTaskName('')
        setDescription('')
        setDay('Today')
        setPriority('Priority')
        setTime('Time')
      }catch(e){
        console.log(e)
      }
    }

    const handleDeleteLabele=async()=>{
      try{
        await updateDoc(doc(db,"filter",idParent),{
          labelName:arrayRemove(label)
        })
        dispatch(deleteLabelFilter({id:idParent, idLabel:label.id}))
      }catch(e){
        console.log(e)
      }
    }
    return(
        <div>
            {label.label===""?
              <div className={`flex items-center gap-2 pt-3`}>
                <ButtonIcon Icon={IoIosArrowDropright}  className={`ml-3`}  iconClassName={`lg:text-lg ${openSubDisplayFilter?"rotate-90":"rotate"} ${darkMode?"text-slate-100":"text-slate-900"} group-hover:scale-110 group-hover:text-red-500 transition-all duration-300`} />
                {
                  label.label===""&&
                  <form onSubmit={(e)=>e.preventDefault()}className="relative">
                    <input placeholder="Name..." className={`pb-0.5 pl-2 pr-5 w-full outline-none bg-transparent border-b-2 capitalize font-roboto lg:text-sm text-xs ${darkMode?addingNewlabel.length>20?"text-slate-100 border-red-500":"text-slate-100 border-green-500":addingNewlabel.length>20?"text-slate-900 border-red-500":"text-slate-900 border-blue-500"}`} type="text" value={addingNewlabel} onChange={(e)=>setAddingNewLabel(e.target.value)} />
                    <ButtonIcon onClick={()=>handleSetNameLabel(label.id)} Icon={FaCheckCircle} className="absolute -top-1 right-0 font-semibold font-roboto p-1 rounded-full text-sm text-slate-100 hover:scale-105 transition-all duration-300" iconClassName={`${darkMode?"text-slate-100":"text-slate-900"} text-xl`}  />
                  </form>
                  }
              </div>
              :              
              <>
                  <div className="flex justify-between">
                    <ButtonIcon onClick={()=>openSubDisplayFilter?setOpenSubDisplayFilter(''):setOpenSubDisplayFilter(label.label)} Icon={IoIosArrowDropright} action={label.label} className={`ml-3 w-full flex items-center animate-slow-bounce gap-2 py-3 group`} iconClassName={`lg:text-lg ${openSubDisplayFilter===label.label?"rotate-90":"rotate"} ${darkMode?"text-slate-100":"text-slate-900"} group-hover:scale-110 group-hover:text-red-500 transition-all duration-300`} actionClassName={`text-md  capitalize ${darkMode?openSubDisplayFilter==label.label?"text-blue-400":"text-slate-100":openSubDisplayFilter===label.label?"text-red-700":"text-slate-900"} font-semibold`} />
                    <div className="flex items-center gap-2">
                      <ButtonIcon onClick={handleDeleteLabele} Icon={IoIosRemoveCircleOutline} iconClassName={`text-md ${darkMode?"text-slate-100 hover:text-blue-500":"text-slate-600 hover:text-slate-900"} hover:scale-120 transition-all duration-300`} />
                    </div>
                  </div>
                    {
                      openSubDisplayFilter===label.label&& <DisplayAllTodos openSlide={openSubDisplayFilter} handleEditing={handleEditing} handleEditTodo={handleEditTodo} SlideTodoItem={getTodos} editingItemId={editingItemId} setEditingItemId={setEditingItemId} setEdit={setEdit} edit={edit} inbox={inbox} setInbox={setInbox} setOpenFormEdit={setOpenFormEdit} openFormEdit={openFormEdit} setDescription={setDescription} description={description} taskName={taskName} setTaskName={setTaskName} day={day} setDay={setDay} Priority={Priority} setPriority={setPriority} time={time} setTime={setTime}  /> 
                    }
                </>        
            }
        </div>
      )
}

export default DisplaySubsFilter
