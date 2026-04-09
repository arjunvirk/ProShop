import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="text-center py-5">
      <div className="spinner-grow text-primary mx-1"></div>
      <div className="spinner-grow text-primary mx-1"></div>
      <div className="spinner-grow text-primary mx-1"></div>
    </div>
  );
};

export default Loader;
