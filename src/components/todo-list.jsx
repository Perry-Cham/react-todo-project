import {useState} from "react"
import Todo from "./todo"
import AddTodo from "./add-todo"

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
  }
  console.log(todos)
    function handleComplete(id){
    const todos2 = todos.slice();
    const Ntodo =todos2.find(todo => todo.id == id)
    Ntodo.done = true;
    setTodos(todos2)
    }
    function handleDelete(id){
    const todos2 = todos.slice();
    const Ntodo =todos2.find(todo => todo.id == id)
    todos2.splice(indexOf(Ntodo))
    setTodos(todos2)
    }
    
  return (
    <div>
      <AddTodo  setTodo={(text) => handleAddTodo(text)}/>
   <ul>
    {todos.map((todo) => (
     <Todo 
      value={todo.value}
      key={todo.id}
      done={todo.done}
      onDelete={() => handleDelete()}
      onComplete={() => handleComplete()}
      />
    ))}
  </ul>
    </div>
    )
  }

export default Todolist