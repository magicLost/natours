import { useApolloClient, useQuery } from "@apollo/react-hooks";
import { useAuthUser } from "./auth";

jest.mock("@apollo/react-hooks", () => {
  return {
    __esModule: true,
    useApolloClient: jest.fn(),
    useQuery: jest.fn(),
  };
});

const writeQuery = jest.fn();
const readQuery = jest.fn();

useApolloClient.mockReturnValue({
  writeQuery,
  readQuery,
});

const localStorageMock = {
  get: jest.fn(),
};

const user = {
  //_id: "1243dtr2355r34t",
  name: "Lizzy Waive",
  email: "lizzy@mainModule.ru",
  //role: "user",
  photo: "lizzy-2.jpg",
};

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("useAuthUser", () => {
  //check if exists saved user in query cache
  //check if exists saved user in local storage
  //save user to query cache
  //send request to isLogIn

  beforeEach(() => {
    writeQuery.mockClear();
    readQuery.mockClear();
    useApolloClient.mockClear();
    useQuery.mockClear();
    localStorageMock.get.mockClear();
  });

  test("If exists saved user in query cache we return him and skip useQuery", () => {
    useQuery.mockReturnValue({ data: undefined, loading: false, error: "" });

    readQuery.mockReturnValue(user);

    const { data, loading, error } = useAuthUser();

    expect(useApolloClient).toHaveBeenCalledTimes(1);
    expect(readQuery).toHaveBeenCalledTimes(1);
    expect(localStorageMock.get).toHaveBeenCalledTimes(0);
    expect(writeQuery).toHaveBeenCalledTimes(0);
    expect(useQuery).toHaveBeenCalledTimes(1);
    //expect(useQuery).toHaveBeenCalledWith({ skip: true });

    expect(data).toEqual(user);
    expect(loading).toEqual(false);
  });

  test("If exists saved user in local storage we save user to query cache and skip useQuery", () => {
    useQuery.mockReturnValue({ data: undefined, loading: false, error: "" });

    readQuery.mockReturnValue(null);
    localStorageMock.get.mockReturnValue(JSON.stringify(user));

    const { data, loading, error } = useAuthUser();

    expect(useApolloClient).toHaveBeenCalledTimes(1);
    expect(readQuery).toHaveBeenCalledTimes(1);
    expect(localStorageMock.get).toHaveBeenCalledTimes(1);
    expect(writeQuery).toHaveBeenCalledTimes(1);
    expect(useQuery).toHaveBeenCalledTimes(1);
    //expect(useQuery).toHaveBeenCalledWith({ skip: true });

    expect(data).toEqual(user);
    expect(loading).toEqual(false);
  });

  test("If no user cached we call useQuery", () => {
    useQuery.mockReturnValue({ data: { user }, loading: false, error: "" });
    readQuery.mockReturnValue(null);
    localStorageMock.get.mockReturnValue(undefined);

    const { data, loading, error } = useAuthUser();

    expect(useApolloClient).toHaveBeenCalledTimes(1);
    expect(readQuery).toHaveBeenCalledTimes(1);
    expect(localStorageMock.get).toHaveBeenCalledTimes(1);
    expect(writeQuery).toHaveBeenCalledTimes(0);
    expect(useQuery).toHaveBeenCalledTimes(1);
    //expect(useQuery).toHaveBeenCalledWith({ skip: true });

    expect(data).toEqual({ user });
    expect(loading).toEqual(false);
  });
});
