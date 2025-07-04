import {useSortable} from "@dnd-kit/sortable"
import {CSS} from "@dnd-kit/utilities"

function Todo({value, done, onDelete, onComplete, id, theme}) {
 const checkComplete = done ? "complete": "";
 const {listeners, setNodeRef, attributes, transition, transform} = useSortable({id})
 
 const Styles = {
   transition,
   transform: CSS.Transform.toString(transform)
 }
  return (
  <li ref={setNodeRef}
  {...attributes}
  {...listeners}
  style={Styles}
  className={`todo ${checkComplete}`}>
   <div className="todo-p-wrapper">
  <span className={`indicator ${checkComplete} ${theme}`} onClick={() => onComplete(id)}></span>
    <p className="todo-text">{value}</p>
    </div>
    <button className="delete-todo" onClick={() => onDelete(id)}><img src="/images/icon-cross.svg"/></button>
  </li>)
}
export default Todo
