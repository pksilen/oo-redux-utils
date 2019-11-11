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
    if (
      action.getBaseActionClass() === this.getBaseActionClass() &&
      action.getStateNamespace() === this.stateNamespace
    ) {
      throw new Error('Cannot dispatch actions from same base class');
    }
    if (this.dispatchAction_) {
      this.dispatchAction_(action);
    }
  }

  dispatchAsyncAction(action: AbstractAction<any>) {
    if (this.dispatchAction_) {
      this.dispatchAction_(action);
    }
  }

  dispatchActionWithDi(
    diContainer: { create: (...args: Array<any>) => any },
    actionClass: Class<AbstractAction<any>>,
    ...args: Array<any>
  ) {
    diContainer.create(actionClass, {}, args).then((action: any) => this.dispatchAction(action));
  }

  dispatchActions(actions: Array<Class<AbstractAction<any>> | AbstractAction<any>>) {
    actions.forEach((action: Class<AbstractAction<any>> | AbstractAction<any>) => {
      if (typeof action === 'function') {
        this.dispatchAction(new action());
      } else {
        this.dispatchAction(action);
      }
    });
  }

  dispatchActionsWithDi(
    diContainer: { create: (...args: Array<any>) => any },
    actionDefs: Array<[Class<AbstractAction<any>>, any] | Class<AbstractAction<any>> | AbstractAction<any>>
  ) {
    actionDefs.forEach(
      (actionDef: [Class<AbstractAction<any>>, any] | Class<AbstractAction<any>> | AbstractAction<any>) => {
        if (Array.isArray(actionDef)) {
          const [actionClass, args] = actionDef;
          if (actionDef.toString().includes('dispatchAction')) {
            if (Array.isArray(args)) {
              this.dispatchActionWithDi(diContainer, actionClass, ...args);
            } else {
              this.dispatchActionWithDi(diContainer, actionClass, args);
            }
          } else {
            if (Array.isArray(args)) {
              this.dispatchAction(new actionClass(...args));
            } else {
              this.dispatchAction(new actionClass(args));
            }
          }
        } else if (typeof actionDef === 'function') {
          if (actionDef.toString().includes('dispatchAction')) {
            this.dispatchActionWithDi(diContainer, actionDef);
          } else {
            this.dispatchAction(new actionDef());
          }
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
