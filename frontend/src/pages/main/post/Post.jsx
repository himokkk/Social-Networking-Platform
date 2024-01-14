import React, {useState} from 'react';
import { FaThumbsUp, FaComment, FaArrowLeft } from 'react-icons/fa';
import './Post.css';
import { getData } from '../../../functions/getData';
import Modal from 'react-modal';



const Post = ({ data }) => {
  const [likeHovered, setLikeHovered] = useState(false);
  const [commentHovered, setCommentHovered] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  

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

  return (
   
    <div className="post-container">
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
       {comments && comments.map(comment => (
         <div key={comment.id} className="comment-item">
           <p>{comment.username}:</p>
           <p>{comment.content}</p>
           <p>{comment.timestamp}</p>
           <hr style={{ margin: '10px 0', border: '0.5px solid #ccc' }} />
         </div>
       ))}
     </div>
   </Modal>
 )}
</div>
)}
    </div>
  )
}
export default Post