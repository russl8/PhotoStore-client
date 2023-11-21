import React from 'react';
import "./index.css"
import { Route, Routes } from 'react-router-dom';
import PhotoPage from './components/PhotoPage';
import Home from './components/Home';



function App() {
  return (
    <>
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/photo/:id" element={<PhotoPage />} />
      </Routes>

    </>

  );
}

export default App;
