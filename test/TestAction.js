// @flow
/* istanbul ignore file */

import AbstractAction from '../src/AbstractAction';
import type { TestState } from './TestState';

export default class TestAction extends AbstractAction<TestState> {
  constructor() {
    super('');
  }

  performActionAndReturnNewState(currentState: TestState): TestState {
    return {
      ...currentState,
      age: 30
    };
  }
}
