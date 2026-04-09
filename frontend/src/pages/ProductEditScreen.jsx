import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStocks, setCountInStocks] = useState(0);
  const [uploading, setUploading] = useState(false);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== id) {
        dispatch(listProductDetails(id));
      } else {
        setName(product.name || "");
        setImage(product.image || "");
        setPrice(product.price || 0);
        setDescription(product.description || "");
        setBrand(product.brand || "");
        setCategory(product.category || "");
        setCountInStocks(product.countInStocks || 0);
      }
    }
  }, [dispatch, id, product, successUpdate, navigate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);

    try {
      const res = await fetch("http://localhost:8080/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setImage(data.image);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  // 🔥 Submit update
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        image,
        description,
        brand,
        category,
        countInStocks,
      }),
    );
  };

  return (
    <Container>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <Row className="justify-content-md-center mt-4">
        <Col xs={12} md={6}>
          <h1>Edit Product</h1>

          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group className="my-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="my-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={price || 0}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="my-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image URL"
                  value={image || ""}
                  onChange={(e) => setImage(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="image-file" className="mt-2">
                <Form.Label>Or Upload File</Form.Label>
                <Form.Control type="file" onChange={uploadFileHandler} />
              </Form.Group>

              {uploading && <Loader />}

              <Form.Group className="my-3">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  value={brand || ""}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="my-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  value={category || ""}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="my-3">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type="number"
                  value={countInStocks || 0}
                  onChange={(e) => setCountInStocks(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="my-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description || ""}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Button type="submit" variant="dark">
                Update
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductEditScreen;
