// import './css/style.css';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

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