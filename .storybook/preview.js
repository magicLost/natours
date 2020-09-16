import { addDecorator } from "@storybook/react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import authReducer from "./../src/store/reducer/auth";
import alertReducer from "./../src/store/reducer/alert";
import modalReducer from "./../src/store/reducer/modal";
import React from "react";

const reducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  modal: modalReducer,
});

const store = createStore(reducer /* preloadedState, */);

addDecorator((story) => <Provider store={store}>{story()}</Provider>);
