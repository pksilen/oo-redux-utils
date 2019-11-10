import DispatchUtils from '../src/DispatchUtils';
import ModifyAgeAction from './ModifyAgeAction';

describe('createActionDispatcher', () => {
  it('should create action dispatcher that dispatches an action', () => {
    // GIVEN
    const dispatchMock = jest.fn();
    const dispatchAction = DispatchUtils.createActionDispatcher(dispatchMock);
    const action = new ModifyAgeAction(30);

    // WHEN
    dispatchAction(action);

    // THEN
    expect(dispatchMock).toHaveBeenCalledWith({ type: action });
  });
});
