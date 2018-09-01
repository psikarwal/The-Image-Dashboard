import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import 'typeface-roboto';
import Header from './constants/header';
import Home from './containers/Home';
import EditImage from './containers/EditImage';
import './App.css';

class App extends Component {
  state = { photos: [] };
  render() {
    const handleFileUpload = e => {
      const file = Array.from(e.target.files);
      this.setState({ photos: file });
      console.log(8, file);
      console.log(9, e.target);
    };
    console.log(14, this.state);

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
