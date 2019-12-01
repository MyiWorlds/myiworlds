import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Header from '../components/Header/Header';
import InfoIcon from '@material-ui/icons/Info';
import React from 'react';

const About = () => {
  return (
    <Container maxWidth="lg">
      <Header
        title="About"
        description="Some info on what this page is about"
        media={
          <Avatar>
            <InfoIcon style={{ width: '100%', height: '100%' }} />
          </Avatar>
        }
      />
    </Container>
  );
};

export default About;
