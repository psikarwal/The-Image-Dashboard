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
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper elevation={5}>
          <RadioGroup
            className={classes.selector}
            value=""
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

export default withStyles(styles)(Home);
