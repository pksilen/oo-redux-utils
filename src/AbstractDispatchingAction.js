// @flow

import type { DispatchAction } from './DispatchUtils';
import AbstractAction from './AbstractAction';

export default class AbstractDispatchingAction<
  OwnStateType,
  ForeignStateType,
  StateNamespaceType: string = ''
> extends AbstractAction<OwnStateType, StateNamespaceType> {
  +dispatchAction_: DispatchAction;

  constructor(stateNamespace: StateNamespaceType, dispatchAction: DispatchAction) {
    super(stateNamespace);
    this.dispatchAction_ = dispatchAction;
  }

  dispatchAction(action: AbstractAction<ForeignStateType, any>) {
    this.dispatchAction_(action);
  }
}
