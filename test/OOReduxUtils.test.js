import { OOReduxUtils } from '../src/OOReduxUtils';

describe('mergeOwnAndForeignState', () => {
  it('should merge own and foreign state successfully', () => {
    const ownState = {
      ownValue: 1
    };
    const foreignState = {
      foreignValue: 2
    };

    const mergedState = OOReduxUtils.mergeOwnAndForeignState(ownState, foreignState);

    expect(mergedState).toEqual({ ownValue: 1, foreignValue: 2 });
  });

  it('should throw error if own and foreign state contains overlapping property keys', () => {
    const ownState = {
      value: 1
    };
    const foreignState = {
      value: 2
    };

    expect(() => {
      OOReduxUtils.mergeOwnAndForeignState(ownState, foreignState);
    }).toThrow('One or more overlapping properties in own and foreign state');
  });
});
