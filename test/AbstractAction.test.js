import { AbstractAction } from '../src';
import ModifyAgeAction from './ModifyAgeAction';

describe('dispatchAction', () => {
  it('should dispatch action is action dispatcher is given as constructor parameter', () => {
    // GIVEN
    const dispatchAction = jest.fn();
    const abstractAction = new AbstractAction(undefined, dispatchAction);

    // WHEN
    abstractAction.dispatchAction(new ModifyAgeAction(30));

    // THEN
    expect(dispatchAction).toHaveBeenCalledTimes(1);
  });

  it('should do nothing if action dispatcher is not given as constructor parameter', () => {
    // GIVEN
    const abstractAction = new AbstractAction(undefined);

    // WHEN
    abstractAction.dispatchAction(new ModifyAgeAction(30));

    // THEN DO NOTHING
  });
});
