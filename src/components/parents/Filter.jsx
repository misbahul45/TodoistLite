import React,{ useState } from 'react'
import { useSelector } from 'react-redux';
import { getDarkMode_action } from '../../app/slice/allSlice';
import Top from '../childs/Filter/Top';
import AddFilter from '../childs/anonymus/AddFilter';
import Middle from '../childs/Filter/Middle';
import { getAllLabelsItem } from './../../app/slice/todoslice'
const Filter = () => {
  const [addFilter,setAddFilter]=useState(false)
  const darkMode=useSelector(getDarkMode_action)

  const labels=useSelector(getAllLabelsItem)
  return (
    <div className={`relative w-full h-screen overflow-y-scroll no-scrollbar pt-20 pb-10 sm:px-24 px-2 ${darkMode?"bg-slate-900":"bg-slate-200"}`}>
      <Top addFilter={addFilter} setAddFilter={setAddFilter} />
      <AddFilter labels={labels} addFilter={addFilter} setAddFilter={setAddFilter} />
      <Middle />
    </div>
  )
}

export default Filter
