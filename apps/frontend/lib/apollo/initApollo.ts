import fetch from 'isomorphic-unfetch';
import { cloudRun } from '@myiworlds/credentials';
import { createHttpLink } from 'apollo-link-http';
import { isBrowser } from './isBrowser';
import { setContext } from 'apollo-link-context';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from 'apollo-boost';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  (global as any).fetch = fetch;
}

interface Options {
  getToken: () => string;
  getSelectedProfileId: () => string;
  getUserId: () => string;
  getIsSystemAdmin: () => string;
}

function create(
  initialState: any,
  { getToken, getSelectedProfileId, getUserId, getIsSystemAdmin }: Options,
) {
  const httpLink = createHttpLink({
    uri:
      process.env.NODE_ENV === 'production'
        ? cloudRun.url
        : 'http://localhost:8000/graphql',
    credentials: 'include',
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    const selectedProfileId = getSelectedProfileId();
    const userId = getUserId();
    const isSystemAdmin = getIsSystemAdmin();
    return {
      headers: {
        ...headers,
        cookies: token
          ? `token=${token};selectedProfileId=${selectedProfileId};userId=${userId};isSystemAdmin=${isSystemAdmin}`
          : 'token=;path=/;selectedProfileId=;path=/;userId=;path=/;isSystemAdmin=/;',
      },
    };
  });

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default function initApollo(initialState: any, options: Options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
