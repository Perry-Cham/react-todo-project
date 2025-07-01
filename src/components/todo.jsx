function Todo({value, done, onDelete, onComplete, id, theme}) {
 const checkComplete = done ? "complete": "";
 console.log(theme)
  return (
  <li className={`todo ${checkComplete}`}>
   <div className="todo-p-wrapper">
  <span className={`indicator ${checkComplete} ${theme}`} onClick={() => onComplete(id)}></span>
    <p className="todo-text">{value}</p>
    </div>
    <button className="delete-todo" onClick={() => onDelete(id)}><img src="/images/icon-cross.svg"/></button>
  </li>)
}
export default Todo
