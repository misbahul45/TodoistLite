import Auth from "./components/parents/Auth"
import Layout from "./components/layout/Layout"
import Today from "./components/parents/Today"
import Inbox from "./components/parents/Inbox"
import Upcoming from "./components/parents/Upcoming"
import Filter from "./components/parents/Filter"

import { createBrowserRouter,RouterProvider } from "react-router-dom"

import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"

import { firebaseAuth,db } from "./config/firebase"
import { setTodosStore } from "./app/slice/todoslice"
import ViewMoreTodo from "./components/parents/ViewMoreTodo"
import { setAllFilter } from "./app/slice/filterSlice"
import NoteProject from "./components/parents/NoteProject"
import { setAllNotes } from "./app/slice/noteSlice"

function RouteApp() {
  const [allTodo,setAllTodo]=useState()
  const dispatch=useDispatch()

  const route=createBrowserRouter([
    {
      path:'/',
      element:<Auth />
    },
    {
      element:<Layout />,
      children:[
        {
          path:'/app/today',
          element:<Today />,
        },
        {
          path:'/app/inbox',
          element:<Inbox />
        },
        {
          path:'/app/upcoming',
          element:<Upcoming />
        },
        {
          path:'/app/filter',
          element:<Filter />
        },
        {
          path:'/app/today/task/:id',
          element:<ViewMoreTodo  route={'today'} />
        },
        {
          path:'/app/inbox/task/:id',
          element:<ViewMoreTodo  route={'inbox'} />
        },
        {
          path:'/app/upcoming/task/:id',
          element:<ViewMoreTodo  route={'upcoming'} />
        },
        {
          path:'/app/filter/task/:id',
          element:<ViewMoreTodo  route={'filter'} />
        },
        {
          path:'/app/project/:id',
          element:<NoteProject />
        }
      ]
    }
  ])

 
  const getdataFromStore=async(idStore)=>{
    try{
      const todoRef=collection(db,idStore)
      const snapshot = await getDocs(todoRef);
      const data = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
      setAllTodo(data)
    }catch(e){
      console.log("eror get")
    }
  }
  const getFilterFromStore=async(idStore)=>{
    try{
      const todoRef=collection(db,"filter")
      const snapshot = await getDocs(todoRef);
      const data = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })).filter((fil)=>fil.userId===idStore);
          dispatch(setAllFilter(data))
    }catch(e){
      console.log("eror filter")
    }
  }
  
  const getNotesFromStore=async(idStore)=>{
    try{
      const todoRef=collection(db,"project")
      const snapshot = await getDocs(todoRef);
      const data = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })).filter((fil)=>fil.userId===idStore);
          dispatch(setAllNotes(data))
    }catch(e){
      console.log("eror notes")
    }
  }
  
  useEffect(()=>{
    onAuthStateChanged(firebaseAuth,(user)=>{
      if(user){
        getdataFromStore(firebaseAuth.currentUser.uid)
        getFilterFromStore(firebaseAuth.currentUser.uid)
        getNotesFromStore(firebaseAuth.currentUser.uid)
      }
    })
  },[])

  useEffect(()=>{
    if(allTodo!==undefined){
      dispatch(setTodosStore(allTodo))
    }
  },[allTodo])

  return(
      <RouterProvider router={route}/>
  )
 
}

export default RouteApp
