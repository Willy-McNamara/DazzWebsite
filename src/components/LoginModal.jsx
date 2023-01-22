import React from "react";
import {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginModal = () => {
  const navigate = useNavigate();
  let loginTerm = useRef('')

  const handleBooyah = (e) => {
    e.preventDefault();
    if (loginTerm.current.value === 'icy' || loginTerm.current.value === 'spicy') {
      navigate(`/admin/${loginTerm.current.value}`)
    } else {
      alert("if you're a dazzler, try again with something 3 letters, lowercase. otherwise it seems like you may not know what's happening.")
    }
  }

  const handleIDK = (e) => {
    e.preventDefault();
    navigate(`/gallery`)
  }

  return (
    <div className="loginModal" id="loginModal">
      <div className="loginModalContent" >
        <div className="horiFlex" id="mayI"> May I have this dazz? </div>
        <div className="horiFlex">
          <input type="text" ref={loginTerm} className="loginInput" placeholder="Yearbook instructions, keep it"></input>
          <button id="booyahButton" onClick={handleBooyah}> booyah </button>
        </div>
        <button id="idkButton" onClick={handleIDK}>I don't know what's happening</button>
      </div>
    </div>
  )
}

export default LoginModal