import React, { useState } from 'react';
import { FaUserPlus, FaThumbsUp, FaComment } from 'react-icons/fa';
import './Notification.css';
import { apiCall } from "../../../functions/apiCall";

const Notification = ({ data, onNotificationResultsUser }) => {
    const [notificationData, setNotificationData] = useState(data);

    const handleUserClick = (userId) => {
        onNotificationResultsUser(userId);
    };

    const getNotificationText = () => {
        switch (notificationData.notification_type) {
            case 'friend_request':
                return (
                    <>
                        {"User"} 
                        <span className="notification-user-name" onClick={() => handleUserClick(notificationData.from_user.id)}> {notificationData.from_user.username}</span>
                        {" sent you a friend request."}
                    </>
                );
            case 'post_like':
                return `User ${notificationData.from_user.username} liked your post.`;
            case 'post_comment':
                return `User ${notificationData.from_user.username} commented on your post.`;
            default:
                return '';
        }
    };

    const getNotificationIcon = () => {
        switch (notificationData.notification_type) {
            case 'friend_request':
                return <FaUserPlus />;
            case 'post_like':
                return <FaThumbsUp />;
            case 'post_comment':
                return <FaComment />;
            default:
                return null;
        }
    };

    const handleAcceptFriendRequest = async () => {
        try {
            await apiCall(`http://localhost:8000/user/notification/${notificationData.id}/accept`, "PATCH");
            const response = await apiCall(`http://localhost:8000/user/notification/list`, "GET");
            const responseResults = await response.json();
            setNotificationData(responseResults);
        }
        catch (error) {
            console.error('Error :', error);
        }
    };

    return (
        notificationData.from_user.id !== notificationData.to_user.id && (
            <div className="notification-container" >
                <div className="notification-icon">{getNotificationIcon()}</div>
                <div className="notification-content">
                    <p className="notification-text">{getNotificationText()}</p>
                    {notificationData.notification_type === 'friend_request' && (
                        <button className="accept-friend-request-button" onClick={handleAcceptFriendRequest}>
                            Accept
                        </button>
                    )}
                </div>
            </div>
        )
    );
};

export default Notification;