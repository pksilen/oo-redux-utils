// @flow
/* istanbul ignore file */

import AbstractAction from '../src/AbstractAction';

type TestState = $Exact<{
  name: string,
  age: number
}>;

class ModifyAgeActionBase extends AbstractAction<TestState> {
  getBaseActionClass(): Class<AbstractAction<any>> {
    return ModifyAgeActionBase;
  }
}

export default class ModifyAgeAction extends ModifyAgeActionBase {
  age: number;

  constructor(age: number, namespace: string = '') {
    super(namespace);
    this.age = age;
  }

  performActionAndReturnNewState(currentState: TestState): TestState {
    return {
      ...currentState,
      age: this.age
    };
  }
}
