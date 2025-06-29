import {useState, useEffect} from "react"
import Todo from "./todo"
import AddTodo from "./add-todo"
import Footer from "./footer"

function Todolist(){
  const [todos, setTodos] = useState([
  {
    id: 1,
    value: "Finish React basics",
    done: false
  },{
    id: 2,
    value: "Refactor TodoItem component",
    done: true
  },{
    id: 3,
    value: "Push project to GitHub",
    done: false
  }])
  useEffect(() => {
    const oldTodos = localStorage.getItem('todos')
    if(oldTodos){ setTodos(JSON.parse(oldTodos))}
  }, [])
  function handleAddTodo(text) {
    console.log(text)
    const todos2 = todos.slice();
    const newTodo = {
      id:todos.length+1,
      value: text,
      done:false
    }
    todos2.push(newTodo)
    setTodos(todos2)
    localStorage.setItem("todos", JSON.stringify(todos))

  }
    function handleComplete(id){
    const todos2 = todos.slice();
    const Ntodo =todos2.find(todo => todo.done !== id)
    Ntodo.done = true;
    setTodos(todos2)
    }
    function handleDelete(id){
    const todos2 = todos.slice();
    const Ntodo =todos2.find(todo => todo.id == id)
    todos2.splice(todos2.indexOf(Ntodo), 1)
    setTodos(todos2)
    localStorage.setItem("todos", JSON.stringify(todos))
    console.log(localStorage.getItem("todos"))
    }
    function handleClear(){
    const todos2 = todos.slice();
    const Ntodo =todos2.filter(todo => todo.done !== true)
    setTodos(todos2)
    }
  return (
    <div>
      <AddTodo  setTodo={(text) => handleAddTodo(text)}/>
   <ul className="todo-body dark-mode-bg">
    {todos.map((todo) => (
     <Todo 
      value={todo.value}
      key={todo.id}
      done={todo.done}
      id={todo.id}
      onDelete={(id) => handleDelete(id)}
      onComplete={(id) => handleComplete(id)}
      />
    ))}
  </ul>
  <div className="counter dark-mode-bg">
        <p>`{todos.length} {todos.length == 1 ? 'item left' : 'items left'}`</p>
        <div className="One">
        <button onClick={() =>{handleClear}}>Clear completed</button>
        </div>
  </div>
   <Footer items={todos}/>
    </div>
    )
  }

export default Todolist
