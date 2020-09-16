import React from "react";
import { action } from "@storybook/addon-actions";
import { EditProfileForm } from "./EditProfileForm";

export default {
  component: EditProfileForm,
  title: "Forms/EditProfileForm",
  decorators: [
    (story) => (
      <div
        style={{
          //backgroundColor: "rgba(0,0,0,0.05)",
          //borderRadius: "5px",
          width: "600px",
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

export const Default = () => {
  return (
    <>
      <EditProfileForm
        onSuccessHandler={action("onSuccessHandler")}
        showAlert={(msg, type) => console.log("SHOW ALERT", msg, type)}
        setUser={action("setUser")}
        userData={{
          name: "Kelly Brouder",
          email: "kelly@gmail.com",
          photo: "user-3.jpg",
        }}
      />
    </>
  );
};
