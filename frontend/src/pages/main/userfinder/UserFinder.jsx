import React, { useState } from 'react';
import { apiCall } from '../../../functions/apiCall';
import './UserFinder.css';
import { FaUser } from 'react-icons/fa';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

const UserFinder = ({ onUserFinderResults }) => {
    const [username, setUsername] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);


    const handleKeyUp = async (event) => {
        if (event.key === 'Enter' ) {
            try {
                const responseCurrent = await apiCall(`http://localhost:8000/user/current/`, 'GET');
                const response = await apiCall(`http://localhost:8000/user/search/?username=${username}`, 'GET');
                const responceJSON = await response.json();
                const responseCurrentJSON = await responseCurrent.json();
                setSearchResults(responceJSON);
                setSearchResults(responceJSON.filter(user => user.id !== responseCurrentJSON.id));
            } catch (error) {
                setError('Error searching for users. Please try again later.');
                console.error('Error searching for users:', error);
            }
        }
    };

    const handleSearchChange = (event) => {
        setUsername(event.target.value);
    };

    const handleUserClick = (userId) => {
        onUserFinderResults(userId);
    };

    return (
        <>
            <div className="finder-search-input-container">
                <input
                    type="text"
                    value={username}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyUp}
                    placeholder="Type username and press Enter..."
                    className="finder-search-input"
                />
            </div>
            {error && <div className="error-message">{error}</div>}
            <PerfectScrollbar>
                <div className="finder-users-container">
                    {searchResults.map((user) => (
                        <div key={user.id} className="finder-user-item" onClick={() => handleUserClick(user.id)}>
                            {user.image_url ? (
                                <img
                                    src={user.image_url}
                                    alt={`image`}
                                    className="finder-user-avatar"
                                />
                            ) : (
                                <FaUser className="finder-default-avatar" />
                            )}
                            <p className="finder-username">{user.username}</p>
                        </div>
                    ))}
                </div>
            </PerfectScrollbar>
        </>
    );
};

export default UserFinder;