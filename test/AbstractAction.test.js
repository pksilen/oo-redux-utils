import TestAction from './TestAction';

describe('AbstractAction', () => {
  describe('performAction', () => {
    it('should perform action', () => {
      // GIVEN
      const testAction = new TestAction();
      const anotherAction = new TestAction();
      const currentState = {};

      // WHEN
      const newState = testAction.performAction(anotherAction, currentState);

      // THEN
      expect(newState.age).toBe(30);
    });
  });
});
