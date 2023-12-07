import React from 'react';
import ButtonIcon from '../anonymus/ButtonIcon';

import { FaPlus, FaMoon } from 'react-icons/fa6';
import { IoIosSunny } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { handleDarkMode, getDarkMode_action } from '../../../app/slice/allSlice';
import { firebaseAuth } from '../../../config/firebase';

const Right = ({addOnClick}) => {
  const darkMode = useSelector(getDarkMode_action);
  const dispatch = useDispatch();

  const handleDarkModeAction = () => {
    dispatch(handleDarkMode());
  };

  return (
    <div className="flex justify-center items-center sm:gap-4 gap-2 sm:pr-4 pr-1">
      <div className="flex items-center sm:gap-4 gap-1">
        <div onClick={handleDarkModeAction} className="relative flex items-center group">
          {darkMode ? (
            <ButtonIcon type={'button'} Icon={FaMoon} iconClassName={'sm:text-3xl text-xl text-slate-300 hover:text-slate-200 hover:scale-125 transition-all duration-200'} />
          ) : (
            <ButtonIcon type={'button'} Icon={IoIosSunny} iconClassName={'sm:text-3xl text-xl text-white hover:text-slate-700 hover:scale-125 transition-all duration-200'} />
          )}
          <p className="sm:block hidden absolute -bottom-9 w-20 text-sm -left-6 bg-slate-800 text-white font-semibold text-center py-1 opacity-80 rounded-md scale-0 group-hover:scale-100 transition-all duration-500">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </p>
        </div>
        <ButtonIcon onClick={addOnClick} type={'button'} Icon={FaPlus} className={'p-1.5 rounded-lg hover:bg-gray-400 transition-all duration-200'} iconClassName={'text-white text-lg'} />
      </div>
      <div className="flex flex-col gap-1 items-center justify-center cursor-pointer">
      <img className="w-8 h-8 object-cover object-center rounded-full" src={firebaseAuth.currentUser?.photoURL?firebaseAuth.currentUser?.photoURL:'https://i.pinimg.com/564x/6a/bb/cd/6abbcd65bc6e1ff50e237514774965c0.jpg'} alt="" />
        <p className="text-xs text-white">
          {firebaseAuth.currentUser?.displayName?firebaseAuth.currentUser?.displayName:firebaseAuth.currentUser?.email.substring(0,10)}
        </p>
      </div>
    </div>
  );
};

export default Right;
