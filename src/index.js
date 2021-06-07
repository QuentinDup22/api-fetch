import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import Details from './components/Details'

ReactDOM.render(
    <React.StrictMode>
    <BrowserRouter>
    <Switch>
    <Route path="/details/:id" component={Details} />
    <Route path="/" component={App} />
    </Switch>
    </BrowserRouter>
    </React.StrictMode>,
  document.getElementById('root')
);


