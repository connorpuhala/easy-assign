import React from "react";
import { useState } from "react";
import { Button, Header, Image, Modal, Input } from "semantic-ui-react";
import Tags from "containers/problemsListing/components/Tags";
// import { checkMimetype } from "utils/utilities";
import createNotification from "components/global/createNotification";

const CreateProblemModal = ({
  isCreateProblemModal,
  onClose,
  createProblem,
  selectedProblem,
}) => {
  const [problemData, setProblemData] = useState({
    image: null,
    tagIDs: [],
    answer: "",
  });
  const [newTag, setNewTag] = useState("");

  const getSelectedTags = (tags) => {
    console.log("getSelectedTags", tags);
    setProblemData({
      ...problemData,
      tagIDs: tags,
    });
  };
  const onChangeFileHandler = (e, data) => {
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
    if (problemData.image === null && !problemData.tagIDs.length) {
      createNotification({
        type: "danger",
        title: "Problem description required!",
        msg: "Please upload problem image and select appropriate tags.",
        timeout: 6000,
      });
      return;
    }

    if (!problemData.tagIDs.length) {
      createNotification({
        type: "danger",
        title: "No tag selected",
        msg: "Please select appropriate tags of problem.",
        timeout: 6000,
      });
      return;
    }

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

  console.log("newTag ---", newTag);
  return (
    <Modal
      onClose={() => onClose({ isOpen: false })}
      open={isCreateProblemModal.isOpen}
    >
      <Modal.Header>{isCreateProblemModal.mode} Problem</Modal.Header>
      <Modal.Content image>
        <Input
          type="file"
          onChange={(e, data) => onChangeFileHandler(e, data)}
        />
        {isCreateProblemModal.mode === "Create" ? (
          <>
            <Image size="medium" src={problemData.image} wrapped />
            {/* {problemData.image ? (
              <Image size="medium" src={problemData.image} wrapped />
            ) : (
              <Input
                type="file"
                onChange={(e, data) => onChangeFileHandler(e, data)}
              />
            )} */}
          </>
        ) : (
          <div style={{ position: "relative", border: "1px solid red" }}>
            <Image size="medium" src={selectedProblem.image_url} wrapped />
          </div>
        )}

        <Modal.Description>
          <Header>Tags</Header>
          <Tags mode="modal" getSelectedTags={getSelectedTags} />
          <Input
            type="text"
            placeholder="Answer"
            onChange={(e, data) => onChangeAnswerHandler(data)}
          />
          <div>
            <h5>Create new tag</h5>
            <Input
              type="text"
              placeholder="new tag"
              onChange={(e, data) => setNewTag(data.value)}
            />
          </div>
        </Modal.Description>
      </Modal.Content>
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

export default CreateProblemModal;
