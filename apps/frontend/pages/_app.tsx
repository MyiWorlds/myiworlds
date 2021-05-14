import App from 'next/app';
import AppBody from './../components/appBody';
import MaterialUiTheme from '../components/Theme/MaterialUiTheme';
import React from 'react';
import SystemMessages from '../contexts/UserInterface/SystemMessages';
import withApollo from '../lib/apollo/withApollo';
import { ApolloProvider } from '@apollo/react-hooks';
import { ProfileProvider } from '../contexts/Profile/ProfileContext';
import { RecoilRoot } from 'recoil';
import { UserInterfaceProvider } from '../contexts/UserInterface/UserInterfaceContext';
import { UserProvider } from '../contexts/User/UserContext';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient }: any = this.props;
    return (
      <RecoilRoot>
        <ApolloProvider client={apolloClient}>
          <MaterialUiTheme>
            <>
              <SystemMessages />
              <AppBody>
                <UserProvider>
                  <ProfileProvider>
                    <UserInterfaceProvider>
                      <Component {...pageProps} />
                    </UserInterfaceProvider>
                  </ProfileProvider>
                </UserProvider>
              </AppBody>
            </>
          </MaterialUiTheme>
        </ApolloProvider>
      </RecoilRoot>
    );
  }
}

// export default MyApp;

export default withApollo(MyApp);
