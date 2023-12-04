import React from 'react'
import Post from './post/Post';
import './Main.css'
import { FaUser } from 'react-icons/fa';

function Main()  {
      // eslint-disable-next-line
    const scrollableDivStyle = {
      width: '400px',
      height: '500px',
      overflow: 'auto', 
      border: '1px solid #ccc',
      padding: '10px',
      float: 'left',
    }

    return (
        <>
        <div className = {"upBar"}>
        <input type="text" placeholder="Wyszukaj..." />
        <div className="icon-container">
        <FaUser size={48} />
      </div>
        </div>
    
      <div className = {"posts"}>
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