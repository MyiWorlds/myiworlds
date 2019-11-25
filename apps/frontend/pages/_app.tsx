import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import withApollo from '../lib/apollo/withApollo';
import { ApolloProvider } from '@apollo/react-hooks';
import { SystemMessagesProvider } from '../contexts/SystemMessages/SystemMessagesContext';
import { UserProvider } from '../contexts/User/UserContext';

class MyApp extends App<any> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <>
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
            height: 100%;
            width: 100%;
            position: relative;
            margin: 0px;
          }

          #__next {
            height: 100%;
            width: 100%;
            position: fixed;
          }
        `}</style>
        <ApolloProvider client={apolloClient}>
          <SystemMessagesProvider>
            <UserProvider>
              <Component {...pageProps} />
            </UserProvider>
          </SystemMessagesProvider>
        </ApolloProvider>
      </>
    );
  }
}

export default withApollo(MyApp);
