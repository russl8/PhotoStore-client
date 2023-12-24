import React from 'react';
import "./index.css"
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import ImageForm from './components/ImageForm';
import SignUpForm from './components/SignUpForm';

const BACKEND_URL = "http://localhost:8080/"
const verifyUser = (useNav:any) => {
  //check if user exists in local storage.
  let tempUsername = localStorage.getItem("username");
  // if so, then see if user exists in db.
  if (tempUsername !== null && tempUsername !== "") {
    fetch(`${BACKEND_URL}${tempUsername}`)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('username', data.userName);
        localStorage.setItem('userid', data.userId);
        window.location.href = "/sign-up"
      })
      .catch(error => {
        localStorage.setItem('username', "");
        localStorage.setItem('userid', "");
      });
  }
}
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
