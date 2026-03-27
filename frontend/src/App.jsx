import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import ProductScreen from "./pages/ProductScreen";

const App = () => {
  return (
    <div>
      <Header />
      <Container>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
          </Routes>
        </main>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
