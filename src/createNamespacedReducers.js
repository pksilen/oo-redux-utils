// @flow

import type { ActionObject } from './Dispatch';

export default function<SNS: { [string]: string }, S>(
  stateNamespaces: SNS,
  createNamespacedStateReducer: ($Keys<SNS>) => (S | void, ActionObject) => S
) {
  return Object.keys(stateNamespaces).reduce(
    (
      accumulatedReducers: {
        [$Keys<SNS>]: (S | void, ActionObject) => S
      },
      stateNamespace: $Keys<SNS>
    ) => ({ ...accumulatedReducers, [stateNamespace]: createNamespacedStateReducer(stateNamespace) }),
    {}
  );
}
