import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import { doSomething } from "./Test.helper";

import Test from "./Test";

jest.mock("./Test.helper", () => {
  //const originalModule = jest.requireActual("./Test");

  return {
    __esModule: true,
    //...originalModule,
    doSomething: jest.fn(),
  };
});

describe("Test", () => {
  let _render = null;

  describe("Render", () => {
    beforeEach(() => {
      _render = render(<Test />);
    });

    afterEach(cleanup);

    test("It must render Hello and it must call doSomething", () => {
      const logos = _render.getAllByText("Hello");

      expect(doSomething).toHaveBeenCalledTimes(1);

      expect(logos).toHaveLength(1);

      _render.rerender(<Test />);

      expect(doSomething).toHaveBeenCalledTimes(1);
    });
  });
});
