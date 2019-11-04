// @flow

import type { DispatchAction } from './DispatchUtils';
import type { Dispatch } from './DispatchWrapper';
import DispatchUtils from './DispatchUtils';

export default class AbstractController {
  dispatchAction: DispatchAction;

  constructor(dispatch: Dispatch) {
    this.dispatchAction = DispatchUtils.createActionDispatcher(dispatch);
  }
}
