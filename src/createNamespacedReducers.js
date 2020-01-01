// @flow

import type { ActionObject } from './Dispatch';

type Reducers<StateNamespacesType: { [string]: string }, StateType> = {
  [$Keys<StateNamespacesType>]: (StateType | void, ActionObject) => StateType
};

export default function<StateNamespacesType: { [string]: string }, StateType>(
  stateNamespaces: StateNamespacesType,
  createNamespacedStateReducer: ($Keys<StateNamespacesType>) => (StateType | void, ActionObject) => StateType
): Reducers<StateNamespacesType, StateType> {
  return Object.keys(stateNamespaces).reduce(
    (
      accumulatedReducers: Reducers<StateNamespacesType, StateType>,
      stateNamespace: $Keys<StateNamespacesType>
    ) => ({ ...accumulatedReducers, [stateNamespace]: createNamespacedStateReducer(stateNamespace) }),
    {}
  );
}
