import React from 'react';
import "./index.css"
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ImageForm from './components/ImageForm';

const BACKEND_URL = "http://localhost:8080/"

function App() {

  return (
    <>
      <Routes >
        <Route path="/" element={<Home backendUrl = {BACKEND_URL}/>} />
        <Route path="/add" element={<ImageForm backendUrl={BACKEND_URL}/>}/>
      </Routes>

    </>

  );
}

export default App;
