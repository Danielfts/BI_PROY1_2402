import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Unico from './components/Unico';
import Multiple from './components/Multiple';
import Entrenar from './components/Entrenar';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/unico" element={<Unico />} />
        <Route path="/multiple" element={<Multiple />} />
        <Route path="/entrenar" element={<Entrenar />} />
        <Route path="/" element={<Unico />} />
      </Routes>
    </Router>
  );
};

export default App;


