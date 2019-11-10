// @flow

import * as React from 'react';
import AbstractAction from './AbstractAction';
import type { Dispatch } from './DispatchWrapper';

export type DispatchAction = (AbstractAction<any>) => void;
export type DispatchActionToComponentType = (AbstractAction<any>, React.ComponentType<any>) => void;

export default class DispatchUtils {
  static createActionDispatcher(dispatch: Dispatch): DispatchAction {
    return function(action: AbstractAction<any>) {
      dispatch({ type: action });
    };
  }
}
