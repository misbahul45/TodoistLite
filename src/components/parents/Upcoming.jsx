import React from 'react'
import All from '../childs/Upcoming/All'
import { useSelector } from 'react-redux'
import { getDarkMode_action } from '../../app/slice/allSlice'
const Upcoming = () => {
    const darkMode=useSelector(getDarkMode_action)
    return (
      <div className={`w-full h-screen overflow-y-scroll no-scrollbar pt-[80px] sm:px-24 px-2 ${darkMode?"bg-slate-900":"bg-slate-200"}`}>
        <All />
      </div>
    )
}

export default Upcoming
