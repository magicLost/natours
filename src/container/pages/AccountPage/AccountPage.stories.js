import AccountPage from "./AccountPage";

import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: AccountPage,
  title: "Pages/AccountPage",
  decorators: [],
};

export const Default = () => {
  return <AccountPage />;
};
