import React, { Component } from 'react';
import { withStyles, Paper } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import cx from 'classnames';

const styles = {
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
  card: {
    maxWidth: 345,
    minWidth: 345,
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5%',
    marginLeft: '1%'
  },
  media: {
    height: 200
  }
};
const ImageGrid = props => {
  const { images = [], classes = {} } = props;
  return (
    <div className={cx(classes.standardRow, classes.wrap, classes.spaceEven)}>
      {images.map(img => (
        <Card elevation={5} className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={img}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="headline" component="h2">
                Name
              </Typography>
              <Typography component="p">Resolution</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions
            style={{ display: 'flex', flexDirection: 'row-reverse' }}
          >
            <Button size="small" color="primary">
              Edit
            </Button>
            <Button size="small" color="secondary">
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default withStyles(styles)(ImageGrid);
