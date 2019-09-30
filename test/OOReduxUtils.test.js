import { OOReduxUtils } from '../src/OOReduxUtils';
import ModifyAgeAction from './ModifyAgeAction';
import { AbstractAction } from '../src';

describe('mergeOwnAndForeignState', () => {
  it('should merge own and foreign state successfully', () => {
    const ownState = {
      ownValue: 1
    };
    const foreignState = {
      foreignValue: 2
    };

    const mergedState = OOReduxUtils.mergeOwnAndForeignState(ownState, foreignState);

    expect(mergedState).toEqual({ ownValue: 1, foreignValue: 2 });
  });

  it('should throw error if own and foreign state contains overlapping property keys', () => {
    const ownState = {
      value: 1
    };
    const foreignState = {
      value: 2
    };

    expect(() => {
      OOReduxUtils.mergeOwnAndForeignState(ownState, foreignState);
    }).toThrow('One or more overlapping properties in own and foreign state');
  });
});

describe('createStateReducer', () => {
  it('should create a state reducer with default namespace', () => {
    const initialState = {
      name: 'test',
      age: 25
    };

    const currentState = {
      name: 'test2',
      age: 25
    };

    const reduceState = OOReduxUtils.createStateReducer(initialState, ModifyAgeAction);
    const modifyAgeAction = { type: new ModifyAgeAction(30) };
    const newState = reduceState(currentState, modifyAgeAction);

    expect(newState.name).toBe('test2');
    expect(newState.age).toBe(30);
  });

  test('calling create state reducer without current state should use initial state', () => {
    const initialState = {
      name: 'test',
      age: 25
    };

    const reduceState = OOReduxUtils.createStateReducer(initialState, ModifyAgeAction);
    const modifyAgeAction = { type: new ModifyAgeAction(30) };
    const newState = reduceState(undefined, modifyAgeAction);

    expect(newState.name).toBe('test');
    expect(newState.age).toBe(30);
  });

  test('calling created state reducer should throw error if abstract action method is not overriden', () => {
    const initialState = {};
    const reduceState = OOReduxUtils.createStateReducer(initialState, AbstractAction);
    const abstractAction = { type: new AbstractAction() };

    expect(() => {
      reduceState(initialState, abstractAction);
    }).toThrow('Abstract method called');
  });

  test('calling created state reducer with action from different namespace should not alter state', () => {
    const initialState = {
      name: 'test',
      age: 25
    };

    const reduceState = OOReduxUtils.createStateReducer(initialState, ModifyAgeAction, 'testNamespace');
    const modifyAgeAction = { type: new ModifyAgeAction(30, 'anotherNamespace') };
    const newState = reduceState(undefined, modifyAgeAction);

    expect(newState.name).toBe('test');
    expect(newState.age).toBe(25);
  });
});
