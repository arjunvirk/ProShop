import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center">
      <Spinner
        animation="border"
        role="status"
        style={{ height: "80px", width: "80px" }}
      ></Spinner>
    </div>
  );
};

export default Loader;
