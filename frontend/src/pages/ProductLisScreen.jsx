import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useNavigate, useParams } from "react-router-dom";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";

import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";
import Paginate from "../components/Paginate";

const ProductListScreen = () => {
  const { keyword = "", pageNumber = 1 } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className="align-items-center mb-3">
        <Col xs={6}>
          <h1 className="h4 mb-0">Products</h1>
        </Col>
        <Col xs={6} className="text-end">
          <Button
            className="btn-sm rounded-pill px-3"
            onClick={createProductHandler}
          >
            + Create
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {/* ✅ MOBILE VIEW (CARDS) */}
          <div className="d-md-none">
            {products.map((product) => (
              <div
                key={product._id}
                className="p-3 mb-3 rounded-4 shadow-sm border bg-white"
              >
                <p className="small text-muted mb-1">
                  ID: {product._id.substring(0, 8)}...
                </p>

                <h6 className="mb-1">{product.name}</h6>

                <p className="mb-1">
                  <strong>Price:</strong>{" "}
                  <span className="text-primary fw-semibold">
                    ${product.price}
                  </span>
                </p>

                <p className="mb-1">
                  <strong>Category:</strong> {product.category}
                </p>

                <p className="mb-2">
                  <strong>Brand:</strong> {product.brand}
                </p>

                <div className="d-flex gap-2">
                  <Button
                    variant="dark"
                    size="sm"
                    className="rounded-pill w-50"
                    onClick={() => {
                      dispatch({ type: USER_DETAILS_RESET });
                      navigate(`/admin/product/${product._id}/edit`);
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    className="rounded-pill w-50"
                    onClick={() => deleteHandler(product._id)}
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
                    <th>Price</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td className="small text-muted">
                        {product._id.substring(0, 8)}...
                      </td>

                      <td>{product.name}</td>

                      <td className="fw-semibold text-primary">
                        ${product.price}
                      </td>

                      <td>{product.category}</td>

                      <td>{product.brand}</td>

                      <td>
                        <div className="d-flex gap-1">
                          <Button
                            variant="dark"
                            size="sm"
                            className="rounded-pill px-3"
                            onClick={() => {
                              dispatch({ type: USER_DETAILS_RESET });
                              navigate(`/admin/product/${product._id}/edit`);
                            }}
                          >
                            Edit
                          </Button>

                          <Button
                            variant="danger"
                            size="sm"
                            className="rounded-pill px-3"
                            onClick={() => deleteHandler(product._id)}
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

          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
