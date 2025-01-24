import React from "react";
import "../css/Modal.css";

function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
}

export default Modal;
