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
import {
  createProblem,
  createNewTag,
  editProblem,
} from "redux/actions/problems";
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
  editProblem,
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
    console.log("data ===", data);
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
              tagIDs: [...data.tagIDs, action.payload[0].id],
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
      // alert("edit is in progress...");
      let body = {
        ...data,
        // image: data.image.split(",")[1],
      };
      editProblem(body, data.id);
    }
  };
  const createNewTagHandler = (newTag) => {
    let body = {
      label: newTag,
    };
    createNewTag(body);
  };

  const downloadProblemsPdfHandler = async () => {
    console.log("@downloadProblemsPdfHandler");
    // const doc = new jsPDF("p", "px", "a4");
    // var width = doc.internal.pageSize.getWidth();
    // var height = doc.internal.pageSize.getHeight();
    // var aspect = height / width;

    // console.log("PDF width, height, aspect: ", { width, height, aspect });
    // const pdfName = Date.now();
    // let imgCounter = 0;
    // let imgSectionWidth = 426;
    // let imgSectionHeight = 151;
    // let sectionRatio = imgSectionWidth / imgSectionHeight;
    // console.log(
    //   "imgSectionWidth",
    //   imgSectionWidth,
    //   "imgSectionHeight",
    //   imgSectionHeight,
    //   "sectionRatio",
    //   sectionRatio
    // );

    // let cordX1 = 10;
    // let cordY1 = 2;

    // let cordX2 = 10;
    // let cordY2 = 320;

    // const length = problems.length;

    // if (length && length === 1) {
    //   // case 1: only 1 image
    //   let { width, height } = await getImageHeightWidth(problems[0].image_url);
    //   console.log("image width ===", width, "height ===", height);
    //   let widthRatio = imgSectionWidth / width;
    //   let heightRatio = imgSectionHeight / height;

    //   let ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
    //   console.log("ratio ====", ratio);
    //   let w= width * ratio
    //   let h =  height * ratio
    //   doc.addImage(
    //     problems[0].image_url,
    //     "JPEG",
    //     w/2,
    //     cordY1,
    //     w,
    //     h,
    //     `$prob_0`
    //   );
    //   doc.save(pdfName);
    // } else {
    //   // case:2 more than 1 images
    //   problems.map((prob, index) => {
    //     if (imgCounter === 0) {
    //       doc.addImage(
    //         prob.image_url,
    //         "JPEG",
    //         cordX1,
    //         cordY1,
    //         width - 20,
    //         300,
    //         `$prob_${index}`
    //       );
    //       imgCounter = imgCounter + 1;
    //     } else {
    //       doc.addImage(
    //         prob.image_url,
    //         "JPEG",
    //         cordX2,
    //         cordY2,
    //         width - 20,
    //         300,
    //         `$prob_${index}`
    //       );
    //       imgCounter = imgCounter + 1;
    //     }

    //     if (imgCounter === 2 && length % 2 !== 0) {
    //       doc.addPage();
    //       imgCounter = 0;
    //     }
    //     if (index + 1 === problems.length) {
    //       doc.save(pdfName);
    //     }
    //   });
    // }

    let pdf = new jsPDF("l", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const pageRatio = pageWidth / pageHeight;
    const sectionHeight = pageHeight / 4;
    const sectionRatio = pageWidth / sectionHeight;
    console.log(
      "pageWidth ===",
      pageWidth,
      "pageHeight ===",
      pageHeight,
      "sectionHeight",
      sectionHeight
    );

    for (let i = 0; i < problems.length; i++) {
      // let img = new Image();
      let img = document.createElement("img");
      img.src = problems[i].image_url;
      // eslint-disable-next-line no-loop-func
      img.onload = function () {
        const imgWidth = this.width;
        const imgHeight = this.height;
        const imgRatio = imgWidth / imgHeight;
        if (i > 0) {
          pdf.addPage();
        }
        pdf.setPage(i + 1);
        if (imgRatio >= 1) {
          console.log("CHECK 1");
          const wc = imgWidth / pageWidth;
          if (imgRatio >= pageRatio) {
            pdf.addImage(
              img,
              "JPEG",
              0,
              (pageHeight - imgHeight / wc) / 2,
              pageWidth,
              imgHeight / wc,
              null,
              "NONE"
            );
          } else {
            const pi = pageRatio / imgRatio;
            pdf.addImage(
              img,
              "JPEG",
              (pageWidth - pageWidth / pi) / 2,
              0,
              pageWidth / pi,
              imgHeight / pi / wc,
              null,
              "NONE"
            );
          }
        } else {
          console.log("CHECK 2");
          const wc = imgWidth / pageHeight;
          if (1 / imgRatio > pageRatio) {
            console.log("@@@@ 2.1");
            // const ip = 1 / imgRatio / pageRatio;
            const ip = 1 / imgRatio / pageRatio;
            const margin = (pageHeight - imgHeight / ip / wc) / 4;
            pdf.addImage(
              img,
              "JPEG",
              (pageWidth - imgHeight / ip / wc) / 2,
              -(imgHeight / ip / wc + margin),
              pageHeight / ip,
              imgHeight / ip / wc,
              null,
              "NONE",
              -90
            );
            // pdf.addImage(
            //   img,
            //   "JPEG",
            //   (pageWidth - imgHeight / ip / wc) / 2,
            //   -(imgHeight / ip / wc + margin),
            //   pageHeight / ip,
            //   imgHeight / ip / wc,
            //   null,
            //   "NONE",
            //   -90
            // );
          } else {
            console.log("@@@@ 2.2");
            pdf.addImage(
              img,
              "JPEG",
              (pageWidth - imgHeight / wc) / 2,
              -(imgHeight / wc),
              pageHeight,
              imgHeight / wc,
              null,
              "NONE",
              -90
            );
          }
        }
        if (i === problems.length - 1) {
          pdf.save("Photo.pdf");
        }
      };
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
  bindActionCreators({ createProblem, createNewTag, editProblem }, dispatch);

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

export const getImageHeightWidth = (url) => {
  console.log("url ====", url);
  return new Promise((resolve, reject) => {
    // let img = new Image();
    // let img = new Image(200,200);
    // img.crossOrigin = "anonymous";
    const img = document.createElement("img");
    // img.width = 200
    // img.height =300
    img.src = url;
    img.onload = () => {
      console.log("in onload----");
      const { naturalWidth, naturalHeight } = img;
      // console.log("img ===width", img.width, "height", img.height);
      console.log("nnnnnnnnnnnnnnnn", naturalWidth, naturalHeight);
      resolve({ width: naturalWidth, height: naturalHeight });
    };
    img.onerror = function (error) {
      //display error
      console.log("error ===", error);
      resolve({ width: 0, height: 0 });
      // document.body.appendChild(
      //     document.createTextNode('\nError loading as image: ' + this.src)
      // );
    };
  });
};
