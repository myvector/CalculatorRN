import {
  ALLCLEAN,
  DIVIDER,
  EQUALS,
  FLOAT,
  MULTYPLICATION,
  PLUS,
  MINUS,
  UPDATE,
  INVERSION,
  MEMORY_READ,
  MEMORY_CLEAR,
  MEMORY_INCREMENT,
  MEMORY_DECREMENT,
  PERCENT,
} from '../types/typesActions';

const clickButton = (value: string) => ({
  type: UPDATE,
  number: value,
});

const minus = (value: string) => ({
  type: MINUS,
  value,
});

const equals = () => ({
  type: EQUALS,
});

const plus = (value: string) => ({
  type: PLUS,
  value,
});

const multyplication = (value: string) => ({
  type: MULTYPLICATION,
  value,
});

const divider = (value: string) => ({
  type: DIVIDER,
  value,
});

const float = (value: string) => ({
  type: FLOAT,
  value,
});

const allClean = () => ({
  type: ALLCLEAN,
});

const inversion = () => ({
  type: INVERSION,
});

const memoryRead = () => ({
  type: MEMORY_READ,
});

const memoryClear = () => ({
  type: MEMORY_CLEAR,
});

const memoryIncrement = () => ({
  type: MEMORY_INCREMENT,
});

const memoryDecrement = () => ({
  type: MEMORY_DECREMENT,
});

const percent = () => ({
  type: PERCENT,
});

export {
  allClean,
  minus,
  clickButton,
  plus,
  equals,
  multyplication,
  divider,
  float,
  inversion,
  memoryRead,
  memoryClear,
  memoryIncrement,
  memoryDecrement,
  percent,
};
