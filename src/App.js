import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import 'typeface-roboto';
import Header from './constants/header';
import Home from './containers/Home';
import EditImage from './containers/EditImage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:category/" component={Home} />
          <Route exact path="/editPost/:imageId" component={EditImage} />
        </Switch>
      </div>
    );
  }
}

export default App;
