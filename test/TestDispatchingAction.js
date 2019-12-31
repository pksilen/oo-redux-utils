// @flow
/* istanbul ignore file */

import type { DispatchAction } from '../src';
import { AbstractDispatchingAction } from '../src';
import type { TestState } from './TestState';

export default class TestDispatchingAction extends AbstractDispatchingAction<TestState> {
  constructor(dispatchAction: DispatchAction) {
    super('', dispatchAction);
  }

  performActionAndReturnNewState(currentState: TestState): TestState {
    return {
      ...currentState,
      age: 35
    };
  }
}
