import { TMODAL_ACTION } from "../action";

export interface IModalState {
  isShow: boolean;
}

const initialState: IModalState = {
  isShow: false,
};

export interface IModalAction {
  type: TMODAL_ACTION;
}

const reducer = (state = initialState, action: IModalAction) => {
  console.log("[MODAL_ACTION]", action);
  switch (action.type) {
    case "SHOW_MODAL":
      return {
        ...state,
        isShow: true,
      };

    case "HIDE_MODAL":
      return {
        ...state,
        isShow: false,
        //message: "",
      };

    default:
      return state;
  }
};

export default reducer;
