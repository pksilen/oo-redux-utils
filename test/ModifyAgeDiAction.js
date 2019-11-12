// @flow
/* istanbul ignore file */

import AbstractAction from '../src/AbstractAction';
import type { DispatchAction } from '../src/DispatchUtils';

type TestState = $Exact<{
  name: string,
  age: number
}>;

export default class ModifyAgeDiAction extends AbstractAction<TestState> {
  age: number;

  constructor(params: { dispatchAction: DispatchAction, age: number }) {
    super('', params.dispatchAction);
    this.age = params.age;
  }

  static needsDependencyInjection(): boolean {
    return true;
  }

  performActionAndReturnNewState(currentState: TestState): TestState {
    return {
      ...currentState,
      age: this.age
    };
  }
}
