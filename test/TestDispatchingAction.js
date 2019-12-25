// @flow
/* istanbul ignore file */

import type { DispatchAction } from '../src';
import { AbstractDispatchingAction } from '../src';
import type { TestState } from './TestState';
import type { OtherState } from './OtherState';

export default class TestDispatchingAction extends AbstractDispatchingAction<TestState, OtherState> {
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
