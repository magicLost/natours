import { AppState } from "./hooks/App/app";
import { FORM_TYPE } from "./data/feedback_forms_data";
import { IHiddenField } from "./container/Forms/interfaces";
import { ModalType } from "./component/Modal/Modal";

class AppController {
  modalType: ModalType = "CENTER";
  modalChildrenType: FORM_TYPE | "MENU" = "CALL_ME";
  hiddenFields: IHiddenField[] = [];

  setState: React.Dispatch<
    ((prevState: AppState) => AppState) | AppState
  > | null = null;

  onEndScrollPage = () => {
    if (this.setState === null) throw new Error("No setState");

    this.setState(
      (prevState: AppState): AppState => {
        return {
          ...prevState,
          isShowFooter: true
        };
      }
    );
  };

  onShowMenu = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    this.showModal("LEFT_TAB", "MENU", []);
  };

  onShowCallMeForm = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    this.showModal("CENTER", "CALL_ME", []);
  };

  onShowCalcPriceForm = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    this.showModal("CENTER", "CALC_PRICE", []);
  };

  onShowFeedbackForm = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    this.showModal("CENTER", "FEEDBACK", []);
  };

  onShowWannaTheSameForm = (photoName: string) => {
    const hiddenFields: IHiddenField[] = [
      {
        name: "PHOTO_NAME",
        value: photoName
      }
    ];

    this.showModal("CENTER", "FEEDBACK", hiddenFields);
  };

  onHideModal = (event: any) => {
    //event.preventDefault();
    //event.stopPropagation();

    this.hideModal();
  };

  private showModal = (
    modalType: ModalType,
    modalChildrenType: FORM_TYPE | "MENU",
    hiddenFields: IHiddenField[]
  ) => {
    /* if (
      modalType === undefined ||
      modalChildrenType === undefined
    )
      throw new Error("No modalType or modalChildrenType"); */

    this.modalType = modalType;
    this.modalChildrenType = modalChildrenType;
    this.hiddenFields = hiddenFields ? hiddenFields : [];

    if (this.setState === null) throw new Error("No setState");

    this.setState(
      (prevState: AppState): AppState => {
        return {
          ...prevState,
          isShowModalFromTop: modalType === "CENTER" ? true : false,
          isShowModalFromLeft: modalType === "LEFT_TAB" ? true : false
        };
      }
    );
  };

  private hideModal = () => {
    this.hiddenFields = [];

    if (this.setState === null) throw new Error("No setState");

    this.setState(
      (prevState: AppState): AppState => {
        return {
          ...prevState,
          isShowModalFromLeft: false,
          isShowModalFromTop: false
        };
      }
    );
  };
}

export default AppController;
