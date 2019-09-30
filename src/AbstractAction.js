// @flow

export class AbstractAction<T> {
  +stateNamespace: string;

  constructor(stateNamespace: string = '') {
    this.stateNamespace = stateNamespace;
  }

  performActionAndReturnNewState(currentState: T): T {
    throw new TypeError('Abstract method called');
  }

  getStateNamespace(): string {
    return this.stateNamespace;
  }
}
