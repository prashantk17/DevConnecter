import React, { Fragment, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { getPost } from "../../actions/post";

const Post = ({ getPost, post: { post, loading, error } }) => {
  const { id } = useParams();

  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  if (loading || !post) return <Spinner />;

  return (
    <Fragment>
      <Link to="/posts" className="btn">Back to Posts</Link>

      {/* Main post */}
      <PostItem post={post} showActions={false} />

      {/* Add Comment */}
      <CommentForm postId={post._id} />

      {/* Comments list */}
      <div className="comments">
        {(Array.isArray(post.comments) ? post.comments : []).map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.shape({
    post: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
