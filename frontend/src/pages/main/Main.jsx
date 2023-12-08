import React, { useState } from 'react';
import Post from './post/Post';
import './Main.css';
import { FaUser, FaEnvelope, FaHome, FaUsers, FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <div className={'upBar'}>
        <input type="text" placeholder="Wyszukaj..." />
        <div className="icon-container" onClick={() => navigate('/profile')}>
          <FaUser size={48} />
        </div>
      </div>
      <div className={'leftBar'}>
        <div onClick={() => handleCategoryClick('messages')}
        className='selectionDiv'>
          <p style={{ fontSize: '24px' }}>
            <FaEnvelope size={32} /> Messages
          </p>
        </div>
        <div onClick={() => handleCategoryClick('posts')}
        className='selectionDiv'>
          <p style={{ fontSize: '24px' }}>
            <FaHome size={32} /> Posts
          </p>
        </div>
        <div onClick={() => handleCategoryClick('friends')}
        className='selectionDiv'>
          <p style={{ fontSize: '24px' }}>
            <FaUsers size={32} /> Friends
          </p>
        </div>
        <div onClick={() => handleCategoryClick('notifications')}
        className='selectionDiv'>
          <p style={{ fontSize: '24px' }}>
            <FaBell size={32} /> Notifications
          </p>
        </div>
      </div>
      <div className={'content'}>
        {selectedCategory === 'messages' && <p>Wiadomości</p>}
        {selectedCategory === 'notifications' && <p>Powiadomienia</p>}
        {selectedCategory === 'posts' && (
          <>
            <p>POSTS</p>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
          </>
        )}
        {selectedCategory === 'friends' && <p>Znajomi</p>}
      </div>
    </>
  );
}

export default Main;
