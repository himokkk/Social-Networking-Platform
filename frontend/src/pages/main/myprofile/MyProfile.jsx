import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { FaUser, FaArrowLeft } from 'react-icons/fa';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { apiCall } from '../../../functions/apiCall';
import { filterResponse } from "../../../functions/filterResponse";
import './MyProfile.css';

const MyProfile = ({ onMyProfileResults }) => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDescription, setShowDescription] = useState(true);
    const [showChangeDataModal, setShowChangeDataModal] = useState(false);
    const [error, setError] = useState(null);
    const productForm = useRef(null);
    const [removeImage, setRemoveImage] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiCall(`http://localhost:8000/user/current/`, "GET");
                const responseResults = await filterResponse(response, ["id", "description", "birth", "image_url", "username", "friends"]);
                setUserData(responseResults);
                setLoading(false);
            } catch (error) {
                console.error("Error:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleFriendButtonClick = () => {
        if (!loading) {
            setShowDescription(false);
        }
    };

    const handleDescriptionButtonClick = () => {
        setShowDescription(true);
    };

    const handleUserClick = (id) => {
        onMyProfileResults(id);
    }

    const handleShowChangeDataButtonClick = () => {
        setShowChangeDataModal(true);
    };

    const changeDataForm = async (e) => {
        e.preventDefault();
        if (productForm.current) {
            let data = new FormData(productForm.current);

            if (removeImage) {
                data.set('remove_image', true);
                const emptyImageBlob = new Blob([''], { type: 'image/jpeg' });
                data.append('image', emptyImageBlob, '');
            } else {
                const imageFile = data.get('image');
                if (imageFile.size === 0) {
                    data.delete('image');
                }
            }

            if (!data.get('birth')) {
                data.delete('birth');
            }

            try {
                await apiCall(`http://localhost:8000/user/update/${userData[0]}`, "PATCH", data, false);
                setShowChangeDataModal(false);
                const response = await apiCall(`http://localhost:8000/user/current/`, "GET");
                const responseResults = await filterResponse(response, ["id", "description", "birth", "image_url", "username", "friends"]);
                setUserData(responseResults);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(error.message);
            }
        }
    };

    return (
        <>
            <div className="my-profile-container">
                <div className="my-profile-info">
                    <div className="my-profile-image">
                        {userData[3] ? (
                            <img src={userData[3]} alt="User Avatar" />
                        ) : (
                            <FaUser className="my-profile-default-avatar" />
                        )}
                    </div>
                    <div className="my-profile-details">
                        <h2 className="my-profile-username">{userData[4]}</h2>
                        <p>Date of Birth: {userData[2]}</p>
                        <div className="my-profile-buttons-container">
                            <div className="my-profile-button-packer">
                                <div className="my-profile-button" onClick={handleShowChangeDataButtonClick}>Change Data</div>
                            </div>
                            <div className="my-profile-button-packer">
                                <div className="my-profile-button" onClick={showDescription ? handleFriendButtonClick : handleDescriptionButtonClick}>
                                    {loading ? (
                                        <span>Loading...</span>
                                    ) : (
                                        <>
                                            {showDescription ? (
                                                <>You have {userData[5] ? userData[5].length : 0} {userData[5] && userData[5].length === 1 ? 'friend' : 'friends'}</>
                                            ) : (
                                                <>Description</>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {(!showDescription) ? (
                        <div>
                            <h2>Friends</h2>
                            <PerfectScrollbar>
                                <div className="my-profile-users-container">
                                    {userData[5].map((user) => (
                                        <div key={user.id} className="my-profile-user-item" onClick={() => handleUserClick(user.id)}>
                                            {user.image_url ? (
                                                <img
                                                    src={user.image_url}
                                                    alt={`image`}
                                                    className="my-profile-user-avatar"
                                                />
                                            ) : (
                                                <FaUser className="my-profile-friend-default-avatar" />
                                            )}
                                            <p className="my-profile-username">{user.username}</p>
                                        </div>
                                    ))}
                                </div>
                            </PerfectScrollbar>
                        </div>
                    ) : (
                        <>
                            <PerfectScrollbar>
                                <p className="my-profile-description">About me: {userData[1]}</p>
                            </PerfectScrollbar>
                        </>
                    )}
                </div>
            </div>
            <Modal
                isOpen={error !== null}
                onRequestClose={() => setError(null)}
                ariaHideApp={false}
            >
                <div>
                    <h2>Error!</h2>
                    <p>{error}</p>
                    <button onClick={() => setError(null)}>Close</button>
                </div>
            </Modal>
            {showChangeDataModal &&
                <Modal
                    isOpen={showChangeDataModal}
                    onRequestClose={() => setShowChangeDataModal(false)}
                    style={{
                        content: {
                            width: '500px',
                            margin: 'auto',
                            height: '400px',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '10px',
                            overflow: 'hidden',
                        },
                    }}
                    ariaHideApp={false}
                >
                    <div className="modal-header">
                        <div onClick={() => setShowChangeDataModal(false)} >
                            <FaArrowLeft style={{ cursor: 'pointer' }} />
                        </div>
                    </div>
                    <form ref={productForm} onSubmit={changeDataForm} style={{
                        textAlign: 'center',
                        height: '95%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <textarea name="description" placeholder="About me..." style={{
                            width: '100%',
                            minHeight: '130px',
                            borderRadius: '10px',
                            marginBottom: '10px',
                        }}
                            maxLength={500}
                            required
                            defaultValue={userData[1]}
                        />
                        <input type="date" name="birth" id="birth" style={{
                            padding: '8px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            marginBottom: '10px',
                            width: '100%',
                            boxSizing: 'border-box',
                        }} />
                        {!(removeImage) ? (
                            <div>
                                <label htmlFor="image">Change profile picture</label>
                                <input type="file" name="image" required={false} accept=".png, .jpg" style={{
                                    border: '5px',
                                    padding: '5px',
                                    backgroundColor: '#f0f0f0',
                                    width: '100%',
                                    cursor: 'pointer',
                                }} />
                            </div>
                        ) : (<></>)}
                        <div>
                            <input
                                type="checkbox"
                                id="removeImage"
                                name="removeImage"
                                checked={removeImage}
                                onChange={(e) => setRemoveImage(e.target.checked)}
                            />
                            <label htmlFor="removeImage">Remove current image</label>
                        </div>
                        <button type="submit" style={{
                            width: '40%',
                            borderRadius: '20px',
                            backgroundColor: 'purple',
                            color: '#fff',
                            padding: '10px 0',
                            marginLeft: '30%',
                            cursor: 'pointer',
                        }}>
                            Change user data
                        </button>
                    </form>
                </Modal>
            }
        </>
    );
};

export default MyProfile;