import React from 'react'
import Post from './post/Post';
function Main()  {
    const scrollableDivStyle = {
      width: '300px',
      height: '200px',
      overflow: 'auto', // lub overflow: 'scroll',
      border: '1px solid #ccc',
      padding: '10px',
      float: 'left',
    };
  
    return (
        <>
        <p>profile ect.</p>
        <div style={scrollableDivStyle}>
        <p>profile ect.</p>
        </div>
      <div style={scrollableDivStyle}>
        {/* Tutaj umieść zawartość, która może przekraczać wymiary diva */}
        <p>POSTS</p>
      <Post/>
      </div>
      </>
    );
  }
  

export default Main
