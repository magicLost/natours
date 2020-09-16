import React from "react";
import { action } from "@storybook/addon-actions";
import { LoginForm } from "./LoginForm";

export default {
  component: LoginForm,
  title: "Forms/LoginForm",
  decorators: [
    /*  (story) => (
      <div
        style={{
          //backgroundColor: "rgba(0,0,0,0.05)",
          //borderRadius: "5px",
          width: "700px",
          //height: "300px",
          margin: "20px auto",
          //padding: "20px",
        }}
      >
        {story()}
      </div>
    ), */
  ],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

/* const sendPostWithJsonResponse = (url, formData) => {
  return new Promise((resolve, reject) => {
    resolve({
      status: "SUCCESS",
      data: { user: { name: "John", photo: "photo" } },
    });
  });
}; */

export const Default = () => {
  return (
    <>
      <LoginForm
        onSuccessHandler={action("onSuccessHandler")}
        showAlert={action("showAlert")}
        setUser={action("setUser")}
      />
    </>
  );
};
