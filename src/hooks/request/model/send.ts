import { sendPostWithJsonResponse } from "utils-library-lost/Fetch/Fetch";
import { IJsonResponseError, IJsonResponse } from "../usePostRequest";

export const send = async <RESPONSE_DATA_TYPE>(
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
