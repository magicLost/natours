import React from "react";
import { action } from "@storybook/addon-actions";
//import { withKnobs, object } from "@storybook/addon-knobs/react";
//import { sendPostWithJsonResponse } from "utils-library-lost/Fetch/Fetch";
import { EditProfileForm } from "./EditProfileForm";
//import Form from "./../../../component/Form/Form";

export default {
  component: EditProfileForm,
  title: "Forms/EditProfileForm",
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
      data: {
        user: { name: "John", photo: "photo", email: "example@mail.ru" },
      },
    });
  });
};

export const Default = () => {
  return (
    <EditProfileForm
      url={`url`}
      sendPostWithJsonResponse={sendPostWithJsonResponse}
      successMessage={"Все пучком."}
      getToken={() => "token"}
      showAlert={(msg, type) => {
        console.log("[SHOW_ALERT", msg, type);
      }}
      setUser={action("setUser")}
      onSuccess={action("onSuccess")}
      userData={{
        name: "Sia Smith",
        photo: "user-2.jpg",
        email: "example@mail.ru",
      }}
    />
  );
};
