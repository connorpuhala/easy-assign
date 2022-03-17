import React from "react";
import { ReactComponent as SepratorIcon } from "images/seprator.svg";
import { ReactComponent as CrossIcon } from "images/cross-circled.svg";
import { ReactComponent as UploadIcon } from "images/upload-alt.svg";
import { ReactComponent as PlusIcon } from "images/plus.svg";
import { useState, useRef } from "react";
import {
  Button,
  Header,
  Image,
  // Modal,
  Input,
  Icon,
  Grid,
  Card,
} from "semantic-ui-react";
import Tags from "containers/problemsListing/components/Tags";
import { connect } from "react-redux";
import createNotification from "components/global/createNotification";
import { LoaderWithinWrapper } from "components/global/loader";
import { useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

const CreateProblemModal = ({
  isCreateProblemModal,
  onClose,
  createProblem,
  selectedProblem,
  createNewTag,
  isCreatingNewTag,
  isCreateProblem,
  isEditProblem,
}) => {
  console.log("selectedProblem ====", selectedProblem);
  const [problemData, setProblemData] = useState({
    image: null,
    tag_ids: [],
    answer: "",
    tag: [],
  });
  const [newTag, setNewTag] = useState("");
  let inputRef = useRef(null);
  const getSelectedTags = ({ selectedTags, selectedTagsList }) => {
    console.log("@getSelectedTags ==== tags", {
      selectedTags,
      selectedTagsList,
    });
    setProblemData({
      ...problemData,
      tag_ids: selectedTags,
      tag: selectedTagsList,
    });
  };

  useEffect(() => {
    if (isCreateProblemModal.mode === "Edit") {
      let tag_ids = [];
      if (selectedProblem.tag && selectedProblem.tag.length) {
        tag_ids = selectedProblem.tag.map((i) => i.id);
      }
      setProblemData({
        image: selectedProblem.image_url,
        tag_ids: tag_ids,
        answer: selectedProblem.answer,
        id: selectedProblem.id,
        tag: selectedProblem.tag,
      });
    }
  }, []);
  useEffect(() => {}, [inputRef]);

  console.log("problemData ====", problemData);

  const onChangeFileHandler = (e) => {
    let file = e.target.files && e.target.files[0];
    if (file) {
      if (file.type.split("/")[1] === "png") {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
          var base64data = reader.result;
          setProblemData({
            ...problemData,
            image: base64data,
          });
        };
      } else {
        createNotification({
          type: "danger",
          title: "File type not supported",
          msg: "select .png file only",
          timeout: 6000,
        });
      }
    }
  };

  const createProblemHandler = () => {
    // if (problemData.image === null && !problemData.tag_ids.length) {
    //   createNotification({
    //     type: "danger",
    //     title: "Problem description required!",
    //     msg: "Please upload problem image and select appropriate tags.",
    //     timeout: 6000,
    //   });
    //   return;
    // }

    // if (!problemData.tag_ids.length) {
    //   createNotification({
    //     type: "danger",
    //     title: "No tag selected",
    //     msg: "Please select appropriate tags of problem.",
    //     timeout: 6000,
    //   });
    //   return;
    // }

    if (problemData.image === null) {
      createNotification({
        type: "danger",
        title: "No problem image found!",
        msg: "Please upload problem image",
        timeout: 6000,
      });
      return;
    }
    createProblem({
      data: problemData,
      mode: isCreateProblemModal.mode,
      newTag,
    });
  };

  const onChangeAnswerHandler = (data) => {
    setProblemData({
      ...problemData,
      answer: data.value,
    });
  };
  return (
    <Modal
      toggle={() => onClose({ isOpen: false })}
      isOpen={isCreateProblemModal.isOpen}
    >
      {isCreateProblem || isEditProblem ? (
        <LoaderWithinWrapper
          text={isEditProblem ? "Updating..." : "Uploading..."}
        />
      ) : null}

      <input
        type="file"
        ref={inputRef}
        onChange={(e) => onChangeFileHandler(e)}
        style={{ display: "none" }}
      />

      <ModalBody>
        <div className="model_headings">
          <div className="tag_heading">
            Create Problem
            <span>
              <SepratorIcon />
            </span>
            <div
              className="cross"
              color="black"
              onClick={() => onClose({ isOpen: false })}
            >
              <CrossIcon />
            </div>
          </div>
        </div>
        <div className="model_content">
          {problemData.image ? (
            <Image
              size="large"
              src={problemData.image}
              wrapped
              style={{ height: "300px", border: "1px solid blue" }}
              onClick={() => {
                if (inputRef && inputRef.current) {
                  inputRef.current.click();
                }
              }}
            />
          ) : (
            <div className="upload_icon">
              <div
                className="inner_section"
                onClick={() => {
                  if (inputRef && inputRef.current) {
                    inputRef.current.click();
                  }
                }}
                extra
                style={{ cursor: "pointer" }}
              >
                <div className="upload_image">
                  <UploadIcon />
                  <Icon name="upload" />
                  <span>Upload problem image</span>
                </div>
              </div>
            </div>
          )}
          <div className="tags_sections">
            <div className="tags_heading">Tags</div>
            <div className="model_tag">
              <Tags
                mode="modal"
                getSelectedTags={getSelectedTags}
                selectedTagIds={problemData.tag_ids}
                tagList={problemData.tag}
              />
            </div>
          </div>
          <div
            divided="vertically"
            style={{ marginLeft: "unset", marginRight: "unset" }}
          >
            <div className="tags_ans">
              <div className="tags_section">
                <h5 className="tags_heading mt-2">Create new tag</h5>
                <div className="tag_input">
                  <input
                    type="text"
                    value={newTag}
                    placeholder="new tag"
                    onChange={(e, data) => setNewTag(data.value)}
                  />
                  <PlusIcon
                    onClick={() => {
                      createNewTag(newTag);
                      setNewTag("");
                    }}
                    name={isCreatingNewTag ? "spinner" : "plus circle"}
                    size="big"
                    disabled={newTag === ""}
                    loading={isCreatingNewTag}
                  />
                </div>
              </div>
              <div className="answwer_section">
                <h5 className="tags_heading mt-2">Answer</h5>
                <Input
                  type="text"
                  placeholder="Answer"
                  value={problemData.answer}
                  onChange={(e, data) => onChangeAnswerHandler(data)}
                />
              </div>
            </div>
          </div>
          <div className="popup_submit_btn">
            <Button
              content="Submit"
              labelPosition="right"
              icon="checkmark"
              onClick={() => createProblemHandler()}
              positive
            />
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  let { isCreatingNewTag, isCreateProblem, isEditProblem } = state.problems;
  return {
    isCreatingNewTag,
    isCreateProblem,
    isEditProblem,
  };
};

export default connect(mapStateToProps)(CreateProblemModal);
