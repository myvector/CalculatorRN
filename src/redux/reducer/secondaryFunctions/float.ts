import {
  findPlusMinus,
  haveFloat,
  haveNumber,
  one,
  zero,
} from '../../../valueButtonCalc/constant';

const checkFloatNumberAndReturnNormalizedData = (
  array: string[],
  float: boolean
) => {
  let mathOperation = [...array];

  if (float) {
    let normalization = takeSizeNormalization(mathOperation, haveFloat);

    if (parseFloat(normalization) <= 2) {
      normalization = '10';
    } else if (parseFloat(normalization) < 3) {
      normalization = '1000';
    } else {
      let length = normalization.length;
      normalization = one;

      for (let i = 0; i < length; i++) {
        normalization += zero;
      }

      normalization = normalization + '00000';
    }

    let simbol = array.filter((el) => {
      return el.match(findPlusMinus);
    });

    mathOperation = array.map((el) => {
      if (!simbol.length) {
        return el.match(haveNumber) && el.match(haveFloat)
          ? (parseFloat(el) * parseFloat(normalization)).toString()
          : el;
      } else if (simbol.length) {
        return el.match(haveNumber)
          ? (parseFloat(el) * parseFloat(normalization)).toString()
          : el;
      }

      return el;
    });

    return {
      mathOperation,
      normalization: simbol[0] !== '/' ? normalization : 1,
    };
  }
  return {
    mathOperation,
    normalization: 1,
  };
};

const takeSizeNormalization = (array: string[], haveFloat: RegExp) => {
  let size = '';
  for (let i = 0; i < array.length; i++) {
    const pos = array[i].search(haveFloat);
    if (pos !== -1) {
      const floatingPointNumber = array[i].slice(pos + 1);

      if (size.length < floatingPointNumber.length) {
        size = floatingPointNumber;
      }
    }
  }
  return size;
};

export { checkFloatNumberAndReturnNormalizedData };
