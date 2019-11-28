// @flow

import * as React from 'react';
import AbstractAction from './AbstractAction';
import type { Dispatch } from './Dispatch';

export type DispatchAction = (AbstractAction<any, any>) => void;
export type DispatchActionWrapper = {
  dispatchAction: DispatchAction
}

export default class DispatchUtils {
  static createActionDispatcher(dispatch: Dispatch): DispatchAction {
    return function(action: AbstractAction<any, any>) {
      dispatch({ type: action });
    };
  }
}
