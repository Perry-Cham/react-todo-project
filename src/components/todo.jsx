function Todo({value, done, onDelete, onComplete}) {
  return (
  <li className={`todo ${done ? "completed" : ""}`}>
    <span className="indicator" onClick={() => onComplete(done)}></span>
    <p className="todo-text">{value}</p>
    <button className="delete-todo" onClick={() => onDelete(done)}>X</button>
  </li>)
}
export default Todo