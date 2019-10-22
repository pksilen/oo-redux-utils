// @flow

import * as React from 'react';
import type { InExactDispatchWrapper } from './DispatchWrapper';
import AbstractAction from './AbstractAction';
import DispatchUtils from './DispatchUtils';

export default class AbstractComponent<PropsType: InExactDispatchWrapper, StateType> extends React.Component<
  PropsType,
  StateType
> {
  dispatchAction(action: AbstractAction<any>) {
    const dispatchAction = DispatchUtils.createActionDispatcher(this.props.dispatch);
    dispatchAction(action);
  }

  dispatchActions(actions: Array<AbstractAction<any>>) {
    actions.forEach((action: AbstractAction<any>) => this.dispatchAction(action));
  }

  dispatchActionToComponentType(action: AbstractAction<any>, componentType: React.ComponentType<any>) {
    const dispatchActionToComponentType = DispatchUtils.createActionDispatcherToComponentType(
      this.props.dispatch
    );
    dispatchActionToComponentType(action, componentType);
  }
}
