//in progress

import React, { useState } from 'react';
import { apiCall } from '../../../functions/apiCall';
import {FaUser} from 'react-icons/fa';

const MyProfile = ({ data }) => {
    const UserId = data[0];
    const UserDescription = data[1];
    const UserBirth = data[2];
    const UserImageUrl = data[3];
    const UserName = data[4];
    const UserFriends = data[5];
    console.log(UserFriends);

    return (
        <div className="profile-container">
            <div className="profile-info">
                <div className="profile-image">
                    {UserImageUrl ? (
                        <img src={UserImageUrl} alt="User Avatar" />
                    ) : (
                        <FaUser className="profile-default-avatar" />
                    )}
                </div>
                <div className="profile-details">
                    <h2 className="profile-username">{UserName}</h2>
                    <p>Date of Birth: {UserBirth}</p>
                    {/*<div className="profile-friend-button" onClick={() => setShowModal(true)}>*/}
                    {/*    You have {UserFriends.length} {UserFriends.length === 1 ? 'friend' : 'friends'}*/}
                    {/*</div>*/}
                </div>
            </div>
            <div>
                <p className="profile-description">About me: {UserDescription}</p>
            </div>
        </div>
    );
};

export default MyProfile;