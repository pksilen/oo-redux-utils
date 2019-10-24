// @flow

import * as React from 'react';
import AbstractAction from './AbstractAction';
import type { ActionObject } from './DispatchWrapper';

function createStateReducer<StateType>(
  initialState: StateType,
  actionBaseClass: Class<AbstractAction<any>>,
  stateNamespace: string,
  componentType?: React.ComponentType<any>
): (StateType | void, ActionObject) => StateType {
  return function(currentState: StateType = initialState, action: ActionObject): StateType {
    return ((action.receivingComponentType && action.receivingComponentType === componentType) ||
      (!action.receivingComponentType && action.type instanceof actionBaseClass)) &&
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
    actionBaseClass: Class<AbstractAction<any>>
  ): (StateType | void, ActionObject) => StateType {
    return createStateReducer(initialState, actionBaseClass, '');
  }

  // noinspection JSUnusedGlobalSymbols
  static createNamespacedStateReducer<StateType>(
    initialState: StateType,
    actionBaseClass: Class<AbstractAction<any>>,
    stateNamespace: string
  ): (StateType | void, ActionObject) => StateType {
    return createStateReducer(initialState, actionBaseClass, stateNamespace);
  }

  // noinspection JSUnusedGlobalSymbols
  static createStateReducerWithComponentType<StateType>(
    initialState: StateType,
    actionBaseClass: Class<AbstractAction<any>>,
    componentType: React.ComponentType<any>
  ): (StateType | void, ActionObject) => StateType {
    return createStateReducer(initialState, actionBaseClass, '', componentType);
  }

  // noinspection JSUnusedGlobalSymbols
  static createNamespacedStateReducerWithComponentType<StateType>(
    initialState: StateType,
    actionBaseClass: Class<AbstractAction<any>>,
    stateNamespace: string,
    componentType: React.ComponentType<any>
  ): (StateType | void, ActionObject) => StateType {
    return createStateReducer(initialState, actionBaseClass, stateNamespace, componentType);
  }
}
