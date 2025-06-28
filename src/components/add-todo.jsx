import {useState} from 'react'
function AddTodo({setTodo}){
  const [input, setInput] = useState('')
  function  Add(){
    setTodo(input)
    console.log(input)
    setInput("")
  }
  return(
  <div>
    <input value={input} type="text" placeholder="Create A New Todo" onChange={e => setInput(e.target.value)} />
    <button onClick={() => {Add()}}>Enter</button>
  </div>)
}
export default AddTodo