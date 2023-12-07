import { createSlice } from "@reduxjs/toolkit";


const initialState={
    filter:[]
}

const filterSlice=createSlice({
    name:"filter",
    initialState,
    reducers:{
        setAllFilter:(state,actions)=>{
            state.filter=actions.payload
        },
        addFilterLabel:(state, actions)=>{
            state.filter.push(actions.payload)
        },
        deleteFilterLabel:(state,actions)=>{
            state.filter=state.filter.filter((file)=>file.id!==actions.payload)
        },
        updateFilterName:(state,actions)=>{
            const { id, name }=actions.payload
            state.filter.forEach((file,index)=>{
                if(file.id===id){   
                    state.filter[index].titleName=name
                }
            })
        },
        addingLabel:(state, actions)=>{
            const { id, newLabel }=actions.payload
            state.filter.forEach((file)=>{
                if(file.id===id){
                    file.labelName.push(newLabel)
                }
            })
        },
        setNameLabel:(state,actions)=>{
            const { id, idLabel,name }=actions.payload
            state.filter.forEach((file)=>{
                if(file.id===id){
                    file.labelName.forEach((label)=>{
                        if(label.id===idLabel){
                            label.label=name
                        }
                    })
                }
            })
        },
        deleteLabelFilter:(state,actions)=>{
            const { id, idLabel }=actions.payload
            state.filter.forEach((file)=>{
                if(file.id===id){
                   file.labelName=file.labelName.filter((label)=>label.id!==idLabel)
                }
            })
        }
    }
})

export const { setAllFilter, addFilterLabel,deleteFilterLabel, updateFilterName, addingLabel, setNameLabel, deleteLabelFilter } =filterSlice.actions

export default filterSlice.reducer