// @flow

import type { Dispatch } from './DispatchWrapper';
import DispatchUtils from './DispatchUtils';
import type { DispatchAction } from './DispatchUtils';

export default class AbstractController {
  dispatchAction: DispatchAction;

  stateNamespace: string;

  constructor(
    dispatch: Dispatch,
    stateNamespace: string = ''
  ) {
    this.dispatchAction = DispatchUtils.createActionDispatcher(dispatch);
    this.stateNamespace = stateNamespace;
  }
}
