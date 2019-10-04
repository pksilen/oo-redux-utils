# Object-oriented Redux Utils
Get rid of switch-cases in your code by using object-oriented Redux Utils!

Read article: [Replace using conditionals with Polymorphism]

[![version][version-badge]][package]
[![build][build]][circleci]
[![coverage][coverage]][codecov]
[![MIT License][license-badge]][license]

## Prerequisites
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
    
initialPersonState.js
    
    // @flow
    
    import type { PersonState } from './PersonState';
    
    const initialPersonState: PersonState = {
        name: '',
        age: 0
    }
        
    export default initialPersonState;

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

### Create state reducer
    
    // @flow

    import { createStore, combineReducers } from 'redux';
    import { OOReduxUtils } from 'oo-redux-utils';
    import initialPersonState from './initialPersonState';
    
    const appStateReducer = combineReducers({
        personState: OOReduxUtils.createStateReducer(initialPersonState, AbstractAction<PersonState>);
    });
    
    export default createStore(
      appStateReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    
### Create app state type
    
    // @flow

    import type { PersonState } from './PersonState'
    
    export type AppState = {
        personState: PersonState
    };
    
### Use person state in React component
PersonView.js

    // @flow
    
    import React from 'react'
    import { connect } from 'react-redux';
    import { OOReduxUtils } from 'oo-redux-utils';
    import type { DispatchWrapper } from 'oo-redux-utils'
    import ModifyPersonAgeAction from './ModifyPersonAgeAction';

    type MappedState = PersonState;
        
    const mapAppStateToComponentProps = (appState: AppState): MappedState
        => OOReduxUtils.mergeOwnAndForeignState(appState.personState, {});
    
    type Props = MappedState & DispatchWrapper;
    
    class PersonView extends React.Component<Props, {}> {
        
        modifyPersonAge = (newAge: number) => {
            const { dispatch } = this.props;
            dispatch({ type: new ModifyPersonAgeAction(newAge)});
        };
        
        .
        .
        
        render() {
            .
            <.... onChange={this.modifyPersonAge} ... />
            .
        }
    }
    
    export default connect(mapAppStateToComponentProps)(PersonView);  

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
