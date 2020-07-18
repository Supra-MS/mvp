import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav.js';
import AddTopic from './AddTopic.js';
import TopicList from './TopicList.js';
import TopicDetail from './TopicDetail.js';
import Quiz from './Quiz.js';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <div>
            <Switch>
              <Route exact path={["/", "/topics"]} component={TopicList} />
              <Route exact path="/add" component={AddTopic} />
              <Route path="/topics/:id" component={TopicDetail} />
              <Route exact path="/quiz" component={Quiz} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;