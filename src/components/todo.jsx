function Todo({value, done, onDelete, onComplete, id}) {
  return (
  <li className={`todo ${done ? "completed" : ""}`}>
   <div className="todo-p-wrapper">
  <span className={`indicator ${done ? "complete": ""}`} onClick={() => onComplete(id)}></span>
    <p className="todo-text">{value}</p>
    </div>
    <button className="delete-todo" onClick={() => onDelete(id)}>X</button>
  </li>)
}
export default Todo
