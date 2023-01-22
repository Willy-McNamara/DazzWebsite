import React from "react";
import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AGSpicy = ({spicy}) => {
  // get list of spicys from db and assign is to state

  console.log('here is spicy in AGSpicy :', spicy)

  return (
    <div>
      SPICY will go here
    </div>
  )
}

export default AGSpicy