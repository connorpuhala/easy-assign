import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getEasyAssignUser } from "utils/utilities";
import Tags from "./components/Tags";
import Problems from "./components/Problems";
import LogoImg from "../../images/Logo.svg";

const ProblemsListing = ({ user }) => {
  return (
    <div className="container">
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
          <div className="prob_tag">
            <button className="create_prob">Create Problem</button>
            <button className="create_new_tag">Create new Tag</button>
          </div>
          <div className="logout">
            <button className="logout_btn">Logout</button>
          </div>
        </div>
        <Tags mode="listing" />
        <Problems />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: getEasyAssignUser(),
  };
};
const mapDispatch = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatch)(ProblemsListing);
