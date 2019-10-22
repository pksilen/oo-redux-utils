import AbstractAction from './AbstractAction';

export type DispatchAction = (AbstractAction<any>) => void;
export type DispatchActionToComponentType = (AbstractAction<any>, React.ComponentType<any>) => void;

export default class DispatchUtils {
  createActionDispatcher(dispatch: Dispatch): DispatchAction {
    return function(action: AbstractAction<any>) {
      dispatch({ type: action });
    };
  }

  createActionDispatcherToComponentType(
    dispatch: Dispatch,
    componentType: React.ComponentType<any>
  ): DispatchActionToComponentType {
    return function(action: AbstractAction<any>) {
      dispatch({ type: action, receivingComponentType: componentType });
    };
  }
}
