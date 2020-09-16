import React, { useState, useRef } from "react";
import Link from "next/link";

const getData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve("OUR DATA");
    }, 1000);
  });
};

const useSomeThing = () => {
  const sdata = useRef("");

  const [state, setState] = useState({
    loading: sdata.current ? false : true,
    error: "",
  });

  if (!sdata.current) {
    getData().then((data: string) => {
      sdata.current = data;
      setState({
        loading: false,
        error: "",
      });
    });
  }

  return {
    data: sdata.current,
    loading: state.loading,
    error: state.error,
  };
};

const Test = () => {
  const { data, loading } = useSomeThing();

  return (
    <>
      <h4>Hello from test page.</h4>
      {loading ? <p>...Loading</p> : <p>Our data - {data}</p>}
      <Link href="/">Go home.</Link>
    </>
  );
};

export default Test;
