import { useEffect, useState } from 'react'
import './App.css'
import {Routes, Route } from 'react-router-dom'
import FrontPage from './pages/FrontPage';
import Home from './pages/Home';

// create new tabs for empty href

function App() {
  return (
    <Routes>
      <Route path='/' element = {<FrontPage />}/>
      <Route path='/Home' element = {<Home />}/>
    </Routes>
  )
}

export default App
