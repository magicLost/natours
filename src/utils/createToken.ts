import { TFormElementsState } from "react-components-lib-lost/component/Form/Form";

export const createToken = <T>(
  stateFormElements: TFormElementsState<T>
): string => {
  const elementsValues: string[] = [];

  stateFormElements.forEach((elemDesc, key, map) => {
    if (elemDesc.value) elementsValues.push(elemDesc.value);
  });

  let stringToHash = elementsValues.join("_");

  if (stringToHash.length <= 0) throw new Error("Create token empty values");

  stringToHash = encodeURI(stringToHash).substr(0, 64);

  //console.log(`ALL - ${name + email + phone}`);

  //console.log(`ENCODE - ${stringToHash}`);

  let token = btoa(stringToHash);

  //console.log(`TOKEN - ${token}`);

  if (token.length > 64) {
    token = token.substr(0, 64);
  }

  return token;
};
