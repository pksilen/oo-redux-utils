// @flow

import type { Dispatch } from './Dispatch';
import DispatchUtils from './DispatchUtils';
import type { DispatchAction } from './DispatchUtils';

export default class ControllerFactory<StateNamespaceType: string = ''> {
  dispatchAction: DispatchAction;

  stateNamespace: StateNamespaceType;

  constructor(
    dispatch: Dispatch,
    stateNamespace: StateNamespaceType
  ) {
    this.dispatchAction = DispatchUtils.createActionDispatcher(dispatch);
    this.stateNamespace = stateNamespace;
  }
}
