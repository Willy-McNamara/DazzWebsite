import React from "react";
import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dummyData from '../../dummyData.js';
import AGIcy from './AGIcy.jsx';
import AGSpicy from './AGSpicy.jsx';
import InspectDazz from './InspectDazz.jsx';
import axios from 'axios';

const AdminGall = ({id}) => {
  // get list of spicys from db and assign is to state
  let [dazzs, setDazzs] = useState('init');
  let [inspectDazz, setInspectDazz] = useState({_id: 'init'})
  const ID = id ? id : useParams()

  // grab media from db
  useEffect(() => {
    axios.get(`http://localhost:3009/adminGall/${ID}`)
      .then((res) => {
        console.log('successful retrieval of content from db. here are icys/spicys :', res.data);
        setDazzs(res.data);
      })
      .catch((err) => {
        console.log('err getting the icys/spicys from db, :', err);
      })
  }, []);
  if (dazzs === 'init') return; // return her in order to trigger the useEffect immediately, which we need to render the content!

  const handleInspect = (inspectID) => {
    console.log('handleInspect triggered, here is newSrc :', inspectID)
    if (inspectID._id === 'init') {
      setInspectDazz(inspectID);
      return;
    }
    let dazz;
    for (let i = 0; i < dazzs.length; i++) {
      if (dazzs[i]._id === inspectID) {
        dazz = dazzs[i];
        break;
      }
    }
    console.log('here is dazz, about to be set as the inspectDazz :', dazz)
    setInspectDazz(dazz)
  }

  const arrOfDazz = dazzs.map((dazz, index) => {
    if (id === 'icy') {
      return <AGSpicy spicy={dazz} index={index} handleInspect={handleInspect} key={dazz._id}/>
    } else {
      return <AGIcy icy={dazz} index={index} handleInspect={handleInspect} key={dazz._id}/>
    }
  })

  return (
    <div className={`${id} vertiFlex dazzGal`}>
      <h3>View the other dazzles work!</h3>
      <h6>Click to view in isolation, add to gallery if you've created a partner piece!</h6>
      {inspectDazz._id !== 'init' && <InspectDazz inspectDazz={inspectDazz} handleInspect={handleInspect} id={ID}/>}
      {arrOfDazz}
    </div>
  )
}

export default AdminGall