import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const url =
  'https://qz2twkw52m.execute-api.us-west-2.amazonaws.com/prod/taplist?location=85th';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch(url).then(response =>
      response
        .json()
        .then(json => this.setState({ data: json['body-json'].data }))
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Chucks Taplist</h2>
        </div>
        <ul>
          {this.state.data.map(item =>
            <li key={item.tap}>
              {item.beer}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
