// @flow

import type { Dispatch } from './Dispatch';
import DispatchUtils from './DispatchUtils';
import type { DispatchAction } from './DispatchUtils';

export default class ControllerFactory {
  dispatchAction: DispatchAction;

  constructor(
    dispatch: Dispatch
  ) {
    this.dispatchAction = DispatchUtils.createActionDispatcher(dispatch);
  }
}
