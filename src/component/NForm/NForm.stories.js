import NForm from "./NForm";

import React from "react";
import { action } from "@storybook/addon-actions";
import { loginElementsMap } from "react-components-lib-lost/data/form/login_form_data";
import LoginFormModel from "react-components-lib-lost/container/Forms/LoginForm/LoginFormModel/LoginFormModel";

const formModel = new LoginFormModel();
const initState = formModel.getFormElementsInitState(loginElementsMap);

export default {
  component: NForm,
  title: "NForm",
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
    <NForm
      elementsDescs={loginElementsMap}
      formElementsState={initState}
      formError={""}
      formMessage={""}
      onSubmit={action("onChange")}
      onClear={action("onChange")}
      onChange={action("onChange")}
      //children,
      submitButtonLabel="Login"
      isLoading={false}
    />
  );
};
