import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import TaskList from "./components/TaskList"
import TaskForm from "./components/TaskForm"

function App() {

  return (
    <BrowserRouter>
      <div  className='bg-slate-900 min-h-screen'>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<TaskList /> } />
        <Route path="/taskform" element={<TaskForm />} />
        <Route path="/taskform/:id" element={<TaskForm />} />
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
