import React, { } from 'react'
import { GoInbox } from "react-icons/go"

import ToolForm from './ToolForm';
import ButtonIcon from './ButtonIcon';
const AddForm = ( { display,setEditingItemId, edit ,setEdit,inbox,setInbox,onClick,setOpenForm,openForm, description, setDescription, taskName, setTaskName,day, setDay, Priority, setPriority, time, setTime }) => {
    const handleCancel=()=>{
        if(edit){
          setEditingItemId()
          setOpenForm(false)
          setEdit(false)
          setTaskName('')
          setDescription('')
          setDay('Today')
          setPriority("Priority")
          setTime("Morning")
          setInbox(false)
        }else{
          setOpenForm(false)
        }
    }
    if(display==="all"){
      return (
        <form onSubmit={(e)=>e.preventDefault()} className={`${openForm?"block":"hidden"} absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/3 mt-2 w-full max-w-lg bg-slate-100 px-5 pt-6 pb-4 rounded-xl border-2 z-10 border-gray-800 shadow-2xl transition-all duration-500`}>
          <div className="flex flex-col w-full gap-2">
            <input value={taskName} onChange={(e)=>setTaskName(e.target.value)} type="text" placeholder="Task Name" className="bg-transparent outline-none pl-2 placeholder:font-bold placeholder:text-xl capitalize font-semibold" />
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description" rows={`3`} className="first-letter:uppercase outline-none resize-none pl-2 bg-transparent w-full"></textarea>
          </div>
          <div className="flex gap-2 mt-1">
            <ToolForm rule={'day'} day={day} setDay={setDay}  />
            <ToolForm rule={'priority'} Priority={Priority} setPriority={setPriority} />
            <ToolForm rule={'Time'} time={time} setTime={setTime} /> 
          </div>
          <div className="mt-6 flex w-full justify-between items-center">
          {
            inbox!==undefined&&
            <ButtonIcon onClick={()=>setInbox(!inbox)} type={'button'} Icon={GoInbox} action={'Inbox'} className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-400 ${inbox?"bg-gray-400":""} transition-all duration-300 group`} iconClassName={'text-xl text-blue-600'} actionClassName={`text-sm group-hover:text-slate-200 ${inbox?"text-slate-200 font-bold":"text-slate-900 font-semibold"} `} />
          }
            <div className="flex gap-3">
                <button onClick={handleCancel} type="button" className="px-4 py-1.5 bg-slate-200 rounded-md hover:bg-gray-500 hover:text-slate-100 hover:scale-110 transition-all duration-300">Cancel</button>
                <button onClick={onClick} type="button" disabled={taskName?false:true} className={`px-4 py-1.5  rounded-md text-slate-200 ${taskName? "hover:bg-red-600 hover:text-slate-100 hover:scale-110 bg-red-500":"cursor-not-allowed bg-red-300"} transition-all duration-300`}>Add Task</button>
            </div>
          </div>
        </form>
      )
    }else{
      return (
        <form onSubmit={(e)=>e.preventDefault()} className={`${openForm?"block":"hidden"} mt-2 w-full bg-slate-100 px-5 pt-6 pb-4 rounded-xl border-2 z-10 border-gray-500 shadow-md transition-all duration-500`}>
          <div className="flex flex-col w-full gap-2">
            <input value={taskName} onChange={(e)=>setTaskName(e.target.value)} type="text" placeholder="Task Name" className="bg-transparent outline-none pl-2 placeholder:font-bold placeholder:text-xl capitalize font-semibold" />
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description" rows={`3`} className="first-letter:uppercase outline-none resize-none pl-2 bg-transparent w-full"></textarea>
          </div>
          <div className="flex gap-2 mt-1">
            <ToolForm rule={'day'} day={day} setDay={setDay}  />
            <ToolForm rule={'priority'} Priority={Priority} setPriority={setPriority} />
            <ToolForm rule={'Time'} time={time} setTime={setTime} /> 
          </div>
          <div className="mt-6 flex w-full justify-between items-center">
          {
            inbox!==undefined&&
            <ButtonIcon onClick={()=>setInbox(!inbox)} type={'button'} Icon={GoInbox} action={'Inbox'} className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-400 ${inbox?"bg-gray-400":""} transition-all duration-300 group`} iconClassName={'text-xl text-blue-600'} actionClassName={`text-sm group-hover:text-slate-200 ${inbox?"text-slate-200 font-bold":"text-slate-900 font-semibold"} `} />
          }
            <div className="flex gap-3">
                <button onClick={handleCancel} type="button" className="px-4 py-1.5 bg-slate-200 rounded-md hover:bg-gray-500 hover:text-slate-100 hover:scale-110 transition-all duration-300">Cancel</button>
                <button onClick={onClick} type="button" disabled={taskName?false:true} className={`px-4 py-1.5  rounded-md text-slate-200 ${taskName? "hover:bg-red-600 hover:text-slate-100 hover:scale-110 bg-red-500":"cursor-not-allowed bg-red-300"} transition-all duration-300`}>Add Task</button>
            </div>
          </div>
        </form>
      )
    }
}

export default AddForm
