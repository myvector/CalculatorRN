import {
  comma,
  haveFloat,
  haveNumber,
  point,
  zero,
} from '../../valueButtonCalc/constant';
import {
  equalsOperation,
  checkNumber,
  getLongCut,
  swap,
} from './secondaryFunctions/equals';
import {
  ALLCLEAN,
  DIVIDER,
  EQUALS,
  FLOAT,
  INVERSION,
  MEMORY_CLEAR,
  MEMORY_DECREMENT,
  MEMORY_INCREMENT,
  MEMORY_READ,
  MINUS,
  MULTYPLICATION,
  PLUS,
  PERCENT,
  UPDATE,
} from '../types/typesActions';
import { percentFormula } from './secondaryFunctions/procent';
import { getLastElement } from './secondaryFunctions/getLastElement';
import { memoryChange } from './secondaryFunctions/memory';
import { replaceLastElementInArray } from './secondaryFunctions/replaceLastElement';
import { mathOperation } from './secondaryFunctions/mathOperation';
import { stat } from 'fs';

export interface IcalcState {
  calc: Icalc;
}

export interface Icalc {
  num: string[];
  equals: string;
  float: boolean;
  simbol: boolean | string;
  reset: boolean;
  viewNumber: string;
  lastOperation: string[];
  memory: string;
  memoryWrite: boolean;
}

interface Iaction {
  [key: string]: string;
  type: string;
}

const initialState = {
  num: [zero],
  equals: zero,
  float: false,
  simbol: false,
  reset: false,
  viewNumber: zero,
  lastOperation: [],
  memory: zero,
  memoryWrite: false,
};

const calc = (state: Icalc = initialState, action: Iaction) => {
  switch (action.type) {
    case UPDATE:
      if ((state.viewNumber === zero && state.num.length < 2) || state.reset) {
        return {
          ...state,
          viewNumber: action.number,
          num: [action.number],
          reset: false,
          simbol: false,
          memoryWrite: false,
          lastOperation: [],
        };
      } else if (state.simbol || state.memoryWrite) {
        return {
          ...state,
          viewNumber: action.number,
          simbol: false,
          num: [...state.num, action.number],
          memoryWrite: false,
        };
      } else if (state.viewNumber.length > 11) {
        return state;
      }

      return {
        ...state,
        viewNumber: state.viewNumber + action.number,
        num: replaceLastElementInArray(state.num, action.number, true),
        lastOperation: [],
      };
    case PLUS:
      return mathOperation(state, action.value);
    case MINUS:
      return mathOperation(state, action.value);
    case MULTYPLICATION:
      return mathOperation(state, action.value);
    case DIVIDER:
      return mathOperation(state, action.value);
    case FLOAT:
      const repeatClickOnPoint = getLastElement(state.num);
      if (repeatClickOnPoint == point) {
        return state;
      }

      if (!checkNumber(repeatClickOnPoint)) {
        return {
          ...state,
          num: [...state.num, zero + point],
          viewNumber: zero + comma,
          simbol: false,
        };
      }

      const transformNumberInFloat = replaceLastElementInArray(
        state.num,
        action.value,
        true
      );

      return {
        ...state,
        float: true,
        num: transformNumberInFloat,
        viewNumber: transformNumberInFloat[state.num.length - 1].replace(
          haveFloat,
          comma
        ),
      };
    case EQUALS:
      return equalsOperation(state);
    case ALLCLEAN:
      return {
        ...state,
        num: [zero],
        equals: zero,
        viewNumber: zero,
        lastOperation: [],
        memory: zero,
      };
    case INVERSION:
      const length = getLongCut(state.num);
      let number = '';

      const inversionLastValue = state.num.splice(-length).map((el) => {
        if (el.match(haveNumber)) {
          let element = el;
          const numberWhenClickEquals = state.viewNumber.replace(comma, point);
          if (numberWhenClickEquals !== el) {
            element = numberWhenClickEquals;
          }

          let result = parseFloat(element);
          result = -result;
          number = result.toString();
          return number;
        }
        return el;
      });

      return {
        ...state,
        num:
          length > 1
            ? [...state.num, ...inversionLastValue]
            : [...inversionLastValue],
        viewNumber: number.replace(point, comma),
        equals: number,
      };

    case MEMORY_INCREMENT:
      const increment = (memory: string, result: string) =>
        parseFloat(memory) + parseFloat(result);

      return memoryChange(state, increment);
    case MEMORY_DECREMENT:
      const decrement = (memory: string, result: string) =>
        parseFloat(memory) - parseFloat(result);

      return memoryChange(state, decrement);
    case MEMORY_READ:
      const num =
        state.num.length > 2
          ? replaceLastElementInArray(state.num, state.memory)
          : state.num.length > 1
          ? [...state.num, state.memory]
          : [state.memory];

      return {
        ...state,
        viewNumber: state.memory.replace(point, comma),
        equals: state.memory,
        num,
      };
    case MEMORY_CLEAR:
      return { ...state, memory: '0' };
    case PERCENT:
      if (state.num.length < 2) {
        return { ...state };
      }

      const repeatAct = [...state.num];
      let lastOperation = repeatAct.slice(-2);

      const arrayOfOperations = checkNumber(lastOperation[1])
        ? [...repeatAct]
        : swap(lastOperation, repeatAct);

      lastOperation = arrayOfOperations.slice(-2);

      const result = percentFormula(
        parseFloat(lastOperation[1]),
        lastOperation[0],
        parseFloat(repeatAct[0])
      ).toString();

      return {
        ...state,
        num: [...arrayOfOperations.slice(0, -1), result],
        viewNumber: result.replace(point, comma),
      };
    default:
      return state;
  }
};
export { calc };
