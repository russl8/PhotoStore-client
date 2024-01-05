import React from 'react';
import "./index.css"
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ImageForm from './components/ImageForm';
import SignUpForm from './components/SignUpForm';

const BACKEND_URL = "https://photostore-server.onrender.com/"
function App() {
  return (
    <>
      <Routes >
        <Route path="/sign-up"
          element={<SignUpForm
            backendUrl={BACKEND_URL}
          />}
        />
        <Route path="/" element={<Home backendUrl={BACKEND_URL} />} />
        <Route path="/add" element={<ImageForm backendUrl={BACKEND_URL} />} />
      </Routes>

    </>

  );
}

export default App;
