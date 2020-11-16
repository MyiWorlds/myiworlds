import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Header from '../components/Header/Header';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import React from 'react';

const Custom404 = () => {
  return (
    <Container maxWidth="lg">
      <Header
        title="Not Found"
        description="I could not find what you were looking for"
        media={
          <Avatar>
            <NotListedLocationIcon style={{ width: '100%', height: '100%' }} />
          </Avatar>
        }
      />
    </Container>
  );
};

export default Custom404;
