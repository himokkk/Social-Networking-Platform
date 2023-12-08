import React, { useState } from 'react';
import { FaThumbsUp, FaComment } from 'react-icons/fa';
const Post = () => {

   const [postState] = useState({
    photo: 'zyzz.jpg',
    text: 'Tutaj jest treść posta.',
    comments: [
      { content: 'Pierwszy komentarz', author: 'author1' },
      { content: 'Drugi komentarz', author: 'author2' },
    ],
    likes: [
      { author: 'User1' },
      { author: 'User2' },
    ],
  });

  // eslint-disable-next-line
  const showPhoto = postState.photo && <img src={postState.photo} alt="" />;

  return (
    <div>
      <img src = 'zyzz.jpg'/>
      <p>{postState.text}</p>
      <p>{postState.likes.length} <FaThumbsUp /> {postState.comments.length} <FaComment /></p>

    </div>
  )
}
export default Post