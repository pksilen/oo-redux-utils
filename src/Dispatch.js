// @flow

import * as React from 'react';
import AbstractAction from './AbstractAction';

export type ActionObject = $Exact<{
  type: AbstractAction<any>
}>;

export type Dispatch = (ActionObject) => void;




