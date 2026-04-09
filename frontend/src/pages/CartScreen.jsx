import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <Row className="g-4 fade-in">
      <Col md={8}>
        <h1 className="section-title my-3">SHOPPING CART</h1>
        {cartItems.length === 0 ? (
          <h5>
            your cart is empty <Link to="/">Go Back</Link>
          </h5>
        ) : (
          <ListGroup
            variant="flush"
            className="rounded-4 overflow-hidden shadow-sm"
          >
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row className="align-items-center">
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid />
                  </Col>

                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col md={2} className="fw-semibold text-primary">
                    ${item.price}
                  </Col>

                  <Col xs={8} md={2}>
                    <Form.Control
                      as="select"
                      size="sm"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value)),
                        )
                      }
                    >
                      {[...Array(item.countInStocks).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col
                    xs={4}
                    md={2}
                    className="d-flex align-items-center justify-content-end"
                  >
                    <Button
                      type="button"
                      variant="light"
                      size="sm"
                      className="rounded-circle"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card className="my-3 border-0 rounded-4 shadow-sm">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                SUBTOTAL (
                {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})
                ITEMS
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-dark w-100 rounded-pill py-2 shadow-sm"
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
              >
                PROCEED TO CHECKOUT
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
