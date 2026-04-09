import { createRoot } from "react-dom/client";
import "./assets/bootstrap.min.css";
import "./index.css";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
