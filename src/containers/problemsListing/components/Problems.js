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
import { getEasyAssignUser } from "utils/utilities";
import { LoaderWithinWrapper } from "components/global/loader";
import CreateProblemModal from "components/createProblemModal";
import { createProblem, createNewTag } from "redux/actions/problems";
import { bindActionCreators } from "redux";
import createNotification from "components/global/createNotification";
import { jsPDF } from "jspdf";

const Problems = ({
  user,
  isGetProblemsByTags,
  problems,
  problemsCount,
  isGetProblemsByTagsError,
  isGetProblemsByTagsErrorMsg,
  createProblem,
  createNewTag,
}) => {
  const [isCreateProblemModal, setIsCreateProblemModal] = useState({
    isOpen: false,
    mode: "",
  });
  const [selectedProblem, setSelectedProblem] = useState(null);

  const createProblemModalHandler = (val) => {
    console.log("setIsCreateProblemModal val", val);
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
    if (mode === "Create") {
      if (newTag !== "") {
        let body = {
          label: newTag,
        };
        createNewTag(body);
      }
      let body = {
        ...data,
        image: data.image.split(",")[1],
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
    } else {
      alert("edit is in progress...");
    }
  };
  const createNewTagHandler = (newTag) => {
    let body = {
      label: newTag,
    };
    createNewTag(body);
  };

  const downloadProblemsPdfHandler = () => {
    console.log("@downloadProblemsPdfHandler");
    const doc = new jsPDF();
    problems.map((prob, index) => {
      doc.addImage(
        prob.image_url,
        "JPEG",
        10,
        10,
        100,
        100,
        "heyyy"
      );
      if(index + 1 === problems.length){
        doc.save("a4.pdf");
      }
    });
    // doc.text("Hello world!", 10, 10);
    // doc.save("a4.pdf");
  };
  return (
    <>
      <Grid.Row columns={3}>
        {user.userRole === "admin" ? (
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
  bindActionCreators({ createProblem, createNewTag }, dispatch);

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

  return (
    <Segment raised vertical padded color="olive" style={{ margin: "10px" }}>
      id: {problem.id}
      {isLoading ? <LoaderWithinWrapper /> : null}
      <Image
        src={problem.image_url}
        size="large"
        centered
        onLoad={() => setIsLoading(false)}
      />
      {user.userRole === "admin" ? (
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
