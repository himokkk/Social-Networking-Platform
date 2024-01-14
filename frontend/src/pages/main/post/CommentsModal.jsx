import React from 'react';
import Modal from 'react-modal';
import { FaArrowLeft } from 'react-icons/fa';

const CommentsModal = ({ isOpen, onRequestClose, comments }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
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
        <button className="close-button" onClick={onRequestClose}>
          <FaArrowLeft />
        </button>
        <h3>Comments</h3>
      </div>
      <div className="comments-window">
        {comments && comments.map(comment => (
          <div key={comment.id} className="comment-item">
            <p>{comment.username}:</p>
            <p>{comment.content}</p>
            <p>{comment.timestamp}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default CommentsModal;
