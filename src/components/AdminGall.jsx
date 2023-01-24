import React from "react";
import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dummyData from '../../dummyData.js';
import AGIcy from './AGIcy.jsx';
import AGSpicy from './AGSpicy.jsx';
import InspectDazz from './InspectDazz.jsx';

const AdminGall = ({id}) => {
  // get list of spicys from db and assign is to state
  let [dazzs, setDazzs] = useState(id === 'spicy' ? dummyData.dummyIcys : dummyData.dummySpicys);
  let [inspectDazz, setInspectDazz] = useState({_id: 'init'})

  const handleInspect = (inspectID) => {
    console.log('handleInspect triggered, here is newSrc :', inspectID)
    if (inspectID._id === 'init') {
      setInspectDazz(inspectID);
      return;
    }
    let dazz;
    for (let i = 0; i < dazzs.length; i++) {
      if (dazzs[i]._id === Number(inspectID)) {
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
      {inspectDazz._id !== 'init' && <InspectDazz inspectDazz={inspectDazz} handleInspect={handleInspect} id={id}/>}
      {arrOfDazz}
    </div>
  )
}

export default AdminGall