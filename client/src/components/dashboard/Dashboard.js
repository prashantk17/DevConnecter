import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Experience from "./Experience";
import Education from "./Education";
import Alert from "../layout/Alert";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Alert />
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead" style={{ fontWeight: 600 }}>
        <i className="fas fa-user" /> Welcome, {user && user.name}
      </p>

      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus"></i> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You don't have a profile yet, please create one to get started.</p>
          <Link
            to="/create-profile"
            className="btn btn-dark"
            style={{ fontWeight: "bold", marginTop: "0.5rem" }}
          >
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
  // (
  //   // <div style={{ padding: '40px', margin: '34px', marginLeft: '-13px' }}>
  //   //   <h1>Dashboard</h1>
  //   //   {/* more content */}
  //   // </div>
  // );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
