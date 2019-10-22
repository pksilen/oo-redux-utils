import AbstractComponent from '../src/AbstractComponent';
import ModifyAgeAction from './ModifyAgeAction';

class Component extends AbstractComponent {}

let dispatch;

beforeEach(() => {
  dispatch = jest.fn();
});

describe('dispatchAction', () => {
  it('should dispatch action', () => {
    const component = new Component({ dispatch });
    const action = new ModifyAgeAction(30);

    component.dispatchAction(action);

    expect(dispatch).toHaveBeenCalledWith({ type: action });
  });
});

describe('dispatchActions', () => {
  it('should dispatch actions', () => {
    const component = new Component({ dispatch });
    const action = new ModifyAgeAction(30);
    const action2 = new ModifyAgeAction(35);

    component.dispatchActions([action, action2]);

    expect(dispatch).toHaveBeenNthCalledWith(1, { type: action });
    expect(dispatch).toHaveBeenNthCalledWith(2, { type: action2 });
  });
});

describe('dispatchActionToComponent', () => {
  it('should dispatch action with receiving component type', () => {
    const component = new Component({ dispatch });
    const action = new ModifyAgeAction(30);

    component.dispatchActionToComponentType(action, Component);

    expect(dispatch).toHaveBeenCalledWith({ type: action, receivingComponentType: Component });
  });
});
