import React from 'react';
import { FaUserPlus, FaThumbsUp, FaComment } from 'react-icons/fa';
import './Notification.css';
import { apiCall } from "../../../functions/apiCall";

const Notification = ({ data }) => {
    const handleNotificationClick = () => {
        switch (data.notification_type) {
            case 'friend_request':
                console.log(data.from_user.id);
                break;
            case 'post_like':
                console.log(data.post);
                break;
            case 'post_comment':
                console.log(data.post);
                break;
            default:
                break;
        }
    };

    const getNotificationText = () => {
        switch (data.notification_type) {
            case 'friend_request':
                return `User ${data.from_user.username} sent you a friend request.`;
            case 'post_like':
                return `User ${data.from_user.username} liked your post.`;
            case 'post_comment':
                return `User ${data.from_user.username} commented on your post.`;
            default:
                return '';
        }
    };

    const getNotificationIcon = () => {
        switch (data.notification_type) {
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
            await apiCall(`http://localhost:8000/user/notification/${data.from_user.id}/accept`, "PATCH");
        }
        catch (error) {
            console.error('Error :', error);
        }
    };

    return (
        <div className="notification-container" onClick={handleNotificationClick}>
            <div className="notification-icon">{getNotificationIcon()}</div>
            <div className="notification-content">
                <p className="notification-text">{getNotificationText()}</p>
                {data.notification_type === 'friend_request' && (
                    <button className="accept-friend-request-button" onClick={handleAcceptFriendRequest}>
                        Accept
                    </button>
                )}
            </div>
        </div>
    );
};

export default Notification;