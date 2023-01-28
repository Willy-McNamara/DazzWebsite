import React from "react";
import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AGSpicy = ({spicy, index, handleInspect}) => {
  // get list of spicys from db and assign is to state

  let handleClick = (e) => {
    e.preventDefault();
    console.log('logging e.target.id in AGIcy click handler', e.target.id)
    handleInspect(e.target.id);
  }

  if (index % 2 === 1) {
    return (
      <div className="horiFlex adminGallPiece">
        <audio controls src={`http://localhost:3009/stream/${spicy._id}`} className="spicyThumbnail"></audio>
        <div className="vertiFlex icyDesc">
          <h3>{spicy.title}</h3>
          <h6>{spicy.desc}</h6>
          <button className="btn" id={spicy._id} onClick={handleClick}>Add to Gallery</button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="horiFlex adminGallPiece" id={spicy._id}>
        <div className="vertiFlex spicyDesc">
          <h3>{spicy.title}</h3>
          <h6>{spicy.desc}</h6>
          <button className="btn" id={spicy._id} onClick={handleClick}>Add to Gallery</button>
        </div>
        <audio controls src={`http://localhost:3009/stream/${spicy._id}`} className="spicyThumbnail"></audio>
      </div>
    )
  }
}

export default AGSpicy