// @flow

import { AbstractAction } from '../src/AbstractAction';

type TestState = {
  name: string,
  age: number
};

export default class ModifyAgeAction extends AbstractAction<TestState> {
  age: number;

  constructor(age: number, namespace: string = '') {
    super(namespace);
    this.age = age;
  }

  performActionAndReturnNewState(currentState: TestState): $Exact<TestState> {
    return {
      ...currentState,
      age: this.age
    };
  }
}
