import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../actions/orderActions";
import { useEffect } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import { USER_DETAILS_RESET } from "../constants/userConstants";

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <>
      <h1 className="my-3">Orders</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {/* ✅ MOBILE VIEW (CARD UI) */}
          <div className="d-md-none">
            {orders.map((order) => (
              <div
                key={order._id}
                className="p-3 mb-3 rounded-4 shadow-sm border bg-white"
              >
                <p className="small text-muted mb-1">
                  ID: {order._id.substring(0, 8)}...
                </p>

                <h6 className="mb-1">{order.user?.name}</h6>

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
                  <strong>Delivered:</strong> {order.isDelivered ? "🚚" : "❌"}
                </p>

                <Button
                  variant="dark"
                  size="sm"
                  className="rounded-pill w-100"
                  onClick={() => {
                    dispatch({ type: USER_DETAILS_RESET });
                    navigate(`/order/${order._id}`);
                  }}
                >
                  View Details
                </Button>
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
                    <th>User</th>
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

                      <td>{order.user?.name}</td>

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
                        <Button
                          variant="dark"
                          size="sm"
                          className="rounded-pill px-3"
                          onClick={() => {
                            dispatch({ type: USER_DETAILS_RESET });
                            navigate(`/order/${order._id}`);
                          }}
                        >
                          Details
                        </Button>
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

export default OrderListScreen;
