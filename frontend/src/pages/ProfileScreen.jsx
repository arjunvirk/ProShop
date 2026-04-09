import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserProfile, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success,
    loading: loadingUpdate,
    error: errorUpdate,
  } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (success) {
        setTimeout(() => {
          dispatch({ type: USER_UPDATE_PROFILE_RESET });
        }, 2000);
      }

      if (!user || !user.name) {
        dispatch(getUserProfile());
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user?.name, success]);

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setMessage("Passwords do not match!");
    } else {
      setMessage(null);
    }
  }, [password, confirmPassword]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    dispatch(updateUserProfile({ name, email, password }));
  };
  return (
    <Container>
      <Row className="justify-content-md-center mt-4">
        <Col xs={12} md={4}>
          <h1>PROFILE</h1>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {success && (
            <Message variant="success">Profile Updated Successfully ✅</Message>
          )}
          {loadingUpdate && <Loader />}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email" className="my-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password" className="my-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword" className="my-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                placeholder="Enter confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="dark">
              UPDATE
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h2 className="my-3">My Orders</h2>

          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : (
            <>
              {/* ✅ MOBILE CARDS */}
              <div className="d-md-none">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="p-3 mb-3 rounded-4 shadow-sm border bg-white"
                  >
                    <p className="small text-muted mb-1">
                      ID: {order._id.substring(0, 8)}...
                    </p>

                    <p className="mb-1">
                      <strong>Date:</strong> {order.createdAt.substring(0, 10)}
                    </p>

                    <p className="mb-1">
                      <strong>Total:</strong>{" "}
                      <span className="text-primary fw-semibold">
                        ${order.totalPrice}
                      </span>
                    </p>

                    <p className="mb-1">
                      <strong>Paid:</strong> {order.isPaid ? "✅" : "❌"}
                    </p>

                    <p className="mb-2">
                      <strong>Delivered:</strong>{" "}
                      {order.isDelivered ? "🚚" : "❌"}
                    </p>

                    <LinkContainer to={`/order/${order._id}`}>
                      <Button
                        variant="dark"
                        size="sm"
                        className="rounded-pill w-100"
                      >
                        View Details
                      </Button>
                    </LinkContainer>
                  </div>
                ))}
              </div>

              {/* ✅ DESKTOP TABLE */}
              <div className="d-none d-md-block">
                <div className="table-responsive">
                  <Table
                    striped
                    bordered
                    hover
                    className="table-sm align-middle"
                  >
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td className="small text-muted">
                            {order._id.substring(0, 8)}...
                          </td>

                          <td>{order.createdAt.substring(0, 10)}</td>

                          <td className="fw-semibold text-primary">
                            ${order.totalPrice}
                          </td>

                          <td>
                            {order.isPaid ? (
                              <span className="text-success">✔</span>
                            ) : (
                              <span className="text-danger">✖</span>
                            )}
                          </td>

                          <td>
                            {order.isDelivered ? (
                              <span className="text-success">✔</span>
                            ) : (
                              <span className="text-danger">✖</span>
                            )}
                          </td>

                          <td>
                            <LinkContainer to={`/order/${order._id}`}>
                              <Button
                                variant="dark"
                                size="sm"
                                className="rounded-pill px-3"
                              >
                                Details
                              </Button>
                            </LinkContainer>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
