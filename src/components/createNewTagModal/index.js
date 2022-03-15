import React from "react";
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

const CreateProblemModal = ({ isOpen, toggle, createNewTag }) => {
  // console.log("selectedProblem ====", selectedProblem);
  // const [problemData, setProblemData] = useState({
  //   image: null,
  //   tag_ids: [],
  //   answer: "",
  //   tag: [],
  // });
  const [newTag, setNewTag] = useState("");

  return (
    <Modal toggle={() => toggle(false)} isOpen={isOpen}>
      <ModalHeader>New Tag</ModalHeader>
      <ModalBody>
        <Grid
          divided="vertically"
          style={{ marginLeft: "unset", marginRight: "unset" }}
        >
          <Grid.Row columns={1} padded="true">
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
                name={"plus circle"}
                size="big"
                disabled={newTag === ""}
                loading={false}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </ModalBody>
      <ModalFooter>
        <Button color="black" onClick={() => toggle(false)}>
          cancel
        </Button>
        <Button
          content="Submit"
          labelPosition="right"
          icon="checkmark"
          onClick={() => createNewTag()}
          positive
        />
      </ModalFooter>
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
