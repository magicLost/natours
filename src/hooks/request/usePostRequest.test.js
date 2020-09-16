import { usePostRequest } from "./usePostRequest";
import { send } from "./model/send";
import { useState } from "react";

jest.mock("react", () => {
  return {
    __esModule: true,
    useState: jest.fn().mockReturnValue([{}, jest.fn()]),
  };
});

jest.mock("./model/send", () => {
  return {
    __esModule: true,
    send: jest.fn(),
  };
});

describe("usePostRequest", () => {
  test("", async () => {
    const { sendRequest } = usePostRequest();
    expect(useState).toHaveBeenCalledTimes(1);
    await sendRequest();
    expect(send).toHaveBeenCalledTimes(1);
  });
});
