import React from "react";
import {useState, useEffect, useRef} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AdminUpload = ({id}) => {
  let descRef = useRef('')
  let titleRef = useRef('')
  const type = id === 'icy' ? '.png' : '.mp3';

  const handleSubmit = (e) => {
    e.preventDefault();
    const uploadFiles = document.getElementById('fileUpload').files;
    if (descRef.current.value === '' || titleRef.current.value === '' || uploadFiles.length !== 1) {
      alert('yee must include a title, description, and file!')
      return;
    }
    // will eventually make axios call with the below information:
    console.log('here is information that will be submitted on click :', titleRef.current.value, descRef.current.value, uploadFiles[0])
  }

  return (
    <div className={`adminUpload vertiFlex pm ${id}`}>
      Select a {type} to upload and add the required details!
      <input type="file" id="fileUpload" accept={type} name="Upload New Dazz" className="pm"></input>
      <input type="text" ref={titleRef} placeholder="giver' name" id="dazzTitle"></input>
      <textarea ref={descRef} rows="4" cols="50" placeholder="Describe this dazzle. This text will be paired with the other dazzle description when it's added to the gallery, and appear when the user hovers over the piece." ref={descRef} className="pm"></textarea>
      <button className="pm btn" onClick={handleSubmit}>{`add to backlog and send ${id} beacon`}</button>
    </div>
  )
}


export default AdminUpload