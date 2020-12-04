import { comma, haveNumber, point } from '../../../valueButtonCalc/constant';
import { cutLongResult, haveEnumber } from './equals';
import { Icalc } from '../reducer';
import { getLastElement } from './getLastElement';
import { mathOperation } from './mathOperation';

export const memoryChange = (
  state: Icalc,
  writeToMemory: (memory: string, number: string) => number
) => {
  if (state.num.length > 2) {
    const result = mathOperation(state, '').viewNumber.replace(comma, point);
    const [eNumber, number] = haveEnumber(result);
    const memory = writeToMemory(state.memory, number);
    return {
      ...state,
      memory: cutLongResult(memory.toString(), eNumber),
      viewNumber: result,
      memoryWrite: true,
      reset: true,
      equals: result,
    };
  }

  let result = state.viewNumber.replace(comma, point);
  const [eNumber, number] = haveEnumber(result);
  let memory = writeToMemory(state.memory, number);

  if (!getLastElement(state.num).match(haveNumber)) {
    return {
      ...state,
      memory: memory.toString(),
      memoryWrite: true,
    };
  }

  return {
    ...state,
    memory: cutLongResult(memory.toString(), eNumber),
    memoryWrite: true,
    reset: true,
    equals: state.viewNumber.replace(comma, point),
  };
};
