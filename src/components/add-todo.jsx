import {useState} from 'react'
function AddTodo({setTodo, theme}){
  const [input, setInput] = useState('')
  function  Add(e){
    e.preventDefault();
    setTodo(input)
    console.log(input)
    setInput("")
  }
  return(
  <form onSubmit={(e) => Add(e)} className={`todo-input ${theme}`}>
    <input value={input} type="text" placeholder="Create A New Todo" onChange={e => setInput(e.target.value)} />
  </form>)
}
export default AddTodo
