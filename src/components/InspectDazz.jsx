import React from "react";
import {useState, useEffect, useRef} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const InspectDazz = ({inspectDazz, handleInspect, id}) => {
  let descRef = useRef('')
  const type = id === 'icy' ? '.png' : '.mp3';

  console.log('InspectDazz.jsx rendered!')
  const handleSubmit = (e) => {
    e.preventDefault();
    const uploadFiles = document.getElementById('fileUpload2').files;
    console.log('logging uploadFiles in InspectDazz', uploadFiles);
    if (descRef.current.value === '' || uploadFiles.length !== 1) {
      alert('yee must include a description and file!')
      return;
    }
    console.log('here is the stuff I will be able to submit :', descRef.current.value, uploadFiles[0], inspectDazz);

    const formData = new FormData();
    formData.append('file', uploadFiles[0]) // 'type' will indicate whether this file is an mp3 or png
    formData.append("title", inspectDazz.title)
    formData.append("description", descRef.current.value)
    formData.append("origDescription", inspectDazz.desc)
    formData.append("mainID", inspectDazz._id)
    axios.post(`http://localhost:3009/dazzleUpload/${type.split('.')[1]}`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
      .then((res) => {
        console.log('server response for inspectDazz post:')
      })
      .catch((err) => {
        console.log('err in post inspectDazz :', err)
      })
  }

  const handleExit = (e) => {
    e.preventDefault()
    handleInspect({_id: 'init'})
  }

  return (
    <div className="modal">
      <div className="inspectDazz">
        {type === '.mp3' && <img src={`http://localhost:3009/stream/${inspectDazz._id}`} id="inspectPiece"></img>}
        {type === '.png' && <audio controls src={`http://localhost:3009/stream/${inspectDazz._id}`} id="inspectPiece"></audio>}
        <div className="vertiFlex">
          <h3>{inspectDazz.title}</h3>
          <h6>{inspectDazz.desc}</h6>
          <input type="file" id="fileUpload2" accept={type} name="Pair for Gallery" className="pm"></input>
          <textarea rows="4" cols="40" ref={descRef} placeholder="Add to the description. This will simply be appended to the description already set forth by the other dazz"></textarea>
          <button onClick={handleSubmit} className="btn">send 'er</button>
          <button onClick={handleExit} className="btn">actually nvm</button>
        </div>
      </div>
    </div>
  )
}

export default InspectDazz;