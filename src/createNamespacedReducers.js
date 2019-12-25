// @flow

import type { ActionObject } from './Dispatch';

export default function<StateNamespacesType: { [string]: string }, StateType>(
  stateNamespaces: StateNamespacesType,
  createNamespacedStateReducer: ($Keys<StateNamespacesType>) => (StateType | void, ActionObject) => StateType
) {
  return Object.keys(stateNamespaces).reduce(
    (
      accumulatedReducers: {
        [$Keys<StateNamespacesType>]: (StateType | void, ActionObject) => StateType
      },
      stateNamespace: $Keys<StateNamespacesType>
    ) => ({ ...accumulatedReducers, [stateNamespace]: createNamespacedStateReducer(stateNamespace) }),
    {}
  );
}
