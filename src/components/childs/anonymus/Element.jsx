import React from 'react'
import ButtonIcon from './ButtonIcon'
const Element = ({Icon1, Icon2, Icon3, info1, info2, info3, openElement,setOpenElement, setSetateOption}) => {
    const handleStateOption=(info)=>{
        setSetateOption(info)
        setOpenElement(!openElement)
    }
  return (
    <div className={`${openElement?"scale-100":"scale-0"} absolute right-1/2 translate-x-1/2 -top-32 w-32 flex flex-col gap-1 bg-gray-100 border-2 border-slate-600 shadow-lg rounded-md transition-all duration-200`}>
      {Icon1&&
      <ButtonIcon className={'flex items-center gap-2 pl-2 py-1.5 rounded-t-md hover:bg-gray-400 transition-all duration-100 group'} iconClassName={'text-xl text-green-500'} actionClassName={'text-slate-800 font-semibold group-hover:text-slate-100 transition-all duration-100'} type={'button'} onClick={()=>handleStateOption(info1)} Icon={Icon1} action={info1} />
      }
      {Icon2&&
      <ButtonIcon  className={'flex items-center gap-2 pl-2 py-1.5 hover:bg-gray-400 transition-all duration-100 group'} iconClassName={'text-xl text-red-500'} actionClassName={'text-slate-800 font-semibold group-hover:text-slate-100 transition-all duration-100'} type={'button'} onClick={()=>handleStateOption(info2)} Icon={Icon2} action={info2} />
      }
      {Icon3&&
      <ButtonIcon  className={'flex items-center gap-2 pl-2 py-1.5 rounded-b-md hover:bg-gray-400 transition-all duration-100 group'} iconClassName={'text-xl text-blue-700'} actionClassName={'text-slate-800 font-semibold group-hover:text-slate-100 transition-all duration-100'} type={'button'} onClick={()=>handleStateOption(info3)} Icon={Icon3} action={info3} />
      }
    </div>
  )
}

export default Element
