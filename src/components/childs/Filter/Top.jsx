import React from 'react'
import HeaderContent from '../anonymus/HeaderContent'
import { HiSquaresPlus } from "react-icons/hi2";
const Top = ({ addFilter, setAddFilter}) => {
  return (
    <div className="border-b-2 border-slate-300 pb-1.5">
      <HeaderContent addFilter={addFilter} setAddFilter={setAddFilter} Title={'Filter & Labels'} Icon={HiSquaresPlus} action={'Add Filters'} />
    </div>
  )
}

export default Top
