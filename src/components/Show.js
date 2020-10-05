import React from 'react';
import { Link } from 'react-router-dom';
import './Show.css';

function Show({ show }) {
  const img = show.image_thumbnail_path
  return (
    <Link className='link-to-one-show' to={`/show/${show.id}`}>
      <div className="tv-show">
        <img className='show-img' src={img} alt={show.name+' image'}/>
        <h2 className='show-footer'>{show.name}</h2>
      </div>
    </Link>
  );
}

export default Show;
