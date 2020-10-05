import React, { useState,useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './OneShow.css';
import likedImg from "../media/liked.png"
import notLikedImg from "../media/notLiked.png"
import axios from 'axios'
function OneShow() {
  const storage= window.localStorage
  const { id } = useParams(); //this is the selected show id
  console.log(typeof storage.getItem(id))
  const [show,setShow] = useState({})
  const [liked,setLiked] = useState(false)
  const getShow = ()=>{
    axios.get(`https://www.episodate.com/api/show-details?q=${id}`)
    .then(({data})=>{
      setShow(data.tvShow)
      console.log(data.tvShow)
      
    })
  }
  const likeClick = (e) => {
    const newValue = liked?0:1
    storage.setItem(id,newValue)
    setLiked(newValue)
  }
  useEffect(()=>{
    getShow()
    setLiked(Number(storage.getItem(id)))
  },[])
    /*insert your code here */
  const rating = show.rating||0
  const ratingColor= () =>{
    const ratingNumber = Number(rating)
    if(ratingNumber>=8){
      return 'green'
    }else if(ratingNumber>=6){
      return 'yellow'
    }else{
      return 'red'
    }
  }
  return(
    <div className='one-show-container'>
      <Link className='go-back-link' to='/'>
        <img
          className='go-back-img'
          alt='Go back'
          src='https://img.icons8.com/metro/52/000000/circled-left-2.png'
        />
      </Link> 
      <div className='like-div' onClick={likeClick}>
        <img 
          className='interaction-img' 
          src={liked?likedImg:notLikedImg} 
          alt={liked?'liked':'not liked'} 
          />
      </div>
      <div className='one-show-img-and-title' >
        <h2>{show.name}</h2>
        <img className='one-show-img' src={show.image_path} alt='/' />
        <div className='one-show-footer'>
          <div class='seasons'>
            {show.episodes?show.episodes[show.episodes.length-1].season:0}{' '}seasons
          </div>
          <div className='genres'>
            {show.genres
            ?show.genres.map(genre=><span className='genre'>{genre}</span>)
            :0}
          </div>
          <div className='rating'>
            <span className={ratingColor()}>
              {rating?rating.slice(0,3):0}
            </span>
          </div>
          <div className='status'>
            {show.status||'tbd'}
          </div>
        </div>
      </div>
      {show.name&&<div className='one-show-description'>
        <h2>description</h2>
        {show.description}
      </div>}
    </div>
  );
}

export default OneShow;
