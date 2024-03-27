import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Routes, Route } from 'react-router-dom'
import Home from './pages/Home';

// create new tabs for empty href

function App() {
  return (
    <Routes>
      <Route path='/' element = {<Home />}/>
    </Routes>
  )
}

export default App
