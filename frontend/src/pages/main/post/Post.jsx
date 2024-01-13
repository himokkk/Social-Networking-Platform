import React from 'react';
import { FaThumbsUp, FaComment } from 'react-icons/fa';
import './Post.css';
const Post = ({ data }) => {


 

  return (
    <div className="post-container">
      <p>Author: {data.author_username}</p>
      <p>{data.content}</p>
      {data.media && (
        <img
          src={data.media}
          alt="Post Media"
          style={{ width: '100%', maxWidth: '500px'}}
        />
      )}
      <p>{data.likes.length} <FaThumbsUp /> {data.comments.length} <FaComment /></p>

    </div>
  )
}
export default Post