// @flow

import * as React from 'react';
import AbstractAction from './AbstractAction';
import type { ActionObject } from './Dispatch';

function createStateReducer<StateType, StateNamespaceType: string = ''>(
  initialState: StateType,
  actionBaseClass: Class<AbstractAction<any, any>>,
  stateNamespace: StateNamespaceType
): (StateType | void, ActionObject) => StateType {
  if (actionBaseClass === AbstractAction) {
    throw new Error('actionBaseClass must be a class extended from AbstractAction');
  }

  return function(currentState: StateType = initialState, action: ActionObject): StateType {
    return action.type instanceof actionBaseClass && action.type.getStateNamespace() === stateNamespace
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
    actionBaseClass: Class<AbstractAction<any, any>>
  ): (StateType | void, ActionObject) => StateType {
    return createStateReducer(initialState, actionBaseClass, '');
  }

  // noinspection JSUnusedGlobalSymbols
  static createNamespacedStateReducer<StateType, StateNamespaceType: string = ''>(
    initialState: StateType,
    actionBaseClass: Class<AbstractAction<any, any>>,
    stateNamespace: StateNamespaceType,
  ): (StateType | void, ActionObject) => StateType {
    return createStateReducer(initialState, actionBaseClass, stateNamespace);
  }
}
