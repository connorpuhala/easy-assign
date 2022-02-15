import React from "react";
import { useState, useRef } from "react";
import {
  Button,
  Header,
  Image,
  Modal,
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
      onClose={() => onClose({ isOpen: false })}
      open={isCreateProblemModal.isOpen}
    >
      {isCreateProblem || isEditProblem ? (
        <LoaderWithinWrapper
          text={isEditProblem ? "Updating..." : "Uploading..."}
        />
      ) : null}
      <Modal.Header>{isCreateProblemModal.mode} Problem</Modal.Header>
      <input
        type="file"
        ref={inputRef}
        onChange={(e) => onChangeFileHandler(e)}
        style={{ display: "none" }}
      />

      <Modal.Content image>
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
          <Card>
            <Card.Content
              onClick={() => {
                if (inputRef && inputRef.current) {
                  inputRef.current.click();
                }
              }}
              extra
              style={{ cursor: "pointer" }}
            >
              <Icon name="upload" />
              Upload problem image
            </Card.Content>
          </Card>
        )}
        <Modal.Description>
          <Header>Tags</Header>
          <Tags
            mode="modal"
            getSelectedTags={getSelectedTags}
            selectedTagIds={problemData.tag_ids}
            tagList={problemData.tag}
          />
        </Modal.Description>
      </Modal.Content>
      <Grid
        divided="vertically"
        style={{ marginLeft: "unset", marginRight: "unset" }}
      >
        <Grid.Row columns={2} padded="true">
          <Grid.Column>
            <h5>Answer</h5>
            <Input
              type="text"
              placeholder="Answer"
              value={problemData.answer}
              onChange={(e, data) => onChangeAnswerHandler(data)}
            />
          </Grid.Column>
          <Grid.Column>
            <h5>Create new tag</h5>
            <Input
              type="text"
              value={newTag}
              placeholder="new tag"
              onChange={(e, data) => setNewTag(data.value)}
            />
            <Icon
              onClick={() => {
                createNewTag(newTag);
                setNewTag("");
              }}
              name={isCreatingNewTag ? "spinner" : "plus circle"}
              size="big"
              disabled={newTag === ""}
              loading={isCreatingNewTag}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Modal.Actions>
        <Button color="black" onClick={() => onClose({ isOpen: false })}>
          cancel
        </Button>
        <Button
          content="Submit"
          labelPosition="right"
          icon="checkmark"
          onClick={() => createProblemHandler()}
          positive
        />
      </Modal.Actions>
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
