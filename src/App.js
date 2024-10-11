import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Bridge from './Components/Bridge';
import Park from './Components/Park'
import Sidebar from './Components/Sidebar'

function App() {
  return (
    <Router>
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Bridge />} />
        <Route path="/Park" element={<Park/>}/>
      </Routes>
    </Router>
  );
}

export default App;
