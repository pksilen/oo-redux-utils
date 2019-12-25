// @flow

export default class AbstractAction<OwnStateType, StateNamespaceType: string = ''> {
  +actionClassName: string;

  +stateNamespace: StateNamespaceType;

  constructor(stateNamespace: StateNamespaceType) {
    this.stateNamespace = stateNamespace;
    this.actionClassName = this.constructor.name;
  }

  performAction(
    action: AbstractAction<OwnStateType, StateNamespaceType>,
    currentState: OwnStateType
  ): OwnStateType {
    return action.performActionAndReturnNewState(currentState);
  }

  performActionAndReturnNewState(currentState: OwnStateType): OwnStateType {
    throw new TypeError('Abstract method called');
  }

  getStateNamespace(): string {
    return this.stateNamespace;
  }
}
