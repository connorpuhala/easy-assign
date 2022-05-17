import React from "react";
import LogoImg from "../../images/Logo.svg";
import BackImg from "../../images/back_arrow.png";
import { useHistory } from "react-router-dom";
import UserIcon from "../../images/user-icon.svg";
import Yellow_tick from "../../images/yellow_tcik.png";
import Blue_tick from "../../images/blue_tick.png";
import Green_tick from "../../images/green_tick.png";
import { getEasyAssignUser, removeEasyAssignUser } from "utils/utilities";
import { connect } from "react-redux";
import { logoutAction } from "redux/actions/loginSignup";
import { bindActionCreators } from "redux";
import { emptyStateAfterLogout } from "redux/actions/problems";
const Subscriptions = ({ user, emptyStateAfterLogout, logoutAction }) => {
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
              className="back_btn"
              onClick={() => {
                history.goBack();
              }}
            >
              <img src={BackImg} alt="back" />
            </button>
          </div>
          <div className="logout">
            <button className="logout_btn" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        </div>
        <div className="user_email_sub ">
          <span> {user.email}</span>
          <button className="user_icon_sub">
            <img src={UserIcon} alt="user-icon" />
          </button>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="subscription_pack">
              <div className="pack_name yellow_pack">
                <p>Free</p>
                <h1>$0.00</h1>
                <span>per month</span>
              </div>
              <div className="pack_details">
                <ul>
                  <li>
                    <span>
                      <img src={Yellow_tick} />
                    </span>
                    <p>
                      unlimited access to over 1200 official CollageBoard SAT
                      and ACT problems
                    </p>
                  </li>
                </ul>
                <button className="get_started yellow-btn">Get Started</button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="subscription_pack">
              <div className="pack_name blue_pack">
                <p>Single User</p>
                <h1>$3.00</h1>
                <span>per month</span>
              </div>
              <div className="pack_details">
                <ul>
                  <li>
                    <span>
                      <img src={Blue_tick} />
                    </span>
                    <p>
                      unlimited access to over 1200 official CollageBoard SAT
                      and ACT problems
                    </p>
                  </li>
                  <li>
                    <span>
                      <img src={Blue_tick} />
                    </span>
                    <p>
                      unlimited access to Easy Assign additional 1500 SAT and
                      ACT problems
                    </p>
                  </li>
                  <li>
                    <span>
                      <img src={Blue_tick} />
                    </span>
                    <p>1 account</p>
                  </li>
                </ul>
                <button className="get_started blue-btn">Get Started</button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="subscription_pack">
              <div className="pack_name green_pack">
                <p>Organization</p>
                <h1>$50.00</h1>
                <span>per month</span>
              </div>
              <div className="pack_details">
                <ul>
                  <li>
                    <span>
                      <img src={Green_tick} />
                    </span>
                    <p>
                      unlimited access to over 1200 official CollageBoard SAT
                      and ACT problems
                    </p>
                  </li>
                  <li>
                    <span>
                      <img src={Green_tick} />
                    </span>
                    <p>
                      unlimited access to Easy Assign additional 1500 SAT and
                      ACT problems
                    </p>
                  </li>
                  <li>
                    <span>
                      <img src={Green_tick} />
                    </span>
                    <p>100 account</p>
                  </li>
                </ul>
                <button className="get_started green-btn">Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer_content">
        {" "}
        <p> EasyAssignEducation@gmail.com</p>
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
