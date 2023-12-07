import Top from './Top'
import Middle from './Middle'

import { useSelector } from 'react-redux'
import { getAlltodo } from '../../../app/slice/todoslice'
const All = () => {
  const allTodo=useSelector(getAlltodo)
  return (
    <div className={`relative w-full h-full flex flex-col`} >
        <Top />
        <Middle allTodo={allTodo} />
    </div>
  )
}

export default All
