import { comma, haveFloat } from '../../../valueButtonCalc/constant';
import { equalsOperation } from './equals';
import { Icalc } from '../reducer';
import { replaceLastElementInArray } from './replaceLastElement';

export const mathOperation = (state: Icalc, value: string) => {
  let stateNumber = [...state.num];
  let view = state.viewNumber;

  if (stateNumber.length > 2) {
    stateNumber = [equalsOperation(state).equals];
    view = stateNumber[0].replace(haveFloat, comma);
  }

  const pastOperationResult = state.reset ? [state.equals] : stateNumber;

  const numberRepeatSimbol = state.simbol
    ? replaceLastElementInArray(pastOperationResult, value)
    : [...pastOperationResult, value];

  return {
    ...state,
    num: numberRepeatSimbol,
    simbol: value,
    viewNumber: view,
    float: numberRepeatSimbol.join(' ').match(haveFloat) ? true : false,
    reset: false,
    lastOperation: [],
  };
};
