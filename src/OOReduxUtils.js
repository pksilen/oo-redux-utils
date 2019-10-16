// @flow

import * as React from 'react';
import AbstractAction from './AbstractAction';
import type { ActionObject } from './DispatchWrapper';

export default class OOReduxUtils {
  // noinspection JSUnusedGlobalSymbols
  static mergeOwnAndForeignState<OwnStateType: Object, ForeignStateType: Object>(
    ownState: OwnStateType,
    foreignState: ForeignStateType
  ): $Exact<{ ...OwnStateType, ...ForeignStateType }> {
    const overlappingOwnAndForeignStateKeys = Object.keys(ownState).filter((ownStateKey: string) =>
      Object.keys(foreignState).includes(ownStateKey)
    );

    if (overlappingOwnAndForeignStateKeys.length > 0) {
      throw new Error('One or more overlapping properties in own and foreign state');
    }

    return {
      ...ownState,
      ...foreignState
    };
  }

  // noinspection JSUnusedGlobalSymbols
  static createStateReducer<StateType>(
    initialState: StateType,
    actionBaseClass: Class<AbstractAction<any>>,
    stateNamespace?: string,
    componentType?: React.ComponentType<any>
  ): (StateType, ActionObject) => StateType {
    return function(currentState: StateType = initialState, action: ActionObject): StateType {
      return ((action.receivingComponentType && action.receivingComponentType === componentType) ||
        (!action.receivingComponentType && action.type instanceof actionBaseClass)) &&
        action.type.getStateNamespace() === stateNamespace
        ? action.type.performActionAndReturnNewState(currentState)
        : currentState;
    };
  }
}
