import React, {useState} from 'react';
import { FaThumbsUp, FaComment, FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';
import './Post.css';
import { getData } from '../../../functions/getData';
import Modal from 'react-modal';
import { getCookie } from "../../../functions/getCookie";
import { apiCall } from '../../../functions/apiCall';
import { useNavigate } from 'react-router-dom';
import { LOGIN_URL } from "../../../urls";
import { refreshAccess } from "../../../functions/refreshAccess";

const TEMPORARYUSERID = 1;

const Post = ({ data, onDelete }) => {
  const [likeHovered, setLikeHovered] = useState(false);
  const [commentHovered, setCommentHovered] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  
  const checkIfLoggedIn = async () => {
    let loggedIn = await refreshAccess()
    if (!loggedIn) {
        useNavigate(LOGIN_URL)
    }
  }
 

  const handleLikeClick = () => {
    console.log('Like clicked!');
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
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds}`;
  };
  const handleAddComment = async () => {

       {checkIfLoggedIn()}

    try {
      const postId = data.id;


     await apiCall(`http://localhost:8000/posts/${postId}/comment/create`, "POST", JSON.stringify({
        content: newCommentText,
    }),)

    setComments(prevComments => [...prevComments, {
      username:  getCookie("username"),  
      content: newCommentText,
      timestamp:  getCurrentTime(),  
    }]);

      setNewCommentText('');
    } catch (error) {
      console.error('Błąd podczas dodawania komentarza:', error);
    }
  };
  const handleDeleteComment = async(commentId) =>
  {
    {checkIfLoggedIn()}
    
    await apiCall(`http://localhost:8000/posts/comment/${commentId}/delete`, "DELETE");
  }

  return (
   
    <div className="post-container">
          {data.author === TEMPORARYUSERID && <FaTimes onClick={() => onDelete(data.id)} style = {{marginLeft: '95%'}}/>}
      <p>Author: {data.author_username}</p>
  
      <span style={{ fontSize: '20px', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{data.content}</span>
      {data.media && (
        <img
          src={data.media}
          alt="Post Media"
          style={{ width: '100%', maxWidth: '500px'}}
        />
      )}
      <div className="actions">
              <p
          onMouseEnter={() => setLikeHovered(true)}
          onMouseLeave={() => setLikeHovered(false)}
          onClick={handleLikeClick}
          className={`like ${likeHovered ? 'hovered' : ''}`}
        >
          {data.likes.length}
          {' '}
          <span style={{display:'flex', marginLeft: '10px',  }}>

            <FaThumbsUp />
          </span>
        </p>
        <p
          onMouseEnter={() => setCommentHovered(true)}
          onMouseLeave={() => setCommentHovered(false)}
          onClick={handleCommentClick}
          className={`comment ${commentHovered ? 'hovered' : ''}`}
        > 
         {data.comments.length} 
        <span style={{ display:'flex', marginLeft: '10px',  }}>
            <FaComment />
          </span>
        </p>
      </div>
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
   >
     <div className="modal-header">
       <div onClick={closeModal}>
         <FaArrowLeft />
       </div>
       <h3>Comments</h3>
       <hr style={{ margin: '10px 0', border: '0.5px solid #ccc' }} />
     </div>
     <div className="comments-window">
       {Array.isArray(comments) && comments.map(comment => (
         <div key={comment.id} className="comment-item">
           <p>{comment.username}:</p>
           <p>{comment.content}</p>
           <p>{comment.timestamp}</p>
           {comment.username === getCookie("username") && <FaTimes onClick={() => handleDeleteComment(comment.id)} />}
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
    
      <FaArrowRight style = {{marginLeft: '15px'}} onClick={handleAddComment}/>
   
  </div>
   </Modal>
 )}
</div>
)}
    </div>
  )
}
export default Post;