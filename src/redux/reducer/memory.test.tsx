import {
  clickButton,
  memoryIncrement,
  minus,
  multyplication,
  plus,
  memoryDecrement,
  memoryRead,
  float,
  memoryClear,
} from '../actions/actions';
import { calc } from './reducer';

describe('memory test increment', () => {
  const initialState = {
    equals: '0',
    float: false,
    lastOperation: [],
    num: ['3'],
    reset: false,
    simbol: false,
    viewNumber: '3',
    memory: '0',
    memoryWrite: false,
  };

  it('increment', () => {
    expect(calc(initialState, memoryIncrement())).toEqual({
      equals: '3',
      float: false,
      lastOperation: [],
      num: ['3'],
      reset: true,
      simbol: false,
      viewNumber: '3',
      memory: '3',
      memoryWrite: true,
    });
  });

  it('increment on equals', () => {
    const state = {
      equals: '0',
      float: false,
      lastOperation: [],
      num: ['3', '+', '3'],
      reset: false,
      simbol: false,
      viewNumber: '3',
      memory: '0',
      memoryWrite: false,
    };

    expect(calc(state, memoryIncrement())).toEqual({
      equals: '6',
      float: false,
      lastOperation: [],
      num: ['3', '+', '3'],
      reset: true,
      simbol: false,
      viewNumber: '6',
      memory: '6',
      memoryWrite: true,
    });
  });

  it('increment after click simbol', () => {
    const state = {
      equals: '0',
      float: false,
      lastOperation: [],
      num: ['3', '+'],
      reset: false,
      simbol: false,
      viewNumber: '3',
      memory: '0',
      memoryWrite: false,
    };

    expect(calc(state, memoryIncrement())).toEqual({
      equals: '0',
      float: false,
      lastOperation: [],
      num: ['3', '+'],
      reset: false,
      simbol: false,
      viewNumber: '3',
      memory: '3',
      memoryWrite: true,
    });
  });

  it('increment double click', () => {
    const state = {
      equals: '0',
      float: false,
      lastOperation: [],
      num: ['12'],
      reset: false,
      simbol: false,
      viewNumber: '12',
      memory: '0',
      memoryWrite: false,
    };

    expect(calc(calc(state, memoryIncrement()), memoryIncrement())).toEqual({
      equals: '12',
      float: false,
      lastOperation: [],
      num: ['12'],
      reset: true,
      simbol: false,
      viewNumber: '12',
      memory: '24',
      memoryWrite: true,
    });
  });

  it('simbol beetween clicks increment memory', () => {
    const state = {
      equals: '0',
      float: false,
      lastOperation: [],
      num: ['12'],
      reset: false,
      simbol: false,
      viewNumber: '12',
      memory: '0',
      memoryWrite: false,
    };
    const newState = calc(calc(state, plus('+')), memoryIncrement());

    expect(calc(calc(newState, clickButton('12')), memoryIncrement())).toEqual({
      equals: '24',
      float: false,
      lastOperation: [],
      num: ['12', '+', '12'],
      reset: true,
      simbol: false,
      viewNumber: '24',
      memory: '36',
      memoryWrite: true,
    });
  });

  it('double click after, sibol beetween clicks increment memory', () => {
    const state = {
      equals: '0',
      float: false,
      lastOperation: [],
      num: ['12'],
      reset: false,
      simbol: false,
      memoryWrite: false,
      viewNumber: '12',
      memory: '0',
    };

    const newState = calc(calc(state, plus('+')), memoryIncrement());

    expect(
      calc(
        calc(calc(newState, clickButton('12')), memoryIncrement()),
        memoryIncrement()
      )
    ).toEqual({
      equals: '24',
      float: false,
      lastOperation: [],
      num: ['12', '+', '12'],
      reset: true,
      simbol: false,
      memoryWrite: true,
      viewNumber: '24',
      memory: '60',
    });
  });

  it('corectly show num after clicks increment memory', () => {
    const state = {
      equals: '0',
      float: false,
      lastOperation: [],
      num: ['12'],
      reset: false,
      simbol: false,
      memoryWrite: false,
      viewNumber: '12',
      memory: '0',
    };
    const newState = calc(calc(state, memoryIncrement()), clickButton('1'));

    expect(calc(calc(newState, clickButton('2')), plus('+'))).toEqual({
      equals: '12',
      float: false,
      lastOperation: [],
      num: ['12', '+'],
      reset: false,
      simbol: '+',
      memoryWrite: false,
      viewNumber: '12',
      memory: '12',
    });
  });

  it('refresh after click increment memory', () => {
    const state = {
      equals: '0',
      float: false,
      lastOperation: [],
      num: ['58'],
      reset: false,
      simbol: false,
      memoryWrite: false,
      viewNumber: '12',
      memory: '0',
    };
    const firstState = calc(calc(state, multyplication('*')), clickButton('2'));

    const secondState = calc(
      calc(firstState, memoryIncrement()),
      clickButton('1')
    );

    expect(calc(calc(secondState, clickButton('6')), minus('-'))).toEqual({
      equals: '116',
      float: false,
      lastOperation: [],
      num: ['16', '-'],
      reset: false,
      simbol: '-',
      memoryWrite: false,
      viewNumber: '16',
      memory: '116',
    });
  });

  it('parallel readings', () => {
    const state = {
      equals: '0',
      float: false,
      lastOperation: [],
      num: ['12'],
      reset: false,
      simbol: false,
      memoryWrite: false,
      viewNumber: '12',
      memory: '0',
    };
    const firstState = calc(calc(state, memoryIncrement()), memoryIncrement());

    const secondState = calc(
      calc(firstState, clickButton('1')),
      clickButton('2')
    );
    const thirdState = calc(calc(secondState, plus('+')), clickButton('12'));

    expect(calc(thirdState, memoryIncrement())).toEqual({
      equals: '24',
      float: false,
      lastOperation: [],
      num: ['12', '+', '12'],
      reset: true,
      simbol: false,
      memoryWrite: true,
      viewNumber: '24',
      memory: '48',
    });
  });

  it('parallel readings second test', () => {
    const state = {
      equals: '0',
      float: false,
      lastOperation: [],
      num: ['12'],
      reset: false,
      simbol: false,
      memoryWrite: false,
      viewNumber: '12',
      memory: '0',
    };
    const firstState = calc(
      calc(calc(state, plus('+')), clickButton('1')),
      clickButton('7')
    );

    const secondState = calc(
      calc(calc(firstState, memoryIncrement()), plus('+')),
      clickButton('15')
    );

    expect(calc(secondState, memoryIncrement())).toEqual({
      equals: '44',
      float: false,
      lastOperation: [],
      num: ['29', '+', '15'],
      reset: true,
      simbol: false,
      memoryWrite: true,
      viewNumber: '44',
      memory: '73',
    });
  });
});

describe('decrement', () => {
  const initialState = {
    equals: '0',
    float: false,
    lastOperation: [],
    num: ['3', '+', '3'],
    reset: false,
    simbol: false,
    viewNumber: '3',
    memory: '0',
    memoryWrite: false,
  };

  it('decrement', () => {
    expect(calc(initialState, memoryDecrement())).toEqual({
      equals: '6',
      float: false,
      lastOperation: [],
      num: ['3', '+', '3'],
      reset: true,
      simbol: false,
      viewNumber: '6',
      memoryWrite: true,
      memory: '-6',
    });
  });

  it('decrement negative number', () => {
    const state = {
      equals: '0',
      float: false,
      lastOperation: [],
      num: ['65'],
      reset: true,
      simbol: false,
      viewNumber: '65',
      memoryWrite: true,
      memory: '0',
    };

    expect(calc(state, memoryDecrement())).toEqual({
      equals: '65',
      float: false,
      lastOperation: [],
      num: ['65'],
      reset: true,
      simbol: false,
      viewNumber: '65',
      memoryWrite: true,
      memory: '-65',
    });
  });
});

describe('memory read', () => {
  const initialState = {
    equals: '0',
    float: false,
    lastOperation: [],
    num: ['10'],
    reset: false,
    simbol: false,
    viewNumber: '10',
    memory: '10',
    memoryWrite: false,
  };

  it('memory read', () => {
    expect(calc(calc(initialState, memoryIncrement()), memoryRead())).toEqual({
      equals: '20',
      float: false,
      lastOperation: [],
      num: ['20'],
      reset: true,
      simbol: false,
      viewNumber: '20',
      memoryWrite: true,
      memory: '20',
    });
  });

  it('memory read show float', () => {
    const state = {
      equals: '0',
      float: false,
      lastOperation: [],
      memory: '0',
      memoryWrite: false,
      num: ['2'],
      reset: false,
      simbol: false,
      viewNumber: '2',
    };

    const stateSecond = calc(calc(state, float('.')), clickButton('1'));

    expect(calc(calc(stateSecond, memoryIncrement()), memoryRead())).toEqual({
      equals: '2.1',
      float: true,
      lastOperation: [],
      num: ['2.1'],
      reset: true,
      simbol: false,
      viewNumber: '2,1',
      memoryWrite: true,
      memory: '2.1',
    });
  });

  it('memory read show float and have "e"', () => {
    const state = {
      equals: '5361.24651e6',
      float: true,
      lastOperation: [],
      memory: '0',
      memoryWrite: false,
      num: ['5361.24651e6'],
      reset: false,
      simbol: false,
      viewNumber: '5361,24651e6',
    };

    expect(calc(calc(state, memoryIncrement()), memoryRead())).toEqual({
      equals: '5361.24651e6',
      float: true,
      lastOperation: [],
      num: ['5361.24651e6'],
      reset: true,
      simbol: false,
      viewNumber: '5361,24651e6',
      memoryWrite: true,
      memory: '5361.24651e6',
    });
  });

  it('memory read show have "e" and last click on Increment', () => {
    const state = {
      equals: '0',
      float: false,
      lastOperation: [],
      memory: '0',
      memoryWrite: false,
      num: ['999999999999', '*', '2'],
      reset: false,
      simbol: false,
      viewNumber: '2',
    };

    expect(calc(state, memoryIncrement())).toEqual({
      equals: '1999999999e2',
      float: false,
      lastOperation: [],
      num: ['999999999999', '*', '2'],
      reset: true,
      simbol: false,
      viewNumber: '1999999999e2',
      memoryWrite: true,
      memory: '1999999999e2',
    });
  });

  it('memory read show "e" and have more 12 simbols', () => {
    const state = {
      equals: '0',
      float: true,
      lastOperation: [],
      memory: '0',
      memoryWrite: false,
      num: ['9361246512e6', '*', '912465126'],
      reset: false,
      simbol: false,
      viewNumber: '912465126',
    };

    expect(calc(calc(state, memoryIncrement()), memoryRead())).toEqual({
      equals: '8541810978e9',
      float: true,
      lastOperation: [],
      num: ['9361246512e6', '*', '8541810978e9'],
      reset: true,
      simbol: false,
      viewNumber: '8541810978e9',
      memoryWrite: true,
      memory: '8541810978e9',
    });
  });

  it('memory clear', () => {
    const state = {
      memory: '20',
      num: ['0'],
      reset: true,
      viewNumber: '0',
      equals: '0',
      simbol: false,
      float: false,
      lastOperation: [],
      memoryWrite: false,
    };

    expect(calc(state, memoryClear())).toEqual({
      memory: '0',
      num: ['0'],
      reset: true,
      viewNumber: '0',
      equals: '0',
      simbol: false,
      float: false,
      lastOperation: [],
      memoryWrite: false,
    });
  });
});
