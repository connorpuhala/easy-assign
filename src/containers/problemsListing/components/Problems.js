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
    const doc = new jsPDF("p", "px", "a4");
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
    var aspect = height / width;

    console.log("PDF width, height, aspect: ", { width, height, aspect });
    const pdfName = Date.now();
    let imgCounter = 0;
    let cordX1 = 10;
    let cordY1 = 10;

    let cordX2 = 10;
    let cordY2 = 320;
    const length = problems.length;

    if (length && length === 1) {
      // case 1: only 1 image
      doc.addImage(
        problems[0].image_url,
        "JPEG",
        cordX1,
        cordY1,
        width - 20,
        300,
        `$prob_0`
      );
      doc.save(pdfName);
    } else {
      // case:2 more than 1 images
      problems.map((prob, index) => {
        if (imgCounter === 0) {
          doc.addImage(
            prob.image_url,
            "JPEG",
            cordX1,
            cordY1,
            width - 20,
            300,
            `$prob_${index}`
          );
          imgCounter = imgCounter + 1;
        } else {
          doc.addImage(
            prob.image_url,
            "JPEG",
            cordX2,
            cordY2,
            width - 20,
            300,
            `$prob_${index}`
          );
          imgCounter = imgCounter + 1;
        }

        if (imgCounter === 2 && length % 2 !== 0) {
          doc.addPage();
          imgCounter = 0;
        }
        if (index + 1 === problems.length) {
          doc.save(pdfName);
        }
      });
    }
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
