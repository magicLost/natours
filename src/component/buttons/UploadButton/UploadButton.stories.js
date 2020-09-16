import React from "react";
import { action } from "@storybook/addon-actions";
import UploadButton from "./UploadButton";

export default {
  component: UploadButton,
  title: "Buttons/UploadButton",
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

export const Default = () => {
  return (
    <>
      <UploadButton photo={"user-3.jpg"} />
    </>
  );
};
