import AbstractController from '../src/AbstractController';
import DispatchUtils from '../src/DispatchUtils';

describe('AbstractController', () => {
  describe('constructor', () => {
    it('should create abstract controller', () => {
      // GIVEN
      const dispatchMock = jest.fn();
      const createActionDispatcherMock = jest.fn();
      DispatchUtils.createActionDispatcher = createActionDispatcherMock;
      const dispatchActionMock = jest.fn();
      createActionDispatcherMock.mockReturnValueOnce(dispatchActionMock);

      // WHEN
      const controller = new AbstractController(dispatchMock, 'test');

      // THE
      expect(controller.dispatchAction).toBe(dispatchActionMock);
      expect(controller.stateNamespace).toBe('test');
    });
  });
});
