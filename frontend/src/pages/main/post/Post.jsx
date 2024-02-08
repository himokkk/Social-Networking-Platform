import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaComment, FaArrowLeft, FaArrowRight, FaTimes, FaExclamationCircle } from 'react-icons/fa';
import './Post.css';
import { getData } from '../../../functions/getData';
import Modal from 'react-modal';
import { getCookie } from "../../../functions/getCookie";
import { apiCall } from '../../../functions/apiCall';
import { useNavigate } from 'react-router-dom';
import { LOGIN_URL } from "../../../urls";
import { refreshAccess } from "../../../functions/refreshAccess";
import { filterResponse } from "../../../functions/filterResponse";


const Post = ({ data, onDelete }) => {
    const [likeHovered, setLikeHovered] = useState(false);
    const [commentHovered, setCommentHovered] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState('');
    const [userId, setUserId] = useState(null);
    const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(false);
    const [likesCount, setLikesCount] = useState();
    const [commentsCount, setCommentsCount] = useState();
    const [showReport, setShowReport] = useState(false);

    const checkIfLoggedIn = async () => {
        let loggedIn = await refreshAccess()
        if (!loggedIn) {
            useNavigate(LOGIN_URL)
        }
    }
    const getUserId = async () => {
        try {
            let response = await apiCall(`http://localhost:8000/user/current/`, "GET");
            const responseResults = await filterResponse(response, ["id"]);

            let userId = responseResults[0];

            setUserId(userId);
        } catch (error) {
            console.error('Error getting user ID:', error);
        }
    };
    const reportPost = async () => {
        setShowReport(false);
        try {
            const postId = data.id;
            await checkIfLoggedIn();
            await apiCall(`http://localhost:8000/posts/${postId}/report`, "POST");

        } catch (error) {
            console.error('Error reporting post:', error);
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getUserId();
                setIsLikedByCurrentUser(data.likes.includes(userId));
                setLikesCount(data.likes_count);
                setCommentsCount(data.comments_count);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [data, userId]);
    const handleLikeClick = async () => {
        await checkIfLoggedIn();

        if (!isLikedByCurrentUser) {
            await apiCall(`http://localhost:8000/posts/${data.id}/like`, "PUT");
            setIsLikedByCurrentUser(true);
            setLikesCount(likesCount + 1);
        }
        else {
            await apiCall(`http://localhost:8000/posts/${data.id}/unlike`, "PUT");
            setIsLikedByCurrentUser(false);
            setLikesCount(likesCount - 1);
        }

    };


    const handleCommentClick = async () => {
        try {
            const postId = data.id;
            const commentsData = await getData(`http://localhost:8000/posts/${postId}/comments`);

            setComments(commentsData);
            setShowComments(!showComments);
        } catch (error) {
            console.error('Error getting comments:', error);
        }
    };
    const closeModal = () => {
        setShowComments(false);
    };

    const handleAddComment = async () => {
        try {
            console.log("komentarze1: ", comments);
            await checkIfLoggedIn();

            const postId = data.id;

            const response = await apiCall(`http://localhost:8000/posts/${postId}/comment/create`, "POST", JSON.stringify({
                content: newCommentText,
            }));

            const responseFiltred = await filterResponse(response, ["id", "content", "timestamp", "username"]);
            setCommentsCount(commentsCount + 1);
            const newComment = {
                id: responseFiltred[0],
                content: responseFiltred[1],
                timestamp: responseFiltred[2],
                username: responseFiltred[3],
            };

            setComments(prevComments => [...prevComments, newComment]);
            setNewCommentText('');

            console.log("komentarze2: ", comments);

        } catch (error) {
            console.error('Błąd podczas dodawania komentarza:', error);
        }
    };


    const handleDeleteComment = async (commentId) => {
        try {
            await checkIfLoggedIn();

            await apiCall(`http://localhost:8000/posts/${data.id}/comments/${commentId}/delete`, "DELETE");

            setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
            setCommentsCount(commentsCount - 1);
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    }

    return (

        <div className="post-container">
            <div style={{ marginLeft: '95%', justifyContent: 'space-between', alignItems: 'center' }}>
                {data.author === userId && (<FaTimes onClick={() => onDelete(data.id)} style={{ cursor: 'pointer' }} />)}
                {data.author !== userId && (
                    <FaExclamationCircle onClick={() => setShowReport(true)} style={{ cursor: 'pointer' }} />)}
            </div>

            <p>Author: {data.author_username}</p>

            <span style={{ fontSize: '20px', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{data.content}</span>
            {data.media && (
                <img
                    src={data.media}
                    alt="Post Media"
                    style={{ width: '100%', maxWidth: '500px' }}
                />
            )}
            <div className="actions">
                <p
                    onMouseEnter={() => setLikeHovered(true)}
                    onMouseLeave={() => setLikeHovered(false)}
                    onClick={handleLikeClick}
                    className={`like ${likeHovered ? 'hovered' : ''}`}
                >
                    {likesCount}
                    {' '}
                    <span style={{ display: 'flex', marginLeft: '10px', }}>
                        {isLikedByCurrentUser ? (
                            <FaThumbsUp style={{ color: 'purple' }} onClick={handleLikeClick} />
                        ) : (
                            <FaThumbsUp onClick={handleLikeClick} />
                        )}
                    </span>
                </p>
                <p
                    onMouseEnter={() => setCommentHovered(true)}
                    onMouseLeave={() => setCommentHovered(false)}
                    onClick={handleCommentClick}
                    className={`comment ${commentHovered ? 'hovered' : ''}`}
                >
                    {commentsCount}
                    <span style={{ display: 'flex', marginLeft: '10px', }}>
                        <FaComment />
                    </span>

                </p>
            </div>
            {showReport && (
                <Modal isOpen={showReport}
                    style={{
                        content: {
                            width: '30%',
                            height: '20%',
                            margin: 'auto',
                            backgroundColor: '#fff',
                            borderRadius: '5px',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',

                        },
                    }}
                    ariaHideApp={false}
                >
                    <h2>Do you want to report that post?</h2>
                    <div>
                        <button onClick={reportPost}
                            style={{
                                width: '20%',
                                marginRight: '30%',
                                marginLeft: '15%',
                            }}>
                            Yes</button>
                        <button onClick={() => setShowReport(false)}
                            style={{
                                width: '20%',
                            }}>No</button>
                    </div>
                </Modal>
            )}
            {showComments && (
                <div className="comments-window">
                    {showComments && (
                        <Modal
                            isOpen={showComments}
                            onRequestClose={closeModal}
                            contentLabel="Comments Modal"
                            style={{
                                content: {
                                    width: '600px',
                                    margin: 'auto',
                                    backgroundColor: '#f0f0f0',
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                },
                            }}
                            ariaHideApp={false}
                        >
                            <div className="modal-header">
                                <div onClick={closeModal}>
                                    <FaArrowLeft style={{ cursor: 'pointer' }} />
                                </div>
                                <h3>Comments</h3>
                                <hr style={{ margin: '10px 0', border: '0.5px solid #ccc' }} />
                            </div>
                            <div className="comments-window">
                                {Array.isArray(comments) && comments.map(comment => (
                                    <div key={comment?.id} className="comment-item">
                                        {comment && comment.username && (
                                            <p>{comment.username}:</p>
                                        )}
                                        {comment && comment.content && (
                                            <p>{comment.content}</p>
                                        )}
                                        {comment && comment.timestamp && (
                                            <p>{comment.timestamp}</p>
                                        )}
                                        {comment && comment.username === getCookie("username") && (
                                            <FaTimes onClick={() => handleDeleteComment(comment.id)} style={{ cursor: 'pointer' }} />
                                        )}
                                        <hr style={{ margin: '10px 0', border: '0.5px solid #ccc' }} />
                                    </div>
                                ))}
                            </div>
                            <div className="comment-input-container">
                                <input
                                    type="text"
                                    value={newCommentText}
                                    onChange={(e) => setNewCommentText(e.target.value)}
                                    placeholder="Your comment"
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                                />

                                <FaArrowRight style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={handleAddComment} />

                            </div>
                        </Modal>
                    )}
                </div>
            )}
        </div>
    )
}
export default Post;