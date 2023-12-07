import { createSlice } from "@reduxjs/toolkit";

const initialState={
    notes:[]
}

const noteSlice=createSlice({
    name:"notes",
    initialState,
    reducers:{
        setAllNotes:(state,actions)=>{
            state.notes=actions.payload
        },
        addNotes:(state,actions)=>{
            state.notes.push(actions.payload)
        },
        deleteNoteItem:(state,actions)=>{
            state.notes=state.notes.filter((note)=>note.id!==actions.payload)
        },
        saveNoteItem:(state,actions)=>{
            const { id, noteItem }= actions.payload
            const noteindex=state.notes.findIndex((note)=>note.id===id)
            if(noteindex!==-1){
                state.notes[noteindex].description=noteItem.description
                state.notes[noteindex].title=noteItem.title
            }
        }
    }
})

export const { setAllNotes, addNotes,deleteNoteItem,saveNoteItem }=noteSlice.actions
export default noteSlice.reducer

export const getAllNotes=(state)=>state.notes.notes
export const getOneNotes=(state,id)=>state.notes.notes.find((note)=>note.id===id)