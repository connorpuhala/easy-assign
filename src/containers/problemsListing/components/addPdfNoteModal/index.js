import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import { ReactComponent as SepratorIcon } from "images/seprator.svg";
import { ReactComponent as CrossIcon } from "images/cross-circled.svg";

const AddNotesForPDFModal = ({ isOpen, toggle, downloadPDf }) => {
  const [notes, setNotes] = useState("");

  return (
    <Modal toggle={toggle} isOpen={isOpen} centered>
      <ModalBody>
        <div className="model_headings">
          <div className="tag_heading">
            Download PDF
            <span>
              <SepratorIcon />
            </span>
            <div className="cross" color="black" onClick={toggle}>
              <CrossIcon />
            </div>
          </div>
          <div className="model_content">
            <h5 className="subheading mt-0 text-center">Add Your Notes</h5>
            <div className="notes_content">
              <textarea
                type="text"
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                }}
              />
              <div className="download_pdf_action_btn">
                <button
                  className="create_prob"
                  onClick={() => {
                    toggle();
                    downloadPDf(true, notes);
                  }}
                >
                  With Answers{" "}
                </button>
                <button
                  className="create_new_tag"
                  onClick={() => {
                    toggle();
                    downloadPDf(false, notes);
                  }}
                >
                  Without Answers{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AddNotesForPDFModal;
