function Footer({setActive, activePage, list, setList, All, setAll, theme}){
 function all(){
      const todos = All.slice();
      setActive("All")
      setList(todos)
 }
  function active(){
      const activeTodos = All.filter((todos) => todos.done !== true)
      setActive("Active")
      setList(activeTodos)
  
    }
function completed(){
  const activeTodos = All.filter((todos) => todos.done === true)
    setActive("Complete")
      setList(activeTodos)
  
}
    return (
    <nav className={`footer-navigation ${theme}`}>
            <ul>
            <li onClick={() => all()} className={activePage == "All" ? "active-page":""}>All</li>
            <li onClick={() => active()} className={activePage == "Active" ? "active-page":""}>Active</li>
            <li onClick={() => completed()} className={activePage == "Complete" ? "active-page":""}>Completed</li>
            </ul>

        </nav>
    )
}

export default Footer
