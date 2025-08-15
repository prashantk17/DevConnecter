import React, { Fragment, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

import "./Navbar.css";

const Navbar = ({
  auth: { isAuthenticated, loading, user },
  logout,
  theme,
  toggleTheme,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/profiles?search=${search.trim()}`);
      setSearch("");
    }
  };

  const authLinks = (
    <ul className="navbar-right">
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li className="profile-dropdown">
        <img
          src={user && user.avatar ? user.avatar : "/default-avatar.png"}
          alt={user && user.name}
          className="profile-img"
        />
        <div className="dropdown-content">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/edit-profile">Edit Profile</Link>
          <a onClick={logout} href="#!">
            Logout
          </a>
        </div>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-right">
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li className="theme-toggle">
        <button onClick={toggleTheme} title="Toggle light/dark mode">
          {theme === "light" ? (
            <i className="fas fa-moon"></i>
          ) : (
            <i className="fas fa-sun"></i>
          )}
        </button>
      </li>
    </ul>
  );

  return (
    <nav className="navbar">
      <Link to={isAuthenticated ? "/dashboard" : "/"} className="logo">
        <i className="fas fa-code" /> DevConnector
      </Link>

      <form className="navbar-search" onSubmit={onSearchSubmit}>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">
          <i className="fas fa-search"></i>
        </button>
      </form>

      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
