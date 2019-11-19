// @flow

import type { Dispatch } from './DispatchWrapper';
import DispatchUtils from './DispatchUtils';
import type { DispatchAction } from './DispatchUtils';

export default class AbstractController {
  dispatchAction: DispatchAction;

  constructor(
    dispatch: Dispatch
  ) {
    this.dispatchAction = DispatchUtils.createActionDispatcher(dispatch);
  }

  // noinspection JSMethodCanBeStatic
  getComponentPropNameToDispatchFnMap(): { [string]: (...args: Array<any>) => void } {
    throw new Error ('Abstract method error');
  }
}
