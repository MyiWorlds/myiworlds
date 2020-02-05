import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `BigInt` scalar type represents non-fractional signed whole numeric values.
   * BigInt can represent values between -(2^53) + 1 and 2^53 - 1.
   **/
  BigInt: any;
  JSON: any;
  Upload: any;
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  status?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  createdUser?: Maybe<User>;
};

export type DeleteUserResponse = {
  __typename?: 'DeleteUserResponse';
  status: Scalars['String'];
  message: Scalars['String'];
  userDeleted: Scalars['Boolean'];
};

export type GetSecuritytKeyResponse = {
  __typename?: 'getSecuritytKeyResponse';
  type: Scalars['String'];
  project_id: Scalars['String'];
  private_key_id: Scalars['String'];
  private_key?: Maybe<Scalars['String']>;
  client_email: Scalars['String'];
  client_id: Scalars['String'];
  auth_uri: Scalars['String'];
  token_uri: Scalars['String'];
  auth_provider_x509_cert_url: Scalars['String'];
  client_x509_cert_url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<CreateUserResponse>;
  deleteUser?: Maybe<DeleteUserResponse>;
};

export type MutationCreateUserArgs = {
  id: Scalars['ID'];
  email: Scalars['String'];
  photoURL?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getUserById?: Maybe<User>;
  getSecurityKey?: Maybe<GetSecuritytKeyResponse>;
};

export type QueryGetSecurityKeyArgs = {
  name: Scalars['String'];
  version: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  collection?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  photoURL?: Maybe<Scalars['String']>;
  dateCreated?: Maybe<Scalars['BigInt']>;
  dateUpdated?: Maybe<Scalars['BigInt']>;
  isSystemAdmin?: Maybe<Scalars['Boolean']>;
};

export type CreateUserMutationVariables = {
  id: Scalars['ID'];
  email: Scalars['String'];
  photoURL?: Maybe<Scalars['String']>;
};

export type CreateUserMutation = { __typename?: 'Mutation' } & {
  createUser: Maybe<
    { __typename?: 'CreateUserResponse' } & Pick<
      CreateUserResponse,
      'status' | 'message'
    > & {
        createdUser: Maybe<
          { __typename?: 'User' } & LoggedInUserFragmentFragment
        >;
      }
  >;
};

export type DeleteUserMutationVariables = {};

export type DeleteUserMutation = { __typename?: 'Mutation' } & {
  deleteUser: Maybe<
    { __typename?: 'DeleteUserResponse' } & Pick<
      DeleteUserResponse,
      'status' | 'message' | 'userDeleted'
    >
  >;
};

export type GetUserByIdQueryVariables = {};

export type GetUserByIdQuery = { __typename?: 'Query' } & {
  getUserById: Maybe<{ __typename?: 'User' } & LoggedInUserFragmentFragment>;
};

export type LoggedInUserFragmentFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'email' | 'dateCreated' | 'dateUpdated' | 'photoURL' | 'isSystemAdmin'
>;

export type GetSecurityKeyQueryVariables = {
  name: Scalars['String'];
  version: Scalars['String'];
};

export type GetSecurityKeyQuery = { __typename?: 'Query' } & {
  getSecurityKey: Maybe<
    { __typename?: 'getSecuritytKeyResponse' } & Pick<
      GetSecuritytKeyResponse,
      | 'type'
      | 'project_id'
      | 'private_key_id'
      | 'private_key'
      | 'client_email'
      | 'client_id'
      | 'auth_uri'
      | 'token_uri'
      | 'auth_provider_x509_cert_url'
      | 'client_x509_cert_url'
    >
  >;
};

export const LoggedInUserFragmentFragmentDoc = gql`
  fragment LoggedInUserFragment on User {
    id
    email
    dateCreated
    dateUpdated
    photoURL
    isSystemAdmin
  }
`;
export const CreateUserDocument = gql`
  mutation createUser($id: ID!, $email: String!, $photoURL: String) {
    createUser(id: $id, email: $email, photoURL: $photoURL) {
      status
      message
      createdUser {
        ...LoggedInUserFragment
      }
    }
  }
  ${LoggedInUserFragmentFragmentDoc}
`;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      email: // value for 'email'
 *      photoURL: // value for 'photoURL'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(CreateUserDocument, baseOptions);
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<
  CreateUserMutation
>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const DeleteUserDocument = gql`
  mutation deleteUser {
    deleteUser {
      status
      message
      userDeleted
    }
  }
`;
export type DeleteUserMutationFn = ApolloReactCommon.MutationFunction<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >(DeleteUserDocument, baseOptions);
}
export type DeleteUserMutationHookResult = ReturnType<
  typeof useDeleteUserMutation
>;
export type DeleteUserMutationResult = ApolloReactCommon.MutationResult<
  DeleteUserMutation
>;
export type DeleteUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;
export const GetUserByIdDocument = gql`
  query getUserById {
    getUserById {
      ...LoggedInUserFragment
    }
  }
  ${LoggedInUserFragmentFragmentDoc}
`;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserByIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetUserByIdQuery,
    GetUserByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(
    GetUserByIdDocument,
    baseOptions,
  );
}
export function useGetUserByIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetUserByIdQuery,
    GetUserByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetUserByIdQuery,
    GetUserByIdQueryVariables
  >(GetUserByIdDocument, baseOptions);
}
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<
  typeof useGetUserByIdLazyQuery
>;
export type GetUserByIdQueryResult = ApolloReactCommon.QueryResult<
  GetUserByIdQuery,
  GetUserByIdQueryVariables
>;
export const GetSecurityKeyDocument = gql`
  query getSecurityKey($name: String!, $version: String!) {
    getSecurityKey(name: $name, version: $version) {
      type
      project_id
      private_key_id
      private_key
      client_email
      client_id
      auth_uri
      token_uri
      auth_provider_x509_cert_url
      client_x509_cert_url
    }
  }
`;

/**
 * __useGetSecurityKeyQuery__
 *
 * To run a query within a React component, call `useGetSecurityKeyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSecurityKeyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSecurityKeyQuery({
 *   variables: {
 *      name: // value for 'name'
 *      version: // value for 'version'
 *   },
 * });
 */
export function useGetSecurityKeyQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetSecurityKeyQuery,
    GetSecurityKeyQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetSecurityKeyQuery,
    GetSecurityKeyQueryVariables
  >(GetSecurityKeyDocument, baseOptions);
}
export function useGetSecurityKeyLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetSecurityKeyQuery,
    GetSecurityKeyQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetSecurityKeyQuery,
    GetSecurityKeyQueryVariables
  >(GetSecurityKeyDocument, baseOptions);
}
export type GetSecurityKeyQueryHookResult = ReturnType<
  typeof useGetSecurityKeyQuery
>;
export type GetSecurityKeyLazyQueryHookResult = ReturnType<
  typeof useGetSecurityKeyLazyQuery
>;
export type GetSecurityKeyQueryResult = ApolloReactCommon.QueryResult<
  GetSecurityKeyQuery,
  GetSecurityKeyQueryVariables
>;
