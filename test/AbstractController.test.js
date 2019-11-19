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
      const controller = new AbstractController(dispatchMock);
      expect(() => {
        controller.getComponentPropNameToDispatchFnMap();
      }).toThrowError();

      // THE
      expect(controller.dispatchAction).toBe(dispatchActionMock);
    });
  });
});
