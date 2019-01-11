import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux';
import {Route, Switch} from 'react-router-dom'
import {BrowserRouter} from 'react-router-dom'
import Home from './src/components/Home'
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './src/reducers';
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

hydrate(
       <Provider store={createStoreWithMiddleware(reducers)}>
           <BrowserRouter>
             <Switch>
                <Route exact path="/" component={Home}/>
             </Switch>
           </BrowserRouter>
       </Provider>
  , document.getElementById('root')
)
