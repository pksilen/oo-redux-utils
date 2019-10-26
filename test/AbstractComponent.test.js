import AbstractComponent from '../src/AbstractComponent';
import ModifyAgeAction from './ModifyAgeAction';

class Component extends AbstractComponent {}

let dispatch;

beforeEach(() => {
  dispatch = jest.fn();
});

describe('dispatchAction', () => {
  it('should dispatch action', () => {
    // GIVEN
    const component = new Component({ dispatch });
    const action = new ModifyAgeAction(30);

    // WHEN
    component.dispatchAction(action);

    // THEN
    expect(dispatch).toHaveBeenCalledWith({ type: action });
  });
});

describe('dispatchActions', () => {
  it('should dispatch actions', () => {
    // GIVEN
    const component = new Component({ dispatch });
    const action = new ModifyAgeAction(30);
    const action2 = new ModifyAgeAction(35);

    // WHEN
    component.dispatchActions([action, action2]);

    // THEN
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: action });
    expect(dispatch).toHaveBeenNthCalledWith(2, { type: action2 });
  });
});

describe('dispatchActionToComponent', () => {
  it('should dispatch action with receiving component type', () => {
    // GIVEN
    const component = new Component({ dispatch });
    const action = new ModifyAgeAction(30);

    // WHEN
    component.dispatchActionToComponentType(action, Component);

    // THEN
    expect(dispatch).toHaveBeenCalledWith({ type: action, receivingComponentType: Component });
  });
});
