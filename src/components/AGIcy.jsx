import React from "react";
import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AGIcy = ({icy, index, handleInspect}) => {
  // get list of spicys from db and assign is to state

  let handleClick = (e) => {
    e.preventDefault();
    console.log('logging e.target.id in AGIcy click handler', e.target.id)
    handleInspect(e.target.id);
  }

  if (index % 2 === 1) {
    return (
      <div className="horiFlex adminGallPiece">
        <img src={`http://localhost:3009/stream/${icy._id}`} id="icyThumbnail"></img>
        <div className="vertiFlex icyDesc">
          <h3>{icy.title}</h3>
          <h6>{icy.desc}</h6>
          <button className="btn" id={icy._id} onClick={handleClick}>Add to Gallery</button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="horiFlex adminGallPiece" id={icy._id}>
        <div className="vertiFlex icyDesc">
          <h3>{icy.title}</h3>
          <h6>{icy.desc}</h6>
          <button className="btn" id={icy._id} onClick={handleClick}>Add to Gallery</button>
        </div>
        <img src={`http://localhost:3009/stream/${icy._id}`} id="icyThumbnail"></img>
      </div>
    )
  }
}

export default AGIcy;