import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import { AUTH_USER } from "./../../../hooks/auth/auth";

import { MockedProvider } from "@apollo/react-testing";

import Header from "./Header";
//import classes from "./Header.module.scss";

const mockQueries = [
  {
    request: {
      query: AUTH_USER,
    },
    result: {
      data: {
        authUser: {
          //_id: "1243dtr2355r34t",
          name: "Lizzy Waive",
          email: "lizzy@mainModule.ru",
          //role: "user",
          photo: "lizzy-2.jpg",
        },
      },
    },
  },
];

//it must render logo
//it useAuthUser and then render auth fragment
describe("Header", () => {
  let _render = null;

  describe("Render", () => {
    beforeEach(() => {
      _render = render(
        <MockedProvider mocks={mockQueries} addTypename={false}>
          <Header />
        </MockedProvider>
      );
    });

    afterEach(cleanup);

    test("It must render logo and Sceleton", () => {
      const logos = _render.getAllByAltText("Natours logo");

      expect(logos).toHaveLength(1);
    });
  });
});
