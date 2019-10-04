// @flow

import AbstractAction from './AbstractAction';
import type { ComponentClass } from './ComponentClass';

export type ActionObject = $Exact<{
  type: AbstractAction<any>,
  receivingComponentClass?: ComponentClass
}>;

export type Dispatch = (ActionObject) => void;

export type DispatchWrapper = {
  dispatch: Dispatch
};
