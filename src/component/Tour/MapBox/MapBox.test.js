import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

import ReactMapGL, {
  WebMercatorViewport,
  FlyToInterpolator,
} from "react-map-gl";
//import { LngLatBounds } from "mapbox-gl";

//import MapBox from "./MapBox";
//import classes from "./MapBox.module.scss";

window = {
  URL: {
    createObjectURL: jest.fn(),
  },
};

describe("MapBox", () => {
  let _render = null;

  describe("Render and props test", () => {
    beforeEach(() => {
      //_render = render(<MapBox />);
    });

    afterEach(cleanup);

    describe("WebMercatorViewport", () => {
      test("WE MUST ADD WIDTH AND HEIGHT TO OUR VIEWPORT OBJECT THAT WE PASS TO WebMercatorViewport", () => {
        const bounds = [
          [-116.107963, 34.011646],
          [-111.376161, 37.198125],
        ];

        const viewport = {
          latitude: 40.198125,
          longitude: -100.987418,
          width: 1000,
          height: 1000,
          zoom: 3,
        };

        const { longitude, latitude, zoom } = new WebMercatorViewport(
          viewport
        ).fitBounds(
          [
            [-122.4, 37.7],
            [-122.5, 37.8],
          ],
          {
            padding: 20,
            //offset: [200, 200],
          }
        );

        expect(longitude).toEqual(-122.45000000000032);
      });
    });
  });
});
