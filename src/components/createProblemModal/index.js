import React from "react";
import { useState } from "react";
import { Button, Header, Image, Modal, Input } from "semantic-ui-react";
import Tags from "containers/problemsListing/components/Tags";
import { checkMimetype } from "utils/utilities";
import createNotification from "components/global/createNotification";

const CreateProblemModal = ({
  isCreateProblemModal,
  onClose,
  createProblem,
  selectedProblem,
}) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [problemData, setProblemData] = useState({
    image_file: null,
    selectedTags: [],
  });

  const getSelectedTags = (tags) => {
    console.log("getSelectedTags", tags);
    setSelectedTags([...tags]);
    setProblemData({
      ...problemData,
      selectedTags: tags,
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
            image_file: base64data,
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
    if (problemData.image_file === null && !problemData.selectedTags.length) {
      createNotification({
        type: "danger",
        title: "Problem description required!",
        msg: "Please upload problem image and select appropriate tags.",
        timeout: 6000,
      });
      return;
    }

    if (!problemData.selectedTags.length) {
      createNotification({
        type: "danger",
        title: "No tag selected",
        msg: "Please select appropriate tags of problem.",
        timeout: 6000,
      });
      return;
    }

    if (problemData.image_file === null) {
      createNotification({
        type: "danger",
        title: "No problem image found!",
        msg: "Please upload problem image",
        timeout: 6000,
      });
      return;
    }
    createProblem({ data: problemData, mode: isCreateProblemModal.mode });
  };
  return (
    <Modal
      onClose={() => onClose({ isOpen: false })}
      open={isCreateProblemModal.isOpen}
    >
      <Modal.Header>{isCreateProblemModal.mode} Problem</Modal.Header>
      <Modal.Content image>
        {isCreateProblemModal.mode === "Create" ? (
          <Input
            type="file"
            onChange={(e, data) => onChangeFileHandler(e, data)}
          />
        ) : (
          <Image size="medium" src={selectedProblem.image_url} wrapped />
        )}
        <Modal.Description>
          <Header>Tags</Header>
          <Tags mode="modal" getSelectedTags={getSelectedTags} />
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
