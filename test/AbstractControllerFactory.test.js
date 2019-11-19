import AbstractControllerFactory from '../src/AbstractControllerFactory';
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
      const controller = new AbstractControllerFactory(dispatchMock);
      expect(() => {
        controller.createController();
      }).toThrowError();

      // THE
      expect(controller.dispatchAction).toBe(dispatchActionMock);
    });
  });
});
