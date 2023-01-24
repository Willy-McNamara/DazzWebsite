import React from "react";
import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const InspectDazz = ({inspectDazz, handleInspect, id}) => {
  // get list of spicys from db and assign is to state
  const type = id === 'icy' ? '.mp3' : '.png';
  console.log('InspectDazz.jsx rendered!')

  return (
    <div className="modal">
      <div className="inspectDazz">
        {/* <img src={inspectDazz.Data}></img> */}
        <input type="file" id="fileUpload" accept={type} name="Pair for Gallery" className="pm"></input>
        <textarea placeholder="describe this sucka"></textarea>
        <input type="text" placeholder="name this thang"></input>
      </div>
      Inspect Modal Here
    </div>
  )
}

export default InspectDazz;