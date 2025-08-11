import React, {Fragment} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, date },
  showActions,
}) => (
  <div className="post bg-white my-1 p-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img" src={avatar} alt={`${name}'s Avatar`} />
        <h4>{name}</h4>
      </Link>
      <small className="text-muted">
        Posted{" "}
        <Moment fromNow ago>
          {date}
        </Moment>{" "}
        ago
      </small>
    </div>

    <div>
      <p className="my-1">{text}</p>

      <div
        style={{
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {showActions && (
          <Fragment>
            <button onClick={(e) => addLike(_id)} className="btn">
              <i className="fas fa-thumbs-up"></i>{" "}
              <span>{likes?.length ?? 0}</span>
            </button>

            <button onClick={(e) => removeLike(_id)} className="btn">
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-dark">
              Discussion
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={(e) => deletePost(_id)}
                className="btn btn-danger"
                style={{ fontSize: "0.8rem", padding: "3px 7px" }}
              >
                Delete
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deletePost,
})(PostItem);
