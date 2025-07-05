import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";


function Todo({value, done, onDelete, onComplete, id, theme}) {
  
  const checkComplete = done ? "complete": "";


  const {
    attributes,
    listeners,
    setNodeRef, 
    transform,
    transition,
  } = useSortable({id});
 
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    // The main list item. We attach the setNodeRef and style for dnd-kit.
    // Note that the drag listeners are NOT applied here anymore.
    <li ref={setNodeRef} style={style} {...attributes} className={`todo ${checkComplete} ${theme}`}>
      <div className="todo-p-wrapper">
        {/* The completion indicator. onClick is now free from listener conflicts. */}
        <span className={`indicator ${checkComplete}`} onClick={() => onComplete(id)}></span>
        <p className="todo-text">{value}</p>
      </div>
      <div className="todo-actions">

        <button className="delete-todo" onClick={() => onDelete(id)}>
          <img src="/images/icon-cross.svg" alt="Delete todo"/>
        </button>

        <button {...listeners} className="drag-handle">
          <svg fill="#9ca3af" width="16px" height="16px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M4,11H20a1,1,0,0,0,0-2H4a1,1,0,0,0,0,2Zm16,2H4a1,1,0,0,0,0,2H20a1,1,0,0,0,0-2Z"/>
          </svg>
        </button>
      </div>
    </li>
  );
}

export default Todo;
