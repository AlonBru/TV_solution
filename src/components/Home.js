import React, { useState,useEffect } from 'react';
import Show from './Show';
import './Home.css';
import bg from '../video/popcorn.mp4';
import axios from 'axios'
function Home() {
  const [shows, setShows] = useState([]);
  const [search, setSearch] = useState('');
  const getTopShows = ()=>{
    axios.get('https://www.episodate.com/api/most-popular')
    .then(({data})=>{
      console.log(data)
      setShows(data.tv_shows)
    })
  }
  useEffect(getTopShows,[])
  /*Insert your code here */

  return (
    <div className='app'>
      <video src={bg} playsInline autoPlay muted loop id='bgvid' />
      {/* If you want to know how to implement video as your background 
      you can take a look here: https://www.w3schools.com/howto/howto_css_fullscreen_video.asp */}
      <form>
        <input id='search-bar' 
          onInput={(e)=>{
            const {target} = e
            console.log(target.value)
            setSearch(target.value)

          }} placeholder='search'/>
        <button id='submit-btn' onClick={(e)=>{
          e.preventDefault()
          if(search.length>0){
          axios.get(`https://www.episodate.com/api/search?q=${search}`)
          .then(({data})=>{
            setShows(data.tv_shows)
          })}else{
            getTopShows()
          }
        }}>
          search
        </button>
      </form>
      <h1>The Best T.V Shows</h1>
      <div className="top-shows">
      {shows.map((show) => (
        <Show show={show} key={show.id} />
      ))}
      </div>
    </div>
  );
}

export default Home;
