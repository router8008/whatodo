import React, {Component} from 'react';
import jQuery from 'jquery';

class Header extends Component {
  render() {
    return (
      <div className="row">
        <nav className="navbar navbar-default">
          <div className="container-fluid">

            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                      data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="todo.html">Whatodo</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className="active"><a href="todo.html">Todos</a></li>
                <li><a href="completed.html">Completed</a></li>

              </ul>

              {/*<ul className="nav navbar-nav navbar-right">*/}
                {/*<li><a id="user-name-field"></a></li>*/}
                {/*<li><a href="whatodo-login.html" id="logout-btn">Logout</a></li>*/}
              {/*</ul>*/}

            </div>
          </div>
        </nav>
      </div>
    );
  }
}
export default Header;