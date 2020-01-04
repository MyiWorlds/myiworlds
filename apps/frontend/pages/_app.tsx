import App from 'next/app';
import MaterialUiTheme from './../lib/MaterialUiTheme';
import React from 'react';
import UserInterface from '../contexts/UserInterface';
import withApollo from '../lib/apollo/withApollo';
import { ApolloProvider } from '@apollo/react-hooks';
import { SystemMessagesProvider } from '../contexts/SystemMessages/SystemMessagesContext';
import { UserProvider } from '../contexts/User/UserContext';

class MyApp extends App<any> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <ApolloProvider client={apolloClient}>
        <MaterialUiTheme>
          <SystemMessagesProvider>
            <UserProvider>
              <UserInterface>
                <Component {...pageProps} />
              </UserInterface>
            </UserProvider>
          </SystemMessagesProvider>
        </MaterialUiTheme>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);
