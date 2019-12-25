// @flow
/* istanbul ignore file */

import AbstractAction from '../src/AbstractAction';
import type { OtherState } from './OtherState';

export default class OtherTestAction extends AbstractAction<OtherState> {
  constructor() {
    super('');
  }

  performActionAndReturnNewState(currentState: OtherState): OtherState {
    return {
      ...currentState,
      address: 'test address'
    };
  }
}
