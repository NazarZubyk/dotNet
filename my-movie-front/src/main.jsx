import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./components/pages/error/ErrorPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary 
      fallbackRender={ErrorPage}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
