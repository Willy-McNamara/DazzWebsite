import React from "react";
import {useState, useEffect, useRef} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const InspectDazz = ({inspectDazz, handleInspect, id}) => {
  let descRef = useRef('')

  const type = id === 'icy' ? '.png' : '.mp3';
  console.log('InspectDazz.jsx rendered!')
  const handleSubmit = (e) => {
    e.preventDefault();
    const uploadFiles = document.getElementById('fileUpload2').files;
    if (descRef.current.value === '' || uploadFiles.length !== 1) {
      alert('yee must include a description and file!')
      return;
    }
    console.log('here is the stuff I will be able to submit :', descRef.current.value, uploadFiles[0], inspectDazz);
  }

  const handleExit = (e) => {
    e.preventDefault()
    handleInspect({_id: 'init'})
  }

  return (
    <div className="modal">
      <div className="inspectDazz">
        <img src={`http://localhost:3009/${inspectDazz.Data}`} id="inspectPiece"></img>
        <div className="vertiFlex">
          <input type="file" id="fileUpload2" accept={type} name="Pair for Gallery" className="pm"></input>
          <textarea rows="4" cols="40" ref={descRef} placeholder="Add to the description. This will simply be appended to the description already set forth by the other dazz"></textarea>
          <button onClick={handleSubmit} className="btn">send 'er</button>
          <button onClick={handleExit}>actually nvm</button>
        </div>
      </div>
    </div>
  )
}

export default InspectDazz;