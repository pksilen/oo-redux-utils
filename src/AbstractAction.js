// @flow

export default class AbstractAction<StateType> {
  +stateNamespace: string;

  constructor(stateNamespace: string) {
    this.stateNamespace = stateNamespace;
  }

  performActionAndReturnNewState(currentState: StateType): StateType {
    throw new TypeError('Abstract method called');
  }

  getStateNamespace(): string {
    return this.stateNamespace;
  }
}
