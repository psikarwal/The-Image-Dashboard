import React from 'react';
import { AppBar, Toolbar, withStyles, Typography } from '@material-ui/core';

const styles = () => ({
  header: {
    flexGrow: 1
  }
});

const Header = props => (
  <div className={props.classes.header}>
    <AppBar position="static" color="default">
      <Toolbar style={{ justifyContent: 'center' }}>
        <Typography variant="title" color="inherit">
          Gallery
        </Typography>
      </Toolbar>
    </AppBar>
  </div>
);

export default withStyles(styles)(Header);
