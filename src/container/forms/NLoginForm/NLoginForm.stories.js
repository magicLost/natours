import React from "react";
import { action } from "@storybook/addon-actions";
//import { withKnobs, object } from "@storybook/addon-knobs/react";
//import { sendPostWithJsonResponse } from "utils-library-lost/Fetch/Fetch";
import { NLoginForm } from "./NLoginForm";
//import Form from "./../../../component/Form/Form";

export default {
  component: NLoginForm,
  title: "Forms/NLoginForm",
  decorators: [
    (story) => (
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
    ),
  ],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const sendPostWithJsonResponse = (url, formData) => {
  return new Promise((resolve, reject) => {
    resolve({
      status: "SUCCESS",
      data: { user: { name: "John", photo: "photo" } },
    });
  });
};

export const Default = () => {
  return (
    <NLoginForm
      url={`url`}
      sendPostWithJsonResponse={sendPostWithJsonResponse}
      successMessage={"Все пучком."}
      getToken={() => "token"}
      showAlert={(msg, type) => {
        console.log("[SHOW_ALERT", msg, type);
      }}
      setUser={action("setUser")}
      onSuccess={action("onSuccess")}
    />
  );
};
