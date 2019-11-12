// @flow
/* istanbul ignore file */

import AbstractAction from '../src/AbstractAction';

type TestState = $Exact<{
  name: string,
  age: number
}>;

export default class ModifyAgeNsAction extends AbstractAction<TestState> {
  age: number;

  constructor(stateNamespace: string, age: number) {
    super(stateNamespace);
    this.age = age;
  }

  performActionAndReturnNewState(currentState: TestState): TestState {
    return {
      ...currentState,
      age: this.age
    };
  }
}
