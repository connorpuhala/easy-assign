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
import { ReactComponent as PlusIcon } from "images/plus.svg";
import { ReactComponent as SepratorIcon } from "images/seprator.svg";
import { ReactComponent as CrossIcon } from "images/cross-circled.svg";

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
      <ModalBody>
        <div className="model_headings">
          <div className="tag_heading">
            Create Tags
            <span>
              <SepratorIcon />
            </span>
            <div className="cross" color="black" onClick={() => toggle(false)}>
              <CrossIcon />
            </div>
          </div>
        </div>
        <div
          className="model_content"
          divided="vertically"
          style={{ marginLeft: "unset", marginRight: "unset" }}
        >
          <div columns={1} padded="true">
            <div className="tag_input">
              <h5 className="subheading">Create new tag</h5>

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
                disabled={newTag === ""}
              />
            </div>
          </div>

          <div className="popup_submit_btn">
            <Button
              className="submit_btn"
              content="Submit"
              labelPosition="right"
              icon="checkmark"
              onClick={() => createNewTag()}
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
