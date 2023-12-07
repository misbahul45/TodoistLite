import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosHome,IoIosSearch } from "react-icons/io";
import ButtonIcon from '../anonymus/ButtonIcon';

import { getNavigate_action, handleSidebar, handleNavigation } from '../../../app/slice/allSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
const Left = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleSideBarAction=()=>{
    dispatch(handleSidebar())
  }
  const handleNavHome=()=>{
    navigate('/app/today')
    dispatch(handleNavigation('/app/today'))
  }

  return (
    <div className="flex sm:w-80 w-full justify-between sm:gap-7">
      <div className="flex gap-2 items-center">
        <ButtonIcon type={'button'} Icon={GiHamburgerMenu} className={'p-1 rounded-sm hover:bg-black/30 transition-all duration-200'} iconClassName={'text-2xl text-slate-50'} onClick={handleSideBarAction} />
        <ButtonIcon type={'button'} Icon={IoIosHome} className={'sm:block hidden p-1 rounded-sm hover:bg-black/30 transition-all duration-200'} iconClassName={'text-2xl text-slate-50 '} onClick={handleNavHome} />
      </div>
      <div className="hidden flex-1 sm:flex items-center gap-2 bg-slate-100 pl-2  cursor-pointer hover:scale-105 hover:bg-slate-50 transition-all duration-200 group">
        <IoIosSearch  className="text-xl font-bold"/>
        <p className="font-semibold text-slate-400 group-hover:text-slate-950">Search</p>
      </div>
    </div>
  )
}

export default Left

