function Todo({value, done, onDelete, onComplete, id}) {
  return (
  <li className={`todo ${done ? "completed" : ""}`}>
    <span className="indicator" onClick={() => onComplete(id)}></span>
    <p className="todo-text">{value}</p>
    <button className="delete-todo" onClick={() => onDelete(id)}>X</button>
  </li>)
}
export default Todo
