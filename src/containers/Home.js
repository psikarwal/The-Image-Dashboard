import React, { Component } from 'react';
import {
  RadioGroup,
  Paper,
  FormControlLabel,
  Radio,
  withStyles,
  Button,
  MenuItem,
  TextField
} from '@material-ui/core';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavigationIcon from '@material-ui/icons/AddAPhoto';
import Export from '@material-ui/icons/LibraryBooks';
import Grid from '@material-ui/icons/GridOn';
import List from '@material-ui/icons/FormatListBulleted';
import { selectedCategory } from '../redux/reducers/selected_category';
import { selectedSort } from '../redux/reducers/selected_sort';
import { addImage, deleteImage, editImage } from '../redux/reducers/add_image';
import { toXls } from '../helpers/toXls';
import ImageGrid from '../components/ImageGrid';
import ImageList from '../components/ImageList';
import cx from 'classnames';
const styles = () => ({
  selector: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  extendedIcon: {
    marginRight: 10
  },
  standardRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  wrap: {
    flexWrap: 'wrap'
  },
  spaceEven: {
    justifyContent: 'space-evenly'
  },
  spaceBet: {
    justifyContent: 'space-between'
  },
  margin: {
    margin: '0% 2%'
  }
});
const sorts = [
  {
    value: 'a-z',
    label: 'A - Z'
  },
  {
    value: 'z-a',
    label: 'Z - A'
  }
];

class Home extends Component {
  state = { grid: true };
  handleChange = event => {
    if (event.target.value) {
      this.props.actions.selectedCategory(event.target.value);
    }
    this.props.history.push(`/${event.target.value}`);
  };
  handleChangeSort = name => event => {
    this.props.actions.selectedSort(event.target.value);
  };

  handleUpload = event => {
    this.setState({ doc: Array.from(event.target.files) });
    const photos = Array.from(event.target.files);
    photos.map(photo => {
      const reader = new FileReader();
      reader.readAsDataURL(photo);
      reader.onload = r => {
        const image = new Image();
        image.src = r.target.result;
        photo.nameup =
          photo.name.charAt(0).toUpperCase() + photo.name.substr(1);
        image.onload = () => {
          this.props.actions.addImage(photo, image);
        };
      };
    });
  };
  render() {
    const { classes = {}, allImages = {} } = this.props;
    let { ids = [] } = this.props;
    const { category = '' } = this.props.match.params;
    ids = category
      ? ids.filter(id => allImages[id].extension === category)
      : ids;
    if (this.props.selectedSort === 'a-z') ids.sort();
    else if (this.props.selectedSort === 'z-a') {
      ids.sort();
      ids.reverse();
    } else {
    }
    return (
      <div>
        <Paper elevation={5}>
          <RadioGroup
            className={classes.selector}
            value={category}
            onChange={this.handleChange}
          >
            <FormControlLabel value="" control={<Radio />} label="All" />
            <FormControlLabel value="jpeg" control={<Radio />} label="JPEG" />
            <FormControlLabel value="png" control={<Radio />} label="PNG" />
            <FormControlLabel value="bmp" control={<Radio />} label="BMP" />
          </RadioGroup>
        </Paper>
        <Paper
          elevation={5}
          style={{ margin: '2%', padding: '0% 2% 0% 2%', textAlign: 'start' }}
        >
          <TextField
            id="select-sort"
            select
            label="Sort By"
            className={classes.textField}
            value={this.props.selectedSort}
            onChange={this.handleChangeSort('sort')}
            margin="normal"
            style={{ width: '100%' }}
          >
            {sorts.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Paper>
        <form className="uploader" encType="multipart/form-data">
          <input
            accept="image/*"
            type="file"
            style={{ display: 'none' }}
            onChange={e => this.handleUpload(e)}
            ref={ref => {
              this.fileInputRef = ref;
            }}
            id="file"
            multiple
          />
        </form>

        <div
          className={cx(
            classes.standardRow,
            classes.spaceBet,
            classes.wrap,
            classes.margin
          )}
        >
          <Button
            color="secondary"
            variant="extendedFab"
            className={classes.button}
            onClick={() => {
              const data = ids.map((image, index) => allImages[image]);
              toXls(data);
            }}
          >
            <Export className={classes.extendedIcon} />
            Export
          </Button>
          <Button
            color="secondary"
            variant="extendedFab"
            className={classes.button}
            onClick={() => this.fileInputRef.click()}
          >
            <NavigationIcon className={classes.extendedIcon} />
            Add Image
          </Button>
          <Button
            color="secondary"
            variant="extendedFab"
            className={classes.button}
            onClick={() =>
              this.setState(state => ({
                grid: !state.grid
              }))
            }
          >
            {!this.state.grid ? (
              <React.Fragment>
                <Grid className={classes.extendedIcon} />
                Grid View
              </React.Fragment>
            ) : (
              <React.Fragment>
                <List className={classes.extendedIcon} />
                List View
              </React.Fragment>
            )}
          </Button>
        </div>
        {this.state.grid ? (
          <div
            className={cx(classes.standardRow, classes.wrap, classes.spaceEven)}
          >
            {ids.map(image => (
              <div>
                <ImageGrid
                  key={image}
                  img={allImages[image]}
                  deleteImage={this.props.actions.deleteImage}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className={cx(classes.wrap, classes.spaceEven)}>
            {ids.map(image => (
              <div>
                <ImageList
                  key={image}
                  img={allImages[image]}
                  deleteImage={this.props.actions.deleteImage}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedCategory: state.selectedCategory.category,
  selectedSort: state.selectedSort.sort,
  allImages: state.images.images,
  ids: state.images.imageIds
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      deleteImage,
      addImage,
      selectedCategory,
      editImage,
      selectedSort
    },
    dispatch
  ),
  dispatch
});

export default compose(
  withStyles(styles, { name: 'Home' }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Home);
