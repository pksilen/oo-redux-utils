// @flow

import type { DispatchAction } from './DispatchUtils';
import AbstractAction from './AbstractAction';

export default class AbstractDispatchingAction<
  StateType,
  StateNamespaceType: string = ''
> extends AbstractAction<StateType, StateNamespaceType> {
  +dispatchAction_: DispatchAction;

  constructor(stateNamespace: StateNamespaceType, dispatchAction: DispatchAction) {
    super(stateNamespace);
    this.dispatchAction_ = dispatchAction;
  }

  dispatchAction(action: AbstractAction<StateType, any>) {
    this.dispatchAction_(action);
  }
}
