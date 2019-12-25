import ControllerFactory from '../src/ControllerFactory';
import DispatchUtils from '../src/DispatchUtils';

describe('ControllerFactory', () => {
  describe('constructor', () => {
    it('should create controller', () => {
      // GIVEN
      const dispatchMock = jest.fn();
      const createActionDispatcherMock = jest.fn();
      DispatchUtils.createActionDispatcher = createActionDispatcherMock;
      const dispatchActionMock = jest.fn();
      createActionDispatcherMock.mockReturnValueOnce(dispatchActionMock);

      // WHEN
      const controller = new ControllerFactory(dispatchMock, '');

      // THEN
      expect(controller.dispatchAction).toBe(dispatchActionMock);
      expect(controller.stateNamespace).toBe('');
    });
  });
});
