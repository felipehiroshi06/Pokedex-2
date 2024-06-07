import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './Details';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <div className="top-bar"></div> 
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:name" element={<Details />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
