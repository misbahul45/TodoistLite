import React, { useState } from 'react'
import { MdArrowForwardIos } from "react-icons/md";
import ButtonIcon from './ButtonIcon';
const InputLabel = ({labels,label,setLabel}) => {
  const [selectOpenLabels,setSelectOpenLabels]=useState(false)

  const handleSetLabel=(labelItem)=>{
    setLabel(labelItem)
    setSelectOpenLabels(false)
  }
  return (
  <>
   {labels&&
      <div className="relative mt-2">
        <div onClick={()=>setSelectOpenLabels(!selectOpenLabels)} className={`relative text-sm py-1 w-full pl-3 text-tart capitalize cursor-pointer rounded-md shadow-md shadow-white/20 ${label?"bg-green-500 font-semibold text-slate-100":"bg-slate-100"}`}>
          <span className={``}>{label!==""?label:"Select Labels....."}</span>
          <ButtonIcon Icon={MdArrowForwardIos} className={'absolute top-1/2 -translate-y-1/2 right-1'} iconClassName={`text-md ${selectOpenLabels?"rotate-90":""} transition-all duration-300`} />
        </div>
        <div className={`absolute w-full flex flex-col mt-0.5 ${selectOpenLabels?"scale-100 opacity-100 translate-y-0":"scale-0 opacity-0 -translate-y-20"} transition-all duration-300 h-[96px] overflow-y-scroll no-scrollbar z-20`}>
        {
          labels.map((label,index)=>(
              <button onClick={()=>handleSetLabel(label)} className="bg-gray-200 my-0.5 text-start py-1 pl-2 text-sm capitalize font-semibold cursor-pointer rounded-sm shadow-md shadow-white/20 hover:bg-green-500 transition-all duration-300" key={index} value={label}>{label}</button>
          ))
        }
       </div>
      </div>  
    }
  </>
  )
}

export default InputLabel
