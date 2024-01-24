import React, { useState } from 'react';
import { FaTimes, FaUserPlus, FaEnvelope, FaThumbsUp, FaComment } from 'react-icons/fa';
import './Notification.css';
const Notification = ({ data, onDelete }) => {
    const [hovered, setHovered] = useState(false);

    const handleNotificationClick = () => {
        //click processing(may add following link)
        console.log('Notification clicked!');
        if (data.link) {
            console.log('link:', data.link);
        }
    };

    const handleDeleteClick = (event) => {
        event.stopPropagation();
        onDelete(data.id);
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'like':
                return <FaThumbsUp />;
            case 'comment':
                return <FaComment />;
            case 'friendRequest':
                return <FaUserPlus />;
            case 'message':
                return <FaEnvelope />;
            default:
                return null;
        }
    };


   return (
    <div
      className={`notification-container ${hovered ? 'hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleNotificationClick}
    >
      <div className="notification-icon">{getNotificationIcon(data.type)}</div>
           <div className="notification-content">{data.content}
           </div>
           <div className="notification-close" onClick={handleDeleteClick}>
               <FaTimes />
      </div>
    </div>
  );
};

export default Notification;