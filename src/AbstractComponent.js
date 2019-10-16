// @flow

import React from 'react';
import type { InExactDispatchWrapper } from './DispatchWrapper';
import AbstractAction from './AbstractAction';

export default class AbstractComponent<PropsType: InExactDispatchWrapper, StateType> extends React.Component<
  PropsType,
  StateType
> {
  dispatch(action: AbstractAction<any>) {
    const { dispatch } = this.props;
    dispatch({ type: action });
  }
}
