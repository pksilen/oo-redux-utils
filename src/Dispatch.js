// @flow

import * as React from 'react';
import AbstractAction from './AbstractAction';

export type ActionObject = $Exact<{
  type: AbstractAction<any, any>
}>;

export type Dispatch = (ActionObject) => void;




