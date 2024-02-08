import React, { useState } from 'react';
import './Profile.css';
import { FaUser } from 'react-icons/fa';
import { apiCall } from "../../../functions/apiCall";
import { filterResponse } from "../../../functions/filterResponse";

const Profile = ({ data }) => {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [friendStatus, setFriendStatus] = useState(false);

    const fetchData = async () => {
        try {
            const response = await apiCall(`http://localhost:8000/user/current/`, "GET");
            const responseResults = await filterResponse(response, ["friends"]);
            const flatResponseResults = responseResults.flat();
            const idList = flatResponseResults.map(user => user.id);
            const hasId = idList.includes(data.id);
            setFriendStatus(hasId);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    fetchData();

    const handleAddFriend = async () => {
        try {
            await apiCall(`http://localhost:8000/user/add/${data.id}`, "PUT");
            } 
        catch (error) {
            console.error('Error :', error);
        }
    };

    const handleConfirmRemoveFriend = async () => {
            try {
                await apiCall(`http://localhost:8000/user/remove/${data.id}`, "PATCH");
                setFriendStatus(false);
            }
            catch (error) {
                console.error('Error :', error);
            }
        setShowConfirmationModal(false);
    };

    return (
        <div className="profile-container">
            <div className="profile-info">
                <div className="profile-image">
                    {data.image_url ? (
                        <img src={data.image_url} alt="User Avatar" />
                    ) : (
                            <FaUser className="profile-default-avatar" />
                    )}
                </div>
                <div className="profile-details">
                    <h2 className="profile-username">{data.username}</h2>
                    <p>Date of Birth: {data.birth}</p>
                    {friendStatus ? (
                        <div className="profile-friend-button" onClick={() => setShowConfirmationModal(true)}>Friend</div>
                    ) : (
                        <button className="profile-button" onClick={handleAddFriend}>Add Friend</button>
                    )}
                </div>
            </div>
            <div>
                <p className="profile-description">About me: {data.description}</p>
            </div>

            {showConfirmationModal && (
                <div className="confirmation-modal">
                    <div className="modal-content">
                        <p>Are you sure you want to remove this user from your friends?</p>
                        <div className="modal-buttons">
                            <button className="profile-button" onClick={handleConfirmRemoveFriend}>Yes</button>
                            <button className="profile-button" onClick={() => setShowConfirmationModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;