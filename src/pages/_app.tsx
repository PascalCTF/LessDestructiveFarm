import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../next/css/bootswatch-flatly.css';
import '../next/css/style.css';
import { apolloClient } from '../next/lib/graphql';
import { ApolloProvider } from '@apollo/client/react';
import ClientOnly from 'src/next/components/clientOnly';
import NavBar from 'src/next/components/navBar';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <ClientOnly>
        <Head>
          <title>Less Destructive Farm</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <NavBar />
        <Component {...pageProps} />
      </ClientOnly>
    </ApolloProvider>
  );
}
