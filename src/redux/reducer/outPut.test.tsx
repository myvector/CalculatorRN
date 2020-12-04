import {
  allClean,
  clickButton,
  equals,
  float,
  minus,
  plus,
} from '../actions/actions';
import { calc, Icalc } from './reducer';

const initialState = {
  num: ['0'],
  equals: '0',
  simbol: false,
  reset: false,
  float: false,
  viewNumber: '0',
  lastOperation: [],
  memoryWrite: false,
  memory: '0',
};

describe('view output number', () => {
  it('show number', () => {
    expect(calc(initialState, clickButton('9')).num[0]).toBe('9');
  });

  it('the right way show double click number', () => {
    const state: Icalc = {
      num: ['0'],
      equals: '0',
      simbol: false,
      reset: false,
      float: false,
      viewNumber: '0',
      lastOperation: [],
      memoryWrite: false,
      memory: '0',
    };
    const newState = calc(state, clickButton('9'));
    expect(calc(newState, clickButton('9')).num[0]).toBe('99');
  });

  it('change initial state and reset', () => {
    const state = {
      num: ['0'],
      reset: true,
      viewNumber: '0',
      equals: '0',
      simbol: false,
      float: false,
      lastOperation: [],
      memoryWrite: false,
      memory: '0',
    };

    expect(calc(state, clickButton('9'))).toStrictEqual({
      num: ['9'],
      simbol: false,
      reset: false,
      viewNumber: '9',
      lastOperation: [],
      memoryWrite: false,
      equals: '0',
      float: false,
      memory: '0',
    });
  });

  it('change initial state', () => {
    const state = {
      viewNumber: '0',
      reset: false,
      num: ['0'],
      equals: '0',
      simbol: false,
      float: false,
      lastOperation: [],
      memoryWrite: false,
      memory: '0',
    };

    expect(calc(state, clickButton('9'))).toStrictEqual({
      num: ['9'],
      simbol: false,
      reset: false,
      viewNumber: '9',
      lastOperation: [],
      memoryWrite: false,
      equals: '0',
      float: false,
      memory: '0',
    });
  });

  it('reset', () => {
    const state = {
      viewNumber: '9',
      reset: true,
      lastOperation: [],
      num: ['0'],
      memoryWrite: false,
      equals: '0',
      simbol: false,
      float: false,
      memory: '0',
    };

    expect(calc(state, clickButton('9'))).toStrictEqual({
      num: ['9'],
      simbol: false,
      reset: false,
      viewNumber: '9',
      lastOperation: [],
      memoryWrite: false,
      equals: '0',
      float: false,
      memory: '0',
    });
  });

  it('add number after click simbol', () => {
    const state = {
      viewNumber: '9',
      num: ['9'],
      simbol: true,
      reset: false,
      memoryWrite: true,
      equals: '0',
      float: false,
      lastOperation: [],
      memory: '0',
    };

    expect(calc(state, clickButton('9'))).toStrictEqual({
      num: ['9', '9'],
      reset: false,
      viewNumber: '9',
      simbol: false,
      memoryWrite: false,
      equals: '0',
      float: false,
      lastOperation: [],
      memory: '0',
    });
  });

  it('show number after click on simbol, double click on number and click after click on next simbol', () => {
    const state = {
      viewNumber: '9',
      num: ['9'],
      simbol: true,
      reset: false,
      memoryWrite: false,
      equals: '0',
      float: false,
      lastOperation: [],
      memory: '0',
    };

    const secondNumber = calc(calc(state, clickButton('9')), clickButton('9'));

    const newState = calc(secondNumber, clickButton('9'));
    newState.simbol = true;

    expect(calc(newState, clickButton('9'))).toStrictEqual({
      num: ['9', '999', '9'],
      reset: false,
      viewNumber: '9',
      simbol: false,
      lastOperation: [],
      memoryWrite: false,
      equals: '0',
      float: false,
      memory: '0',
    });
  });

  it('click zero return zero', () => {
    expect(calc(initialState, clickButton('0'))).toStrictEqual({
      num: ['0'],
      float: false,
      reset: false,
      viewNumber: '0',
      simbol: false,
      equals: '0',
      lastOperation: [],
      memoryWrite: false,
      memory: '0',
    });
  });

  it('double click zero return zero', () => {
    expect(
      calc(calc(initialState, clickButton('0')), clickButton('0'))
    ).toStrictEqual({
      num: ['0'],
      reset: false,
      float: false,
      viewNumber: '0',
      simbol: false,
      equals: '0',
      lastOperation: [],
      memoryWrite: false,
      memory: '0',
    });
  });

  it('show minus when click minus after number', () => {
    expect(
      calc(calc(calc(initialState, minus('-')), clickButton('1')), minus('-'))
    ).toStrictEqual({
      num: ['-1', '-'],
      reset: false,
      float: false,
      viewNumber: '-1',
      simbol: '-',
      equals: '0',
      lastOperation: [],
      memoryWrite: false,
      memory: '0',
    });
  });

  it('show minus when click minus after number with float', () => {
    const newState = calc(
      calc(calc(initialState, minus('-')), clickButton('0')),
      float('.')
    );

    expect(calc(calc(newState, clickButton('1')), minus('-'))).toStrictEqual({
      num: ['-0.1', '-'],
      reset: false,
      float: true,
      viewNumber: '-0,1',
      simbol: '-',
      equals: '0',
      lastOperation: [],
      memoryWrite: false,
      memory: '0',
    });
  });

  it('cut big number when click number', () => {
    const state = {
      viewNumber: '999999999999',
      num: ['999999999999'],
      reset: false,
      float: false,
      simbol: false,
      equals: '0',
      lastOperation: [],
      memoryWrite: false,
      memory: '0',
    };

    expect(calc(state, clickButton('9'))).toStrictEqual({
      num: ['999999999999'],
      reset: false,
      float: false,
      viewNumber: '999999999999',
      simbol: false,
      equals: '0',
      lastOperation: [],
      memoryWrite: false,
      memory: '0',
    });
  });

  it('cut big number and transform in "e" last numbers', () => {
    const state = {
      viewNumber: '999999999999',
      num: ['999999999999', '*', '2'],
      reset: false,
      float: false,
      simbol: false,
      equals: '0',
      lastOperation: [],
      memoryWrite: false,
      memory: '0',
    };

    expect(calc(state, equals())).toStrictEqual({
      num: ['1999999999e2'],
      reset: true,
      float: false,
      viewNumber: '1999999999e2',
      simbol: false,
      equals: '1999999999e2',
      lastOperation: ['*', '2'],
      memoryWrite: false,
      memory: '0',
    });
  });

  it('cut big float ', () => {
    const state = {
      viewNumber: '1,9999999999',
      num: ['1.9999999999'],
      reset: false,
      float: true,
      simbol: false,
      equals: '0',
      lastOperation: [],
      memoryWrite: false,
      memory: '0',
    };

    expect(calc(state, clickButton('9'))).toStrictEqual({
      num: ['1.9999999999'],
      reset: false,
      float: true,
      viewNumber: '1,9999999999',
      simbol: false,
      equals: '0',
      lastOperation: [],
      memoryWrite: false,
      memory: '0',
    });
  });

  describe('float', () => {
    const state = {
      num: ['0'],
      equals: '0',
      simbol: false,
      reset: false,
      float: false,
      viewNumber: '0',
      lastOperation: [],
      memory: '20',
      memoryWrite: true,
    };

    it('float after number', () => {
      expect(calc(state, float('.'))).toStrictEqual({
        num: ['0.'],
        reset: false,
        viewNumber: '0,',
        float: true,
        simbol: false,
        equals: '0',
        lastOperation: [],
        memory: '20',
        memoryWrite: true,
      });
    });

    it('float after simbol', () => {
      const state = {
        num: ['5'],
        simbol: false,
        equals: '0',
        float: true,
        lastOperation: [],
        memory: '20',
        memoryWrite: true,
        reset: false,
        viewNumber: '50',
      };

      const newState = calc({ ...state }, plus('+'));
      expect(calc({ ...newState }, float('.'))).toStrictEqual({
        num: ['5', '+', '0.'],
        simbol: false,
        equals: '0',
        float: false,
        reset: false,
        viewNumber: '0,',
        lastOperation: [],
        memory: '20',
        memoryWrite: true,
      });
    });

    it('double click float', () => {
      const state = {
        num: ['0'],
        equals: '0',
        simbol: false,
        reset: false,
        float: false,
        viewNumber: '0',
        lastOperation: [],
        memory: '20',
        memoryWrite: true,
      };

      const newState = calc(state, float('.'));
      expect(calc(newState, float('.'))).toStrictEqual({
        num: ['0.'],
        reset: false,
        viewNumber: '0,',
        float: true,
        simbol: false,
        equals: '0',
        lastOperation: [],
        memory: '20',
        memoryWrite: true,
      });
    });
  });

  describe('all clean', () => {
    const state = {
      equals: '50',
      float: true,
      lastOperation: ['+', '1'],
      memory: '20',
      memoryWrite: true,
      num: ['50'],
      reset: true,
      simbol: true,
      viewNumber: '50',
    };

    it('change initial state and reset', () => {
      expect(calc(state, allClean())).toEqual({
        equals: '0',
        float: true,
        lastOperation: [],
        memory: '0',
        memoryWrite: true,
        num: ['0'],
        reset: true,
        simbol: true,
        viewNumber: '0',
      });
    });
  });
});
