import React from "react";
import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const AGIcy = ({icy, index}) => {
  // get list of spicys from db and assign is to state

  console.log('here is icy in AGIcy :', icy)
  const align = index % 2 === 1 ? 'flex-end' : 'flex-start';

  return (
    <Icy className="vertiFlex" align={align}>
      <h4>{icy.icyTitle}</h4>
      <img src={`http://localhost:3009/${icy.icyData}`} id="icyThumbnail"></img>
      <h6>{icy.icyDesc}</h6>
    </Icy>
  )
}

export default AGIcy;

const Icy = styled.div.attrs(
  ({align}) => ({
    style: {
      alignSelf: align,
      alignItems: align
    }
  })
)`
  display: flex;
`