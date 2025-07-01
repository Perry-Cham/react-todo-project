import React from 'react';
import ReactDom from 'react-dom/client';
import Todolist from './components/todo-list';
import './styles/styles.css'
import {useState} from 'react';
function App(){
  const [theme, setTheme] = useState("dark");
  function changeTheme(){
   if(theme === "dark") setTheme("light"); else setTheme("dark")
  }
  const themeCheck = theme === 'dark' ? "dark-mode-bg" : "light-mode";
  return(
  <div className={`main-body ${themeCheck}`}>
      <header className="header">
        <h1 className="heading">TODO</h1>
        <img onClick={() => changeTheme()} src={theme == "dark" ? "/images/icon-moon.svg" : "/images/icon-sun.svg"}/>
      </header>
      <div className={`image ${themeCheck}`}></div>
    <Todolist
    theme={theme}
    />
      <p className="message dark-mode-bg">Drag and Drop to reorder</p>
  </div>)
}
export default App
