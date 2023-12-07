import TodoItem from "./TodoItem"
import AddForm from "./AddForm"

const DisplayAllTodos = ({handleEditTodo,handleEditing,SlideTodoItem,openSlide,editingItemId, setEditingItemId, setEdit, edit, inbox, setInbox, setOpenFormEdit, openFormEdit, setDescription, description,taskName,setTaskName, day, setDay, Priority, setPriority,time, setTime }) => {
    return (
      <div>
           <div className="w-full mt-2">
            {
              openSlide&&
              <div className="h-auto flex flex-col gap-2">
                {SlideTodoItem&&
                  SlideTodoItem.map((todo)=>(
                    <div className="w-full" key={todo.id}>
                        {editingItemId!==todo.id?
                          <TodoItem key={todo.id} todo={todo} handleEditTodo={()=>handleEditing(todo)} />
                          :
                          <AddForm key={todo.id} setEditingItemId={setEditingItemId} setEdit={setEdit} edit={edit} inbox={inbox} setInbox={setInbox} onClick={()=>handleEditTodo(todo)} setOpenForm={setOpenFormEdit} openForm={openFormEdit} setDescription={setDescription} description={description} taskName={taskName} setTaskName={setTaskName} day={day} setDay={setDay} Priority={Priority} setPriority={setPriority} time={time} setTime={setTime} />
                        }
                    </div>
                  ))
                }
              </div>
            }
            {
              openSlide===undefined&&
              <div className="h-auto flex flex-col gap-2">
                {SlideTodoItem&&
                  SlideTodoItem.map((todo)=>(
                    <div className="w-full" key={todo.id}>
                        {editingItemId!==todo.id?
                          <TodoItem key={todo.id} todo={todo} handleEditTodo={()=>handleEditing(todo)} />
                          :
                          <AddForm key={todo.id} setEditingItemId={setEditingItemId} setEdit={setEdit} edit={edit} inbox={inbox} setInbox={setInbox} onClick={()=>handleEditTodo(todo)} setOpenForm={setOpenFormEdit} openForm={openFormEdit} setDescription={setDescription} description={description} taskName={taskName} setTaskName={setTaskName} day={day} setDay={setDay} Priority={Priority} setPriority={setPriority} time={time} setTime={setTime} />
                        }
                    </div>
                  ))
                }
              </div>
            }
          </div>
      </div>
    )
  }
  
  export default DisplayAllTodos