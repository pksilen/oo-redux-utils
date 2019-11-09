import ModifyAgeAction from './ModifyAgeAction';
import AbstractControllerFactory from '../src/AbstractControllerFactory';
import DispatchUtils from '../src/DispatchUtils';
import NamespacedModifyAgeAction from './NamespacedModifyAgeAction';
import AsyncModifyAgeAction from './AsyncModifyAgeAction';

let dispatchMock;
let dispatchActionMock;
let createActionDispatcherMock;
let diContainerMock;

beforeEach(() => {
  dispatchMock = jest.fn();
  dispatchActionMock = jest.fn();
  createActionDispatcherMock = jest.fn();
  diContainerMock = {
    create: jest.fn()
  };
  DispatchUtils.createActionDispatcher = createActionDispatcherMock;
  createActionDispatcherMock.mockReturnValueOnce(dispatchActionMock);
});

describe('AbstractControllerFactory', () => {
  describe('dispatchActionWithDi', () => {
    it('should create action with dependencies injected and dispatch action', () => {
      // GIVEN
      class TestControllerFactory extends AbstractControllerFactory {
        getDispatchFnNameToDispatchFnMap() {
          return {
            modifyAge: age => this.dispatchActionWithDi(ModifyAgeAction, age)
          };
        }
      }

      const action = new ModifyAgeAction(39);
      const promise = Promise.resolve(action);
      diContainerMock.create.mockReturnValueOnce(promise);

      // WHEN
      const controller = new TestControllerFactory(dispatchMock, '', diContainerMock).createController();
      controller.modifyAge(30);

      // THEN
      return promise.then(() => {
        expect(dispatchActionMock).toHaveBeenCalledWith(action);
      });
    });

    it('should throw error if DI container is not supplied', () => {
      // GIVEN
      class TestControllerFactory extends AbstractControllerFactory {
        getDispatchFnNameToDispatchFnMap() {
          return {
            modifyAge: (age) => this.dispatchActionWithDi(ModifyAgeAction, { age })
          };
        }
      }

      const action = new ModifyAgeAction(39);
      const promise = Promise.resolve(action);
      diContainerMock.create.mockReturnValueOnce(promise);

      // WHEN
      try {
        const controller = new TestControllerFactory(dispatchMock).createController();
        controller.modifyAge(30);
        // THEN
        fail();
      } catch (error) {
        // THEN
        expect(error.message).toBe('diContainer argument is missing');
      }
    });
  });

  describe('createController', () => {
    it('should create controller that dispatches action without DI container', () => {
      // GIVEN
      class TestControllerFactory extends AbstractControllerFactory {
        getDispatchFnNameToActionClassMap() {
          return {
            modifyAge: ModifyAgeAction
          };
        }
      }

      // WHEN
      const controller = new TestControllerFactory(dispatchMock).createController();
      controller.modifyAge(30);

      // THEN
      expect(dispatchActionMock).toBeCalledTimes(1);
      expect(dispatchActionMock).toHaveBeenCalledWith(new ModifyAgeAction(30));
    });

    it('should create controller that dispatches action with argument without DI container', () => {
      // GIVEN
      class TestControllerFactory extends AbstractControllerFactory {
        getDispatchFnNameToActionClassMap() {
          return {
            modifyAge: [ModifyAgeAction, 30]
          };
        }
      }

      // WHEN
      const controller = new TestControllerFactory(dispatchMock).createController();
      controller.modifyAge();

      // THEN
      expect(dispatchActionMock).toBeCalledTimes(1);
      expect(dispatchActionMock).toHaveBeenCalledWith(new ModifyAgeAction(30));
    });

    it('should create controller that dispatches action with arguments without DI container', () => {
      // GIVEN
      class TestControllerFactory extends AbstractControllerFactory {
        getDispatchFnNameToActionClassMap() {
          return {
            modifyAge: [ModifyAgeAction, [30]]
          };
        }
      }

      // WHEN
      const controller = new TestControllerFactory(dispatchMock).createController();
      controller.modifyAge();

      // THEN
      expect(dispatchActionMock).toBeCalledTimes(1);
      expect(dispatchActionMock).toHaveBeenCalledWith(new ModifyAgeAction(30));
    });

    it('should create controller with supplied additional functions', () => {
      // GIVEN
      const additionalFuncMock = jest.fn();

      class TestControllerFactory extends AbstractControllerFactory {
        getDispatchFnNameToActionClassMap() {
          return {
            modifyAge: ModifyAgeAction
          };
        }

        getDispatchFnNameToDispatchFnMap() {
          return {
            additionalFuncName: additionalFuncMock
          };
        }
      }

      // WHEN
      const controller = new TestControllerFactory(dispatchMock).createController();
      controller.modifyAge(30);

      // THEN
      expect(dispatchActionMock).toBeCalledTimes(1);
      expect(dispatchActionMock).toHaveBeenCalledWith(new ModifyAgeAction(30));
      expect(controller.additionalFuncName).toBe(additionalFuncMock);
    });

    it('should create controller with supplied functions only', () => {
      // GIVEN
      const additionalFuncMock = jest.fn();

      class TestControllerFactory extends AbstractControllerFactory {
        getDispatchFnNameToDispatchFnMap() {
          return {
            additionalFuncName: additionalFuncMock
          };
        }
      }

      // WHEN
      const controller = new TestControllerFactory(dispatchMock).createController();

      // THEN
      expect(controller.additionalFuncName).toBe(additionalFuncMock);
    });

    it('should create namespaced controller', () => {
      // GIVEN
      class TestControllerFactory extends AbstractControllerFactory {
        getDispatchFnNameToActionClassMap() {
          return {
            modifyAge: NamespacedModifyAgeAction
          };
        }
      }

      // WHEN
      const controller = new TestControllerFactory(dispatchMock, 'test').createController();
      controller.modifyAge(30);

      // THEN
      expect(dispatchActionMock).toBeCalledTimes(1);
      expect(dispatchActionMock).toHaveBeenCalledWith(new NamespacedModifyAgeAction('test', 30));
    });

    it('should create controller with DI container', () => {
      // GIVEN
      class TestControllerFactory extends AbstractControllerFactory {
        getDispatchFnNameToActionClassMap() {
          return {
            modifyAge: AsyncModifyAgeAction
          };
        }
      }

      const createdAction = new ModifyAgeAction(39);
      const createActionPromise = new Promise(function(resolve, reject) {
        resolve(createdAction);
      });

      diContainerMock.create.mockReturnValueOnce(createActionPromise);

      // WHEN
      const controller = new TestControllerFactory(dispatchMock, '', diContainerMock).createController();
      controller.modifyAge(30);

      // THEN
      expect(diContainerMock.create).toHaveBeenCalledWith(AsyncModifyAgeAction, {
        stateNamespace: ''
      }, 30);
      expect(createActionPromise).resolves.toBe(createdAction);
    });

    it('should throw error if DI container is required but not supplied', () => {
      // GIVEN
      class TestControllerFactory extends AbstractControllerFactory {
        getDispatchFnNameToActionClassMap() {
          return {
            modifyAge: AsyncModifyAgeAction
          };
        }
      }

      try {
        // WHEN
        new TestControllerFactory(dispatchMock).createController();
        fail();
      } catch (error) {
        // THEN
        expect(error.message).toBe('diContainer argument is missing');
      }
    });

    it('should throw error if neither of abstract methods is overridden', () => {
      // GIVEN
      class TestControllerFactory extends AbstractControllerFactory {}

      try {
        // WHEN
        new TestControllerFactory(dispatchMock).createController();
        fail();
      } catch (error) {
        // THEN
        expect(error.message).toBe(
          'At least either getDispatchFnNameToActionClassMap() or getDispatchFnNameToDispatchFnMap() must be overridden'
        );
      }
    });
  });
});
