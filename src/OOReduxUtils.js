// @flow

import { AbstractAction } from './AbstractAction';

export class OOReduxUtils {
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
    actionBaseClass: Class<AbstractAction<StateType>>,
    stateNamespace: string = ''
  ): (StateType, { type: AbstractAction<StateType> }) => StateType {
    return function(
      currentState: StateType = initialState,
      action: { type: AbstractAction<StateType> }
    ): StateType {
      return action.type instanceof actionBaseClass && action.type.getStateNamespace() === stateNamespace
        ? action.type.performActionAndReturnNewState(currentState)
        : currentState;
    };
  }
}
