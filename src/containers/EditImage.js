import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { editImage } from '../redux/reducers/add_image';
import {
  Paper,
  withStyles,
  Button,
  Typography,
  TextField
} from '@material-ui/core';

const styles = {
  selector: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: '1%'
  },
  title: {
    color: 'deepskyblue',
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: '1%'
  }
};

class EditImage extends Component {
  state = {
    name: '',
    extension: '',
    resolution: '',
    src: '',
    description: '',
    tags: ''
  };

  componentDidMount() {
    const { imageId = '' } = this.props.match.params;
    if (imageId) {
      const image = this.props.allImages[imageId];
      this.setState({
        name: image.name,
        extension: image.extension,
        description: image.description,
        tags: image.tags,
        src: image.src,
        resolution: image.resolution
      });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const { imageId = '' } = this.props.match.params;
    this.props.actions.editImage(imageId, this.state);
    this.props.history.goBack();
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  render() {
    const { classes = {} } = this.props;
    return (
      <Paper elevation={5} style={{ margin: '4% 3%', padding: '2%' }}>
        <Typography className={classes.title}>Edit Image Data</Typography>
        <form onSubmit={this.handleSubmit}>
          <TextField
            required
            id="tags"
            label="Tags"
            margin="normal"
            style={{ width: '95%' }}
            onChange={this.handleChange('tags')}
            value={this.state.tags}
          />
          <TextField
            required
            id="description"
            label="Description"
            margin="normal"
            style={{ width: '95%' }}
            onChange={this.handleChange('description')}
            value={this.state.description}
          />
          <TextField
            required
            id="resolution"
            label="Resolution"
            margin="normal"
            style={{ width: '95%' }}
            disabled
            value={this.state.resolution}
          />
          <TextField
            required
            id="name"
            label="Name"
            margin="normal"
            style={{ width: '95%' }}
            disabled
            value={this.state.name}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '2%' }}
            label="Submit"
            type="submit"
          >
            Save
          </Button>
        </form>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  allImages: state.images.images
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      editImage
    },
    dispatch
  ),
  dispatch
});

export default compose(
  withStyles(styles, { name: 'EditImage' }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(EditImage);
