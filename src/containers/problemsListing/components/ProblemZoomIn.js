import React from "react";
import { Modal, ModalBody } from "reactstrap";
const ProblemZoomIn = ({ probleImage, isOpen , toggleProbloemZoomIn }) => {
  return (
    <Modal centered className="modal-wrap" isOpen = {isOpen}  toggle={toggleProbloemZoomIn} >
      <ModalBody >
          <div className="modal-width">
            <img src = {probleImage} alt = ""/>
          </div>
      </ModalBody>
    </Modal>
  );
};

export default ProblemZoomIn;
