import React from "react";
import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AdminAbout = ({id}) => {
  const aboutString = "Hello there!\nWelcome to a home for dazzle collaboration.\nThe icy and spicy passwords will bring you to their respective admin portals, which allow the dazzle to upload audio/visual creations.\nThese creations live on the server, so after upload just shoot a text or send some kind of beacon across the dyad to notify the counter-dazzle of this movement.\nIn each portal (icy - visual, spicy - audio), the admin may chose from works of the counter dazzle to add-to-gallery, thus prompting a pairing process where the dazzle must select a partner work to join that audio/visual, forever intertwined and enshrined in the gallery.\nWe can change or keep anything about this process, but I thought it'd be a good place to start for increasing dazzle collab and inspiring us to make leetl creations more regularly.\nTwo by Two,\nPromenade";

  return (
    <div className={`dazzlePreamble ${id}`}>
      {aboutString}
    </div>
  )
}


export default AdminAbout