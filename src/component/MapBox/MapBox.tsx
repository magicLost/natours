import React, { useState, useEffect, useRef } from "react";
import classes from "./MapBox.module.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, {
  WebMercatorViewport,
  FlyToInterpolator,
} from "react-map-gl";
import { LngLatBounds } from "mapbox-gl";
import MarkerWithPopup from "../MarkerWithPopup/MarkerWithPopup";
import { ILocation } from "../Tour/Tour";

const accessToken =
  "pk.eyJ1IjoidGlra2lyaWtraSIsImEiOiJjazhya3h6MTYwMDV3M2Vwa3BsZnE0aDdqIn0.ADvqK1YOlJvBMCk9KiZOrw";

interface MapBoxProps {
  locations: ILocation[];
}

/* const getMarkers = (locations: any[]) => {
  return locations.map((location, index) => {
    return (
      <Marker
        key={`marker_${index}`}
        latitude={location.coordinates[1]}
        longitude={location.coordinates[0]}
        offsetLeft={-16}
        offsetTop={-40}
      >
        <div className={"marker"}></div>
      </Marker>
    );
  });
};

const getPopups = (locations: any[]) => {
  return locations.map((location, index) => {
    return (
      <Popup
        key={`popup_${index}`}
        latitude={location.coordinates[1]}
        longitude={location.coordinates[0]}
        closeButton={true}
        closeOnClick={true}
        onClose={() => console.log("close")}
        //offsetLeft={-16}
        offsetTop={-30}
      >
        <p>{`Day ${location.day}: ${location.description}`}</p>
      </Popup>
    );
  });
}; */

const getMarkersWithPopups = (locations: any[]) => {
  return locations.map((location, index) => {
    return (
      <MarkerWithPopup
        key={`popup_${index}`}
        coordinates={location.coordinates}
        popupText={`Day ${location.day}: ${location.description}`}
        isShowPopupByDefault={true}
      />
    );
  });
};

interface VIEWPORT_FOR_WebMercatorViewport {
  latitude: number;
  longitude: number;
  zoom: number;
  width: number;
  height: number;
}

const MapBox = ({ locations }: MapBoxProps) => {
  const mapRef = useRef(null);
  const [viewport, setViewport] = useState({
    latitude: 40.198125,
    longitude: -100.987418,
    zoom: 3,
  });

  useEffect(() => {
    /* FIT SCREEN TO OUR LOCATIONS POINTS */
    //console.log((mapRef.current as any)._width);
    const bounds = new LngLatBounds();
    locations.forEach((location) => {
      bounds.extend(location.coordinates as any);
    });

    console.log(bounds.toArray());
    console.log(`VIEWPORT`, viewport);

    const viewportForWebMercator: VIEWPORT_FOR_WebMercatorViewport = {
      ...viewport,
      width: (mapRef.current as any)._width,
      height: (mapRef.current as any)._height,
    };

    const { longitude, latitude, zoom } = new WebMercatorViewport(
      viewportForWebMercator
    ).fitBounds(bounds.toArray() as any, {
      padding: {
        top: 200,
        bottom: 200,
        left: 100,
        right: 100,
      },
      //offset: [200, 200],
    });
    const newViewport = {
      longitude,
      latitude,
      zoom,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
    };
    setViewport(newViewport);
  }, []);

  /* const markers = getMarkers(locations);

  const popups = getPopups(locations); */

  const markersWithPopups = getMarkersWithPopups(locations);

  /* console.log(
    "[RENDER MAPBOX]",
    viewport.latitude,
    viewport.longitude,
    viewport.zoom
  ); */

  return (
    <>
      <ReactMapGL
        {...viewport}
        width={"100%"}
        height={"100%"}
        ref={mapRef}
        mapStyle="mapbox://styles/tikkirikki/ck2kj57900bk61cobq8t1nry8"
        mapboxApiAccessToken={accessToken}
        onViewportChange={setViewport}
        scrollZoom={false}
      >
        {markersWithPopups}
      </ReactMapGL>
    </>
  );
};

export default MapBox;

/* import React, { useState, useEffect, useRef, MutableRefObject } from "react";
import classes from "./MapBox.module.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoidGlra2lyaWtraSIsImEiOiJjazhya3h6MTYwMDV3M2Vwa3BsZnE0aDdqIn0.ADvqK1YOlJvBMCk9KiZOrw";

interface MapBoxProps {}

const MapBox = ({}: MapBoxProps) => {
  const mapRef: MutableRefObject<mapboxgl.Map | undefined> = useRef(undefined);
  const container: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const [state, setState] = useState({
    //width: 100,
    //height: 400,
    lat: 37.7577,
    lng: -122.4376,
    zoom: 1,
  });

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: container.current as HTMLDivElement,
      style: "mapbox://styles/tikkirikki/ck2kj57900bk61cobq8t1nry8",
      center: [state.lng, state.lat],
      zoom: state.zoom,
      //interactive: false,
    });

    mapRef.current.on("move", () => {
      //console.log("move", mapRef.current.getCenter().lng);
      if (mapRef.current === undefined) throw new Error("No mapboxgl ...");
      setState({
        lng: parseFloat(mapRef.current.getCenter().lng.toFixed(4)),
        lat: parseFloat(mapRef.current.getCenter().lat.toFixed(4)),
        zoom: parseFloat(mapRef.current.getZoom().toFixed(2)),
      });
    });
  }, []);

  console.log("[RENDER MAPBOX]", state.lat, state.lng, state.zoom);

  return <div ref={container} className={classes.MapBox}></div>;
};

export default MapBox;
 */
