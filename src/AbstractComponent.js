// @flow

import * as React from 'react';
import type { InExactDispatchWrapper } from './DispatchWrapper';
import AbstractAction from './AbstractAction';

export default class AbstractComponent<PropsType: InExactDispatchWrapper, StateType> extends React.Component<
  PropsType,
  StateType
> {
  dispatch(action: AbstractAction<any>, componentType?: React.ComponentType<any>) {
    const { dispatch } = this.props;
    dispatch({ type: action, receivingComponentType: componentType });
  }
}
