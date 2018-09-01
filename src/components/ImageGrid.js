import React from 'react';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import _ from 'lodash';

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
    marginLeft: '2%',
    marginBottom: '2%'
  },
  media: {
    height: 200
  }
};
const ImageGrid = props => {
  const { img = {}, classes = {}, deleteImage = () => {} } = props;
  console.log(36, props);

  if (_.isEmpty(img)) return <React.Fragment />;
  return (
    <Card elevation={5} className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={img.src}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
            gutterBottom
            variant="headline"
            component="h2"
          >
            {img.name}
          </Typography>
          <Typography style={{ textTransform: 'uppercase' }} component="p">{`${
            img.extension
          } - ${img.resolution}`}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <Link
          style={{ textDecoration: 'none' }}
          to={`/editPost/${img.name.charAt(0).toUpperCase() +
            img.name.substr(1)}`}
        >
          <Button size="small" color="primary">
            Edit
          </Button>
        </Link>
        <Button
          onClick={() =>
            deleteImage(img.name.charAt(0).toUpperCase() + img.name.substr(1))
          }
          size="small"
          color="secondary"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(ImageGrid);
