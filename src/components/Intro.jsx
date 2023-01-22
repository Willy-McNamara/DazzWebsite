import React from "react";
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import LoginModal from './LoginModal.jsx';

const Intro = () => {
  let [mouse, setMouse] = useState({top: 0, left: 0})

  const mouseHandler = (e) => {
    setMouse({top: e.pageY, left: e.pageX})
  }
  const modalHandler = (e) => {
    e.preventDefault();
    const el = document.getElementById('loginModal');
    el.style.display = "flex";
    const ro = document.getElementById('mouseDiv');
    ro.style.overflow = "visible";
  }

  return (
    <div onMouseMove={mouseHandler} id="zoomContainer">
      <div id="greeting" onClick={modalHandler}>
        HM05
      </div>
      <LoginModal />
      <MouseDiv top={mouse.top} left={mouse.left} id="mouseDiv">
        <ZoomedImage top={mouse.top} left={mouse.left} src='pokemon_img_one.png'/>
      </MouseDiv>
    </div>
  )
}

const ZoomedImage = styled.img.attrs(
  ({ top, left }) => ({
    style: {
      top: -top + 100 + "px",
      left: -left + 100 + "px"
    }
  })
)`
position: absolute;
justify-self: center;
align-self: center;
width: 105vw;
object-fit: cover;
height: auto;
max-width: none;
`

const MouseDiv = styled.div.attrs(
  ({ top, left }) => ({
    style: {
      top: top - 100 + "px",
      left: left - 100 + "px"
    }
  })
)`
position: absolute;
width: 200px;
height: 200px;
border: 2px solid black;
border-radius: 50%;
overflow: hidden;
z-index: 5;
`


export default Intro;