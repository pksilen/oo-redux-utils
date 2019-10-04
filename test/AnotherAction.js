// @flow

import AbstractAction from '../src/AbstractAction';

export default class AnotherAction extends AbstractAction<{ name: string, age: number }> {
  /* istanbul ignore next */
  performActionAndReturnNewState(currentState: TestState): TestState {
    return {
      name: 'name',
      age: 10
    };
  }
}
