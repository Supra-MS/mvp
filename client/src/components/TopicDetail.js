import React from 'react';
import http from '../../src/http-client-axios.js';

class TopicDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      subject: '',
      description: '',
      currentTopic: null,
      id: this.props.match.params.id,
      text: '',
      updateMessage: ''
    }
    this.getTopicById = this.getTopicById.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.deleteTopic = this.deleteTopic.bind(this);
    this.updateTopic = this.updateTopic.bind(this);
    this.onChangeTopic = this.onChangeTopic.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);
  }

  componentDidMount() {
    console.log('this.props---', this.props);
    this.getTopicById(this.props.match.params.id);
  }

  handleInputChange(e) {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  onChangeTopic(e) {
    this.setState({
      subject: e.target.value
    })

  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  toggleStatus(status) {
    let { currentTopic } = this.state;
    var data = {
      _id: currentTopic.id,
      topic: currentTopic.topic,
      description: currentTopic.description,
      status: status
    };
    http.put(`/topics/${this.state.currentTopic.id}`, data)
      .then(response => {
        this.setState(prevState => ({
          currentTopic: {
            ...prevState.currentTopic,
            status: status
          }
        }));
        console.log('Toggle status response', response.data);
      })
      .catch(error => {
        console.log('Error toggling the status: ', error);
      });
  }


  updateTopic() {
    http.put(`/topics/${this.state.currentTopic._id}`, this.state.currentTopic)
      .then(response => {
        console.log('Update by topic Response: ', response.data);
        this.setState({
          updateMessage: response.data.message
        })
        console.log(this.state.updateMessage, 'updated msg')
      })
      .catch(error => {
        console.log('Error updating by topic: ', error);
      })
  }

  deleteTopic() {
    http.delete(`/topics/${this.state.id}`)
      .then(response => {
        console.log('Delete by topic Response: ', response.data);
        this.props.history.push('/topics');
      })
      .catch(error => {
        console.log('Error deleting by topic: ', error);
      })
  }

  getTopicById(id) {
    http.get(`/topics/${id}`)
      .then(response => {
        this.setState({
          currentTopic: response.data,
          title: response.data.subject,
          subject: response.data.subject,
          description: response.data.description,
          id: response.data.id,
          text: response.data.text
        })
        console.log('Get by topic id Response: ', response.data, '😃', this.state);
      })
      .catch(error => {
        console.log('Error getting id by topic: ', error);
      })
  }


  render() {
    let { currentTopic, id, subject, description, title, text, updateMessage } = this.state;
    return (
      <div className="jumbotron">
        {currentTopic ? (
          <div>
            <h4 style={{textAlign: "center", color: 'rgb(0, 78, 82)'}}><strong>{`${title}`} - Points to Remember</strong></h4>
            <div className="form-group">
              <label><strong>Subject: </strong></label>
              <input className="form-control" name="subject" value={subject} type="text"
                  onChange={this.onChangeTopic}></input>
            </div>

            <div className="form-group">
              <label><strong>Description: </strong></label>
              <input className="form-control" name="description" value={description} type="text"
              onChange={this.onChangeDescription}></input>
            </div>

              <div className="form-group">
                <label>
                  <strong style={{color: "darkgreen"}}>Status:</strong>
                </label>

                <strong style={{color: "green", marginLeft: "10px"}}>{currentTopic.status ? "Completed" : "In-Progress"}</strong>

              </div>

            <div className="form-group">
              <label><strong>Details: </strong></label>
              <textarea className="form-control" name="text" value={text} rows="7" cols="40"
              onChange={this.handleInputChange}></textarea>
            </div>

            {currentTopic.status ? (
              <button className="btn btn-primary" onClick={() => {
                this.toggleStatus(false)
              }}>Pending</button>
            ) : (
              <button className="btn btn-primary" onClick={() => {
                this.toggleStatus(true)
              }}>Completed</button>
            )}

            <button className="btn btn-danger" onClick={this.deleteTopic}>Delete</button>
            <button className="btn btn-success" onClick={() => {
              currentTopic.text = text;
              currentTopic.subject = subject;
              currentTopic.description = description;
              delete currentTopic.id;
              currentTopic._id = id;
              this.updateTopic();
            }}>Update</button>

            <p style={{color: 'green', margin: "10px"}}><strong>{updateMessage}</strong></p>
          </div>
        ) : null}

      </div>
    );
  }
}

export default TopicDetail;