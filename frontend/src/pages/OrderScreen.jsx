import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import { Link, useParams } from "react-router-dom";
import { ORDER_PAY_RESET } from "../constants/orderConstants";
import { useEffect } from "react";

const OrderScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  // ✅ FIXED naming
  const orderPayState = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPayState;

  const itemsPrice = order?.orderItems
    ?.reduce((acc, item) => acc + item.price * item.qty, 0)
    ?.toFixed(2);

  useEffect(() => {
    if (!order || order._id !== id || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, id, order, successPay]);

  // ✅ SUCCESS HANDLER (clean)
  const successPaymentHandler = (details) => {
    console.log(details);
    dispatch(payOrder(order._id, details));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2 className="my-4">Order {order?._id}</h2>
                  <h2>Shipping</h2>
                  <strong>Name: </strong> {order.user.name}
                  <p>
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city}{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant="success">
                      Delivered on {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Delivered</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>

                  {order.isPaid ? (
                    <Message variant="success">Paid on {order.paidAt}</Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>

                  {order.orderItems.length === 0 ? (
                    <Message>Order is empty</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image src={item.image} alt={item.name} fluid />
                            </Col>

                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>

                            <Col md={4}>
                              {item.qty} x ${item.price} = $
                              {item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  {!order.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && <Loader />}

                      <PayPalScriptProvider
                        options={{
                          "client-id":
                            "ARlNekph97c2Q88J9YkpGJRnSX5mggetVuprMsg7zKJsYBYVpAXaK_76Vj_hGe3omo1amrH27snNFrWc",
                        }}
                      >
                        <PayPalButtons
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              purchase_units: [
                                {
                                  amount: {
                                    currency_code: "USD",
                                    value: Number(order.totalPrice).toFixed(2),
                                  },
                                },
                              ],
                            });
                          }}
                          onApprove={(data, actions) => {
                            return actions.order.capture().then((details) => {
                              successPaymentHandler(details); // ✅ clean
                            });
                          }}
                        />
                      </PayPalScriptProvider>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderScreen;
