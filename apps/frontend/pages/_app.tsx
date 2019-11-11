import App from 'next/app';
import Head from 'next/head';
import React from 'react';

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
            margin: 0px;
          }
        `}</style>
        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
