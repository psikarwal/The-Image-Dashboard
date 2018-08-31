import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import 'typeface-roboto';
import Header from './constants/header';
import Home from './containers/Home';
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
          {/* <Route exact path="/addPost" component={AddPost} /> */}
          <Route exact path="/:category/" component={Home} />
          {/* <Route exact path="/editPost/:postId" component={AddPost} />
          <Route exact path="/editComment/:commentId" component={EditComment} />
          <Route exact path="/:category/:postId" component={PostDetails} /> */}
        </Switch>
        <form className="uploader" encType="multipart/form-data">
          <input
            accept="image/*"
            type="file"
            onChange={handleFileUpload}
            ref={ref => {
              this.fileInputRef = ref;
            }}
            id="file"
            multiple
          />
        </form>
        {this.state.photos.map(photo => (
          <img src={photo.name} />
        ))}
        {/* {this.state.photos ? <img src={this.state.photos[0].name} /> : <div />} */}
      </div>
    );
  }
}

export default App;
