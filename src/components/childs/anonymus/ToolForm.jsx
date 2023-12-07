import React,{ useState } from 'react'
import ButtonIcon from './ButtonIcon';
import Element from './Element';
import { MdToday } from "react-icons/md";;
import { FaFlag, FaCloudSun } from "react-icons/fa";
import { TbSunglasses } from "react-icons/tb";
import { IoCloudyNightSharp } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { CiClock1,CiFlag1 } from "react-icons/ci";

const ToolForm = ({ rule, day, setDay, Priority, setPriority, time, setTime }) => {
    const [showDay, setShowDay] = useState(false);
    const [showPriority,setShowPriority]=useState(false)
    const [showTime,setShowTime]=useState(false)
    let content;
    const handleShowDays=()=>{
        setShowDay(!showDay)
        setShowPriority(false)
        setShowTime(false)
    }
    const handleShowPriority=()=>{
        setShowPriority(!showPriority)
        setShowTime(false)
        setShowDay(false)
    }
    const handleShowTime=()=>{
        setShowTime(!showTime)
        setShowDay(false)
        setShowPriority(false)
    }

    if(rule==="day"){
        content=(
            <div className="relative">
                <ButtonIcon onClick={handleShowDays} type="button" Icon={MdOutlineDateRange} action={day} actionClassName={'text-sm text-slate-600 group-hover:text-slate-950'} iconClassName={`text-xl ${day==="Today"?"text-green-600":day==="Lusa"?"text-blue-600":"text-red-600"}`} className={'flex border-[1px] border-slate-400 items-center gap-2 px-4 py-1 rounded-md hover:scale-110 hover:border-slate-700 transition-all duration-300 group'}/>
                <Element openElement={showDay} setOpenElement={setShowDay} stateOption={day} setSetateOption={setDay} Icon1={MdToday} Icon2={MdToday} Icon3={MdToday} info1={'Today'} info2={'Tomorrow'} info3={'Lusa'} />
            </div>
        )
    }else if(rule==="priority"){
        content=(
            <div className="relative">
                <ButtonIcon onClick={handleShowPriority} type="button" Icon={Priority==='Priority'?CiFlag1:FaFlag} action={Priority} actionClassName={`text-sm text-slate-600 group-hover:text-slate-950`} iconClassName={`text-xl ${Priority==="Priority"|| Priority==="Priority-1"?"text-red-600":Priority==="Priority-2"?"text-orange-600":"text-yellow-600"}`} className={'flex border-[1px] border-slate-400 items-center gap-2 px-2 py-1  rounded-md hover:scale-110 hover:border-slate-700 transition-all duration-300 group'} />
                <Element openElement={showPriority} setOpenElement={setShowPriority} stateOption={Priority} setSetateOption={setPriority} Icon1={FaFlag} Icon2={FaFlag} Icon3={FaFlag} info1={'Priority-1'} info2={'Priority-2'} info3={'Priority-3'} />
            </div>
        )
    }else{
        content=(
            <div className="relative">
                <ButtonIcon onClick={handleShowTime} type="button" Icon={time==='Time'?CiClock1:time==='Morning'?FaCloudSun:time==='Afternoon'?TbSunglasses:IoCloudyNightSharp} action={time} actionClassName={'text-sm text-slate-600 group-hover:text-slate-950'} iconClassName={`text-red-500 text-xl ${time==="Morning"?"text-yellow-500":time==="Afternoon"?"text-orange-700":"text-slate-700"}`} className={'flex border-[1px] border-slate-400 items-center gap-2 px-2 py-1 rounded-md hover:scale-110 hover:border-slate-700 transition-all duration-300 group'} />
                <Element openElement={showTime} setOpenElement={setShowTime} stateOption={time} setSetateOption={setTime} Icon1={FaCloudSun} Icon2={TbSunglasses} Icon3={IoCloudyNightSharp} info1={'Morning'} info2={'Afternoon'} info3={'Evening'} />
            </div>
        )
    }
  return (
    <>
      {content}
    </>
  )
}

export default ToolForm
