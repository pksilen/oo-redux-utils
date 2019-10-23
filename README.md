# Object-oriented Redux Utils
Get rid of switch-cases in your code by using object-oriented Redux Utils!

Read article: [Replace using conditionals with Polymorphism]

[![version][version-badge]][package]
[![build][build]][circleci]
[![coverage][coverage]][codecov]
[![MIT License][license-badge]][license]

## Prerequisites
    "react": "^16.0.0",
    "react-redux": "^6.0.0",
    "redux": "^4.0.1"
    "flow-bin": "^0.105.0"

## Installation
    npm install --save oo-redux-utils
    
## Usage
    
### Create Object-oriented action
Create a new Object-oriented action by creating a class for action that extends AbstractAction&lt;StateType&gt;
Then implement performActionAndReturnNewState method

PersonState.js

    // @flow
    
    export type PersonState = $Exact<{
        +name: string,
        +age: number
    }>;
    
personStateReducer.js
    
    // @flow
    
    import OOReduxUtils from 'oo-redux-utils';
    import type { PersonState } from './PersonState';
    
    const initialPersonState: PersonState = {
        name: '',
        age: 0
    }
    
    export default OOReduxUtils.createStateReducer(initialPersonState, AbstractAction<PersonState>)

ModifyPersonAgeAction.js
    
    // @flow
   
    import { AbstractAction } from 'oo-redux-utils';
    import type { PersonState } from './PersonState';
        
    export default class ModifyPersonAgeAction extends AbstractAction<PersonState> {
      newAge: number;
    
      constructor(newAge: number) {
        super();
        this.newAge = newAge;
      }
    
      performActionAndReturnNewState(currentState: PersonState): PersonState {
        return {
          ...currentState,
          age: this.newAge
        };
      }
    }

### Create app state type
AppState.js
    
    // @flow

    import type { PersonState } from './PersonState';
    
    export type AppState = $Exact<{
        personState: PersonState
    }>;
    
### Create state store
store.js

    // @flow

    import { createStore, combineReducers } from 'redux';
    import type { Action, Store } from 'redux';
    import type { AppState } from AppState';
    
    const appStateReducer: (AppState | void, Action<AbstractAction<any>>) => AppState = combineReducers({
        personState: personStateReducer;
    });
    
    export default (createStore(
      appStateReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ): Store<AppState, Action<AbstractAction<any>>);
    
### Use person state in React component
PersonComponent.js

    // @flow
    
    import React from 'react';
    import { connect } from 'react-redux';
    import OOReduxUtils, { AbstractComponent } from 'oo-redux-utils';
    import type { DispatchWrapper } from 'oo-redux-utils';
    import ModifyPersonAgeAction from './ModifyPersonAgeAction';

    type MappedState = PersonState;
        
    const mapAppStateToComponentProps = (appState: AppState): MappedState
        => OOReduxUtils.mergeOwnAndForeignState(appState.personState, {});
    
    type OwnProps = {};
    type Props = $Exact<{ ...MappedState, ...DispatchWrapper };
    
    class PersonComponent extends AbstractComponent<Props, {}> {
        
        modifyPersonAge = (newAge: number) => {
            this.dispatchAction(new ModifyPersonAgeAction(newAge));
        };
        
        .
        .
        
        render() {
            .
            <ComponentXYZ.... onChange={this.modifyPersonAge} ... />
            .
        }
    }
    
    export default connect<Props, OwnProps, _, _, _, _>(mapAppStateToComponentProps)(PersonComponent);  

## Full example

See [oo-redux-utils-flow-test-app]
  
## License
MIT License

[license-badge]: https://img.shields.io/badge/license-MIT-green
[license]: https://github.com/pksilen/oo-redux-utils/blob/master/LICENSE
[version-badge]: https://img.shields.io/npm/v/oo-redux-utils.svg?style=flat-square
[package]: https://www.npmjs.com/package/oo-redux-utils
[build]: https://img.shields.io/circleci/project/github/pksilen/oo-redux-utils/master.svg?style=flat-square
[circleci]: https://circleci.com/gh/pksilen/oo-redux-utils/tree/master
[coverage]: https://img.shields.io/codecov/c/github/pksilen/oo-redux-utils/master.svg?style=flat-square
[codecov]: https://codecov.io/gh/pksilen/oo-redux-utils
[Replace using conditionals with Polymorphism]: https://sourcemaking.com/refactoring/replace-conditional-with-polymorphism
[oo-redux-utils-flow-test-app]: https://github.com/pksilen/oo-redux-utils-flow-test-app
