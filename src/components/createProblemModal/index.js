import React from "react";
import { useState } from "react";
import { Button, Header, Image, Modal, Input } from "semantic-ui-react";
import Tags from "containers/problemsListing/components/Tags";

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
  };
  const onChangeFileHandler = (e, data) => {
    console.log("onChangeFileHandler", data);
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
          onClick={() =>
            createProblem({ data: "", mode: isCreateProblemModal.mode })
          }
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default CreateProblemModal;
