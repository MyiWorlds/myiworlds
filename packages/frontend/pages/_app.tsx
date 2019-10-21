import App, { Container } from 'next/app';
import AppContent from '../components/AppContent/AppContent';
import AppControllerBar from '../components/AppControllerBar';
import AppNavigation from '../components/AppNavigation';
import Head from 'next/head';
import React from 'react';
import withApollo from '../lib/withApollo';
import { ApolloProvider } from '@apollo/react-hooks';
import { HideOnScroll } from './../components/HideOnScroll/HideOnScroll';
import { ProfileProvider } from '../context/profile/ProfileContext';
import { UserProvider } from '../context/user/UserContext';

class MyApp extends App<any> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
        </Head>
        <style jsx global>{`
          body {
            background: #000;
            margin: 0px;
          }
        `}</style>
        <ApolloProvider client={apolloClient}>
          <UserProvider>
            <ProfileProvider>
              <HideOnScroll>
                <AppControllerBar />
              </HideOnScroll>
              <AppNavigation />
              <AppContent>
                <Component {...pageProps} />
              </AppContent>
            </ProfileProvider>
          </UserProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
