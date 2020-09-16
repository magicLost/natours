//import { sendPostWithJsonResponse } from "utils-library-lost/Fetch/Fetch";
import { useState } from "react";
import { send } from "./model/send";

export type RESPONSE_STATUS = "SUCCESS" | "FAIL" | "ERROR";

export interface IJsonResponseError {
  message: string;
  stack?: string;
  name?: string;
}

export interface IJsonResponse<T> {
  status: RESPONSE_STATUS;
  data: T;
  error: IJsonResponseError;
}

/* export const send = async <RESPONSE_DATA_TYPE>(
  url: string,
  formData: FormData,
  setState: any,
  onSuccess?: (data: RESPONSE_DATA_TYPE) => void | undefined,
  onServerError?: () => void | undefined,
  onFail?: (error: IJsonResponseError) => void | undefined
) => {
  try {
    const result = await sendPostWithJsonResponse<
      IJsonResponse<RESPONSE_DATA_TYPE>
    >(url, formData);

    console.log("RESPONSE DATA", result.data);

    if (result.status && result.status === "SUCCESS") {
      //console.log(data);

      setState({
        isLoading: false,
        isServerError: false,
        isFail: false,
        isSuccess: true,
        data: result.data,
        error: undefined,
      });

      if (onSuccess) onSuccess(result.data);
    } else if (result.status && result.status === "FAIL") {
      //console.log(data);

      setState({
        isLoading: false,
        isServerError: false,
        isFail: true,
        isSuccess: false,
        data: undefined,
        error: result.error,
      });
      if (onFail) onFail(result.error);
    } else {
      setState({
        isLoading: false,
        isServerError: true,
        isFail: false,
        isSuccess: false,
        data: undefined,
        error: undefined,
      });
      if (onServerError) onServerError();
    }
  } catch (error) {
    console.log("[RESPONSE ERROR] ", error);
    setState({
      isLoading: false,
      isServerError: true,
      isFail: false,
      isSuccess: false,
      data: undefined,
      error: undefined,
    });
    if (onServerError) onServerError();
  }
};
 */
interface IUsePostRequestState<RESPONSE_DATA_TYPE> {
  isLoading: boolean;
  isServerError: boolean;
  isFail: boolean;
  isSuccess: boolean;
  data: RESPONSE_DATA_TYPE | undefined;
  error: IJsonResponseError | undefined;
}

export const getToken = () => {
  if (document.querySelector('meta[name="csrf-token"]')) {
    return (document.querySelector(
      'meta[name="csrf-token"]'
    ) as any).getAttribute("content");
  } else {
    throw new Error("No meta token");
  }
};

const token = getToken();

export const usePostRequest = <RESPONSE_DATA_TYPE>() => {
  const sendRequest = async (
    url: string,
    formData: FormData,
    onSuccess?: (data: RESPONSE_DATA_TYPE) => void | undefined,
    onServerError?: () => void | undefined,
    onFail?: (error: IJsonResponseError) => void | undefined
  ) => {
    //add token to form data
    formData.set("_csrf", token);
    await send(url, formData, setState, onSuccess, onServerError, onFail);
  };

  const initState: IUsePostRequestState<RESPONSE_DATA_TYPE> = {
    isLoading: false,
    isServerError: false,
    isFail: false,
    isSuccess: false,
    data: undefined,
    error: undefined,
  };
  /* isLoading, isServerError, isFail, isSuccess */
  const [state, setState] = useState(initState);

  return {
    sendRequest: sendRequest,
    isLoading: state.isLoading,
    isServerError: state.isServerError,
    isFail: state.isFail,
    isSuccess: state.isSuccess,
    data: state.data,
    error: state.error,
  };
};
