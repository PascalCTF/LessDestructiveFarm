import { ApolloClient, gql, HttpLink, InMemoryCache, TypedDocumentNode } from '@apollo/client';
import { FlagState } from 'src/lib/models/flag';

declare module '@apollo/client' {
  namespace ApolloClient {
    namespace DeclareDefaultOptions {
      // Affects client.watchQuery() and React hooks (useQuery, useSuspenseQuery, etc.)
      interface WatchQuery {
        errorPolicy: 'ignore';
      }
      // Affects client.query()
      interface Query {
        errorPolicy: 'all';
      }
    }
  }
}

export const queries = {
  GET_ALL_DATA: gql`
    query GetFlags(
      $offset: Int = 0
      $limit: Int = 30
      $flag: String
      $sploit: String
      $team: String
      $since: DateTimeISO
      $until: DateTimeISO
      $status: String
      $checksystem_response: String
    ) {
      getFlags(
        offset: $offset
        limit: $limit
        flag: $flag
        sploit: $sploit
        team: $team
        since: $since
        until: $until
        status: $status
        checksystem_response: $checksystem_response
      ) {
        flag
        sploit
        team
        timestamp
        status
        checksystem_response
      }
      getFlagCount(
        flag: $flag
        sploit: $sploit
        team: $team
        since: $since
        until: $until
        status: $status
        checksystem_response: $checksystem_response
      )
      getSearchValues {
        sploits
        teams
        statuses
      }
      getGameInfo {
        flagFormat
      }
    }
  ` as TypedDocumentNode<
    {
      getFlags: {
        flag: string;
        sploit: string;
        team: string;
        timestamp: Date;
        status: FlagState;
        checksystem_response: string;
      }[];
      getFlagCount: string;
      getSearchValues: {
        sploits: string[];
        teams: string[];
        statuses: string[];
      };
      getGameInfo: {
        flagFormat: string;
      };
    },
    {
      offset: number;
      limit: number;
      flag: string;
      sploit: string;
      team: string;
      since: Date;
      until: Date;
      status: string;
      checksystem_response: string;
    }
  >,
  POST_FLAGS: gql`
    mutation PostFlags($flags: [String!]!) {
      postFlags(flags: $flags)
    }
  ` as TypedDocumentNode<{ postFlags: boolean }, { flags: string[] }>
} as const;

const token = '1';

let uri: string;
if (typeof window !== 'undefined') {
  uri =
    window.location.protocol +
    '//' +
    window.location.hostname +
    (window.location.port ? ':' + window.location.port : '') +
    '/api/graphql';
} else {
  uri = 'http://127.0.0.1:3000/api/graphql';
}

export const apolloClient = new ApolloClient({
  ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
  link: new HttpLink({
    uri,
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore'
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    }
  }
});
