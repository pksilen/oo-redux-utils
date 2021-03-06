import React from 'react';
import OOReduxUtils from '../src/OOReduxUtils';
import ModifyAgeAction from './ModifyAgeAction';
import AbstractAction from '../src/AbstractAction';
import AnotherAction from './AnotherAction';
import TestDispatchingAction from './TestDispatchingAction';

describe('OOReduxUtils', () => {
  describe('mergeOwnAndForeignState', () => {
    it('should merge own and foreign state successfully', () => {
      // GIVEN
      const ownState = {
        ownValue: 1
      };
      const foreignState = {
        foreignValue: 2
      };

      // WHEN
      const mergedState = OOReduxUtils.mergeOwnAndForeignState(ownState, foreignState);

      // THEN
      expect(mergedState).toEqual({ ownValue: 1, foreignValue: 2 });
    });

    it('should throw error if own and foreign state contains overlapping property keys', () => {
      // GIVEN
      const ownState = {
        value: 1
      };
      const foreignState = {
        value: 2
      };

      // THEN
      expect(() => {
        OOReduxUtils.mergeOwnAndForeignState(ownState, foreignState);
      }).toThrow('One or more overlapping properties in own and foreign state');
    });
  });

  describe('createStateReducer', () => {
    const initialState = {
      name: 'test',
      age: 25
    };

    test('that calling the created state reducer reduces state with given action', () => {
      // GIVEN
      const reduceState = OOReduxUtils.createStateReducer(initialState, [ModifyAgeAction]);
      const currentState = {
        name: 'test2',
        age: 25
      };
      const modifyAgeAction = { type: new ModifyAgeAction(30) };

      // WHEN
      const newState = reduceState(currentState, modifyAgeAction);

      // THEN
      expect(newState.name).toBe('test2');
      expect(newState.age).toBe(30);
    });

    test('that calling the created state reducer reduces state with given dispatching action', () => {
      // GIVEN
      const reduceState = OOReduxUtils.createStateReducer(initialState, [
        ModifyAgeAction,
        TestDispatchingAction
      ]);

      const currentState = {
        name: 'test2',
        age: 25
      };

      const modifyAgeAction = { type: new TestDispatchingAction() };

      // WHEN
      const newState = reduceState(currentState, modifyAgeAction);

      // THEN
      expect(newState.name).toBe('test2');
      expect(newState.age).toBe(35);
    });

    test('that calling the created state reducer without current state should use initial state', () => {
      // GIVEN
      const reduceState = OOReduxUtils.createStateReducer(initialState, [ModifyAgeAction]);
      const modifyAgeAction = { type: new ModifyAgeAction(30) };

      // WHEN
      const newState = reduceState(undefined, modifyAgeAction);

      // THEN
      expect(newState.name).toBe('test');
      expect(newState.age).toBe(30);
    });

    test('that calling created state reducer should throw error if abstract action method is not overridden', () => {
      // GIVEN
      class TestAction extends AbstractAction {}

      const reduceState = OOReduxUtils.createStateReducer(initialState, [TestAction]);
      const abstractAction = { type: new TestAction('') };

      // WHEN + THEN
      expect(() => {
        reduceState(initialState, abstractAction);
      }).toThrow('Abstract method called');
    });

    test('that calling created state reducer with different action base class should not alter state', () => {
      // GIVEN
      const reduceState = OOReduxUtils.createStateReducer(initialState, [ModifyAgeAction]);
      const modifyAgeAction = { type: new AnotherAction() };

      // WHEN
      const newState = reduceState(undefined, modifyAgeAction);

      // THEN
      expect(newState.name).toBe('test');
      expect(newState.age).toBe(25);
    });

    test('that calling created state reducer with action from different namespace should not alter state', () => {
      // GIVEN
      const reduceState = OOReduxUtils.createNamespacedStateReducer(
        initialState,
        [ModifyAgeAction],
        'testNamespace'
      );
      const modifyAgeAction = { type: new ModifyAgeAction(30, 'anotherNamespace') };

      // WHEN
      const newState = reduceState(undefined, modifyAgeAction);

      // THEN
      expect(newState.name).toBe('test');
      expect(newState.age).toBe(25);
    });
  });
});
