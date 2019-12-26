// @flow

import * as React from 'react';
import AbstractAction from './AbstractAction';
import type { ActionObject } from './Dispatch';
import AbstractDispatchingAction from './AbstractDispatchingAction';

function createStateReducer<StateType, StateNamespaceType: string>(
  initialState: StateType,
  actionBaseClasses: [Class<AbstractAction<any, any>>, ?Class<AbstractDispatchingAction<any, any, any>>],
  stateNamespace: StateNamespaceType
): (StateType | void, ActionObject) => StateType {
  return function(currentState: StateType = initialState, action: ActionObject): StateType {
    return (action.type instanceof actionBaseClasses[0] ||
      (actionBaseClasses[1] && action.type instanceof actionBaseClasses[1])) &&
      action.type.getStateNamespace() === stateNamespace
      ? action.type.performActionAndReturnNewState(currentState)
      : currentState;
  };
}

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
    actionBaseClasses: [Class<AbstractAction<any, any>>, ?Class<AbstractDispatchingAction<any, any, any>>]
  ): (StateType | void, ActionObject) => StateType {
    return createStateReducer(initialState, actionBaseClasses, '');
  }

  // noinspection JSUnusedGlobalSymbols
  static createNamespacedStateReducer<StateType, StateNamespaceType: string>(
    initialState: StateType,
    actionBaseClasses: [Class<AbstractAction<any, any>>, ?Class<AbstractDispatchingAction<any, any, any>>],
    stateNamespace: StateNamespaceType
  ): (StateType | void, ActionObject) => StateType {
    return createStateReducer(initialState, actionBaseClasses, stateNamespace);
  }
}
