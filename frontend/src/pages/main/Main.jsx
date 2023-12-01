import React from 'react'
import Post from './post/Post';
import './Main.css'
function Main()  {
    const scrollableDivStyle = {
      width: '500px',
      height: '500px',
      overflow: 'auto', // lub overflow: 'scroll',
      border: '1px solid #ccc',
      padding: '10px',
      float: 'left',
    };
  
    return (
        <>
        <p>profildde ect.</p>
        <div style={scrollableDivStyle}>
        <p>profile ect.</p>
        </div>
      <div style={scrollableDivStyle}>
        {/* Tutaj umieść zawartość, która może przekraczać wymiary diva */}
        <p>POSTS</p>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      </div>
      </>
    );
  }
  

export default Main
