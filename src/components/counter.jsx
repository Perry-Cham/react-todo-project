import Footer from "./footer";

function Counter({setActive, activePage, list, setList, All, setAll, theme, todos, viewPort}){
  return(
    <div className={`counter ${theme}`}>
        <p>{todos.filter(todo => todo.done !== true).length} {todos.filter(todo => todo.done !== true).length == 1 ? 'item left' : 'items left'}</p>
       
       {viewPort > 650 && <Footer
        setActive={setActive}
   activePage={activePage}
   list={todos}
   setList={setList}
   setAll={setAll}
   All={All}
   theme={theme}
        />}
        <div className="One">
        <button onClick={() =>{handleClear()}}>Clear completed</button>
        </div>
  </div>
    )
}
export default Counter