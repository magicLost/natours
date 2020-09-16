import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "typeface-roboto";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import authReducer from "./store/reducer/auth";
import alertReducer from "./store/reducer/alert";
import modalReducer from "./store/reducer/modal";
import { BrowserRouter } from "react-router-dom";

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

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
