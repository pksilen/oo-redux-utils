// @flow

import type { Dispatch } from './DispatchWrapper';
import DispatchUtils from './DispatchUtils';
import AbstractAction from './AbstractAction';
import type { DispatchAction, DispatchActionToComponentType } from './DispatchUtils';

export default class ControllerFactory {
  dispatchAction: DispatchAction;

  dispatchActionToComponentType: DispatchActionToComponentType;

  diContainer: { create: (...args: Array<any>) => any } | void;

  stateNamespace: string;

  constructor(
    dispatch: Dispatch,
    stateNamespace: string = '',
    diContainer: { create: (...args: Array<any>) => any } | void
  ) {
    this.dispatchAction = DispatchUtils.createActionDispatcher(dispatch);
    this.dispatchActionToComponentType = DispatchUtils.createActionDispatcherToComponentType(dispatch);
    this.diContainer = diContainer;
    this.stateNamespace = stateNamespace;
  }

  dispatchActionWithDi(actionClass: Class<AbstractAction<any>>, params: ?Object) {
    if (this.diContainer) {
      this.diContainer.create(actionClass, params).then((action: any) => this.dispatchAction(action));
    } else {
      throw new Error('diContainer argument is missing');
    }
  }

  createController() {
    const dispatchFnNameToDispatchFnMap = Object.entries(this.getDispatchFnNameToActionClassMap()).reduce(
      (
        accumulatedValue: { [string]: (Array<any>) => void },
        [dispatchFnName, ActionClass]: [string, any]
      ) => {
        const actionClassFunctionString = ActionClass.toString();

        if (actionClassFunctionString.includes('dispatchAction')) {
          if (this.diContainer) {
            accumulatedValue[dispatchFnName] = (...args: Array<any>) =>
              // $FlowFixMe
              this.diContainer
                .create(ActionClass, { ...args[0], stateNamespace: this.stateNamespace })
                .then((action: any) => this.dispatchAction(action));
          } else {
            throw new Error('diContainer argument is missing');
          }
        } else {
          if (actionClassFunctionString.includes('stateNamespace')) {
            accumulatedValue[dispatchFnName] = (...args: Array<any>) =>
              this.dispatchAction(new ActionClass(this.stateNamespace, ...args));
          } else {
            accumulatedValue[dispatchFnName] = (...args: Array<any>) => {
              this.dispatchAction(new ActionClass(...args));
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

  /* abstract */
  getDispatchFnNameToActionClassMap(): { [string]: Class<AbstractAction<any>> } {
    if (Object.keys(this.getDispatchFnNameToDispatchFnMap()).length === 0) {
      throw new Error(
        'At least either getDispatchFnNameToActionClassMap() or getDispatchFnNameToDispatchFnMap() must be overridden'
      );
    }
    return {};
  }

  getDispatchFnNameToDispatchFnMap(): { [string]: (Array<any>) => void } {
    return {};
  }
}
