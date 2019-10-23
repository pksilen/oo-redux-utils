import { AbstractAction } from '../src';
import ModifyAgeAction from './ModifyAgeAction';

describe('dispatchAction', () => {
  it('should dispatch action is action dispatcher is given as constructor parameter', () => {
    const dispatchAction = jest.fn();
    const abstractAction = new AbstractAction(undefined, dispatchAction);

    abstractAction.dispatchAction(new ModifyAgeAction(30));

    expect(dispatchAction).toHaveBeenCalledTimes(1);
  });

  it('should do nothing if action dispatcher is not given as constructor parameter', () => {
    const abstractAction = new AbstractAction(undefined);

    abstractAction.dispatchAction(new ModifyAgeAction(30));
  });
});
