import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav.js';

class App extends React.Component {
  render() {
    return (
    <Router>
      <div>
        <Nav />
        <div>
          <Switch>
            <Route exact path={""}></Route>
          </Switch>
        </div>

      </div>
    </Router>
    )
  }
}

export default App;