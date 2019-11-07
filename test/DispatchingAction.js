// @flow
/* istanbul ignore file */

import AbstractAction from '../src/AbstractAction';
import type { DispatchAction } from '../src';

type TestState = $Exact<{
  name: string,
  age: number
}>;

class DispatchingActionBase extends AbstractAction<TestState> {
  getBaseActionClass(): Class<AbstractAction<any>> {
    return DispatchingActionBase;
  }
}

export default class DispatchingAction extends DispatchingActionBase {
  age: number;

  constructor(dispatchAction: DispatchAction) {
    super('', dispatchAction);
  }

  performActionAndReturnNewState(currentState: TestState): TestState {
    return {
      ...currentState,
      age: 30
    };
  }
}
