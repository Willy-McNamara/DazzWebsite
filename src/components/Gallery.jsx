import React from "react";
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GalleryDazz from './GalleryDazz.jsx';

const Gallery = () => {
  let [dazzs, setDazzs] = useState([{_id: 'init'}]);

  // grab media from db
  useEffect(() => {
    axios.get(`http://localhost:3009/dazzles`)
      .then((res) => {
        console.log('successful retrieval of dazzles :', res.data);
        setDazzs(res.data);
      })
      .catch((err) => {
        console.log('err getting the icys/spicys from db, :', err);
      })
  }, []);
  if (dazzs[0]._id === 'init') {return};

  const arrOfDazz = dazzs.map((dazz, index) => {
    return <GalleryDazz dazz={dazz} index={index} key={dazz._id}/>
  })

  return (
    <div className="gallery">
      <div className={`vertiFlex dazzGal`}>
        <h1>Feast yer eyes!</h1>
        <h5>creations brought to you by the Midnight Dazzlers</h5>
        {arrOfDazz}
      </div>
    </div>
  )
}


export default Gallery