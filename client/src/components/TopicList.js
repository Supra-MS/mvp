import React, { Component } from 'react';
import http from './../../src/http-client-axios.js';
import { Link } from "react-router-dom";

class TopicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      currentIndex: -1,
      currentTopic: null,
      searchTopic: ''
    }
    this.getTopicList = this.getTopicList.bind(this);
    this.setActiveTopic = this.setActiveTopic.bind(this);
    this.removeAllTopics = this.removeAllTopics.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.findByTopic = this.findByTopic.bind(this);
    this.refreshList = this.refreshList.bind(this);
  }

  componentDidMount() {
    this.getTopicList();
  }

  handleInputChange(e) {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value
    })
  }

  findByTopic() {
    http.get(`/topics?topic=${this.state.searchTopic}`)
    .then(response => {
      this.setState({
        topics: response.data
      })
      console.log('Find by topic Response: ', response.data);
    })
    .catch(error => {
      console.log('Error in retrieving data from the server: ', error);
    })
  }

  setActiveTopic(topic, index) {
    this.setState({
      currentTopic: topic,
      currentIndex: index
    })
  }

  getTopicList() {
    http.get('/topics')
      .then(response => {
        this.setState({
          topics: response.data
        })
        console.log('Get Response: ', response.data);
      })
      .catch(error => {
        console.log('Error in retrieving data from the server: ', error);
      })
  }

  refreshList() {
    console.log('Refresh page');
    this.getTopicList();
    this.setState({
      currentIndex: -1,
      currentTopic: null,
      searchTopic: ''
    })
  }

  removeAllTopics() {
    http.delete('/topics')
      .then(response => {
        console.log('Successfully deleted the lists: ', response);
        this.refreshList();
      })
      .catch(error => {
        console.log('Error in deleting the list from the server: ', error);
      })
  }

  render() {
    let { topics, currentIndex, searchTopic, currentTopic } = this.state;
    console.log('Current topic: ', currentTopic);

    return(
      <div>

        <div className="jumbotron">

          <div className="input-group">
            <input className="searchtext" type="text" name="searchTopic" value={searchTopic}
            placeholder="Search topics here..."
            onChange={this.handleInputChange}></input>
            <div className="search">
              <button className="input-group-append fa fa-search" onClick={this.findByTopic}></button>
            </div>
          </div>

          <div className="list row">
            <div className="col-md-3">
                <h5>Topics List<span><button className="fa fa-trash-o" onClick={() => {
                  this.removeAllTopics();
                }}></button></span></h5>
                <ul className="list-group">
                  {(topics.length > 0) && topics.map((topic, index) => {
                    return (<li className={`list-group-item ${index === currentIndex ? "active" : ""}`} onClick={() => {
                      this.setActiveTopic(topic, index)
                    }}
                    key={index}>{topic.subject}</li>)
                  })}
                </ul>
            </div>

            <div className="col-md-9">
                {currentTopic ? (
                  <div className="form-group">
                    <h5 className="currentTopic">Topic </h5>
                    <label><strong>Subject:   </strong>{currentTopic.subject}</label><br></br>
                    <label><strong>Description:  </strong>{currentTopic.description}</label><br></br>
                    <label><strong>Status:  </strong>{(!currentTopic.status) ? "In-Progress" : "Completed"}
                    </label><br></br>

                    <Link to={`/topics/${currentTopic.id}`} className="btn-warning">Edit</Link>
                  </div>
                ) : null}
            </div>

          </div>
        </div>

      </div>
    )
  }
}

export default TopicList;