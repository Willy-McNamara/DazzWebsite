import React from "react";
import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dummyData from '../../dummyData.js';
import AGIcy from './AGIcy.jsx';
import AGSpicy from './AGSpicy.jsx';

const AdminGall = ({id}) => {
  // get list of spicys from db and assign is to state
  let [dazzs, setDazzs] = useState(id === 'spicy' ? dummyData.dummyIcys : dummyData.dummySpicys);

  const arrOfDazz = dazzs.map((dazz, index) => {
    if (id === 'icy') {
      return <AGSpicy spicy={dazz} index={index}/>
    } else {
      return <AGIcy icy={dazz} index={index}/>
    }
  })

  console.log('here is icys in AdminIcys :', dazzs)

  return (
    <div className={`${id} vertiFlex dazzGal`}>
      {arrOfDazz}
    </div>
  )
}

export default AdminGall