import React from "react";
import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminAbout from './AdminAbout.jsx';
import AdminUpload from './AdminUpload.jsx';
import AdminGall from './AdminGall.jsx';

const Admin = () => {
  const { id } = useParams();
  let [view, setView] = useState('about');

  const handleView = (e) => {
    e.preventDefault();
    setView(e.target.id)
  }

  return (
    <div className="admin">
      <div className={`horiFlex ${id}`} id="adminNav" >
        <button className="navButton" id="icy" onClick={handleView}>Icy</button>
        <button className="navButton" id="about" onClick={handleView}>About</button>
        <button className="navButton" id="spicy" onClick={handleView}>Spicy</button>
      </div>
      {view === 'about' && <AdminAbout id={id}/>}
      {view === 'icy' && (id === 'icy' ? <AdminUpload id={id}/> : <AdminGall id={id}/>)}
      {view === 'spicy' && (id === 'spicy' ? <AdminUpload id={id}/> : <AdminGall id={id}/>)}
    </div>
  )
}


export default Admin