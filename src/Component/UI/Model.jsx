import ReactDOM from "react-dom";
import classess from "./Model.module.css";

const BackDrop = (props) => {
  return <div className={classess.backdrop} onClick={props.onClose}></div>;
};
const ModelOverlay = (props) => {
  return (
    <div className={classess.modal}>
      <div className={classess.content}>{props.children}</div>
    </div>
  );
};
const portalElement = document.getElementById("overlay");
const Model = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModelOverlay>{props.children}</ModelOverlay>,
        portalElement
      )}
    </>
  );
};
export default Model;
