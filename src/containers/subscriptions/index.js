import React from "react";
import LogoImg from "../../images/Logo.svg";
import { useHistory } from "react-router-dom";
import UserIcon from "../../images/user-icon.svg";
import { getEasyAssignUser, removeEasyAssignUser } from "utils/utilities";
import { connect } from "react-redux";
import { logoutAction } from "redux/actions/loginSignup";
import { bindActionCreators } from "redux";
import { emptyStateAfterLogout } from "redux/actions/problems";
const Subscriptions = ({ user }) => {
  const history = useHistory();
  const logoutHandler = () => {
    removeEasyAssignUser();
    logoutAction();
    emptyStateAfterLogout();
    history.push("/");
  };

  return (
    <div className="container ">
      <div className="row">
        <div className="col-12">
          <div className="top_logo">
            <img src={LogoImg} alt="logo" />
          </div>
        </div>
        <div className="problem_heading">
          <h3>Problems at your fingertips - SAT/ACT</h3>
        </div>
        <div className="top_buttons">
          <div className="logout">
            <button
              className="create_prob"
              onClick={() => {
                history.goBack();
              }}
            >
              Go Back{" "}
            </button>
          </div>
          <div className="logout">
            <button className="logout_btn" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        </div>
        <div className="user_email_sub">
          <span> {user.email}</span>
          <button className="user_icon_sub">
            <img src={UserIcon} alt="user-icon" />
          </button>
        </div>
        <div className="row">
          <div className="col">
            <div className="subscription active_subs">
              <h3>Free</h3>
              <ul>
                <li>
                  unlimited access to over 1200 official CollageBoard SAT and
                  ACT problems
                </li>
              </ul>
              <h1>$0/Month</h1>
            </div>
          </div>
          <div className="col">
            <div className="subscription ">
              <h3>Single User</h3>
              <ul>
                <li>
                  unlimited access to over 1200 official CollageBoard SAT and
                  ACT problems
                </li>
                <li>
                  unlimited access to Easy Assign additional 1500 SAT and ACT
                  problems
                </li>
                <li>1 account</li>
              </ul>
              <h1>$3/Month</h1>
            </div>
          </div>
          <div className="col">
            <div className="subscription ">
              <h3>Organization</h3>
              <ul>
                <li>
                  unlimited access to over 1200 official CollageBoard SAT and
                  ACT problems
                </li>
                <li>
                  unlimited access to Easy Assign additional 1500 SAT and ACT
                  problems
                </li>
                <li>100 account</li>
              </ul>
              <h1>$50/Month</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: getEasyAssignUser(),
  };
};
const mapDispatch = (dispatch) =>
  bindActionCreators(
    {
      logoutAction,
      emptyStateAfterLogout,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatch)(Subscriptions);
