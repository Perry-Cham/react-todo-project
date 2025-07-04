import {useState, useEffect} from "react"
import { DndContext, closestCorners, useSensors, useSensor, PointerSensor, TouchSensor, KeyboardSensor } from "@dnd-kit/core";
import { 
  SortableContext, 
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove
} from "@dnd-kit/sortable";

import Todo from "./todo"
import AddTodo from "./add-todo"
import Counter from "./counter.jsx"
import Footer from "./footer"


function Todolist({theme}){
  const [allTodos, setAllTodos] = useState([])
  const [page, setPage] = useState("All")
  const [todos, setTodos] = useState([])
  const viewPort = window.innerWidth;
  useEffect(() => {
    const oldTodos = localStorage.getItem('todos')
    if(oldTodos){
      setTodos(JSON.parse(oldTodos))
      setAllTodos(JSON.parse(oldTodos))
    }
  }, [])
  function handleAddTodo(text) {
    const todos2 = todos.slice();
    const newTodo = {
      id:Date.now(),
      value: text,
      done:false
    }
    todos2.push(newTodo)
    setTodos(todos2)
   setAllTodos(todos2)
    localStorage.setItem('todos',JSON.stringify(todos2))
  }
    function handleComplete(id){
    const todos2 = todos.slice();
    const Ntodo =todos2.find(todo => todo.id == id)
    Ntodo.done = true;
    setTodos(todos2)
    setAllTodos(todos2)
    localStorage.setItem('todos',JSON.stringify(todos2))
    }
    function handleDelete(id){
    const todos2 = todos.slice();
    const Ntodo =todos2.find(todo => todo.id == id)
    todos2.splice(todos2.indexOf(Ntodo), 1)
    setTodos(todos2)
    setAllTodos(todos2)
    localStorage.setItem('todos',JSON.stringify(todos2))
    }
    function handleClear(){
    let todos2 = todos.slice();
    todos2 = todos2.filter(todo => todo.done !== true)
    setTodos(todos2)
    setAllTodos(todos2)
    localStorage.setItem('todos',JSON.stringify(todos2))
    }
    const themeCheck = theme === 'dark' ? "dark-mode-bg" : "light-mode";
    const getPos = (id) => {
      const index = todos.findIndex(item => item.id == id )
      return index;
    }
    function handleDragEnd(event){
      const {active, over} = event;
      if(!over || active.id === over.id) return;
      
      const oldPos = getPos(active.id)
      const newPos = getPos(over.id)
      const newTodos = arrayMove(todos, oldPos, newPos)
      
      setTodos(newTodos)
      setAllTodos(newTodos)
      localStorage.setItem('todos', JSON.stringify(newTodos))
    }
    const sensors = useSensors(
      useSensor(TouchSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    )
  return (
    <div>
      <AddTodo  
      setTodo={(text) => handleAddTodo(text)}
      theme={themeCheck}
      />
      
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
      >
          {todos.length > 0 ? <ul className={`todo-body ${themeCheck}`}>
            <SortableContext items={todos} strategy={verticalListSortingStrategy}>
                  {todos.map((todo) => (
     <Todo 
      value={todo.value}
      key={todo.id}
      done={todo.done}
      id={todo.id}
      onDelete={(id) => handleDelete(id)}
      onComplete={(id) => handleComplete(id)}
      theme={themeCheck}
      />
    ))}
            </SortableContext>

  </ul>: <div className={`No-todos ${themeCheck}`}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 2V22H4V18H2V16H4V13H2V11H4V8H2V6H4V2H8ZM20.0049 2C21.1068 2 22 2.89821 22 3.9908V20.0092C22 21.1087 21.1074 22 20.0049 22H10V2H20.0049Z"></path></svg>
    <p className="No-todos-p">No todo's yet</p>
  </div>}
      </DndContext>

  
  
  <Counter 
  setActive={setPage}
   activePage={page}
   list={todos}
   setList={setTodos}
   setAll={setAllTodos}
   All={allTodos}
   theme={themeCheck}
   todos={todos}
   viewPort={viewPort}
  />
  {viewPort < 650 && <Footer
   setActive={setPage}
   activePage={page}
   list={todos}
   setList={setTodos}
   setAll={setAllTodos}
   All={allTodos}
   theme={themeCheck}
   />}
    </div>
    )
  }


export default Todolist