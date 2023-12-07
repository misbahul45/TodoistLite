import Top from './Top'
import Middle from './Middle'

import { useSelector } from 'react-redux'
import { getAlltodo } from '../../../app/slice/todoslice'
const All = () => {
  const allTodo=useSelector(getAlltodo).filter((todo)=>todo.day==="Today")
  return (
    <div className={`relative w-full h-full flex flex-col`} >
        <Top />
        <Middle allTodo={allTodo} />
        {allTodo.length===0&&
           <div className="w-full flex flex-col justify-center items-center absolute top-24 left-0">
            <img className="w-full max-w-xl opacity-50" src="/public/img/noTodo.svg" alt="" />
           </div>
        }
    </div>
  )
}

export default All
