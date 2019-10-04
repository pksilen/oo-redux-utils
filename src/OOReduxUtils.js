// @flow

import AbstractAction from './AbstractAction';
import type { ActionObject } from './DispatchWrapper';
import type { ComponentClass } from './ComponentClass';

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
    componentClass?: ComponentClass
  ): (StateType, ActionObject) => StateType {
    return function(currentState: StateType = initialState, action: ActionObject): StateType {
      return action.type.getStateNamespace() === stateNamespace &&
        ((action.receivingComponentClass && action.receivingComponentClass === componentClass) ||
          (!action.receivingComponentClass && action.type instanceof actionBaseClass))
        ? action.type.performActionAndReturnNewState(currentState)
        : currentState;
    };
  }
}
