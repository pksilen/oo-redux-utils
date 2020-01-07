import DispatchUtils from '../src/DispatchUtils';
import TestAction from './TestAction';
import NamespacedControllerFactory from '../src/NamespacedControllerFactory';

let dispatchMock;
let createActionDispatcherMock;
let dispatchActionMock;

beforeEach(() => {
  dispatchMock = jest.fn();
  createActionDispatcherMock = jest.fn();
  DispatchUtils.createActionDispatcher = createActionDispatcherMock;
  dispatchActionMock = jest.fn();
  createActionDispatcherMock.mockReturnValueOnce(dispatchActionMock);
});

describe('NamespacedControllerFactory', () => {
  describe('constructor', () => {
    it('should create controller', () => {
      // WHEN
      const controller = new NamespacedControllerFactory(dispatchMock, 'stateNamespace');

      // THEN
      expect(controller.dispatchAction).toBe(dispatchActionMock);
      expect(controller.stateNamespace).toBe('stateNamespace');
    });
  });

  describe('dispatchActionWithDi', () => {
    it('should dispatch action with injected dependencies', (done) => {
      // GIVEN
      const controller = new NamespacedControllerFactory(dispatchMock, 'stateNamespace');
      const diContainer = { create: jest.fn() };
      const testAction = new TestAction();
      const promise = Promise.resolve(testAction);
      diContainer.create.mockReturnValueOnce(promise);

      // WHEN
      controller.dispatchActionWithDi(diContainer, TestAction, { arg1: 1 });

      // THEN
      promise.then(() => {
        expect(controller.dispatchAction).toHaveBeenCalledWith(testAction);
        expect(diContainer.create).toHaveBeenCalledWith(TestAction, {
          dispatchAction: controller.dispatchAction,
          stateNamespace: 'stateNamespace',
          arg1: 1
        });
        done();
      });
    });
  });
});
