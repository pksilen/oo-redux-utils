import TestDispatchingAction from './TestDispatchingAction';
import OtherTestAction from './OtherTestAction';
import TestAction from './TestAction';

jest.useFakeTimers();

describe('AbstractDispatchingAction', () => {
  describe('dispatchAction', () => {
    it('should dispatch action', () => {
      // GIVEN
      const dispatchAction = jest.fn();
      const dispatchingAction = new TestDispatchingAction(dispatchAction);
      const otherTestAction = new OtherTestAction();

      // WHEN
      dispatchingAction.dispatchAction(otherTestAction);

      // THEN
      expect(dispatchAction).toHaveBeenCalledTimes(1);
      expect(dispatchAction).toHaveBeenCalledWith(otherTestAction);
    });
  });

  describe('dispatchDelayedAction', () => {
    it('should dispatch delayed action', () => {
      // GIVEN
      const dispatchAction = jest.fn();
      const dispatchingAction = new TestDispatchingAction(dispatchAction);
      const testAction = new TestAction();
      const otherTestAction = new OtherTestAction();

      // WHEN
      dispatchingAction.dispatchDelayedAction(testAction, 100);
      dispatchingAction.dispatchDelayedAction(otherTestAction, 200);
      jest.runAllTimers();

      // THEN
      expect(dispatchAction).toHaveBeenCalledTimes(2);
      expect(dispatchAction).toHaveBeenCalledWith(testAction);
      expect(dispatchAction).toHaveBeenCalledWith(otherTestAction);
    });
  });

  describe('dispatchAsyncAction', () => {
    it('should dispatch async action', () => {
      // GIVEN
      const dispatchAction = jest.fn();
      const dispatchingAction = new TestDispatchingAction(dispatchAction);
      const testAction = new TestAction();
      const promise = Promise.resolve(1);

      // WHEN
      dispatchingAction.dispatchAsyncAction(testAction, promise);

      // THEN
      promise.then(() => {
        expect(dispatchAction).toHaveBeenCalledTimes(1);
        expect(dispatchAction).toHaveBeenCalledWith(testAction);
      });
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
      const testAction = new TestAction();
      const promise = Promise.resolve(testAction);
      createMock.mockReturnValueOnce(promise);
      const dispatchingAction = new TestDispatchingAction(dispatchAction);

      // WHEN
      dispatchingAction.dispatchActionWithDi(diContainer, TestAction, {});

      // THEN
      return promise.then(() => {
        expect(dispatchAction).toHaveBeenCalledWith(testAction);
      });
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
      const action = new TestAction();
      const action2 = new OtherTestAction();
      const promise = Promise.resolve(action);
      createMock.mockReturnValueOnce(promise);
      const dispatchingAction = new TestDispatchingAction(dispatchAction);

      // WHEN
      dispatchingAction.dispatchActionsWithDi(diContainer, [[TestAction, {}], action2]);

      // THEN
      return promise.then(() => {
        expect(dispatchAction).toHaveBeenCalledWith(action);
        expect(dispatchAction).toHaveBeenCalledWith(action2);
      });
    });
  });
});
