import NInput from "./NInput";

import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: NInput,
  title: "FormElements/Input",
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

export const Default = () => {
  return (
    <NInput
      elementAttrs={{
        type: "text",
        placeholder: "Selma Hayek",
        required: true,
        minLength: 5,
      }}
      disabled={false}
      onChange={action("onChange")}
      value={""}
      name={"name"}
      labelValue={"Super input"}
      error=""
    />
  );
};

export const Error = () => {
  return (
    <NInput
      elementAttrs={{
        type: "email",
        placeholder: "you@example.com",
        required: true,
        minLength: 5,
      }}
      disabled={false}
      onChange={action("onChange")}
      value={""}
      name={"name"}
      labelValue={"Email address"}
      error="error"
    />
  );
};
