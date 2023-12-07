import React from 'react'
import ButtonIcon from '../../anonymus/ButtonIcon'
import { updateDoc,doc,arrayRemove } from 'firebase/firestore'
import { db,firebaseAuth } from '../../../../config/firebase'
import { IoMdClose } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { deleteLabels } from '../../../../app/slice/todoslice';
const DisplayLabel = ({ subAllLabels, id }) => {
    const dispatch=useDispatch()
    
  const handleDeleteLabel=async(idLabel)=>{
    try{
      const deleteLabelsItem=subAllLabels.find((label)=>label.id==idLabel)
      await updateDoc(doc(db,firebaseAuth.currentUser.uid,id),{
        labels:arrayRemove(deleteLabelsItem)
      })
      dispatch(deleteLabels({parentId:id,idLabel:idLabel}))
    }catch(e){
      console.log(e)
    }
  }

  return (
    <div>
        <div className="w-full flex gap-2 py-2 flex-wrap">
            {
              subAllLabels&&
              subAllLabels.map((label)=>(
                <div key={label.id} className={`flex gap-2 ${label.bgColor} px-2 py-2 rounded-md shadow-md`}>
                  <p className="text-slate-50 text-sm capitalize font-semibold">{label.labelName}</p>
                  <ButtonIcon onClick={()=>handleDeleteLabel(label.id)} Icon={IoMdClose} className={'text-sm text-slate-100 hover:text-red-500 hover:scale-105 transition-all duration-300 p-0.5 hover:bg-gray-300 rounded-md'} />
                </div>
              ))
            }
          </div>
    </div>
  )
}

export default DisplayLabel
