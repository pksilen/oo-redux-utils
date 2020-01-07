import DispatchUtils from '../src/DispatchUtils';
import ControllerFactory from '../src/ControllerFactory';
import TestAction from './TestAction';

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

describe('ControllerFactory', () => {
  describe('constructor', () => {
    it('should create controller', () => {
      // WHEN
      const controller = new ControllerFactory(dispatchMock);

      // THEN
      expect(controller.dispatchAction).toBe(dispatchActionMock);
    });
  });

  describe('dispatchActionWithDi', () => {
    it('should dispatch action with injected dependencies', done => {
      // GIVEN
      const controller = new ControllerFactory(dispatchMock);
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
          arg1: 1
        });
        done();
      });
    });
  });
});
