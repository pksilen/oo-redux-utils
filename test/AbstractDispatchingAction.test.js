import TestDispatchingAction from './TestDispatchingAction';
import OtherTestAction from './OtherTestAction';


describe('AbstractDispatchingAction', () => {
  describe('dispatchAction', () => {
    it('should dispatch action', () => {
      // GIVEN
      const dispatchAction = jest.fn();
      const dispatchingAction = new TestDispatchingAction(dispatchAction);
      const otherTestAction = new OtherTestAction();

      // WHEN
      dispatchingAction.dispatchAction(otherTestAction);

      // THEN
      expect(dispatchAction).toHaveBeenCalledTimes(1);
      expect(dispatchAction).toHaveBeenCalledWith(otherTestAction);
    });
  });
});
