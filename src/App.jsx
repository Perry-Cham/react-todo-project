import React from 'react';
import ReactDom from 'react-dom/client';
import Todolist from './components/todo-list';
import './styles/styles.css'
import {useState, useEffect} from 'react';
function App(){
  const [theme, setTheme] = useState(() => {
     const oldTheme = localStorage.getItem('theme');
  return oldTheme || "dark"
  });
  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])
  
/*  const isDeviceThemeDark = window.matchMedia('(prefers-color-scheme:dark)').matches;
  isDeviceThemeDark ? setTheme("dark"): setTheme("light"); */
  
  function changeTheme(){
   if(theme === "dark") setTheme("light"); else setTheme("dark")
  }
  const themeCheck = theme === 'dark' ? "dark-mode-bg" : "light-mode";
  return(
  <div className={`main-body ${themeCheck}`}>
      <div className="header">
        <h1 className="heading">TODO</h1>
        <img alt={theme == "dark" ? "crescent moon icon": "sun icon"} onClick={() => changeTheme()} src={theme == "dark" ? "/images/icon-moon.svg" : "/images/icon-sun.svg"}/>
      </div>
      <div className={`image ${themeCheck}`}></div>
    <Todolist
    theme={theme}
    />
      <p className={`message ${themeCheck}`}>Drag and Drop to reorder</p>
  </div>)
}
export default App
