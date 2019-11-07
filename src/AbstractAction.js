// @flow

import type { DispatchAction } from './DispatchUtils';

export default class AbstractAction<StateType> {
  +actionClassName: string;

  +stateNamespace: string;

  +dispatchAction_: ?DispatchAction;

  constructor(stateNamespace: string = '', dispatchAction?: DispatchAction) {
    this.stateNamespace = stateNamespace;
    this.dispatchAction_ = dispatchAction;
    this.actionClassName = this.constructor.name;
  }

  getBaseActionClass(): Class<AbstractAction<any>> {
    throw new Error('Abstract method called');
  }

  performAction(action: AbstractAction<StateType>, currentState: StateType): StateType {
    if (action.getBaseActionClass() === this.getBaseActionClass()) {
      return action.performActionAndReturnNewState(currentState);
    } else {
      throw new Error('Cannot perform actions from different base class');
    }
  }

  dispatchAction(action: AbstractAction<any>) {
    if (action.getBaseActionClass() === this.getBaseActionClass()) {
      throw new Error('Cannot dispatch actions from same base class');
    }
    if (this.dispatchAction_) {
      this.dispatchAction_(action);
    }
  }

  dispatchActionWithDi(
    diContainer: { create: (...args: Array<any>) => any },
    actionClass: Class<AbstractAction<any>>,
    params: ?Object
  ) {
    diContainer.create(actionClass, params).then((action: any) => this.dispatchAction(action));
  }

  dispatchActions(actions: Array<AbstractAction<any>>) {
    actions.forEach((action: AbstractAction<any>) => this.dispatchAction(action));
  }

  dispatchActionsWithDi(
    diContainer: { create: (...args: Array<any>) => any },
    actionDefs: Array<[Class<AbstractAction<any>>, Object] | Class<AbstractAction<any>> | AbstractAction<any>>
  ) {
    actionDefs.forEach(
      (
        actionDef: [Class<AbstractAction<any>>, Object] | Class<AbstractAction<any>> | AbstractAction<any>
      ) => {
        if (Array.isArray(actionDef)) {
          const [actionClass, params] = actionDef;
          this.dispatchActionWithDi(diContainer, actionClass, params);
        } else if (typeof actionDef === 'function') {
          this.dispatchActionWithDi(diContainer, actionDef[0]);
        } else {
          this.dispatchAction(actionDef);
        }
      }
    );
  }

  performActionAndReturnNewState(currentState: StateType): StateType {
    throw new TypeError('Abstract method called');
  }

  getStateNamespace(): string {
    return this.stateNamespace;
  }
}
