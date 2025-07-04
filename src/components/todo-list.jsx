import {useState, useEffect} from "react"
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
  return (
    <div>
      <AddTodo  
      setTodo={(text) => handleAddTodo(text)}
      theme={themeCheck}
      />
  {todos.length > 0 ? <ul className={`todo-body ${themeCheck}`}>
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
  </ul>: <div className={`No-todos ${themeCheck ? "dark-mode-bg": "light-mode"}`}>
    <img src="/images/booklet-fill.svg"/>
    <p clasName="No-todos-p">No todo's yet</p>
  </div>}
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
