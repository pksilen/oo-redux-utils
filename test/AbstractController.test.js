import ModifyAgeAction from './ModifyAgeAction';
import AbstractController from '../src/AbstractController';

class TestController extends AbstractController {}

let dispatch;

beforeEach(() => {
  dispatch = jest.fn();
});

describe('dispatchAction', () => {
  it('should dispatch action', () => {
    // GIVEN
    const controller = new TestController(dispatch);
    const action = new ModifyAgeAction(30);

    // WHEN
    controller.dispatchAction(action);

    // THEN
    expect(dispatch).toHaveBeenCalledWith({ type: action });
  });
});
