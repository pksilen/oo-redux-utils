// @flow

import AbstractAction from '../src/AbstractAction';

type State = { name: string, age: number };

export default class AnotherAction extends AbstractAction<State> {
  /* istanbul ignore next */
  performActionAndReturnNewState(currentState: State ): State {
    return {
      name: 'name',
      age: 10
    };
  }
}
