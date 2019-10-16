// @flow

import * as React from 'react';
import AbstractAction from './AbstractAction';

export type ActionObject = $Exact<{
  type: AbstractAction<any>,
  receivingComponentType?: React.ComponentType<any>
}>;

export type Dispatch = (ActionObject) => void;

export type DispatchWrapper = $Exact<{
  dispatch: Dispatch
}>;

export type InExactDispatchWrapper = {
  dispatch: Dispatch
};
