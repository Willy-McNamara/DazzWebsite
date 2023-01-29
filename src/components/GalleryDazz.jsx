import React from "react";
import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const GalleryDazz = ({dazz, index}) => {

  return (
    <div className="vertiFlex">
      <div className="vertiFlex icyDesc">
        <h3>{dazz.dazzleTitle}</h3>
        <h4>{dazz.dazzleDesc}</h4>
        <audio controls src={`http://localhost:3009/stream/${dazz.spicyID}`} className="spicyThumbnail"></audio>
      </div>
      <img src={`http://localhost:3009/stream/${dazz.icyID}`} id="galleryImage"></img>
    </div>
  )
}

export default GalleryDazz;