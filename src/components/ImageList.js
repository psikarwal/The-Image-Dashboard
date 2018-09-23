import React from 'react';
import { withStyles, Paper, IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
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
  }
};

const ImageList = props => {
  const { img = {}, deleteImage = () => {} } = props;
  if (_.isEmpty(img)) return <React.Fragment />;
  return (
    <Paper
      elevation={5}
      style={{ margin: '2% 15%', display: 'flex', flexDirection: 'row' }}
    >
      <div style={{ width: '60%' }}>
        <img
          src={img.src}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          alt=""
        />
      </div>
      <div style={{ width: '40%' }}>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <IconButton
            color="secondary"
            aria-label="delete"
            onClick={() =>
              deleteImage(img.name.charAt(0).toUpperCase() + img.name.substr(1))
            }
          >
            <DeleteIcon />
          </IconButton>
          <Link
            to={`/editPost/${img.name.charAt(0).toUpperCase() +
              img.name.substr(1)}`}
          >
            <IconButton color="primary" aria-label="edit">
              <EditIcon />
            </IconButton>
          </Link>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            textAlign: 'justify',
            padding: '5%'
          }}
        >
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
          <div style={{ marginTop: '1%' }}>
            {img.tags ? (
              <Typography style={{ color: 'red' }}>Tags: {img.tags}</Typography>
            ) : (
              <Typography style={{ color: 'red' }}>
                No tags yet <span>😥</span>
              </Typography>
            )}
            {img.tags ? (
              <Typography>{img.description}</Typography>
            ) : (
              <Typography>
                Please Edit and Provide me some description.
              </Typography>
            )}
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(ImageList);
