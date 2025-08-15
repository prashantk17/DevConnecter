import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import {
  addComment,
  addLike,
  removeLike,
  deletePost,
  deleteComment,
} from "../../actions/post";
import "./PostItem.css";

const PostItem = ({
  post,
  auth,
  addLike,
  removeLike,
  addComment,
  deletePost,
  deleteComment,
}) => {
  const [commentText, setCommentText] = useState("");
  const [postComments, setPostComments] = useState(post.comments || []);
  const [showAllComments, setShowAllComments] = useState(false);

  const handleLike = () => addLike(post._id);
  const handleUnlike = () => removeLike(post._id);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const tempComment = {
      _id: Date.now().toString(),
      text: commentText,
      name: auth.user.name,
      avatar: auth.user.avatar,
      user: auth.user._id,
      date: new Date().toISOString(),
    };

    // Optimistic update
    setPostComments([tempComment, ...postComments]);
    setCommentText("");

    try {
      await addComment(post._id, { text: tempComment.text });
    } catch (err) {
      console.error(err.response ? err.response.statusText : err.message);
      // Revert UI if failed
      setPostComments(postComments);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    // Optimistic removal
    const updatedComments = postComments.filter((c) => c._id !== commentId);
    setPostComments(updatedComments);

    try {
      await deleteComment(post._id, commentId);
    } catch (err) {
      console.error(err.response ? err.response.statusText : err.message);
      setPostComments(postComments); // revert if failed
    }
  };

  const handleDeletePost = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(post._id);
    }
  };

  return (
    <div className="post-card">
      {/* Header */}
      <div className="post-header">
        <div className="post-user-left">
          <img src={post.avatar} alt={post.name} className="post-avatar" />
          <Link to={`/profile/${post.user}`} className="post-username">
            {post.name}
          </Link>
        </div>
        <div className="post-date">
          <Moment fromNow>{post.date}</Moment>
        </div>
        {auth.isAuthenticated && auth.user._id === post.user && (
          <button
            className="delete-post-btn"
            onClick={handleDeletePost}
            title="Delete Post"
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="post-content">{post.text}</div>

      {/* Actions */}
      <div className="post-actions">
        <button
          onClick={handleLike}
          className={`like-btn ${
            post.likes.some((like) => like.user === auth.user._id) ? "liked" : ""
          }`}
          title="Like"
        >
          <i className="fas fa-heart"></i>
          <span className="like-count">{post.likes.length}</span>
        </button>

        <span className="comments-count">{postComments.length} Comments</span>
      </div>

      {/* Comments Section */}
      <div className="comments-section">
        {postComments
          .slice(0, showAllComments ? postComments.length : 1)
          .map((comment) => (
            <div className="comment" key={comment._id}>
              <img
                src={comment.avatar}
                alt={comment.name}
                className="comment-avatar"
              />
              <div className="comment-body">
                <div className="comment-header">
                  <span className="comment-username">{comment.name}</span>
                  <span className="comment-date">
                    <Moment fromNow>{comment.date}</Moment>
                  </span>
                  {auth.isAuthenticated && auth.user._id === comment.user && (
                    <button
                      className="comment-delete"
                      onClick={() => handleDeleteComment(comment._id)}
                      title="Delete comment"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  )}
                </div>
                <div className="comment-text">{comment.text}</div>
              </div>
            </div>
          ))}

        {postComments.length > 1 && !showAllComments && (
          <button
            className="show-more-comments"
            onClick={() => setShowAllComments(true)}
          >
            View {postComments.length - 1} more replies
          </button>
        )}
      </div>

      {/* New Comment Bar */}
      {auth.isAuthenticated && (
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="comment-input"
          />
          <button type="submit" className="comment-submit">
            Post
          </button>
        </form>
      )}
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  addComment,
  deletePost,
  deleteComment,
})(PostItem);
