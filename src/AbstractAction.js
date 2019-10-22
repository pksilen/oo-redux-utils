// @flow

import type { DispatchAction } from './DispatchUtils';

export default class AbstractAction<StateType> {
  +stateNamespace: ?string;

  +dispatchAction: ?DispatchAction;

  constructor(stateNamespace?: string, dispatchAction?: DispatchAction) {
    this.stateNamespace = stateNamespace;
    this.dispatchAction = dispatchAction;
  }

  performActionAndReturnNewState(currentState: StateType): StateType {
    throw new TypeError('Abstract method called');
  }

  getStateNamespace(): ?string {
    return this.stateNamespace;
  }
}
