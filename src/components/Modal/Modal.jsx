import "./Modal.css";
import reactDom from "react-dom";

const Modal = ({ show, children, w, mh, onAdd }) => {
  return reactDom.createPortal(
    <>
      {show ? (
        <div className={`modalContainer ${show ? "show" : ""}`}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            style={{ width: `${w}px`, height: `${mh}px` }}>
            <main className="modal_content"> {children} </main>
          </div>
        </div>
      ) : null}
    </>,
    document.getElementById("modal")
  );
};
export default Modal;
