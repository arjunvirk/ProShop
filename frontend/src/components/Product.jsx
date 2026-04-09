import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="product-card my-2 p-3 rounded-4 border-0 shadow-sm h-100">
      <Link
        to={`/product/${product._id}`}
        className="overflow-hidden rounded-4"
      >
        <Card.Img
          className="product-card-image"
          src={product.image}
          alt={product.name}
        />
      </Link>

      <Card.Body className="d-flex flex-column">
        <Link to={`/product/${product._id}`} className="text-decoration-none">
          <Card.Title className="product-card-title">{product.name}</Card.Title>
        </Link>

        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
          color="#facc15"
        />

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <h5 className="product-card-price mb-0">${product.price}</h5>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
