import React from "react";
import { action } from "@storybook/addon-actions";
//import { withKnobs, object } from "@storybook/addon-knobs/react";
import { Header } from "./Header";
import { BrowserRouter } from "react-router-dom";

export default {
  component: Header,
  title: "Header",
  decorators: [
    (story) => (
      <div
        style={
          {
            //backgroundColor: "rgba(0,0,0,0.05)",
            //borderRadius: "5px",
            //width: "700px",
            //height: "300px",
            //margin: "20px auto",
            //padding: "20px",
          }
        }
      >
        {story()}
      </div>
    ),
  ],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <BrowserRouter>
    <Header
      onShowLoginForm={action("onShowLoginForm")}
      onShowRegistrationForm={action("onShowRegistrationForm")}
    />
  </BrowserRouter>
);

export const LogedIn = () => (
  <BrowserRouter>
    <Header
      onShowLoginForm={action("onShowLoginForm")}
      onShowRegistrationForm={action("onShowRegistrationForm")}
      user={{ name: "Lourdes Browning", photo: "user-2.jpg" }}
    />
  </BrowserRouter>
);
