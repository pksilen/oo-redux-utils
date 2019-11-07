import ModifyAgeAction from './ModifyAgeAction';
import ControllerFactory from '../src/ControllerFactory';
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

describe('createController', () => {
  it('should create controller without DI container', () => {
    // GIVEN
    class TestControllerFactory extends ControllerFactory {
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

  it('should create controller with supplied additional functions', () => {
    // GIVEN
    const additionalFuncMock = jest.fn();

    class TestControllerFactory extends ControllerFactory {
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

    class TestControllerFactory extends ControllerFactory {
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
    class TestControllerFactory extends ControllerFactory {
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
    class TestControllerFactory extends ControllerFactory {
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
    controller.modifyAge({ age: 30 });

    // THEN
    expect(diContainerMock.create).toHaveBeenCalledWith(AsyncModifyAgeAction, {
      age: 30,
      stateNamespace: ''
    });
    expect(createActionPromise).resolves.toBe(createdAction);
  });

  it('should throw error if DI container is required but not supplied', () => {
    // GIVEN
    class TestControllerFactory extends ControllerFactory {
      getDispatchFnNameToActionClassMap() {
        return {
          modifyAge: AsyncModifyAgeAction
        };
      }
    }

    // WHEN + THEN
    try {
      new TestControllerFactory(dispatchMock).createController();
      fail();
    } catch (error) {
      expect(error.message).toBe('diContainer argument is missing');
    }
  });

  it('should throw error if neither of abstract methods is overridden', () => {
    // GIVEN
    class TestControllerFactory extends ControllerFactory {}

    // WHEN + THEN
    try {
      new TestControllerFactory(dispatchMock).createController();
      fail();
    } catch (error) {
      expect(error.message).toBe(
        'At least either getDispatchFnNameToActionClassMap() or getDispatchFnNameToDispatchFnMap() must be overridden'
      );
    }
  });
});
