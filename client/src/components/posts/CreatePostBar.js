import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addPost } from "../../actions/post";

import "./CreatePostBar.css";


const CreatePostBar = ({ addPost }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      addPost({ text });
      setText("");
      setOpen(false);
    }
  };

  return (
    <div className="create-post-bar">
      {!open ? (
        <div
          className="create-post-plus"
          onClick={() => setOpen(true)}
        >
          <span>+</span> Create Post
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind?"
            rows="3"
          />
          <div className="post-actions">
            <button type="submit" className="btn btn-primary">
              Post
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

CreatePostBar.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(CreatePostBar);
