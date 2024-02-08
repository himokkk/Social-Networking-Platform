import React, { useEffect, useState, useRef } from 'react';
import { FaUsers, FaArrowLeft, FaBell, FaHome, FaPlus, FaUser, FaUserTimes,FaSearch } from 'react-icons/fa';
import Modal from 'react-modal';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../../functions/apiCall';
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
    const [profileResults, setProfileResults] = useState([]);
    const [userFinderResults, setUserFinderResults] = useState(null);
    const [showCreatePostModal, setShowCreatePostModal] = useState(false);
    const [error, setError] = useState(null);
    const productForm = useRef(null);

   

    const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    };

    const goToProfile = (results) => {
        setUserFinderResults(results);
        setSelectedCategory("profile");
    };

    const createPostForm = async (e) => {
        { checkIfLoggedIn }
        e.preventDefault();
        if (productForm.current) {
            let data = new FormData(productForm.current);
            try {
                await apiCall(`http://localhost:8000/posts/create`, "POST", data, false);
                    setShowCreatePostModal(false);
                getData("http://localhost:8000/posts/explore")
                    .then((data) => {
                        renderPosts(data.results);
                        setPostResults(data.results);
                    })
            } catch (error) {
                console.log("dddd");
                setError(error.message);
            }
        }
    };

    const handleDeletePost = async (postId) => {
        { checkIfLoggedIn }
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
        if (selectedCategory === 'friendsPosts') {
            getData("http://localhost:8000/posts/following",true)
                .then((data) => {
                    console.log(data);
                    renderPosts(data.results);
                    setPostResults(data.results);
                })
                .catch((error) => {
                    console.error("Error getting data:", error);
                });
        }
        if (selectedCategory === 'notifications') {
            const fetchData = async () => {
                try {
                    const response = await apiCall(`http://localhost:8000/user/notification/list`, "GET");
                    const responseResults = await response.json();
                    renderNotifications(responseResults);
                    setNotificationResults(responseResults);
                } catch (error) {
                    console.error("Error getting notifications:", error);
                }
            }
            fetchData();
        }
        if (selectedCategory === 'my_profile') {
            const fetchData = async () => {
                try {
                    renderMyProfile();
                } catch (error) {
                    console.error("Error:", error);
                }
            };

            fetchData();
        }
        if (selectedCategory === 'user_finder') {
            getData("http://localhost:8000/user/search/")
                .then((data) => {
                    renderUserFinder(data);
                })
                .catch((error) => {
                    console.error("Error getting data:", error);
                });
        }
        if (selectedCategory === 'profile') {
        getData(`http://localhost:8000/user/${userFinderResults}`)
            .then((data) => {
                renderProfile(data);
                setProfileResults(data);
            })
            .catch((error) => {
                console.error("Error getting data:", error);
            });
        }
        if (selectedCategory === 'logout') {
            deleteAllCookies();
            navigate(LOGIN_URL);
        }
    }, [selectedCategory]);



    const renderPosts = (postResults) => {
        return (
            <>
                {postResults.map(post => (
                    <div key={post.id}>
                        <Post data={post} onDelete={handleDeletePost} />
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
                        <Notification data={notification} onNotificationResultsUser={goToProfile} />
                    </div>
                ))}
            </>
        );
    };

    const renderMyProfile = ( ) => {
        return (
            <MyProfile onMyProfileResults={goToProfile} />
        );
    };

    const renderProfile = (profileResults) => {
        return (
            <Profile data={profileResults} />
        );
    };

    const renderUserFinder = () => {
        return (
            <UserFinder onUserFinderResults={goToProfile} />
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
                <div className="main-lable">
                    <h3>Ziomki.online</h3>
                </div>
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
                        <FaHome size={32} /> Public Posts
                    </p>
                </div>
                <div onClick={() => handleCategoryClick('friendsPosts')}
                    className='selectionDiv'>
                    <p style={{ fontSize: '24px' }}>
                        <FaUsers size={32} /> Friend&apos;s Posts
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
                        <FaSearch size={32} /> User Finder
                    </p>
                </div>
                <div onClick={() => handleCategoryClick('logout')}
                    className='selectionDiv'>
                    <p style={{ fontSize: '24px' }}>
                        <FaUserTimes size={32} /> Logout
                    </p>
                </div>
            </div>
      
            <div className="content" onWheel={(e) => e.stopPropagation()}>
                {selectedCategory === 'user_finder' && renderUserFinder()}
                {selectedCategory === 'my_profile' && (renderMyProfile())}
                <PerfectScrollbar>
                    {selectedCategory === 'profile'  && (renderProfile(profileResults))}
                    {selectedCategory === 'notifications' && (renderNotifications([]) ? renderNotifications(notificationResults) : <p>No notifications available.</p>)}
                    {(selectedCategory === 'posts' || selectedCategory === 'friendsPosts') && (renderPosts([]) ? renderPosts(postResults) : <p>No posts available.</p>)}
                </PerfectScrollbar>
           </div>
            <div style={{ textAlign: 'left' }}>
                <div onClick={() => setShowCreatePostModal(prevState => !prevState)}
                    style={{
                        display: 'inline-block',
                        background: 'rgba(255, 255, 255, 0.25)',
                        position: 'relative',
                        padding: '10px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                    }}>
                    <div
                        style={{
                            marginLeft: '40px',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'rgba(155, 0, 80, 0.35)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: '1',
                        }}
                    >
                        <FaPlus style={{ fontSize: '24px', color: 'white' }} />
                    </div>
                    <div style={{ marginTop: '10px', fontSize: '20px', fontWeight: 'bold' }}>Create post</div>
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
            {showCreatePostModal &&
                <Modal
                    isOpen={showCreatePostModal}
                    onRequestClose={() => setShowCreatePostModal(false)}
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
                        <div onClick={() => setShowCreatePostModal(false)} >
                            <FaArrowLeft style={{ cursor: 'pointer' }} />
                        </div>
                        <h3>Create Post</h3>
                        <hr style={{ margin: '10px 0', border: '0.5px solid #ccc' }} />
                    </div>
                    <form ref={productForm} onSubmit={createPostForm} style={{

                        textAlign: 'center',
                        height: '80%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <textarea name="content" placeholder="content" style={{
                            width: '100%',
                            minHeight: '130px',
                            borderRadius: '10px',
                            marginBottom: '10px',
                        }}
                            maxLength={500}
                            required 
                        />
                        <select name="privacy" id="privacy" style={{
                            padding: '8px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            marginBottom: '10px',
                        }}>
                            <option value="1">Public</option>
                            <option value="2">Friends</option>
                        </select>
                        <input type="file" name="media" accept=".png, .jpg" style={{
                            border: 'none',
                            padding: '5px',
                            backgroundColor: '#f0f0f0',
                            width: '100%',
                            cursor: 'pointer',
                            marginBottom: '10px',
                        }} />

                        <button type="submit" style={{
                            width: '40%',
                            borderRadius: '20px',
                            backgroundColor: 'purple',
                            color: '#fff',
                            padding: '10px 0',
                            marginTop: '10px',
                            marginLeft: '30%',
                            cursor: 'pointer',
                        }}>
                            Add Post
                        </button>
                    </form>


                </Modal>}

        </>
    );
}

export default Main;