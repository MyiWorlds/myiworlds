import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import { UserProvider } from '../contexts/user/UserContext';

class MyApp extends App<any> {
  render() {
    const { Component, pageProps } = this.props;
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
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </>
    );
  }
}

export default MyApp;
