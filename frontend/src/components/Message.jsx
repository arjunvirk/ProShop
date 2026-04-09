import { Alert } from "react-bootstrap";

const Message = ({ variant, children }) => {
  return (
    <Alert variant={variant} className="rounded-4 shadow-sm border-0 px-3 py-2">
      {children}
    </Alert>
  );
};

export default Message;
