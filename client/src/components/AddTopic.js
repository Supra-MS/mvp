import React, { Component } from 'react';
import http from '../../src/http-client-axios.js';

class AddTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      description: '',
      isSubmitted: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.postSubject = this.postSubject.bind(this);
    this.newSubject = this.newSubject.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value,
      isSubmitted: false
    });
  }

  postSubject() {
    let { subject, description, isSubmitted } = this.state;

    http.post('/topics', {
      subject: subject,
      description: description
    })
      .then(response => {
        console.log('Response: ', response);
      })
      .catch(error => {
        console.log('Error posting the subject: ', error);
      });

    this.setState({
      subject: '',
      description: '',
      isSubmitted: true
    })
  }

  newSubject() {
    this.setState({
      subject: '',
      description: '',
      isSubmitted: false
    })
  }

  render() {
    return (
      <div className="jumbotron">
        <form onSubmit={(e) => {
          e.preventDefault();
          this.postSubject();
          }}>
          <div className="form-group">
            <label>Subject: </label>
            <input className="form-control" type="text" name="subject" value={this.state.subject}
              onChange={this.handleInputChange}
              onClick={this.newSubject}
              required></input>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input className="form-control" type="text" name="description" value={this.state.description}
              onChange={this.handleInputChange}></input>
          </div>
          {this.state.isSubmitted ? (<h6 className="successmsg">Successfully added to Topics List </h6>) : null}
          <button className="btn btn-success"
            style={{ margin: '10px' }}>Add</button>
          <button className="btn btn-danger" onClick={this.newSubject}>Reset</button>
        </form>
      </div>
    )
  }
}

export default AddTopic;

