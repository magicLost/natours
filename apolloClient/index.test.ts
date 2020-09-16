/* import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

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
 */
