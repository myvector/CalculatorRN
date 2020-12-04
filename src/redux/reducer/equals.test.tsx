import {
  plus,
  equals,
  clickButton,
  minus,
  multyplication,
  divider,
} from '../actions/actions';
import { calc, Icalc } from './reducer';


describe('button "equals" logic operations', () => {
  it('operation plus', () => {
    const state:Icalc = {
      num: ['1', '+', '1'],
      equals: '4',
      reset: false,
      viewNumber: '4',
      lastOperation: [],
      float: false, simbol: false, memory:'0', memoryWrite:false
    };
    expect(calc(state, equals())).toEqual({
      num: ['2'],
      reset: true,
      equals: '2',
      viewNumber: '2',
      simbol: false,
      lastOperation: ['+', '1'],
      float: false, memory:'0', memoryWrite:false
    });
  });

  it('operation minus', () => {
    const state = {
      num: ['5', '-', '2'],
      equals: '4',
      reset: false,
      viewNumber: '4',
      lastOperation: [],      
      simbol: false,
      float: false,     
      memoryWrite: false,
      memory: '0'
    };
    expect(calc(state, equals())).toStrictEqual({
      num: ['3'],
      reset: true,
      equals: '3',
      viewNumber: '3',
      simbol: false,
      lastOperation: ['-', '2'],      
      float: false,     
      memoryWrite: false,
      memory: '0'
    });
  });

  it('operation myltyplication', () => {
    const state = {
      num: ['5', '*', '2'],
      equals: '0',
      reset: false,
      viewNumber: '0',
      lastOperation: [],     
      simbol: false,
      float: false,
      memoryWrite: false,
      memory: '0'
    };
    expect(calc(state, equals())).toStrictEqual({
      num: ['10'],
      reset: true,
      equals: '10',
      viewNumber: '10',
      simbol: false,
      lastOperation: ['*', '2'],      
      float: false,     
      memoryWrite: false,
      memory: '0'
    });
  });

  it('operation divider', () => {
    const state = {
      num: ['10', '/', '2'],
      equals: '0',
      reset: false,
      viewNumber: '0',
      lastOperation: [],     
      simbol: false,
      float: false,      
      memoryWrite: false,
      memory: '0'
    };
    expect(calc(state, equals())).toStrictEqual({
      num: ['5'],
      reset: true,
      equals: '5',
      viewNumber: '5',
      simbol: false,
      lastOperation: ['/', '2'], 
      float: false,
      memoryWrite: false,
      memory: '0'
    });
  });

  it('state number less than 2 elements', () => {
    const state = {
      num: ['10'],
      equals: '0',
      reset: false,
      viewNumber: '10',
      lastOperation: [],
      simbol: false,
      float: false,     
      memoryWrite: false,
      memory: '0'
    };
    expect(calc(state, equals())).toStrictEqual({
      num: ['10'],
      reset: false,
      equals: '0',
      viewNumber: '10',
      lastOperation: [],
      simbol: false,
      float: false,
      memoryWrite: false,
      memory: '0'
    });
  });

  it('equals when last element simbol', () => {
    const state = {
      num: ['10', '+'],
      equals: '0',
      reset: false,
      simbol: true,
      viewNumber: '0',
      lastOperation: [],
      float: false,
      memoryWrite: false,
      memory: '0'
    };

    expect(calc(state, equals())).toStrictEqual({
      num: ['20'],
      reset: true,
      equals: '20',
      simbol: false,
      viewNumber: '20',
      lastOperation: ['+', '10'],    
      float: false,
      memoryWrite: false,
      memory: '0'
    });
  });

  it('equals when last element simbol and click simbol after', () => {
    const state = {
      num: ['10', '+'],
      equals: '0',
      reset: false,
      simbol: true,
      viewNumber: '0',
      lastOperation: [],
      float: false,
      memoryWrite: false,
      memory: '0'
    };

    const newState = calc(calc(state, equals()), plus('+'));

    expect(calc(newState, equals())).toStrictEqual({
      num: ['40'],
      reset: true,
      equals: '40',
      simbol: false,
      float: false,
      viewNumber: '40',
      lastOperation: ['+', '20'],
      memoryWrite: false,
      memory: '0'
    });
  });

  it('repeat click equals after symbol', () => {
    const state = {
      num: ['2', '*'],
      equals: '0',
      reset: false,
      simbol: true,
      viewNumber: '2',
      lastOperation: [],
      float: false,
      memoryWrite: false,
      memory: '0'
    };

    const newState = calc(calc(state, equals()), equals());

    expect(calc(newState, equals())).toStrictEqual({
      num: ['16'],
      reset: true,
      equals: '16',
      simbol: false,
      viewNumber: '16',
      lastOperation: ['*', '2'],
      float: false,
      memoryWrite: false,
      memory: '0'
    });
  });

  it('repeat click equals after number', () => {
    const state = {
      num: ['2', '*', '2'],
      equals: '0',
      reset: false,
      simbol: true,
      viewNumber: '2',
      lastOperation: [],
      float: false,
      memoryWrite: false,
      memory: '0'
    };

    const newState = calc(calc(state, equals()), equals());

    expect(calc(newState, equals())).toStrictEqual({
      num: ['16'],
      reset: true,
      equals: '16',
      simbol: false,
      viewNumber: '16',
      lastOperation: ['*', '2'],
      float: false,
      memoryWrite: false,
      memory: '0'
    });
  });

  it('priority operation', () => {
    const state = {
      num: ['60', '+'],
      equals: '0',
      reset: false,
      simbol: true,
      viewNumber: '25',
      lastOperation: [],
      float: false,
      memoryWrite: false,
      memory: '0'
    };

    const newState = calc(
      calc(calc(state, clickButton('100')), plus('+')),
      clickButton('120')
    );

    const secondState = calc(
      calc(
        calc(calc(calc(newState, divider('/')), clickButton('20')), minus('-')),
        clickButton('10')
      ),
      multyplication('*')
    );

    expect(calc(calc(secondState, clickButton('25')), equals())).toStrictEqual({
      num: ['100'],
      reset: true,
      equals: '100',
      float: false,
      simbol: false,
      viewNumber: '100',
      lastOperation: ['*', '25'],
      memoryWrite: false,
      memory: '0'
    });
  });

  it('correct show float', () => {
    const state = {
      num: ['0.1', '+', '0.2'],
      float: true,
      viewNumber: '0,2',
      lastOperation: [],
      reset: true,
      equals: '0',
      simbol: false,
      memoryWrite: false,
      memory: '0'
    };

    expect(calc(state, equals())).toStrictEqual({
      num: ['0.3'],
      reset: true,
      viewNumber: '0,3',
      float: true,
      simbol: false,
      equals: '0.3',
      lastOperation: ['+', '0.2'],
      memoryWrite: false,
      memory: '0'
    });
  });

  it('correct show float', () => {
    const state = {
      num: ['0.0005', '+', '0.0001'],
      float: true,
      viewNumber: '0,2',
      lastOperation: [],
      reset: true,
      equals: '0',
      simbol: false,
      memoryWrite: false,
      memory: '0'
    };

    expect(calc(state, equals())).toStrictEqual({
      num: ['0.0006'],
      reset: true,
      viewNumber: '0,0006',
      float: true,
      simbol: false,
      equals: '0.0006',
      lastOperation: ['+', '0.0001'],
      memoryWrite: false,
      memory: '0'
    });
  });

  it('correct show float', () => {
    const state = {
      num: ['0.0006', '+', '0.0001'],
      float: true,
      viewNumber: '0,2',
      lastOperation: [],
      reset: true,
      equals: '0',
      simbol: false,
      memoryWrite: false,
      memory: '0'
    };

    expect(calc(state, equals())).toStrictEqual({
      num: ['0.0007'],
      reset: true,
      viewNumber: '0,0007',
      float: true,
      simbol: false,
      equals: '0.0007',
      lastOperation: ['+', '0.0001'],
      memoryWrite: false,
      memory: '0'
    });
  });

  it('last operation equals float', () => {
    const state = {
      num: ['17', '/', '15'],
      float: false,
      viewNumber: '15',
      lastOperation: [],
      reset: true,
      equals: '0',
      simbol: false,
      memoryWrite: false,
      memory: '0'
    };

    expect(calc(state, equals())).toStrictEqual({
      num: ['1.1333333333'],
      reset: true,
      viewNumber: '1,1333333333',
      float: true,
      simbol: false,
      equals: '1.1333333333',
      lastOperation: ['/', '15'],
      memoryWrite: false,
      memory: '0'
    });
  });

  it('repeat operation when click equals', () => {
    const state = {
      num: ['60', '-', '50'],
      float: false,
      viewNumber: '50',
      lastOperation: [],
      reset: true,
      equals: '0',
      simbol: false,
      memoryWrite: false,
      memory: '0'
    };

    expect(calc(calc(state, equals()), plus('+'))).toStrictEqual({
      num: ['10', '+'],
      reset: false,
      viewNumber: '10',
      float: false,
      simbol: '+',
      equals: '10',
      lastOperation: [],
      memoryWrite: false,
      memory: '0'
    });
  });
});
