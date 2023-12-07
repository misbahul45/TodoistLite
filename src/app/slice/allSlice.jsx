import { createSlice } from "@reduxjs/toolkit";


const initialState={
    sideBar_action:screen.width>1100?true:false,
    darkMode_action:false,
    navigate_action:'/app/today',
}
const actionSlice=createSlice({
    name:"actions",
    initialState,
    reducers:{
        handleSidebar:(state)=>{
            state.sideBar_action = !state.sideBar_action
        },
        handleDarkMode:(state)=>{
            state.darkMode_action = !state.darkMode_action
        },
        handleNavigation:(state,actions)=>{
            state.navigate_action = actions.payload
            state.sideBar_action = !state.sideBar_action
        },
    }
})

export const { handleSidebar,handleDarkMode,handleNavigation }=actionSlice.actions

export default actionSlice.reducer

export const getSideBar_action=(state)=>state.actions.sideBar_action
export const getNavigate_action=(state)=>state.actions.navigate_action
export const getDarkMode_action=(state)=>state.actions.darkMode_action
