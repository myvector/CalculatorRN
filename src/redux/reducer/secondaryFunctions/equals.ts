import {
  comma,
  error,
  haveE,
  haveFloat,
  haveNumber,
  zero,
} from '../../../valueButtonCalc/constant';
import { checkFloatNumberAndReturnNormalizedData } from './float';
import { Icalc } from '../reducer';

const equalsOperation = (state: Icalc) => {
  const lengthLastOperation = getLongCut(state.num);
  if (
    (lengthLastOperation < 2 && !state.lastOperation.length) ||
    state.viewNumber == error
  ) {
    return state;
  }

  const repeatAct: string[] = [...state.num];
  const lastOperation = repeatAct.slice(-lengthLastOperation);

  const arrayOfOperations = checkNumber(lastOperation[lengthLastOperation - 1])
    ? state.lastOperation.length
      ? [...repeatAct, ...state.lastOperation]
      : [...repeatAct]
    : swap(lastOperation, repeatAct);

  const settingNormalize = checkFloatNumberAndReturnNormalizedData(
    arrayOfOperations,
    state.float
  );

  const result = cutLongResult(mathResult(settingNormalize));
  if (isNaN(parseFloat(result))) {
    return takeError(state);
  }

  const showFloatParams = result.match(haveFloat)
    ? { viewNumber: result.replace(haveFloat, comma), float: true }
    : { viewNumber: result };

  return {
    ...state,
    reset: true,
    ...showFloatParams,
    num: [result],
    simbol: false,
    lastOperation: state.num.length > 1 ? lastOperation : state.lastOperation,
    equals: result,
  };
};

interface ImathResult {
  mathOperation: string[];
  normalization: string | number;
}

const mathResult = (mathOperation: ImathResult) =>
  new Function(
    `return ( 
      ${mathOperation.mathOperation.join(' ')}
       ) /
      ${mathOperation.normalization}`
  )().toString();

const numberOfZeros = (
  additionalNumber: string,
  result: string,
  length: number
) => {
  const excess = length + additionalNumber.length - 12;
  const zero = `${excess + parseFloat(additionalNumber)}`;
  return `${result.slice(0, 11 - zero.length)}e${zero}`;
};

const cutLongResult = (result: string, additionalNumber: string = zero) => {
  let length = result.length;

  if (length > 12 && result.match(haveFloat)) {
    return `${result.slice(0, 12)}`;
  } else if (length > 12 && result.match(haveE)) {
    [additionalNumber, result] = haveEnumber(result);
    return numberOfZeros(additionalNumber, result, length);
  } else if (length > 12) {
    return numberOfZeros(additionalNumber, result, length);
  } else if (additionalNumber !== zero) {
    let repeat = `${result}${'e' + additionalNumber}`;
    repeat = cutLongResult(repeat);
    return repeat;
  }

  return result.toString();
};

const haveEnumber = (number: string) => {
  const positionE = number.search('e');
  if (positionE !== -1) {
    number.slice(positionE + 1);
    return [number.slice(positionE + 1), number.slice(0, positionE)];
  }
  return [zero, number];
};

const swap = (swapArray: string[], repeatAct: string[] = []) => [
  ...repeatAct,
  ([swapArray[0], swapArray[1]] = [swapArray[1], swapArray[0]])[1],
];

const getLongCut = (arr: string[]) => (arr.length > 1 ? 2 : 1);

const checkNumber = (value: string) => value.match(haveNumber);

const takeError = (state: Icalc) => ({
  ...state,
  reset: true,
  float: false,
  simbol: false,
  viewNumber: error,
});

export {
  equalsOperation,
  checkNumber,
  getLongCut,
  swap,
  cutLongResult,
  haveEnumber,
};
