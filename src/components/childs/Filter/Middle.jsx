import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import DisplayFilterName from '../anonymus/DisplayFilterName'
const Middle = () => {
  const allFilter=useSelector((state)=>state.filter.filter)
  return (
    <div className="flex flex-col">
      {
        allFilter.length!==0&&
        allFilter.map((filter, index)=>(
          <DisplayFilterName id={filter.id} key={index} labelName={filter.labelName}  name={filter.titleName} />
        ))
      }
      {
        allFilter.length===0&&
        <div className="w-full flex flex-col justify-center items-center absolute top-40 left-0 -z-0">
          <img className="w-full lg:max-w-xl max-w-sm opacity-50" src="/public/img/noTodo.svg" alt="" />
        </div>
      }
    </div>
  )
}

export default Middle

