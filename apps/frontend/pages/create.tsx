import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Header from '../components/Header/Header';
import InfoIcon from '@material-ui/icons/Info';
import React, { useContext, useEffect } from 'react';
import Router from 'next/router';
import { UserContext } from '../contexts/User/UserContext';
import { UserInterfaceContext } from '../contexts/UserInterface/UserInterfaceContext';

const Create = () => {
  const { creatingCircle, setCreatingCircle } = useContext(
    UserInterfaceContext,
  );
  const { user } = useContext(UserContext);

  const createCircle = () => {
    if (user.canCreate && !creatingCircle) {
      setCreatingCircle(true);
      Router.push('/');
    }
  };

  useEffect(createCircle, [user]);

  if (!user.canCreate) {
    return (
      <Container maxWidth="lg">
        <Header
          title="Unable to Create"
          description="You are unable to create at this time."
          media={
            <Avatar>
              <InfoIcon style={{ width: '100%', height: '100%' }} />
            </Avatar>
          }
        />
      </Container>
    );
  }

  return null;
};

export default Create;
