import App from 'next/app';
import MaterialUiTheme from '../components/Theme/MaterialUiTheme';
import React from 'react';
import withApollo from '../lib/apollo/withApollo';
import { ApolloProvider } from '@apollo/react-hooks';
import { ProfileProvider } from '../contexts/Profile/ProfileContext';
import { SystemMessagesProvider } from '../contexts/SystemMessages/SystemMessagesContext';
import { UserInterfaceProvider } from '../contexts/UserInterface/UserInterfaceContext';
import { UserProvider } from '../contexts/User/UserContext';

class MyApp extends App<any> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <ApolloProvider client={apolloClient}>
        <MaterialUiTheme>
          <SystemMessagesProvider>
            <UserProvider>
              <ProfileProvider>
                <UserInterfaceProvider>
                  <Component {...pageProps} />
                </UserInterfaceProvider>
              </ProfileProvider>
            </UserProvider>
          </SystemMessagesProvider>
        </MaterialUiTheme>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);
