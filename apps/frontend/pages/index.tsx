import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Header from '../components/Header/Header';
import HomeIcon from '@material-ui/icons/Home';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const Index = () => {
  return (
    <Container maxWidth="lg">
      <Header
        title="Home"
        description="Some info on what this page is about"
        media={
          <Avatar>
            <HomeIcon style={{ width: '100%', height: '100%' }} />
          </Avatar>
        }
      />
      <Typography variant="caption">
        Todo: mock up with some goodies!
      </Typography>
    </Container>
  );
};

export default Index;
