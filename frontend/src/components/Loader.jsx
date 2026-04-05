import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "40vh" }}
    >
      <Spinner
        animation="border"
        role="status"
        style={{ height: "80px", width: "80px" }}
      />
    </div>
  );
};

export default Loader;
