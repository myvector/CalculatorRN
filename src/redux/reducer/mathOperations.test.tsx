import { plus, clickButton, equals, float, allClean } from '../actions/actions';
import { calc } from './reducer';

describe('simbol', () => {
  const stateForSimbol = {
    num: ['1'],
    simbol: false,
    reset: false,
    viewNumber: '1',
    equals: '50',
    float: true,
    lastOperation: ['+', '1'],
    memory: '20',
    memoryWrite: true,
  };

  it('plus', () => {
    expect(calc(stateForSimbol, plus('+'))).toStrictEqual({
      num: ['1', '+'],
      reset: false,
      float: false,
      simbol: '+',
      viewNumber: '1',
      lastOperation: [],
      equals: '50',
      memory: '20',
      memoryWrite: true,
    });
  });

  it('plus if reset true. Click on plus after click on equals. Simple math operations.', () => {
    const state = {
      num: ['1'],
      simbol: false,
      equals: '4',
      reset: true,
      viewNumber: '4',
      float: true,
      lastOperation: ['+', '1'],
      memory: '20',
      memoryWrite: true,
    };

    expect(calc(state, plus('+'))).toStrictEqual({
      num: ['4', '+'],
      reset: false,
      simbol: '+',
      viewNumber: '4',
      float: false,
      equals: '4',
      lastOperation: [],
      memory: '20',
      memoryWrite: true,
    });
  });

  it('double click on simbol', () => {
    const newState = calc(stateForSimbol, plus('-'));

    expect(calc(newState, plus('+'))).toStrictEqual({
      num: ['1', '+'],
      reset: false,
      simbol: '+',
      viewNumber: '1',
      float: false,
      lastOperation: [],
      equals: '50',
      memory: '20',
      memoryWrite: true,
    });
  });

  it('first click on simbol', () => {
    const state = {
      num: ['0'],
      reset: false,
      simbol: false,
      viewNumber: '0',
      lastOperation: [],
      equals: '50',
      float: true,
      memory: '20',
      memoryWrite: true,
    };

    const newState = calc(state, plus('+'));
    expect(calc(newState, clickButton('2'))).toStrictEqual({
      num: ['0', '+', '2'],
      reset: false,
      simbol: false,
      float: false,
      viewNumber: '2',
      lastOperation: [],
      memoryWrite: false,
      equals: '50',
      memory: '20',
    });
  });
});

describe('divider on zero', () => {
  const initialState = {
    num: ['10', '/', '0'],
    reset: true,
    simbol: false,
    equals: 'Infinity',
    viewNumber: 'Infinity',
    lastOperation: [],
    float: true,
    memory: '20',
    memoryWrite: true,
  };

  it('divider on zero', () => {
    const state = {
      num: ['10', '/', '0'],
      equals: '0',
      reset: false,
      viewNumber: '0',
      lastOperation: [],
      float: true,
      memory: '20',
      memoryWrite: true,
      simbol: true,
    };
    expect(calc(state, equals())).toStrictEqual({
      num: ['Infinity'],
      reset: true,
      equals: 'Infinity',
      viewNumber: 'Infinity',
      simbol: false,
      lastOperation: ['/', '0'],
      float: true,
      memory: '20',
      memoryWrite: true,
    });
  });

  it('after divider on zero, next operation with simbol', () => {
    const newState = calc(calc(initialState, plus('+')), clickButton('9'));

    expect(calc(newState, equals())).toStrictEqual({
      num: ['Infinity'],
      reset: true,
      simbol: false,
      float: false,
      equals: 'Infinity',
      viewNumber: 'Infinity',
      lastOperation: ['+', '9'],
      memoryWrite: false,
      memory: '20',
    });
  });

  it('after divider on zero, next operation click number', () => {
    const state = calc(calc(initialState, clickButton('9')), plus('+'));
    const newState = calc(state, clickButton('9'));

    expect(calc(newState, equals())).toStrictEqual({
      num: ['18'],
      reset: true,
      simbol: false,
      float: false,
      equals: '18',
      viewNumber: '18',
      lastOperation: ['+', '9'],
      memoryWrite: false,
      memory: '20',
    });
  });

  it('divider zero, on zero', () => {
    const state = {
      num: ['0', '/', '0'],
      equals: '0',
      reset: false,
      viewNumber: '0',
      lastOperation: [],
      simbol: true,
      float: true,
      memory: '20',
      memoryWrite: true,
    };

    expect(calc(state, equals())).toStrictEqual({
      num: ['0', '/', '0'],
      reset: true,
      equals: '0',
      simbol: false,
      viewNumber: 'error',
      float: false,
      lastOperation: [],
      memory: '20',
      memoryWrite: true,
    });
  });

  it('multiplication on float negative number', () => {
    const state = {
      num: ['-143.4', '*', '2'],
      equals: '0',
      reset: false,
      viewNumber: '0',
      lastOperation: [],
      simbol: true,
      float: true,
      memory: '0',
      memoryWrite: false,
    };

    expect(calc(state, equals())).toStrictEqual({
      num: ['-286.8'],
      reset: true,
      equals: '-286.8',
      simbol: false,
      viewNumber: '-286,8',
      float: true,
      lastOperation: ['*', '2'],
      memory: '0',
      memoryWrite: false,
    });
  });

  it('multiplication on float negative number', () => {
    const state = {
      num: ['5.1', '-', '5'],
      equals: '0',
      reset: false,
      viewNumber: '0',
      lastOperation: [],
      simbol: true,
      float: true,
      memory: '0',
      memoryWrite: false,
    };

    expect(calc(state, equals())).toStrictEqual({
      num: ['0.1'],
      reset: true,
      equals: '0.1',
      simbol: false,
      viewNumber: '0,1',
      float: true,
      lastOperation: ['-', '5'],
      memory: '0',
      memoryWrite: false,
    });
  });

  it('divider on float', () => {
    const state = {
      num: ['10', '/', '0.005'],
      equals: '0',
      reset: false,
      viewNumber: '0,005',
      lastOperation: [],
      simbol: false,
      float: false,
      memory: '0',
      memoryWrite: false,
    };

    expect(calc(state, equals())).toStrictEqual({
      num: ['2000'],
      reset: true,
      equals: '2000',
      simbol: false,
      viewNumber: '2000',
      float: false,
      lastOperation: ['/', '0.005'],
      memory: '0',
      memoryWrite: false,
    });
  });

  it('divider on float', () => {
    const state = {
      num: ['116', '/', '0.006'],
      equals: '0',
      reset: false,
      viewNumber: '0,006',
      lastOperation: [],
      simbol: false,
      float: false,
      memory: '0',
      memoryWrite: false,
    };

    expect(calc(state, equals())).toStrictEqual({
      num: ['19333.333333'],
      reset: true,
      equals: '19333.333333',
      simbol: false,
      viewNumber: '19333,333333',
      float: true,
      lastOperation: ['/', '0.006'],
      memory: '0',
      memoryWrite: false,
    });
  });

  it('float * float', () => {
    const state = {
      num: ['0.2', '*', '0.4'],
      equals: '0',
      reset: false,
      viewNumber: '0,2',
      lastOperation: [],
      simbol: false,
      float: true,
      memory: '0',
      memoryWrite: false,
    };

    expect(calc(state, equals())).toStrictEqual({
      num: ['0.8'],
      reset: true,
      equals: '0.8',
      simbol: false,
      viewNumber: '0,8',
      float: true,
      lastOperation: ['*', '0.4'],
      memory: '0',
      memoryWrite: false,
    });
  });
});
