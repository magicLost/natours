import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./style.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import authReducer from "./store/reducer/auth";
import alertReducer from "./store/reducer/alert";
import modalReducer from "./store/reducer/modal";

const reducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  modal: modalReducer,
});

const store = createStore(
  reducer /* preloadedState, */,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

//render | hydrate
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
