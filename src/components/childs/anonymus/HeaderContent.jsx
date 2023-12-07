import React from 'react'
import ButtonIcon from './ButtonIcon'
import { useSelector } from 'react-redux'
import { getDarkMode_action } from '../../../app/slice/allSlice'
const HeaderContent = ({ Title, Icon, action, setAddFilter ,addFilter }) => {
    const darkMode=useSelector(getDarkMode_action)
    const date=new Date().toJSON().slice(0, 10)
  return (
   <div className={`w-full flex items-center justify-between px-2 z-10`}>
        <div className="flex gap-2 items-end">
            <h1 className={`font-bold text-md md:text-2xl font-roboto ${darkMode?"text-slate-50":"text-slate-900"}`}>{Title}</h1>
            <p className={`${darkMode?"text-slate-300":"text-slate-600"} text-xs`}>{date}</p>
        </div>
        {Icon&&
          <div>
            <ButtonIcon onClick={()=>setAddFilter(!addFilter)} Icon={Icon} action={action}  actionClassName={`font-roboto text-xs font-semibold ${darkMode?"text-slate-50":"text-slate-800"}`} iconClassName={`${darkMode?"text-slate-50 hover:bg-gray-700":"text-slate-800"} text-2xl`} className={`cursor-pointer ${darkMode?"hover:bg-gray-700":"hover:bg-gray-300"} flex items-center gap-1 px-2 py-1 rounded-md`} />
          </div>
        }
   </div>
  )
}

export default HeaderContent
