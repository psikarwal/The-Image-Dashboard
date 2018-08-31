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
import { selectedCategory } from '../redux/reducers/selected_category';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavigationIcon from '@material-ui/icons/Navigation';

const styles = () => ({
  selector: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
const sorts = [
  {
    value: 'popular',
    label: 'Popular'
  },
  {
    value: 'unpopular',
    label: 'Unpopular'
  },
  {
    value: 'newest',
    label: 'Newest'
  },
  {
    value: 'oldest',
    label: 'Oldest'
  }
];

class Home extends Component {
  handleChange = event => {
    if (event.target.value) {
      this.props.actions.selectedCategory(event.target.value);
      // this.props.actions.getCategoryPost(event.target.value);
    } else {
      // this.props.actions.getAllPosts();
    }
    this.props.history.push(`/${event.target.value}`);
  };
  render() {
    const { classes } = this.props;
    const { category = '' } = this.props.match.params;
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
            <FormControlLabel value="jpg" control={<Radio />} label="JPG" />
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
            // onChange={this.handleChangeSort('sort')}
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
        <Button
          variant="extendedFab"
          aria-label="Delete"
          className={classes.button}
        >
          <NavigationIcon className={classes.extendedIcon} />
          Extended
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // post: state.post,
  selectedCategory: state.selectedCategory.category
  // categoryPost: state.categoryPost.posts,
  // selectedSort: state.selectedSort.sort
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      // getAllPosts,
      // deletePost,
      // vote,
      selectedCategory
      // getCategoryPost,
      // selectedSort
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
