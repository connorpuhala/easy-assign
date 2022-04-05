import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getEasyAssignUser } from "utils/utilities";
import Tags from "./components/Tags";
import Problems from "./components/Problems";
import LogoImg from "../../images/Logo.svg";
import { useRef, useState } from "react";
import SwitchToggler from "components/common/SwitchToggler";
import { Button } from "reactstrap";
const ProblemsListing = ({ user }) => {
  const createProblemBtnRef = useRef(null);
  const createNewTagBtnRef = useRef(null);
  const logoutBtnRef = useRef(null);
  const [isShowAllAnswers, setShowAllAnswers] = useState(false);
  const [isEditTags, setEditTags] = useState(false);
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
            {user?.type === "admin" ? (
              <div className="prob_tag">
                <button
                  className="create_prob"
                  onClick={() => {
                    if (createProblemBtnRef?.current) {
                      createProblemBtnRef.current.click();
                    }
                  }}
                >
                  Create Problem
                </button>
                <button
                  className="create_new_tag"
                  onClick={() => {
                    if (createNewTagBtnRef?.current) {
                      createNewTagBtnRef.current.click();
                    }
                  }}
                >
                  Create new Tag
                </button>
                <button
                  className="create_edit_tag"
                  onClick={() => {
                    setEditTags(!isEditTags);
                  }}
                >
                  Edit Tags{" "}
                </button>
              </div>
            ) : null}
          </div>

          <div className="logout">
            <button
              className="logout_btn"
              onClick={() => {
                if (logoutBtnRef?.current) {
                  logoutBtnRef.current.click();
                }
              }}
            >
              Logout
            </button>
          </div>
        </div>
        <Tags mode="listing" isEditTags={isEditTags} />
        <SwitchToggler
          id="all"
          text="Show All Answers"
          checked={isShowAllAnswers}
          onChange={() => {
            setShowAllAnswers(!isShowAllAnswers);
          }}
        />
        <Problems
          createProblemBtnRef={createProblemBtnRef}
          createNewTagBtnRef={createNewTagBtnRef}
          logoutBtnRef={logoutBtnRef}
          isShowAllAnswers={isShowAllAnswers}
        />
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
