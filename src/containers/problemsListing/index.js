import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getEasyAssignUser } from "utils/utilities";
import Tags from "./components/Tags";
import Problems from "./components/Problems";
import LogoImg from "../../images/Logo.svg";
import UserIcon from "../../images/user-icon.svg";
import { useRef, useState } from "react";
import SwitchToggler from "components/common/SwitchToggler";
import { useHistory } from "react-router-dom";

const ProblemsListing = ({ user }) => {
  const createProblemBtnRef = useRef(null);
  const createNewTagBtnRef = useRef(null);
  const history = useHistory();
  const logoutBtnRef = useRef(null);
  const [isShowAllAnswers, setShowAllAnswers] = useState(false);
  const [isShowAllTags, setShowAllTags] = useState(false);
  const [isEditTags, setEditTags] = useState(false);
  const [selectedProblemTags, setSelectedProblemTags] = useState([]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="top_logo">
            <img src={LogoImg} alt="logo" />
          </div>
          <div
            className="user_email bounce_effect"
            onClick={(e) => {
              e.preventDefault();
              history.push("/subscriptions");
            }}
          >
            <span> {user.email}</span>
            <button className="user_icon">
              <img src={UserIcon} alt="user-icon" />
            </button>
          </div>
        </div>
        <div className="problem_heading">
          <h3>SAT problems at your fingertips</h3>
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
                  className={`create_edit_tag ${
                    isEditTags ? "create_edit_tag_active" : ""
                  }`}
                  onClick={() => {
                    setEditTags(!isEditTags);
                  }}
                >
                  Edit Tags{" "}
                </button>
              </div>
            ) : null}
          </div>

          {/* <div className="logout">
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
          </div> */}
        </div>
        <Tags
          mode="listing"
          isEditTags={isEditTags}
          setSelectedProblemTags={setSelectedProblemTags}
        />
        <div className="tags_answer_switch">
          <SwitchToggler
            id="all"
            text="Show All Answers"
            checked={isShowAllAnswers}
            onChange={() => {
              setShowAllAnswers(!isShowAllAnswers);
            }}
          />
          <SwitchToggler
            id="all_tags"
            text="Show All Tags"
            checked={isShowAllTags}
            onChange={() => {
              setShowAllTags(!isShowAllTags);
            }}
          />
        </div>
        <Problems
          selectedTags={selectedProblemTags}
          createProblemBtnRef={createProblemBtnRef}
          createNewTagBtnRef={createNewTagBtnRef}
          logoutBtnRef={logoutBtnRef}
          isShowAllAnswers={isShowAllAnswers}
          isShowAllTags={isShowAllTags}
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
