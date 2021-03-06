// @flow
/* istanbul ignore file */

import AbstractAction from '../src/AbstractAction';

type TestState = $Exact<{
  name: string,
  age: number
}>;

export default class ModifyAgeAction extends AbstractAction<TestState> {
  age: number;

  constructor(age: number) {
    super('');
    this.age = age;
  }

  performActionAndReturnNewState(currentState: TestState): TestState {
    return {
      ...currentState,
      age: this.age
    };
  }
}
