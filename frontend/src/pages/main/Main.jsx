import React, { useEffect, useState } from 'react';
import { FaUsers, FaArrowLeft, FaBell, FaHome, FaPlus, FaUser, FaUserTimes } from 'react-icons/fa';
import Modal from 'react-modal';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../../functions/apiCall';
import { filterResponse } from "../../functions/filterResponse";
import { getData } from "../../functions/getData";
import { refreshAccess } from "../../functions/refreshAccess";
import { LOGIN_URL } from "../../urls";
import './Main.css';
import MyProfile from './myprofile/MyProfile';
import Notification from './notification/Notification';
import Post from './post/Post';
import UserFinder from './userfinder/UserFinder';
import Profile from './profile/Profile';
import { deleteAllCookies } from "../../functions/deleteAllCookies";


function Main() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('posts');
    const [postResults, setPostResults] = useState([]);
    const [notificationResults, setNotificationResults] = useState([]);
    const [myProfileResults, setMyProfileResults] = useState([]);
    const [profileResults, setProfileResults] = useState([]);
    const [userFinderResults, setUserFinderResults] = useState(null);
    const [showCreatePostModal, setShowCreatePostModal] = useState(false);


    const handleUserFinderResults = (results) => {
        setUserFinderResults(results);
        setSelectedCategory("profile");
    };

    const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    };

    const handleDeletePost  =  async (postId) =>
    {
    {checkIfLoggedIn}
    await apiCall(`http://localhost:8000/posts/${postId}/delete`, "DELETE");
    setPostResults(prevPostResults => prevPostResults.filter(post => post.id !== postId));
    }

    useEffect(() => {
        if (selectedCategory === 'posts') {
            getData("http://localhost:8000/posts/explore")
                .then((data) => {
                    renderPosts(data.results);
                    setPostResults(data.results);
                })
                .catch((error) => {
                    console.error("Error getting data:", error);
                });
        }
        else if (selectedCategory === 'notifications') {
            const fetchData = async () => {
                try {
                    const response = await apiCall(`http://localhost:8000/user/notification/list`, "GET");
                    const responseResults = await response.json();
                    renderNotifications(responseResults);
                    console.log(responseResults);
                    setNotificationResults(responseResults);
                } catch (error) {
                    console.error("Error getting notifications:", error);
                }
            }
            fetchData();
        }
        else if (selectedCategory === 'my_profile') {
            const fetchData = async () => {
                try {

                    const response = await apiCall(`http://localhost:8000/user/current/`, "GET");
                    const responseResults = await filterResponse(response, ["id", "description", "birth", "image_url", "username", "friends"]);
                    console.log(responseResults);
                    renderMyProfile(responseResults);
                    setMyProfileResults(responseResults);
                } catch (error) {
                    console.error("Error:", error);
                }
            };

            fetchData();
        }
        else if (selectedCategory === 'user_finder') {
            getData("http://localhost:8000/user/search/")
                .then((data) => {
                    renderUserFinder(data);
                })
                .catch((error) => {
                    console.error("Error getting data:", error);
                });
        }
        else if (selectedCategory === 'profile') {
        getData(`http://localhost:8000/user/${userFinderResults}`)
            .then((data) => {
                renderProfile(data);
                setProfileResults(data);
            })
            .catch((error) => {
                console.error("Error getting data:", error);
            });
        }
    else if (selectedCategory === 'logout') {
        deleteAllCookies();
        navigate(LOGIN_URL);
    }
    }, [selectedCategory]);



    const renderPosts = (postResults) => {
    return (
        <>
        {postResults.map(post => (
            <div key={post.id}>
            <Post data={post} onDelete={handleDeletePost}/>
          </div>
        ))}
        </>
    );
    };

    const renderNotifications = (notificationResults) => {
        return (
            <>
                {notificationResults.map((notification) => (
                    <div key={notification.id} className="notification-item">
                        <Notification data={notification} />
                    </div>
                ))}
            </>
        );
    };

    const renderMyProfile = (myProfileResults ) => {
        return (
            <MyProfile data={myProfileResults} />
        );
    };

    const renderProfile = (profileResults) => {
        return (
            <Profile data={profileResults} />
        );
    };

    const renderUserFinder = () => {
        return (
            <UserFinder onUserFinderResults={handleUserFinderResults} />
        );
    };

    const checkIfLoggedIn = async () => {
        let loggedIn = await refreshAccess()
        if (!loggedIn) {
            navigate(LOGIN_URL)
        }
    }

    useEffect(() => {
      checkIfLoggedIn()
    }, []);

    return (
        <>
            <div className={'upBar'}>
            </div>
            <div className={'leftBar'}>
                <div onClick={() => handleCategoryClick('my_profile')}
                    className='selectionDiv'>
                    <p style={{ fontSize: '24px' }}>
                        <FaUser size={32} /> My Profile
                    </p>
                </div>
                <div onClick={() => handleCategoryClick('posts')}
                    className='selectionDiv'>
                    <p style={{ fontSize: '24px' }}>
                        <FaHome size={32} /> Posts
                    </p>
                </div>
                <div onClick={() => handleCategoryClick('notifications')}
                    className='selectionDiv'>
                    <p style={{ fontSize: '24px' }}>
                        <FaBell size={32} /> Notifications
                    </p>
                </div>
                <div onClick={() => handleCategoryClick('user_finder')}
                    className='selectionDiv'>
                    <p style={{ fontSize: '24px' }}>
                        <FaUsers size={32} /> User Finder
                    </p>
                </div>
                <div onClick={() => handleCategoryClick('logout')}
                    className='selectionDiv'>
                    <p style={{ fontSize: '24px' }}>
                        <FaUserTimes size={32} /> Logout
                    </p>
                </div>
            </div>
      
            <div className="content">
                {selectedCategory === 'user_finder' && renderUserFinder()}
                <PerfectScrollbar>
                    {selectedCategory === 'my_profile' && (renderMyProfile(myProfileResults))}
                    {selectedCategory === 'profile' && (renderProfile(profileResults))}
                    {selectedCategory === 'notifications' && (renderNotifications([]) ? renderNotifications(notificationResults) : <p>No notifications available.</p>)}
                    {selectedCategory === 'posts' && (renderPosts([]) ? renderPosts(postResults) : <p>No posts available.</p>)}
                </PerfectScrollbar>
            </div>
            <FaPlus onClick={() => setShowCreatePostModal(prevState => !prevState)} />
            {showCreatePostModal &&
                <Modal
                    isOpen={showCreatePostModal}
                    onRequestClose={() => setShowCreatePostModal(false)}
                    style={{
                        content: {
                            width: '500px',
                            margin: 'auto',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '10px',
                            overflow: 'hidden',
                        },
                    }}>
                    <div className="modal-header">
                        <div onClick={() => setShowCreatePostModal(false)}>
                            <FaArrowLeft />
                        </div>
                        <h3>Create Post</h3>
                        <hr style={{ margin: '10px 0', border: '0.5px solid #ccc' }} />
                    </div>
                    <input type="file" accept="image/*" title="Choose file" />
                </Modal>} 
        </>
    );
}

    export default Main;
