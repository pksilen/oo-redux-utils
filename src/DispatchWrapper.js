// @flow

import * as React from 'react';
import AbstractAction from './AbstractAction';

export type ActionObject = $Exact<{
  type: AbstractAction<any>,
  receivingComponentType?: React.ComponentType<any>
}>;

type Dispatch = (ActionObject) => void;

export type InExactDispatchWrapper = {
  dispatch: Dispatch
};

export type DispatchWrapper = $Exact<{
  dispatch: Dispatch
}>;


