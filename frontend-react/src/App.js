// import './css/style.css';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import Todo from './components/Todo';

class App extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Todo} />
      </Router>
    );
  }
}

export default App;