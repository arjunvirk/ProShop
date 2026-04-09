import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../actions/userActions";
import { useEffect } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import { USER_DETAILS_RESET } from "../constants/userConstants";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <h1 className="my-3">Users</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {/* ✅ MOBILE VIEW (CARDS) */}
          <div className="d-md-none">
            {users.map((user) => (
              <div
                key={user._id}
                className="p-3 mb-3 rounded-4 shadow-sm border bg-white"
              >
                <p className="small text-muted mb-1">
                  ID: {user._id.substring(0, 8)}...
                </p>

                <h6 className="mb-1">{user.name}</h6>

                <p className="mb-1">
                  <strong>Email:</strong>{" "}
                  <a
                    href={`mailto:${user.email}`}
                    className="text-decoration-none"
                  >
                    {user.email}
                  </a>
                </p>

                <p className="mb-2">
                  <strong>Role:</strong>{" "}
                  {user.isAdmin ? (
                    <span className="text-success fw-semibold">Admin</span>
                  ) : (
                    <span className="text-muted">User</span>
                  )}
                </p>

                <div className="d-flex gap-2">
                  <Button
                    variant="dark"
                    size="sm"
                    className="rounded-pill w-50"
                    onClick={() => {
                      dispatch({ type: USER_DETAILS_RESET });
                      navigate(`/admin/user/${user._id}/edit`);
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    className="rounded-pill w-50"
                    onClick={() => deleteHandler(user._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ DESKTOP TABLE */}
          <div className="d-none d-md-block">
            <div className="table-responsive">
              <Table striped bordered hover className="table-sm align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="small text-muted">
                        {user._id.substring(0, 8)}...
                      </td>

                      <td>{user.name}</td>

                      <td>
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </td>

                      <td>
                        {user.isAdmin ? (
                          <span className="text-success">✔</span>
                        ) : (
                          <span className="text-danger">✖</span>
                        )}
                      </td>

                      <td>
                        <div className="d-flex gap-1">
                          <Button
                            variant="dark"
                            size="sm"
                            className="rounded-pill px-3"
                            onClick={() => {
                              dispatch({ type: USER_DETAILS_RESET });
                              navigate(`/admin/user/${user._id}/edit`);
                            }}
                          >
                            Edit
                          </Button>

                          <Button
                            variant="danger"
                            size="sm"
                            className="rounded-pill px-3"
                            onClick={() => deleteHandler(user._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserListScreen;
