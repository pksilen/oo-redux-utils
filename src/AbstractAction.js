// @flow

export default class AbstractAction<StateType, StateNamespaceType: string = ''> {
  +actionClassName: string;

  +stateNamespace: StateNamespaceType;

  constructor(stateNamespace: StateNamespaceType) {
    this.stateNamespace = stateNamespace;
    this.actionClassName = this.constructor.name;
  }

  performAction(
    action: AbstractAction<StateType, StateNamespaceType>,
    currentState: StateType
  ): StateType {
    return action.performActionAndReturnNewState(currentState);
  }

  performActionAndReturnNewState(currentState: StateType): StateType {
    throw new TypeError('Abstract method called');
  }

  getStateNamespace(): string {
    return this.stateNamespace;
  }
}
