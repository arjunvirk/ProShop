import Footer from "./components/Footer";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <div>
      <Header />
      <Container>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
