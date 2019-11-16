// @flow

import type { Dispatch } from './DispatchWrapper';
import DispatchUtils from './DispatchUtils';
import AbstractAction from './AbstractAction';
import type { DispatchAction } from './DispatchUtils';
import type { Controller } from './Controller';

export default class AbstractControllerFactory {
  dispatchAction: DispatchAction;

  diContainer: { create: (...args: Array<any>) => any } | void;

  stateNamespace: string;

  constructor(
    dispatch: Dispatch,
    stateNamespace: string = '',
    diContainer: { create: (...args: Array<any>) => any } | void
  ) {
    this.dispatchAction = DispatchUtils.createActionDispatcher(dispatch);
    this.diContainer = diContainer;
    this.stateNamespace = stateNamespace.split('$')[0];
  }

  dispatchActionWithDi(actionClass: Class<AbstractAction<any>>, ...args: Array<any>) {
    if (this.diContainer) {
      this.diContainer
        .create(actionClass, { stateNamespace: this.stateNamespace }, ...args)
        .then((action: any) => this.dispatchAction(action));
    } else {
      throw new Error('diContainer argument is missing');
    }
  }

  createController(): Controller {
    const dispatchFnNameToDispatchFnMap = Object.entries(this.getDispatchFnNameToActionClassMap()).reduce(
      (accumulatedValue: Controller, [dispatchFnName, ActionClassOrArray]: [string, any]) => {
        let ActionClass = ActionClassOrArray; // NOSONAR
        let firstArgs = []; // NOSONAR

        if (Array.isArray(ActionClassOrArray)) {
          [ActionClass, firstArgs] = ActionClassOrArray;
          if (!Array.isArray(firstArgs)) {
            firstArgs = [firstArgs];
          }
        }

        if (ActionClass.needsDependencyInjection()) {
          if (this.diContainer) {
            accumulatedValue[dispatchFnName] = (...args: Array<any>) => {
              if (ActionClass.isNamespaced()) {
                // $FlowFixMe
                this.diContainer
                  .create(ActionClass, {}, this.stateNamespace, ...firstArgs, ...args)
                  .then((action: any) => this.dispatchAction(action));
              } else {
                // $FlowFixMe
                this.diContainer
                  .create(ActionClass, {}, ...firstArgs, ...args)
                  .then((action: any) => this.dispatchAction(action));
              }
            };
          } else {
            throw new Error('diContainer argument is missing');
          }
        } else {
          if (ActionClass.isNamespaced()) {
            accumulatedValue[dispatchFnName] = (...args: Array<any>) =>
              this.dispatchAction(new ActionClass(this.stateNamespace, ...firstArgs, ...args));
          } else {
            accumulatedValue[dispatchFnName] = (...args: Array<any>) => {
              this.dispatchAction(new ActionClass(...firstArgs, ...args));
            };
          }
        }

        return accumulatedValue;
      },
      {}
    );

    return {
      ...this.getDispatchFnNameToDispatchFnMap(),
      ...dispatchFnNameToDispatchFnMap
    };
  }

  getDispatchFnNameToActionClassMap(): {
    [string]: Class<AbstractAction<any>> | [Class<AbstractAction<any>>, any]
  } {
    if (Object.keys(this.getDispatchFnNameToDispatchFnMap()).length === 0) {
      throw new Error(
        'At least either getDispatchFnNameToActionClassMap() or getDispatchFnNameToDispatchFnMap() must be overridden'
      );
    }
    return {};
  }

  getDispatchFnNameToDispatchFnMap(): Controller {
    return {};
  }
}
