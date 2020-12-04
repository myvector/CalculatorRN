const comma = ',';
const point = '.';
const zero = '0';
const one = '1';
const haveNumber = /[0-9]/gm;
const haveE = /\e/gm;
const findPlusMinus = /(^[-+\/]$)/gm;
const haveFloat = /\./gm;
const error = 'error';

export {
  comma,
  point,
  zero,
  one,
  haveNumber,
  haveFloat,
  error,
  haveE,
  findPlusMinus,
};
