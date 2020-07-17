import React from 'react';
import { Link } from 'react-router-dom';

function Nav(props) {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a href="/topics" className="navbar-brand">Quick Notes</a>
      <div className="navbar-nav mr-auto">
        <li className="navbar-item">
          <Link to={"/topics"} className="navbar-link">Topics</Link>
        </li>
        <li className="navbar-item">
          <Link to={"/add"} className="navbar-link">Add Topic</Link>
        </li>
        <li className="navbar-item">
          <Link to={"/quiz"} className="navbar-link">Quiz</Link>
        </li>
      </div>
    </nav>
  )
}

export default Nav;