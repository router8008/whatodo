import React, {Component} from 'react';
import {Router, Route, browserHistory} from 'react-router';

import Todo from './components/Todo';
import Completed from './components/Completed';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Todo} />
        <Route path="/todo" component={Todo} />
        <Route path="/completed" component={Completed} />
      </Router>
    );
  }
}

export default App;