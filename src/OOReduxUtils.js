// @flow

// noinspection JSUnusedGlobalSymbols
export default class OOReduxUtils {
  // noinspection JSUnusedGlobalSymbols
  static mergeOwnAndForeignState<OwnState: Object, ForeignState: Object>(
    ownState: OwnState,
    foreignState: ForeignState
  ): $Exact<{...OwnState, ...ForeignState}> {
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
}
