import React from "react";
import { Modal, ModalBody, Button } from "reactstrap";
import { ReactComponent as SepratorIcon } from "images/seprator.svg";
import { ReactComponent as CrossIcon } from "images/cross-circled.svg";

const ConfirmDeleteModal = ({ isOpen, toggle, onConfirm }) => {
  return (
    <Modal toggle={toggle} isOpen={isOpen} centered>
      <ModalBody>
        <div className="model_headings">
          <div className="tag_heading">
            Delete Problem
            <span>
              <SepratorIcon />
            </span>
            <div className="cross" color="black" onClick={toggle}>
              <CrossIcon />
            </div>
          </div>
          <div className="model_content">
            <h5 className="subheading mt-0 text-center">
              Are you sure, You want to delete this problem?.
            </h5>
          </div>
        </div>
        <div className="delete_popup_btns">
          <Button className="cnc_btn" color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button color="danger" className="delt_btn" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ConfirmDeleteModal;
