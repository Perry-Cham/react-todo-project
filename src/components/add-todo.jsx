import {useState} from 'react'
function AddTodo({setTodo}){
  const [input, setInput] = useState('')
  function  Add(e){
    e.preventDefault();
    setTodo(input)
    console.log(input)
    setInput("")
  }
  return(
  <form className="todo-input">
    <input value={input} type="text" placeholder="Create A New Todo" onChange={e => setInput(e.target.value)} />
    <button onClick={(e) => {Add(e)}}>Enter</button>
  </form>)
}
export default AddTodo
