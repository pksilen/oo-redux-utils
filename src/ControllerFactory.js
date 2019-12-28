// @flow

import type { Dispatch } from './Dispatch';
import DispatchUtils from './DispatchUtils';
import type { DispatchAction } from './DispatchUtils';
import AbstractAction from './AbstractAction';

export default class ControllerFactory {
  dispatchAction: DispatchAction;

  constructor(dispatch: Dispatch) {
    this.dispatchAction = DispatchUtils.createActionDispatcher(dispatch);
  }

  dispatchActionWithDi(
    diContainer: { create: (...args: Array<any>) => any },
    actionClass: Class<AbstractAction<any, any>>,
    otherArgs: Object
  ) {
    diContainer
      .create(actionClass, {
        dispatchAction: this.dispatchAction,
        ...otherArgs
      })
      .then((action: any) => this.dispatchAction(action));
  }
}
