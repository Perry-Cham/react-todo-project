import React from 'react';
import ReactDom from 'react-dom/client';
import Todolist from './components/todo-list';
import './styles/styles.css'
function App(){
  return(
  <div className="main-body">
      <header className="header">
        <h1 className="heading">TODO</h1>
        <img src="/images/icon-moon.svg"/>
      </header>
      <div className="image dark"></div>
    <Todolist/>
      <p className="message dark-mode-bg">Drag and Drop to reorder</p>
  </div>)
}
export default App
