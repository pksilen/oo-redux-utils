// @flow

import type { DispatchAction } from './DispatchUtils';

export default class AbstractAction<StateType> {
  + actionClassName: string;

  +stateNamespace: string;

  +dispatchAction_: ?DispatchAction;

  constructor(stateNamespace: string = '', dispatchAction?: DispatchAction) { // NOSONAR
    this.stateNamespace = stateNamespace;
    this.dispatchAction_ = dispatchAction;
    this.actionClassName = this.constructor.name;
  }

  dispatchAction(action: AbstractAction<any>) {
    if (this.dispatchAction_) {
      this.dispatchAction_(action);
    }
  }

  performActionAndReturnNewState(currentState: StateType): StateType {
    throw new TypeError('Abstract method called');
  }

  getStateNamespace(): string {
    return this.stateNamespace;
  }
}
