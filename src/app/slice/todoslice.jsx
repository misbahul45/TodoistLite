import { createSlice,createSelector } from "@reduxjs/toolkit";
const initialState={
    todos:[]
}

const todoSLice=createSlice({
    name:"todos",
    initialState,
    reducers:{
        setTodosStore:(state,actions)=>{
            state.todos=actions.payload
        },
        addTodo:(state,actions)=>{
            state.todos.push(actions.payload)
        },
        updateTodoItem:(state,actions)=>{
            const { id }=actions.payload
            state.todos.forEach((todo,index)=>{
                if(todo.id===id){
                    state.todos[index]=actions.payload
                }
            })
        },
        deleteTodo:(state,actions)=>{
            state.todos=state.todos.filter((todo)=>todo.id!==actions.payload)
        },
        updateChecked:(state,actions)=>{
            const { id }=actions.payload
            state.todos.map((todo,index)=>{
                if(todo.id===id){
                    state.todos[index]=actions.payload
                }
            })
        },
        addSubTodo:(state,actions)=>{
            const { parentId,subTodo }=actions.payload
            state.todos.forEach((todo)=>{
                if(todo.id===parentId){
                    todo.subTodos.push(subTodo)
                }
            })
        },
        updateCheakedSubTodo:(state,actions)=>{
            const { parentId, idSubTodo }=actions.payload
            state.todos.forEach((todo)=>{
                if(todo.id===parentId){
                    todo.subTodos=todo.subTodos.filter((subTodo)=>subTodo.id!==idSubTodo)
                    todo.endSubTodos+=1
                }
            })
        },
        addLabelItems:(state,actions)=>{
            const { parentId, labelItem }=actions.payload
            state.todos.forEach((todo)=>{
                if(todo.id===parentId){
                    todo.labels?todo.labels.push(labelItem):[labelItem]
                }
            })
        },
        deleteLabels:(state,actions)=>{
            const { parentId,idLabel }=actions.payload
            state.todos.forEach((todo)=>{
                if(todo.id===parentId){
                    todo.labels=todo.labels.filter((label)=>label.id!==idLabel)
                }
            })
        }

    }
})

export const { setTodosStore, updateTodoItem, addTodo, deleteTodo, updateChecked, addSubTodo, updateCheakedSubTodo,addLabelItems,deleteLabels }=todoSLice.actions

export default todoSLice.reducer;

export const getAlltodo=(state)=>state.todos.todos
export const getOneTodo=(state,id)=>state.todos.todos.find((todo)=>todo.id===id)
export const getAllSubTodos=(state,id)=>state.todos.todos.find((todo)=>todo.id===id).subTodos
export const getNextTodo=(state, id)=>{
    let index =state.todos.todos.findIndex((todo)=>todo.id===id)
    if(index!==-1){
        if(index!==state.todos.todos.length-1){
            index+=1
        }else{
            index=0
        }
        return state.todos.todos[index].id
    }
    return null
}
export const getPrevTodo=(state, id)=>{
    let index =state.todos.todos.findIndex((todo)=>todo.id===id)
    if(index!==-1){
        if(index!==0){
            index-=1
        }else{
            index=state.todos.todos.length-1
        }
        return state.todos.todos[index].id
    }
    return null
}
export const getAllLabelsItem=createSelector(
    (state)=>state.todos.todos,
    (allData)=>[...new Set(allData.flatMap((data)=>data.labels.map((label)=>label.labelName)))]
)