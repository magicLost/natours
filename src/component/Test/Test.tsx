import React, { useEffect } from "react";
import { doSomething } from "./Test.helper";

const Test = () => {
  useEffect(() => {
    doSomething();
  }, []);

  return (
    <div>
      <p>Hello</p>
    </div>
  );
};

export default Test;
