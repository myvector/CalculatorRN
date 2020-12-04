import { equals, inversion, plus } from '../actions/actions';
import { calc } from './reducer';

describe('inversion test', () => {
  const initialState = {
    equals: '0',
    float: false,
    lastOperation: [],
    num: ['3'],
    reset: false,
    simbol: false,
    viewNumber: '3',
    memoryWrite: false,
    memory: '0',
  };

  it('inversion', () => {
    expect(calc(initialState, inversion())).toEqual({
      equals: '-3',
      float: false,
      lastOperation: [],
      num: ['-3'],
      reset: false,
      simbol: false,
      viewNumber: '-3',
      memoryWrite: false,
      memory: '0',
    });
  });

  it('inversion not have number', () => {
    const state = {
      equals: '0',
      float: false,
      lastOperation: [],
      num: ['0'],
      reset: false,
      simbol: false,
      viewNumber: '0',
      memoryWrite: false,
      memory: '0',
    };

    expect(calc(state, inversion())).toEqual({
      equals: '0',
      float: false,
      lastOperation: [],
      num: ['0'],
      reset: false,
      simbol: false,
      viewNumber: '0',
      memoryWrite: false,
      memory: '0',
    });
  });

  it('inversion after click simbol', () => {
    const state = {
      equals: '0',
      float: false,
      lastOperation: [],
      num: ['-3', '-'],
      reset: false,
      simbol: false,
      viewNumber: '-3',
      memoryWrite: false,
      memory: '0',
    };

    expect(calc(state, inversion())).toEqual({
      equals: '3',
      float: false,
      lastOperation: [],
      num: ['3', '-'],
      reset: false,
      simbol: false,
      viewNumber: '3',
      memoryWrite: false,
      memory: '0',
    });
  });

  it('inversion after equals', () => {
    const state = {
      equals: '0',
      float: false,
      lastOperation: [],
      num: ['60', '-', '60'],
      reset: false,
      simbol: false,
      viewNumber: '3',
      memoryWrite: false,
      memory: '0',
    };

    expect(calc(calc(state, equals()), inversion())).toEqual({
      equals: '0',
      float: false,
      lastOperation: ['-', '60'],
      num: ['0'],
      reset: true,
      simbol: false,
      viewNumber: '0',
      memoryWrite: false,
      memory: '0',
    });
  });

  it('inversion float', () => {
    const state = {
      equals: '0',
      float: true,
      lastOperation: [],
      num: ['146.4'],
      reset: false,
      simbol: false,
      viewNumber: '146,4',
      memoryWrite: false,
      memory: '0',
    };

    expect(calc(state, inversion())).toEqual({
      equals: '-146.4',
      float: true,
      lastOperation: [],
      num: ['-146.4'],
      reset: false,
      simbol: false,
      viewNumber: '-146,4',
      memoryWrite: false,
      memory: '0',
    });
  });

  it('inversion negative number', () => {
    const state = {
      equals: '-108',
      float: false,
      lastOperation: ['-', '108'],
      memory: '0',
      memoryWrite: false,
      num: ['0'],
      reset: true,
      simbol: false,
      viewNumber: '-108',
    };

    expect(calc(calc(state, inversion()), plus('+'))).toEqual({
      equals: '108',
      float: false,
      lastOperation: [],
      num: ['108', '+'],
      reset: false,
      simbol: '+',
      viewNumber: '108',
      memoryWrite: false,
      memory: '0',
    });
  });

  it('inversion number + inversion number', () => {
    const state = {
      equals: '-15',
      float: false,
      lastOperation: [],
      memory: '0',
      memoryWrite: false,
      num: ['-15', '+', '15'],
      reset: true,
      simbol: false,
      viewNumber: '15',
    };

    expect(calc(state, inversion())).toEqual({
      equals: '-15',
      float: false,
      lastOperation: [],
      num: ['-15', '+', '-15'],
      reset: true,
      simbol: false,
      viewNumber: '-15',
      memoryWrite: false,
      memory: '0',
    });
  });
});
