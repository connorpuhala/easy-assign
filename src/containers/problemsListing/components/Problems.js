import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getEasyAssignUser, getImageWidthHeight } from "utils/utilities";
import { LoaderWithinWrapper } from "components/global/loader";
import CreateProblemModal from "components/createProblemModal";
import CreateNewTagModal from "components/createNewTagModal";
import {
  createProblem,
  createNewTag,
  editProblem,
  emptyStateAfterLogout,
  deleteProblem,
} from "redux/actions/problems";
import { logoutAction } from "redux/actions/loginSignup";
import { bindActionCreators } from "redux";
import createNotification from "components/global/createNotification";
import { jsPDF } from "jspdf";
import { isValidHttpUrl, removeEasyAssignUser } from "utils/utilities";
import { useHistory } from "react-router-dom";

import ConfirmDeleteModal from "./confirmDeleteModal";
import SwitchToggler from "components/common/SwitchToggler";
import ProblemZoomIn from "./ProblemZoomIn";
import AddNotesForPDFModal from "./addPdfNoteModal";

import LogoImg from "../../../images/Logo.png";

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
  createProblemBtnRef,
  createNewTagBtnRef,
  logoutBtnRef,
  deleteProblem,
  isShowAllAnswers,
  isShowAllTags,
  selectedTags,
}) => {
  const history = useHistory();
  const [isCreateProblemModal, setIsCreateProblemModal] = useState({
    isOpen: false,
    mode: "",
  });
  const [isCreateTagModal, setIsCreateTagModal] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [downloadToggle, setDownloadToggle] = useState(false);
  const [isProblemClicked, SetProblemClicked] = useState(false);
  const [probleImage, setProblemImage] = useState();
  const [isOpenDownloadPDF, setOpenDownloadPDF] = useState(false);
  const toggleProbloemZoomIn = () => {
    SetProblemClicked(!isProblemClicked);
  };

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

  const deleteProblemHandler = (id) => {
    deleteProblem(id);
  };

  const createProblemHandler = ({ data, mode, newTag }) => {
    if (data.tag_ids) {
      delete data.tag_ids;
    }
    if (newTag !== "") {
      const newTagBody = {
        label: newTag,
      };
      createNewTag(newTagBody).then((action) => {
        if (action.type === "CREATE_TAG_SUCCESS") {
          if (mode === "Create") {
            const newProblemBody = {
              ...data,
              image: data.image.split(",")[1],
              // tag_ids: [...data.tag_ids, action.payload[0].id],
              tag: [...data.tag, action.payload[0]],
            };
            createNewProblemCall(newProblemBody);
          } else {
            editProblemCall(data, action.payload[0]);
          }
        }
      });
    } else {
      if (mode === "Create") {
        const body = {
          ...data,
          image: data.image.split(",")[1],
          tag: data.tag,
        };
        createNewProblemCall(body);
      } else {
        editProblemCall(data);
      }
    }
  };

  const createNewProblemCall = (body) => {
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
  };

  const editProblemCall = (data, newAddedTag) => {
    const id = data.id;
    const cloneData = {
      tag: newAddedTag ? [...data.tag, newAddedTag] : data.tag,
      image: data.image,
      answer: data.answer,
    };

    if (isValidHttpUrl(cloneData.image)) {
      delete cloneData.image;
    } else {
      cloneData.image = cloneData.image.split(",")[1];
    }
    const body = {
      ...cloneData,
    };
    editProblem(body, id).then((action) => {
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
  };

  const createNewTagHandler = (newTag) => {
    let body = {
      label: newTag,
    };
    createNewTag(body);
  };

  const downloadProblemsPdfHandler = async (isAnswersLabel, note) => {
    let pdf = new jsPDF("p", "mm", "a4");
    pdf.setFont("Roboto");
    const margin = 10;
    const pageWidth = pdf.internal.pageSize.getWidth();

    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.setFontSize(8);
    const length = problems.length;

    let sw1 = 120;
    let sh1 = 40;
    let x = pageWidth / 2 - sw1 / 2;
    let y = 50;
    pdf.addImage(LogoImg, "PNG", x, y, sw1, sh1, null);

    pdf.setFontSize(14);
    pdf.text(`Total Problems: ${length} `, 20, 200, "left");
    var splitTitle = pdf.splitTextToSize(
      `Tags: ${selectedTags.map((el) => el.label).join(" // ")}`,
      pageWidth / 2
    );
    const data = pdf.text(20, 210, splitTitle);
    console.log("data", data);
    const dimentions = pdf.getTextDimensions(splitTitle);
    console.log("dimentionsdimentions=", dimentions);
    if (note) {
      pdf.text(`Note: ${note} `, 20, dimentions.h + 215, "left");
    }
    pdf.text(
      `Date :  ${new Date().toLocaleString()} `,
      pageWidth - 10,
      200,
      "right"
    );
    pdf.addPage();
    pdf.setFontSize(10);
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
      let x = 20;
      let y = 30;
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
      if (isAnswersLabel) {
        const splitAnswer = pdf.splitTextToSize(
          `Answer: ${problems[i].answer}`,
          pageWidth - 30
        );
        pdf.text(splitAnswer, 20, pageHeight - 30, "left");
      }
      if (i + 1 === length) {
        const pdfName = `Assignment_${new Date().toLocaleString()}_${
          isAnswersLabel ? "With_Answers" : "Without_Answers"
        }`;
        pdf.save(pdfName);
      } else {
        pdf.addPage();
      }
    }
  };

  const logoutHandler = () => {
    removeEasyAssignUser();
    logoutAction();
    emptyStateAfterLogout();
    history.push("/");
  };

  const createNewTagModalHandler = (val) => {
    setIsCreateTagModal(val);
  };

  const toggleDownloadDropdown = () => {
    setDownloadToggle(!downloadToggle);
  };

  const toggleDownloadModal = () => {
    setOpenDownloadPDF(!isOpenDownloadPDF);
  };

  return (
    <>
      <div
        className="d-flex justify-content-between align-items-center"
        columns={3}
      >
        {user && user.type === "admin" ? (
          <button
            className="d-none"
            ref={createProblemBtnRef}
            onClick={() =>
              createProblemModalHandler({
                isOpen: true,
                mode: "Create",
              })
            }
          >
            Create Problem
          </button>
        ) : null}
        {user && user.type === "admin" ? (
          <button
            className="d-none"
            onClick={() => createNewTagModalHandler(true)}
            ref={createNewTagBtnRef}
          >
            Create new Tag
          </button>
        ) : null}

        <button
          className="download_pdf"
          disabled={problems.length === 0}
          onClick={toggleDownloadModal}
        >
          Download PDF
        </button>

        <p>Problems Count : {problems.length}</p>
      </div>
      <div columns={3} className="position-relative">
        {isGetProblemsByTags ? (
          <LoaderWithinWrapper
            className="full-page-loader"
            noSvg={problems.length}
          />
        ) : null}
        {problems.length
          ? problems.map((problem, index) => {
              return (
                <ProblemItem
                  key={problem.id}
                  problem={problem}
                  user={user}
                  createProblemModalHandler={createProblemModalHandler}
                  deleteProblem={deleteProblemHandler}
                  isShowAllAnswers={isShowAllAnswers}
                  isShowAllTags={isShowAllTags}
                  toggleProbloemZoomIn={toggleProbloemZoomIn}
                  setProblemImage={setProblemImage}
                />
              );
            })
          : !isGetProblemsByTags
          ? "No problems found. select different tags"
          : null}
        {isCreateProblemModal.isOpen ? (
          <CreateProblemModal
            isCreateProblemModal={isCreateProblemModal}
            onClose={setIsCreateProblemModal}
            selectedProblem={selectedProblem}
            createProblem={createProblemHandler}
            createNewTag={createNewTagHandler}
          />
        ) : null}
        <CreateNewTagModal
          isOpen={isCreateTagModal}
          toggle={createNewTagModalHandler}
          createNewTag={createNewTagHandler}
        />
        <ProblemZoomIn
          isOpen={isProblemClicked}
          toggleProbloemZoomIn={toggleProbloemZoomIn}
          probleImage={probleImage}
        />
        <AddNotesForPDFModal
          downloadPDf={downloadProblemsPdfHandler}
          isOpen={isOpenDownloadPDF}
          toggle={toggleDownloadModal}
        />
      </div>
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
      deleteProblem,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatch)(Problems);

export const ProblemItem = ({
  problem,
  user,
  createProblemModalHandler,
  deleteProblem,
  isShowAllAnswers,
  isShowAllTags,
  toggleProbloemZoomIn,
  setProblemImage,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmBox, setIsConfirmBox] = useState(false);
  const [isShowAnswer, setShowAnswer] = useState(false);
  const [isShowTag, setShowTag] = useState(false);

  const onConfirmBoxDelete = (id) => {
    deleteProblem(id);
    setIsConfirmBox(false);
  };
  const toggleConfirmBox = () => {
    setIsConfirmBox(!isConfirmBox);
  };
  useEffect(() => {
    setShowAnswer(isShowAllAnswers);
  }, [isShowAllAnswers]);

  useEffect(() => {
    setShowTag(isShowAllTags);
  }, [isShowAllTags]);

  return (
    <div className="problem_answer" raised vertical padded>
      <div className="prob_heading">
        {user && user.type === "admin" ? (
          <div text="Edit">
            <div className="edit_action">
              <div
                className="edit"
                onClick={() => {
                  createProblemModalHandler({
                    isOpen: true,
                    mode: "Edit",
                    problem,
                  });
                }}
              >
                Edit
              </div>
              <div
                className="delete"
                onClick={() => {
                  setIsConfirmBox(true);
                }}
              >
                Delete
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div
        className="prob_img"
        onClick={() => {
          setProblemImage(problem.image_url);
          toggleProbloemZoomIn();
        }}
      >
        <img
          src={problem.image_url}
          // size="large"
          centered
          alt="problem_img"
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      </div>
      <div className="tags_answer_switch">
        <SwitchToggler
          id={problem.id}
          text="Show Answer"
          checked={isShowAnswer}
          onChange={() => {
            setShowAnswer(!isShowAnswer);
          }}
        />
        <SwitchToggler
          id={`tag_${problem.id}`}
          text="Show Tags"
          checked={isShowTag}
          onChange={() => {
            setShowTag(!isShowTag);
          }}
        />
      </div>
      {isShowAnswer ? (
        <div className="answer">
          <h1>Answer:</h1> <p>{problem.answer}</p>
          {isLoading ? <LoaderWithinWrapper /> : null}
        </div>
      ) : null}
      {isShowTag ? (
        <div className="answer">
          <h1>Tags:</h1>{" "}
          <p>{problem?.tag?.map((el) => el.label).join(" // ")}</p>
          {isLoading ? <LoaderWithinWrapper /> : null}
        </div>
      ) : null}
      <ConfirmDeleteModal
        isOpen={isConfirmBox}
        toggle={toggleConfirmBox}
        onConfirm={() => {
          onConfirmBoxDelete(problem.id);
        }}
      />
    </div>
  );
};
