import React from 'react'
import Left from '../childs/Header/Left'
import Right from '../childs/Header/Right'
import { useSelector } from 'react-redux'
import { getDarkMode_action } from '../../app/slice/allSlice'
const Header = ({addOnClick}) => {
  const darkMode=useSelector(getDarkMode_action)
  return (
    <header className={`absolute left-0 top-0 w-full flex items-center justify-between px-2 sm:px-5 py-2 ${darkMode?"dark bg-slate-800":"bg-red-600"} z-30 `}>
        <Left />
        <Right addOnClick={addOnClick} />
    </header>
  )
}

export default Header
