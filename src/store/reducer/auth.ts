import { TAUTH_ACTION } from "../action";

export interface IUserData {
  name: string;
  photo: string;
}

const getInitState = (): { user: IUserData } => {
  let userStr = "";
  if (document.querySelector('meta[name="auth"]')) {
    userStr = (document.querySelector('meta[name="auth"]') as any).getAttribute(
      "content"
    );
    console.log("userStr", userStr);
  } else {
    throw new Error("No meta auth");
  }

  if (userStr !== "") {
    const user = JSON.parse(userStr);
    return {
      user: {
        name: user.name,
        photo: user.photo,
      },
    };
  } else {
    return {
      user: {
        name: "",
        photo: "",
      },
    };
  }
};

const initialState: { user: IUserData } = getInitState();

export interface IAuthAction {
  type: TAUTH_ACTION;
  user: IUserData;
}

const reducer = (state = initialState, action: IAuthAction) => {
  console.log("[AUTH_ACTION]", action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "LOG_OUT_USER":
      return {
        ...state,
        user: {
          name: "",
          photo: "",
        },
      };

    default:
      return state;
  }
};

export default reducer;
