import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";

import HomeScreen from "./pages/HomeScreen";
import ProductScreen from "./pages/ProductScreen";
import CartScreen from "./pages/CartScreen";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import ProfileScreen from "./pages/ProfileScreen";
import ShippingScreen from "./pages/ShippingScreen";
import PaymentScreen from "./pages/PaymentScreen";
import PlaceorderScreen from "./pages/PlaceorderScreen";
import OrderScreen from "./pages/OrderScreen";

import UserListScreen from "./pages/UserListScreen";
import UserEditScreen from "./pages/UserEditScreen";
import ProductListScreen from "./pages/ProductLisScreen";
import ProductEditScreen from "./pages/ProductEditScreen";
import OrderListScreen from "./pages/OrderListScreen";

const App = () => {
  return (
    <div className="app-shell">
      <Header />
      <Container className="py-3 py-md-4">
        <main className="app-main fade-in">
          <Routes>
            {/* USER ROUTES */}
            <Route path="/" element={<HomeScreen />} />
            <Route path="/search/:keyword" element={<HomeScreen />} />
            <Route path="/page/:pageNumber" element={<HomeScreen />} />
            <Route
              path="/search/:keyword/page/:pageNumber"
              element={<HomeScreen />}
            />

            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:id?" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceorderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />

            {/* ADMIN ROUTES */}
            <Route path="/admin/userlist" element={<UserListScreen />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />

            {/* 🔥 IMPORTANT FIX */}
            <Route path="/admin/productlist" element={<ProductListScreen />} />
            <Route
              path="/admin/productlist/:pageNumber"
              element={<ProductListScreen />}
            />

            <Route
              path="/admin/product/:id/edit"
              element={<ProductEditScreen />}
            />

            <Route path="/admin/orderlist" element={<OrderListScreen />} />
          </Routes>
        </main>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
