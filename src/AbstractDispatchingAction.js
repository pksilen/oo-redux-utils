// @flow

import type { DispatchAction } from './DispatchUtils';
import AbstractAction from './AbstractAction';

export default class AbstractDispatchingAction<
  OwnStateType,
  ForeignStateType,
  StateNamespaceType: string = ''
> extends AbstractAction<OwnStateType, StateNamespaceType> {
  +dispatchAction_: DispatchAction;

  constructor(stateNamespace: StateNamespaceType, dispatchAction: DispatchAction) {
    super(stateNamespace);
    this.dispatchAction_ = dispatchAction;
  }

  dispatchAction(action: AbstractAction<ForeignStateType, any>) {
    this.dispatchAction_(action);
  }

  dispatchDelayedAction(action: AbstractAction<any, any>, delayInMillis: number): TimeoutID {
    return setTimeout(() => this.dispatchAction_(action), delayInMillis);
  }

  dispatchIntervalAction(action: AbstractAction<any, any>, intervalInMillis: number): IntervalID {
    return setInterval(() => this.dispatchAction_(action), intervalInMillis);
  }

  dispatchAsyncAction<ResultType>(actionClass: Class<any>, promise: Promise<ResultType>) {
    if (this.stateNamespace) {
      promise.then((result: ResultType) =>
        this.dispatchAction_(new actionClass(this.stateNamespace, result))
      );
    }

    promise.then((result: ResultType) => this.dispatchAction_(new actionClass(result)));
  }

  dispatchActionWithDi(
    diContainer: { create: (...args: Array<any>) => any },
    actionClass: Class<AbstractAction<any, any>>,
    otherArgs: Object
  ) {
    diContainer
      .create(actionClass, {
        stateNamespace: this.stateNamespace,
        dispatchAction: this.dispatchAction_,
        ...otherArgs
      })
      .then((action: any) => this.dispatchAction_(action));
  }

  dispatchActionsWithDi(
    diContainer: { create: (...args: Array<any>) => any },
    actionDefs: Array<[Class<AbstractAction<any, any>>, Object] | AbstractAction<ForeignStateType, any>>
  ) {
    actionDefs.forEach((actionDef: [Class<AbstractAction<any, any>>, Object] | AbstractAction<any, any>) => {
      if (Array.isArray(actionDef)) {
        const [actionClass, otherArgs] = actionDef;
        this.dispatchActionWithDi(diContainer, actionClass, otherArgs);
      } else {
        this.dispatchAction(actionDef);
      }
    });
  }
}