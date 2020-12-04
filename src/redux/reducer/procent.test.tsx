import { percent } from '../actions/actions';
import { calc } from './reducer';

describe('percent', () => {
  const initialState = {
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

  it('percent', () => {
    expect(calc(initialState, percent())).toEqual({
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

  it('percent multyplication', () => {
    const state = {
      num: ['5', '*'],
      viewNumber: '0,05',
      reset: true,
      equals: '0',
      simbol: false,
      float: false,
      lastOperation: [],
      memoryWrite: false,
      memory: '0',
    };

    expect(calc(state, percent())).toEqual({
      num: ['5', '*', '0.05'],
      viewNumber: '0,05',
      reset: true,
      equals: '0',
      simbol: false,
      float: false,
      lastOperation: [],
      memoryWrite: false,
      memory: '0',
    });
  });

  it('percent divider', () => {
    const state = {
      num: ['5', '/'],
      viewNumber: '0,05',
      reset: true,
      equals: '0',
      simbol: false,
      float: false,
      lastOperation: [],
      memoryWrite: false,
      memory: '0',
    };

    expect(calc(state, percent())).toEqual({
      num: ['5', '/', '0.05'],
      viewNumber: '0,05',
      reset: true,
      equals: '0',
      simbol: false,
      float: false,
      lastOperation: [],
      memoryWrite: false,
      memory: '0',
    });
  });

  it('percent plus', () => {
    const state = {
      num: ['5', '+'],
      viewNumber: '5',
      reset: true,
      equals: '0',
      simbol: false,
      float: false,
      lastOperation: [],
      memoryWrite: false,
      memory: '0',
    };

    expect(calc(state, percent())).toEqual({
      num: ['5', '+', '0.25'],
      viewNumber: '0,25',
      reset: true,
      equals: '0',
      simbol: false,
      float: false,
      lastOperation: [],
      memoryWrite: false,
      memory: '0',
    });
  });

  it('percent minus', () => {
    const state = {
      num: ['5', '-'],
      viewNumber: '5',
      reset: true,
      equals: '0',
      simbol: false,
      float: false,
      lastOperation: [],
      memoryWrite: false,
      memory: '0',
    };

    expect(calc(state, percent())).toEqual({
      num: ['5', '-', '0.25'],
      viewNumber: '0,25',
      reset: true,
      equals: '0',
      simbol: false,
      float: false,
      lastOperation: [],
      memoryWrite: false,
      memory: '0',
    });
  });

  it('percent full state', () => {
    const state = {
      num: ['1000', '+', '5'],
      viewNumber: '5',
      reset: false,
      equals: '0',
      simbol: false,
      float: false,
      lastOperation: [],
      memoryWrite: false,
      memory: '0',
    };

    expect(calc(state, percent())).toEqual({
      num: ['1000', '+', '50'],
      viewNumber: '50',
      reset: false,
      equals: '0',
      simbol: false,
      float: false,
      lastOperation: [],
      memoryWrite: false,
      memory: '0',
    });
  });

  it('percent test 1', () => {
    const state = {
      num: ['1000', '*', '5'],
      viewNumber: '5',
      reset: true,
      equals: '0',
      simbol: false,
      float: false,
      lastOperation: [],
      memoryWrite: false,
      memory: '0',
    };

    expect(calc(state, percent())).toEqual({
      num: ['1000', '*', '0.05'],
      viewNumber: '0,05',
      reset: true,
      equals: '0',
      simbol: false,
      float: false,
      lastOperation: [],
      memoryWrite: false,
      memory: '0',
    });
  });

  it('percent float', () => {
    const state = {
      num: ['2.5', '-', '5.1'],
      viewNumber: '5',
      reset: true,
      equals: '0',
      simbol: false,
      float: false,
      lastOperation: [],
      memoryWrite: false,
      memory: '0',
    };

    expect(calc(state, percent())).toEqual({
      num: ['2.5', '-', '0.1275'],
      viewNumber: '0,1275',
      reset: true,
      equals: '0',
      simbol: false,
      float: false,
      lastOperation: [],
      memoryWrite: false,
      memory: '0',
    });
  });
});
