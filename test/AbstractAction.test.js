import { AbstractAction } from '../src';
import ModifyAgeAction from './ModifyAgeAction';
import DispatchingAction from './DispatchingAction';
import ModifyAgeDiAction from './ModifyAgeDiAction';

describe('AbstractAction', () => {
  describe('getBaseActionClass', () => {
    it('should throw exception', () => {
      // GIVEN
      const dispatchAction = jest.fn();
      const dispatchingAction = new AbstractAction(dispatchAction);
      const toDispatchAction = new ModifyAgeAction(30);

      // WHEN + THEN
      try {
        dispatchingAction.dispatchAction(toDispatchAction);
        fail();
      } catch (error) {
        expect(error.message).toBe('Abstract method called');
      }
    });
  });

  describe('performAction', () => {
    it('should perform action if both are from same base class', () => {
      // GIVEN
      const dispatchAction = jest.fn();
      const dispatchingAction = new DispatchingAction(dispatchAction);
      const toPerformAction = new DispatchingAction();
      const currentState = {};

      // WHEN
      const newState = dispatchingAction.performAction(toPerformAction, currentState);

      // THEN
      expect(newState.age).toBe(30);
    });

    it('should throw exception if both actions are not from same base class', () => {
      // GIVEN
      const dispatchAction = jest.fn();
      const dispatchingAction = new DispatchingAction(dispatchAction);
      const toPerformAction = new ModifyAgeAction(30);

      // WHEN +THEN
      try {
        dispatchingAction.performAction(toPerformAction, {});
        fail();
      } catch (error) {
        expect(error.message).toBe('Cannot perform actions from different base class');
      }
    });
  });

  describe('dispatchAction', () => {
    it('should dispatch action if action dispatcher is given as constructor parameter', () => {
      // GIVEN
      const dispatchAction = jest.fn();
      const dispatchingAction = new DispatchingAction(dispatchAction);
      const toDispatchAction = new ModifyAgeAction(30);

      // WHEN
      dispatchingAction.dispatchAction(toDispatchAction);

      // THEN
      expect(dispatchAction).toHaveBeenCalledTimes(1);
      expect(dispatchAction).toHaveBeenCalledWith(toDispatchAction);
    });

    it('should throw error if action to dispatch is from same base class', () => {
      // GIVEN
      const dispatchAction = jest.fn();
      const dispatchingAction = new DispatchingAction(dispatchAction);
      const toDispatchAction = new DispatchingAction();

      // WHEN + THEN
      try {
        dispatchingAction.dispatchAction(toDispatchAction);
        fail();
      } catch (error) {}
    });

    it('should throw error if action dispatcher is not given as constructor parameter', () => {
      // GIVEN
      const dispatchingAction = new DispatchingAction();
      const toDispatchAction = new ModifyAgeAction(30);

      try {
        // WHEN
        dispatchingAction.dispatchAction(toDispatchAction);
        fail();
      } catch (error) {
        // THEN
        expect(error.message).toBe('dispatchAction must be given as constructor parameter');
      }
    });
  });

  describe('dispatchAsyncAction', () => {
    it('should dispatch action if action dispatcher is given as constructor parameter', () => {
      // GIVEN
      const dispatchAction = jest.fn();
      const dispatchingAction = new DispatchingAction(dispatchAction);
      const toDispatchAction = new DispatchingAction();

      // WHEN
      dispatchingAction.dispatchAsyncAction(toDispatchAction);

      // THEN
      expect(dispatchAction).toHaveBeenCalledTimes(1);
      expect(dispatchAction).toHaveBeenCalledWith(toDispatchAction);
    });

    it('should throw error if action dispatcher is not given as constructor parameter', () => {
      // GIVEN
      const dispatchingAction = new DispatchingAction();
      const toDispatchAction = new ModifyAgeAction(30);

      try {
        // WHEN
        dispatchingAction.dispatchAsyncAction(toDispatchAction);
        fail();
      } catch (error) {
        // THEN
        expect(error.message).toBe('dispatchAction must be given as constructor parameter');
      }
    });
  });

  describe('dispatchActionWithDi', () => {
    it('should create action with dependencies injected and dispatch action', () => {
      // GIVEN
      const dispatchAction = jest.fn();
      const createMock = jest.fn();
      const diContainer = {
        create: createMock
      };
      const action = new ModifyAgeAction(30);
      const promise = Promise.resolve(action);
      createMock.mockReturnValueOnce(promise);
      const dispatchingAction = new DispatchingAction(dispatchAction);

      // WHEN
      dispatchingAction.dispatchActionWithDi(diContainer, ModifyAgeDiAction,  30);

      // THEN
      return promise.then(() => {
        expect(dispatchAction).toHaveBeenCalledWith(action);
      });
    });
  });

  describe('dispatchActions', () => {
    it('should dispatch all given actions in given order', () => {
      // GIVEN
      const dispatchAction = jest.fn();
      const dispatchingAction = new DispatchingAction(dispatchAction);
      const toDispatchAction1 = new ModifyAgeAction(30);
      const toDispatchAction2 = new ModifyAgeAction(35);
      const toDispatchActionClass = ModifyAgeAction;

      // WHEN
      dispatchingAction.dispatchActions([toDispatchAction1, toDispatchAction2, toDispatchActionClass]);

      // THEN
      expect(dispatchAction).toHaveBeenCalledTimes(3);
      expect(dispatchAction).toHaveBeenNthCalledWith(1, toDispatchAction1);
      expect(dispatchAction).toHaveBeenNthCalledWith(2, toDispatchAction2);
      expect(dispatchAction).toHaveBeenNthCalledWith(3, new toDispatchActionClass());
    });
  });

  describe('dispatchActionsWithDi', () => {
    it('should create actions with dependencies injected and dispatch actions', () => {
      // GIVEN
      const dispatchAction = jest.fn();
      const createMock = jest.fn();
      const diContainer = {
        create: createMock
      };

      const action = new ModifyAgeAction(30);
      const action2 =  new ModifyAgeAction(32);
      const action3 = new ModifyAgeAction(34);
      const action4 = new ModifyAgeAction(36);

      const promise = Promise.resolve(action);
      const promise2 = Promise.resolve(action2);
      const promise3 = Promise.resolve(action4);

      createMock.mockReturnValueOnce(promise);
      createMock.mockReturnValueOnce(promise2);
      createMock.mockReturnValueOnce(promise3);

      const dispatchingAction = new DispatchingAction(dispatchAction);

      // WHEN
      dispatchingAction.dispatchActionsWithDi(diContainer, [
        [ModifyAgeDiAction, [30]],
        [ModifyAgeDiAction, 30],
        ModifyAgeDiAction,
        ModifyAgeAction,
        action3,
        [ModifyAgeAction, 40],
        [ModifyAgeAction, [50]]
      ]);

      // THEN
      return Promise.all([promise, promise2]).then(() => {
        expect(dispatchAction).toHaveBeenCalledWith(action);
        expect(dispatchAction).toHaveBeenCalledWith(action2);
        expect(dispatchAction).toHaveBeenCalledWith(action3);
        expect(dispatchAction).toHaveBeenCalledWith(action4);
        expect(dispatchAction).toHaveBeenCalledWith(new ModifyAgeAction());
        expect(dispatchAction).toHaveBeenCalledWith(new ModifyAgeAction(40));
        expect(dispatchAction).toHaveBeenCalledWith(new ModifyAgeAction(50));
      });
    });
  });
});
