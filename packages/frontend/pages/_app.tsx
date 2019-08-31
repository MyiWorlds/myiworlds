import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import withApollo from '../lib/withApollo';
import { ApolloProvider } from '@apollo/react-hooks';
import { UserProvider } from '../context/user/userContext';

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
        <ApolloProvider client={apolloClient}>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
