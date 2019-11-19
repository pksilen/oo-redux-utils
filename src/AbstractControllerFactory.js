// @flow

import type { Dispatch } from './DispatchWrapper';
import DispatchUtils from './DispatchUtils';
import type { DispatchAction } from './DispatchUtils';

export default class AbstractControllerFactory {
  dispatchAction: DispatchAction;

  constructor(
    dispatch: Dispatch
  ) {
    this.dispatchAction = DispatchUtils.createActionDispatcher(dispatch);
  }

  // noinspection JSMethodCanBeStatic
  createController(): { [string]: (...args: Array<any>) => void } {
    throw new Error ('Abstract method error');
  }
}
