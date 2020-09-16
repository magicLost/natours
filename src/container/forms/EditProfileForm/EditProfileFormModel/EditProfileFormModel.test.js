import EditProfileFormModel from "./EditProfileFormModel";
import { editProfileElementsMap } from "./../../../../data/form/edit_profile_data";

describe("EditProfileFormModel", () => {
  const model = new EditProfileFormModel({}, () => "", {
    name: "John",
    photo: "photo",
    email: "test@mail.ru",
  });

  describe("getFormElementsInitState", () => {
    test("It must return init state with user values", () => {
      const state = model.getFormElementsInitState(editProfileElementsMap);

      expect(state.get("NAME").value).toEqual("John");
      expect(state.get("EMAIL").value).toEqual("test@mail.ru");
      expect(state.get("PHOTO").value).toEqual("");
    });
  });

  describe("validateOnSubmit", () => {
    test("It must return init state with user values", () => {
      const state = model.getFormElementsInitState(editProfileElementsMap);
      const result = model.validateOnSubmit(state);

      expect(result).toEqual("Вы ничего не изменили.");
    });
  });
});
