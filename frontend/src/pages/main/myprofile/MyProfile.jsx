//Plug code(work in progres)

import React, { useState } from 'react';
import { apiCall } from '../../../functions/apiCall';

const MyProfile = ({ data }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(null);
    const [editedBirth, setEditedBirth] = useState(null);
    const [editedImage, setEditedImage] = useState(null);
    const UserId = data[0];
    const UserDescription = data[1];
    const UserBirth = data[2];
    const UserImageUrl = data[3];
    const UserName = data[4];

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {

            if (editedDescription !== null) {
                await apiCall(`http://localhost:8000/user/update/${UserId}`, 'PATCH', JSON.stringify({ description: editedDescription }));
            }

            if (editedImage !== null) {
                await apiCall(`http://localhost:8000/user/update/${UserId}`, 'PATCH', JSON.stringify({ image: editedImage }));
            }

            if (editedBirth !== null) {
                await apiCall(`http://localhost:8000/user/update/${UserId}`, 'PATCH', JSON.stringify({ birth: editedBirth }));
            }
            setIsEditing(false);
            setEditedDescription(null);
            setEditedImage(null);
            setEditedBirth(null);
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setEditedImage(file);
    };

    return (
        <div className="myprofile-container">
            <h2>{UserName}</h2>
            <p>Description: {UserDescription}</p>
            <p><img src={UserImageUrl} alt="No User Image" /></p>
            <p>Birth: {UserBirth}</p>
            {isEditing ? (
                <>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={editedDescription || ''}
                        onChange={(e) => setEditedDescription(e.target.value)}
                    />
                    <label>Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {editedImage && <img src={editedImage} alt="Selected User Image" />}
                    <label>Birth:</label>
                    <input
                        type="date"
                        value={editedBirth || ''}
                        onChange={(e) => setEditedBirth(e.target.value)}
                    />
                    <button onClick={handleSaveClick}>Save</button>
                </>
            ) : (
                <>
                    <button onClick={handleEditClick}>Edit</button>
                </>
            )}
        </div>
    );
};

export default MyProfile;