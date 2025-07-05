import {useState, useEffect} from "react";
import { 
  DndContext, 
  closestCorners, 
  useSensors, 
  useSensor, 
  PointerSensor, // FIX: Import PointerSensor
  KeyboardSensor 
} from "@dnd-kit/core";
import { 
  SortableContext, 
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove
} from "@dnd-kit/sortable";

import Todo from "./todo";
import AddTodo from "./add-todo";
import Counter from "./counter.jsx";
import Footer from "./footer";

function Todolist({theme}){
  const [allTodos, setAllTodos] = useState([]);
  const [page, setPage] = useState("All");
  const [todos, setTodos] = useState([]);
  const viewPort = window.innerWidth;

  // Effect to load todos from localStorage on initial render.
  useEffect(() => {
    try {
      const oldTodos = localStorage.getItem('todos');
      if(oldTodos){
        const parsedTodos = JSON.parse(oldTodos);
        setTodos(parsedTodos);
        setAllTodos(parsedTodos);
      }
    } catch (error) {
      console.error("Failed to parse todos from localStorage", error);
    }
  }, []);

  // Function to update localStorage whenever todos change.
  const updateLocalStorage = (newTodos) => {
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  function handleAddTodo(text) {
    const newTodo = {
      id: Date.now(),
      value: text,
      done: false
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setAllTodos(updatedTodos);
    updateLocalStorage(updatedTodos);
  }

  function handleComplete(id){
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);
    setAllTodos(updatedTodos);
    updateLocalStorage(updatedTodos);
  }

  function handleDelete(id){
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    setAllTodos(updatedTodos);
    updateLocalStorage(updatedTodos);
  }

  function handleClear(){
    const updatedTodos = allTodos.filter(todo => !todo.done);
    setTodos(updatedTodos);
    setAllTodos(updatedTodos);
    updateLocalStorage(updatedTodos);
  }

  const getTodoPos = (id) => todos.findIndex((todo) => todo.id === id);

  function handleDragEnd(event){
    const {active, over} = event;
    if (over && active.id !== over.id) {
      const originalPos = getTodoPos(active.id);
      const newPos = getTodoPos(over.id);
      
      const newTodos = arrayMove(todos, originalPos, newPos);
      
      setTodos(newTodos);
      setAllTodos(newTodos);
      updateLocalStorage(newTodos);
    }
  }

  // FIX: Sensor configuration updated for better touch support.
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const themeCheck = theme === 'dark' ? "dark-mode-bg" : "light-mode";

  return (
    <div>
      <AddTodo  
        setTodo={handleAddTodo}
        theme={themeCheck}
      />
      
      <DndContext 
        sensors={sensors} 
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        {todos.length > 0 ? (
          <ul className={`todo-body ${themeCheck}`}>
            <SortableContext items={todos} strategy={verticalListSortingStrategy}>
              {todos.map((todo) => (
                <Todo 
                  value={todo.value}
                  key={todo.id}
                  done={todo.done}
                  id={todo.id}
                  onDelete={handleDelete}
                  onComplete={handleComplete}
                  theme={themeCheck}
                />
              ))}
            </SortableContext>
          </ul>
        ) : (
          <div className={`No-todos ${themeCheck}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 2V22H4V18H2V16H4V13H2V11H4V8H2V6H4V2H8ZM20.0049 2C21.1068 2 22 2.89821 22 3.9908V20.0092C22 21.1087 21.1074 22 20.0049 22H10V2H20.0049Z"></path>
            </svg>
            <p className="No-todos-p">No todo's yet</p>
          </div>
        )}
      </DndContext>
  
      <Counter 
        setActive={setPage}
        activePage={page}
        list={todos}
        setList={setTodos}
        setAll={setAllTodos}
        All={allTodos}
        theme={themeCheck}
        todos={todos}
        viewPort={viewPort}
        onClear={handleClear}
      />
      
      {viewPort < 650 && (
        <Footer
          setActive={setPage}
          activePage={page}
          list={todos}
          setList={setTodos}
          setAll={setAllTodos}
          All={allTodos}
          theme={themeCheck}
        />
      )}
    </div>
  );
}

export default Todolist;
