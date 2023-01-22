import React from "react";
import { createRoot } from "react-dom/client";
import {useState, useEffect} from 'react';
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import Intro from './components/Intro.jsx';
import Admin from './components/Admin.jsx';
import Gallery from './components/Gallery.jsx';

const root = createRoot(document.getElementById("root"));


const App = () => {
  let [inCave, setInCave] = useState(false)

  if (inCave === true) {
    // render the gallery
  } else {
    return (
        <Routes>
          <Route path="/" index element={<Intro />} />
          <Route path="/admin/:id" element={<Admin />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
    )
  }
}


root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  );