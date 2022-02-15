import React, { useState } from "react";
import {
  Grid,
  Image,
  Segment,
  Button,
  Dropdown,
  Confirm,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { getEasyAssignUser, getImageWidthHeight } from "utils/utilities";
import { LoaderWithinWrapper } from "components/global/loader";
import CreateProblemModal from "components/createProblemModal";
import {
  createProblem,
  createNewTag,
  editProblem,
  emptyStateAfterLogout,
} from "redux/actions/problems";
import { logoutAction } from "redux/actions/loginSignup";
import { bindActionCreators } from "redux";
import createNotification from "components/global/createNotification";
import { jsPDF } from "jspdf";
import { isValidHttpUrl, removeEasyAssignUser } from "utils/utilities";
import { useHistory } from "react-router-dom";

const Problems = ({
  user,
  isGetProblemsByTags,
  problems,
  problemsCount,
  isGetProblemsByTagsError,
  isGetProblemsByTagsErrorMsg,
  createProblem,
  createNewTag,
  editProblem,
  logoutAction,
  emptyStateAfterLogout,
}) => {
  const history = useHistory();
  const [isCreateProblemModal, setIsCreateProblemModal] = useState({
    isOpen: false,
    mode: "",
  });
  const [selectedProblem, setSelectedProblem] = useState(null);

  const createProblemModalHandler = (val) => {
    if (val.isOpen === false) {
      setSelectedProblem(null);
      setIsCreateProblemModal({ isOpen: false, mode: "" });
    }
    if (val.isOpen) {
      if (val.mode === "Edit") {
        setSelectedProblem(val.problem);
      } else {
        setSelectedProblem(null);
      }
      setIsCreateProblemModal({ isOpen: val.isOpen, mode: val.mode });
    }
  };

  const deleteProblem = () => {
    console.log("deleteProblem");
  };

  const createProblemHandler = ({ data, mode, newTag }) => {
    console.log("createProblemHandler ===", { data, mode, newTag });
    debugger
    if (mode === "Create") {
      if (newTag !== "") {
        let body = {
          label: newTag,
        };
        createNewTag(body).then((action) => {
          console.log("action ====", action);
          if (action.type === "CREATE_TAG_SUCCESS") {
            let body = {
              ...data,
              image: data.image.split(",")[1],
              // tag_ids: [...data.tag_ids, action.payload[0].id],
              tag: [...data.tag, action.payload[0]],
            };
            createProblem(body).then((action) => {
              if (action.type === "CREATE_PROBLEM_SUCCESS") {
                setIsCreateProblemModal({ isOpen: false, mode: "" });
                createNotification({
                  type: "success",
                  title: "Uploaded",
                  msg: "Problem uploaded successfully.",
                  // timeout: 6000,
                });
              } else {
                createNotification({
                  type: "danger",
                  title: "Something went wrong!",
                  msg: "Please try again.",
                  timeout: 6000,
                });
              }
            });
          }
        });
      } else {
        let body = {
          ...data,
          image: data.image.split(",")[1],
          tag: data.tag,
        };
        createProblem(body).then((action) => {
          if (action.type === "CREATE_PROBLEM_SUCCESS") {
            setIsCreateProblemModal({ isOpen: false, mode: "" });
            createNotification({
              type: "success",
              title: "Uploaded",
              msg: "Problem uploaded successfully.",
              // timeout: 6000,
            });
          } else {
            createNotification({
              type: "danger",
              title: "Something went wrong!",
              msg: "Please try again.",
              timeout: 6000,
            });
          }
        });
      }
    } else {
      const id = data.id;
      const cloneData = {
        // tag_ids: data.tag_ids,
        tag: data.tag,
        image: data.image,
        answer: data.answer,
      };

      if (isValidHttpUrl(cloneData.image)) {
        delete cloneData.image;
      } else {
        cloneData.image = cloneData.image.split(",")[1];
      }
      let body = {
        ...cloneData,
      };
      editProblem(body, id).then((action) => {
        console.log("action edit =====", action);
        if (action.type === "EDIT_PROBLEM_SUCCESS") {
          setIsCreateProblemModal({ isOpen: false, mode: "" });
          createNotification({
            type: "success",
            title: "Updated",
            msg: "Problem updated successfully.",
            // timeout: 6000,
          });
        } else {
          createNotification({
            type: "danger",
            title: "Something went wrong!",
            msg: "Please try again.",
            timeout: 6000,
          });
        }
      });
    }
  };

  const createNewTagHandler = (newTag) => {
    let body = {
      label: newTag,
    };
    createNewTag(body);
  };

  const downloadProblemsPdfHandler = async () => {
    let pdf = new jsPDF("p", "mm", "a4");
    const margin = 10;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const length = problems.length;
    for (let i = 0; i < length; i++) {
      let { imgWidth, imgHeight } = getImageWidthHeight({
        url: problems[i].image_url,
      });
      let sectionWidth = (2 * pageWidth) / 3;
      let sectionHeight = (2 * pageHeight) / 3;
      let scale = Math.min(sectionWidth / imgWidth, sectionHeight / imgHeight);

      // let sw1 = 0 , sh1 = 0

      let sw1 = imgWidth * scale;
      let sh1 = imgHeight * scale;
      let x = 10;
      let y = 10;

      pdf.addImage(
        problems[i].image_url,
        "JPEG",
        x,
        y,
        sw1,
        sh1,
        null,
        `$prob_${i}`
      );
      if (i + 1 === length) {
        pdf.save(Date.now());
      } else {
        pdf.addPage();
      }
    }
  };

  const logoutHandler = () => {
    console.log("@logoutHandler ===");
    removeEasyAssignUser();
    logoutAction();
    emptyStateAfterLogout();
    history.push("/");
  };
  return (
    <>
      <Grid.Row columns={3}>
        {user && user.type === "admin" ? (
          <Button
            primary
            onClick={() =>
              createProblemModalHandler({
                isOpen: true,
                mode: "Create",
              })
            }
          >
            Create Problem
          </Button>
        ) : null}
        <Button
          secondary
          disabled={!problems.length}
          onClick={() => downloadProblemsPdfHandler()}
        >
          Download
        </Button>
        <Button
          // secondary
          basic
          color="red"
          onClick={() => logoutHandler()}
        >
          Logout
        </Button>
      </Grid.Row>
      <Grid.Row columns={3}>
        {isGetProblemsByTags ? <LoaderWithinWrapper /> : null}
        <div>
          {problems.length
            ? problems.map((problem, index) => {
                return (
                  <ProblemItem
                    key={problem.id}
                    problem={problem}
                    user={user}
                    createProblemModalHandler={createProblemModalHandler}
                    deleteProblem={deleteProblem}
                  />
                );
              })
            : "No problems found. select different tags"}
        </div>
        {isCreateProblemModal.isOpen ? (
          <CreateProblemModal
            isCreateProblemModal={isCreateProblemModal}
            onClose={setIsCreateProblemModal}
            selectedProblem={selectedProblem}
            createProblem={createProblemHandler}
            createNewTag={createNewTagHandler}
          />
        ) : null}
      </Grid.Row>
    </>
  );
};

const mapStateToProps = (state) => {
  let {
    isGetProblemsByTags,
    problems,
    problemsCount,
    isGetProblemsByTagsError,
    isGetProblemsByTagsErrorMsg,
  } = state.problems;
  return {
    user: getEasyAssignUser(),
    isGetProblemsByTags,
    problems,
    problemsCount,
    isGetProblemsByTagsError,
    isGetProblemsByTagsErrorMsg,
  };
};

const mapDispatch = (dispatch) =>
  bindActionCreators(
    {
      createProblem,
      createNewTag,
      editProblem,
      logoutAction,
      emptyStateAfterLogout,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatch)(Problems);

export const ProblemItem = ({
  problem,
  user,
  createProblemModalHandler,
  deleteProblem,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmBox, setIsConfirmBox] = useState(false);

  const onConfirmBoxDelete = (v) => {
    deleteProblem();
    setIsConfirmBox(false);
  };

  const onConfirmBoxCancel = (v, d) => {
    setIsConfirmBox(false);
  };
  // console.log("problem ------", problem);
  return (
    <Segment raised vertical padded color="olive" style={{ margin: "10px" }}>
      id: {problem.id}
      <br />
      answer: {problem.answer}
      {isLoading ? <LoaderWithinWrapper /> : null}
      <Image
        src={problem.image_url}
        size="large"
        centered
        alt="problem_img"
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
      {user && user.type === "admin" ? (
        <Dropdown text="Edit">
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                createProblemModalHandler({
                  isOpen: true,
                  mode: "Edit",
                  problem,
                });
              }}
            >
              Edit
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setIsConfirmBox(true);
              }}
            >
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : null}
      <Confirm
        open={isConfirmBox}
        onCancel={onConfirmBoxCancel}
        onConfirm={() => onConfirmBoxDelete(problem.id)}
      />
    </Segment>
  );
};
