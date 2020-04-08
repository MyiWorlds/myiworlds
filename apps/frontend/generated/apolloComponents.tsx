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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

/** A circle in a graph that can assemble to be anything. */
export type Circle = {
  __typename?: 'Circle';
  id?: Maybe<Scalars['String']>;
  collection?: Maybe<Scalars['String']>;
  cached?: Maybe<Scalars['Boolean']>;
  pii?: Maybe<Scalars['Boolean']>;
  autoUpdate?: Maybe<Scalars['Boolean']>;
  parent?: Maybe<Circle>;
  copiedFrom?: Maybe<Circle>;
  slug?: Maybe<Scalars['String']>;
  public?: Maybe<Scalars['Boolean']>;
  passwordRequired?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  media?: Maybe<Circle>;
  /** A publicly viewable profile of the User who created this piece of content */
  creator?: Maybe<PublicProfile>;
  /** A publicly viewable profile of the User who created this piece of content */
  owner?: Maybe<PublicProfile>;
  viewers?: Maybe<Array<Maybe<PublicProfile>>>;
  editors?: Maybe<Array<Maybe<PublicProfile>>>;
  ui?: Maybe<Circle>;
  dateCreated?: Maybe<Scalars['BigInt']>;
  dateUpdated?: Maybe<Scalars['BigInt']>;
  key?: Maybe<Scalars['String']>;
  string?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['JSON']>;
  number?: Maybe<Scalars['Int']>;
  bigNumber?: Maybe<Scalars['BigInt']>;
  boolean?: Maybe<Scalars['Boolean']>;
  date?: Maybe<Scalars['BigInt']>;
  geoPoint?: Maybe<Scalars['String']>;
  line?: Maybe<Circle>;
  lines?: Maybe<Array<Maybe<Circle>>>;
};

/** A circle in a graph that can assemble to be anything. */
export type CircleClone = {
  __typename?: 'circleClone';
  id?: Maybe<Scalars['String']>;
  collection?: Maybe<Scalars['String']>;
  cached?: Maybe<Scalars['Boolean']>;
  pii?: Maybe<Scalars['Boolean']>;
  autoUpdate?: Maybe<Scalars['Boolean']>;
  parent?: Maybe<Circle>;
  copiedFrom?: Maybe<Circle>;
  slug?: Maybe<Scalars['String']>;
  public?: Maybe<Scalars['Boolean']>;
  passwordRequired?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  media?: Maybe<Circle>;
  /** A publicly viewable profile of the User who created this piece of content */
  creator?: Maybe<PublicProfile>;
  /** A publicly viewable profile of the User who created this piece of content */
  owner?: Maybe<PublicProfile>;
  viewers?: Maybe<Array<Maybe<PublicProfile>>>;
  editors?: Maybe<Array<Maybe<PublicProfile>>>;
  ui?: Maybe<Circle>;
  dateCreated?: Maybe<Scalars['BigInt']>;
  dateUpdated?: Maybe<Scalars['BigInt']>;
  key?: Maybe<Scalars['String']>;
  string?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['JSON']>;
  number?: Maybe<Scalars['Int']>;
  bigNumber?: Maybe<Scalars['BigInt']>;
  boolean?: Maybe<Scalars['Boolean']>;
  date?: Maybe<Scalars['BigInt']>;
  geoPoint?: Maybe<Scalars['String']>;
  line?: Maybe<Circle>;
  lines?: Maybe<Array<Maybe<Circle>>>;
};

export type CopyCirclePayload = {
  __typename?: 'CopyCirclePayload';
  status?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  createdCircle?: Maybe<Circle>;
};

export type CreateCirclePayload = {
  __typename?: 'CreateCirclePayload';
  status?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  createdCircle?: Maybe<Circle>;
};

export type CreateProfilePayload = {
  __typename?: 'CreateProfilePayload';
  status?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  createdDocumentId?: Maybe<Scalars['String']>;
};

export type CreateServiceKeysPayload = {
  __typename?: 'CreateServiceKeysPayload';
  status?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  totalCreated?: Maybe<Scalars['Boolean']>;
};

export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  status?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  createdUser?: Maybe<User>;
};

export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  status: Scalars['String'];
  message: Scalars['String'];
  userDeleted: Scalars['Boolean'];
};

export type GetProfileByUsernamePayload = {
  __typename?: 'GetProfileByUsernamePayload';
  usernameAvailable?: Maybe<Scalars['Boolean']>;
  usernameInvalid?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  seedFirestoreCircles?: Maybe<SeedFirestoreCirclesPayload>;
  createServiceKeys?: Maybe<CreateServiceKeysPayload>;
  createUser?: Maybe<CreateUserPayload>;
  deleteUser?: Maybe<DeleteUserPayload>;
  createProfile?: Maybe<CreateProfilePayload>;
  updateProfile?: Maybe<UpdateProfilePayload>;
  copyCircle?: Maybe<CopyCirclePayload>;
  createCircle?: Maybe<CreateCirclePayload>;
};

export type MutationCreateUserArgs = {
  id: Scalars['String'];
  email: Scalars['String'];
  photoURL?: Maybe<Scalars['String']>;
};

export type MutationCreateProfileArgs = {
  username: Scalars['String'];
};

export type MutationUpdateProfileArgs = {
  id: Scalars['String'];
  username?: Maybe<Scalars['String']>;
};

export type MutationCopyCircleArgs = {
  circleIdToCopy: Scalars['String'];
};

export type MutationCreateCircleArgs = {
  id?: Maybe<Scalars['String']>;
  collection?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['String']>;
  cached?: Maybe<Scalars['Boolean']>;
  cache?: Maybe<Scalars['JSON']>;
  pii?: Maybe<Scalars['Boolean']>;
  copiedFrom?: Maybe<Scalars['String']>;
  autoUpdate?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  public?: Maybe<Scalars['Boolean']>;
  passwordRequired?: Maybe<Scalars['Boolean']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  media?: Maybe<Scalars['String']>;
  creator?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  viewers?: Maybe<Array<Maybe<Scalars['String']>>>;
  editors?: Maybe<Array<Maybe<Scalars['String']>>>;
  ui?: Maybe<Scalars['String']>;
  dateCreated?: Maybe<Scalars['BigInt']>;
  dateUpdated?: Maybe<Scalars['BigInt']>;
  key?: Maybe<Scalars['String']>;
  string?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['JSON']>;
  number?: Maybe<Scalars['Int']>;
  bigNumber?: Maybe<Scalars['BigInt']>;
  boolean?: Maybe<Scalars['Boolean']>;
  date?: Maybe<Scalars['String']>;
  geoPoint?: Maybe<Scalars['String']>;
  line?: Maybe<Scalars['String']>;
  lines?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** user who can create and interact with circles. */
export type Profile = {
  __typename?: 'Profile';
  id?: Maybe<Scalars['String']>;
  collection?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  dateCreated?: Maybe<Scalars['BigInt']>;
  dateUpdated?: Maybe<Scalars['BigInt']>;
  addToHistory?: Maybe<Scalars['Boolean']>;
  media?: Maybe<Circle>;
  rating?: Maybe<Circle>;
  theme?: Maybe<Circle>;
  publicHome?: Maybe<Circle>;
  home?: Maybe<Circle>;
  history?: Maybe<Circle>;
  overrideCircleUIs?: Maybe<Scalars['Boolean']>;
  circleUIs?: Maybe<Circle>;
  following?: Maybe<Circle>;
  level?: Maybe<Circle>;
};

/** Profile which only a user can access clone. */
export type ProfileClone = {
  __typename?: 'ProfileClone';
  id?: Maybe<Scalars['String']>;
  collection?: Maybe<Scalars['String']>;
  clonedFrom?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  dateCreated?: Maybe<Scalars['BigInt']>;
  dateUpdated?: Maybe<Scalars['BigInt']>;
  addToHistory?: Maybe<Scalars['Boolean']>;
  media?: Maybe<Circle>;
  theme?: Maybe<Circle>;
  publicHome?: Maybe<Circle>;
  home?: Maybe<Circle>;
  history?: Maybe<Circle>;
  circleUIs?: Maybe<Circle>;
};

/**
 * The publicProfile in which other publicProfiles can access.  Has fields removed
 * from publicProfile others should not be able to see.
 **/
export type PublicProfile = {
  __typename?: 'PublicProfile';
  id?: Maybe<Scalars['String']>;
  collection?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  dateCreated?: Maybe<Scalars['BigInt']>;
  dateUpdated?: Maybe<Scalars['BigInt']>;
  media?: Maybe<Circle>;
  theme?: Maybe<Circle>;
  publicHome?: Maybe<Circle>;
  circleUIs?: Maybe<Circle>;
};

export type Query = {
  __typename?: 'Query';
  getSeededCirclesByIds?: Maybe<Array<Maybe<Circle>>>;
  getUserById?: Maybe<User>;
  getCircleById?: Maybe<Circle>;
  getCircleCloneById?: Maybe<CircleClone>;
  getCircleByProfileUsername?: Maybe<Circle>;
  getProfileById?: Maybe<Profile>;
  getPublicProfileById?: Maybe<PublicProfile>;
  getProfileCloneById?: Maybe<ProfileClone>;
  getProfileByUsername?: Maybe<GetProfileByUsernamePayload>;
  getUserProfiles?: Maybe<Array<Maybe<Profile>>>;
};

export type QueryGetCircleByIdArgs = {
  id: Scalars['String'];
};

export type QueryGetCircleCloneByIdArgs = {
  id: Scalars['String'];
};

export type QueryGetCircleByProfileUsernameArgs = {
  username: Scalars['String'];
};

export type QueryGetProfileByIdArgs = {
  id: Scalars['String'];
};

export type QueryGetPublicProfileByIdArgs = {
  id: Scalars['String'];
};

export type QueryGetProfileCloneByIdArgs = {
  id: Scalars['String'];
};

export type QueryGetProfileByUsernameArgs = {
  username: Scalars['String'];
};

export type SeedFirestoreCirclesPayload = {
  __typename?: 'SeedFirestoreCirclesPayload';
  status?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  created?: Maybe<Array<Maybe<Circle>>>;
  edited?: Maybe<Array<Maybe<Circle>>>;
};

export type UpdateProfilePayload = {
  __typename?: 'UpdateProfilePayload';
  status?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  updatedProfile?: Maybe<Profile>;
};

/** user who can create and interact with circles. */
export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['String']>;
  collection?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  photoURL?: Maybe<Scalars['String']>;
  dateCreated?: Maybe<Scalars['BigInt']>;
  dateUpdated?: Maybe<Scalars['BigInt']>;
  isSystemAdmin?: Maybe<Scalars['Boolean']>;
  canCreate?: Maybe<Scalars['Boolean']>;
};

export type SeedFirestoreCirclesMutationVariables = {};

export type SeedFirestoreCirclesMutation = { __typename?: 'Mutation' } & {
  seedFirestoreCircles: Maybe<
    { __typename?: 'SeedFirestoreCirclesPayload' } & Pick<
      SeedFirestoreCirclesPayload,
      'status' | 'message'
    > & {
        created: Maybe<
          Array<Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id' | 'title'>>>
        >;
        edited: Maybe<
          Array<Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id' | 'title'>>>
        >;
      }
  >;
};

export type GetSeededCirclesByIdsQueryVariables = {};

export type GetSeededCirclesByIdsQuery = { __typename?: 'Query' } & {
  getSeededCirclesByIds: Maybe<
    Array<Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id' | 'title'>>>
  >;
};

export type CreateProfileMutationVariables = {
  username: Scalars['String'];
};

export type CreateProfileMutation = { __typename?: 'Mutation' } & {
  createProfile: Maybe<
    { __typename?: 'CreateProfilePayload' } & Pick<
      CreateProfilePayload,
      'status' | 'message' | 'createdDocumentId'
    >
  >;
};

export type GetProfileByUsernameQueryVariables = {
  username: Scalars['String'];
};

export type GetProfileByUsernameQuery = { __typename?: 'Query' } & {
  getProfileByUsername: Maybe<
    { __typename?: 'GetProfileByUsernamePayload' } & Pick<
      GetProfileByUsernamePayload,
      'usernameAvailable' | 'usernameInvalid'
    >
  >;
};

export type GetProfileByIdQueryVariables = {
  id: Scalars['String'];
};

export type GetProfileByIdQuery = { __typename?: 'Query' } & {
  getProfileById: Maybe<
    { __typename?: 'Profile' } & SelectedProfileFragmentFragment
  >;
};

export type SelectedProfileFragmentFragment = { __typename?: 'Profile' } & Pick<
  Profile,
  | 'id'
  | 'collection'
  | 'username'
  | 'dateCreated'
  | 'dateUpdated'
  | 'overrideCircleUIs'
  | 'addToHistory'
> & {
    media: Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id'>>;
    level: Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id'>>;
    rating: Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id'>>;
    circleUIs: Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id'>>;
    theme: Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id' | 'data'>>;
    publicHome: Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id'>>;
    home: Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id'>>;
    following: Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id'>>;
    history: Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id'>>;
  };

export type CreateUserMutationVariables = {
  id: Scalars['String'];
  email: Scalars['String'];
  photoURL?: Maybe<Scalars['String']>;
};

export type CreateUserMutation = { __typename?: 'Mutation' } & {
  createUser: Maybe<
    { __typename?: 'CreateUserPayload' } & Pick<
      CreateUserPayload,
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
    { __typename?: 'DeleteUserPayload' } & Pick<
      DeleteUserPayload,
      'status' | 'message' | 'userDeleted'
    >
  >;
};

export type GetUserByIdQueryVariables = {};

export type GetUserByIdQuery = { __typename?: 'Query' } & {
  getUserById: Maybe<{ __typename?: 'User' } & LoggedInUserFragmentFragment>;
  getUserProfiles: Maybe<
    Array<Maybe<{ __typename?: 'Profile' } & Pick<Profile, 'id' | 'username'>>>
  >;
};

export type GetUserProfilesQueryVariables = {};

export type GetUserProfilesQuery = { __typename?: 'Query' } & {
  getUserProfiles: Maybe<
    Array<Maybe<{ __typename?: 'Profile' } & Pick<Profile, 'id' | 'username'>>>
  >;
};

export type LoggedInUserFragmentFragment = { __typename?: 'User' } & Pick<
  User,
  | 'id'
  | 'email'
  | 'dateCreated'
  | 'dateUpdated'
  | 'photoURL'
  | 'isSystemAdmin'
  | 'canCreate'
>;

export const SelectedProfileFragmentFragmentDoc = gql`
  fragment SelectedProfileFragment on Profile {
    id
    collection
    username
    media {
      id
    }
    dateCreated
    dateUpdated
    level {
      id
    }
    rating {
      id
    }
    overrideCircleUIs
    circleUIs {
      id
    }
    overrideCircleUIs
    theme {
      id
      data
    }
    publicHome {
      id
    }
    home {
      id
    }
    following {
      id
    }
    addToHistory
    history {
      id
    }
  }
`;
export const LoggedInUserFragmentFragmentDoc = gql`
  fragment LoggedInUserFragment on User {
    id
    email
    dateCreated
    dateUpdated
    photoURL
    isSystemAdmin
    canCreate
  }
`;
export const SeedFirestoreCirclesDocument = gql`
  mutation seedFirestoreCircles {
    seedFirestoreCircles {
      status
      message
      created {
        id
        title
      }
      edited {
        id
        title
      }
    }
  }
`;
export type SeedFirestoreCirclesMutationFn = ApolloReactCommon.MutationFunction<
  SeedFirestoreCirclesMutation,
  SeedFirestoreCirclesMutationVariables
>;

/**
 * __useSeedFirestoreCirclesMutation__
 *
 * To run a mutation, you first call `useSeedFirestoreCirclesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSeedFirestoreCirclesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [seedFirestoreCirclesMutation, { data, loading, error }] = useSeedFirestoreCirclesMutation({
 *   variables: {
 *   },
 * });
 */
export function useSeedFirestoreCirclesMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SeedFirestoreCirclesMutation,
    SeedFirestoreCirclesMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    SeedFirestoreCirclesMutation,
    SeedFirestoreCirclesMutationVariables
  >(SeedFirestoreCirclesDocument, baseOptions);
}
export type SeedFirestoreCirclesMutationHookResult = ReturnType<
  typeof useSeedFirestoreCirclesMutation
>;
export type SeedFirestoreCirclesMutationResult = ApolloReactCommon.MutationResult<
  SeedFirestoreCirclesMutation
>;
export type SeedFirestoreCirclesMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SeedFirestoreCirclesMutation,
  SeedFirestoreCirclesMutationVariables
>;
export const GetSeededCirclesByIdsDocument = gql`
  query getSeededCirclesByIds {
    getSeededCirclesByIds {
      id
      title
    }
  }
`;

/**
 * __useGetSeededCirclesByIdsQuery__
 *
 * To run a query within a React component, call `useGetSeededCirclesByIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSeededCirclesByIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSeededCirclesByIdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSeededCirclesByIdsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetSeededCirclesByIdsQuery,
    GetSeededCirclesByIdsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetSeededCirclesByIdsQuery,
    GetSeededCirclesByIdsQueryVariables
  >(GetSeededCirclesByIdsDocument, baseOptions);
}
export function useGetSeededCirclesByIdsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetSeededCirclesByIdsQuery,
    GetSeededCirclesByIdsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetSeededCirclesByIdsQuery,
    GetSeededCirclesByIdsQueryVariables
  >(GetSeededCirclesByIdsDocument, baseOptions);
}
export type GetSeededCirclesByIdsQueryHookResult = ReturnType<
  typeof useGetSeededCirclesByIdsQuery
>;
export type GetSeededCirclesByIdsLazyQueryHookResult = ReturnType<
  typeof useGetSeededCirclesByIdsLazyQuery
>;
export type GetSeededCirclesByIdsQueryResult = ApolloReactCommon.QueryResult<
  GetSeededCirclesByIdsQuery,
  GetSeededCirclesByIdsQueryVariables
>;
export const CreateProfileDocument = gql`
  mutation createProfile($username: String!) {
    createProfile(username: $username) {
      status
      message
      createdDocumentId
    }
  }
`;
export type CreateProfileMutationFn = ApolloReactCommon.MutationFunction<
  CreateProfileMutation,
  CreateProfileMutationVariables
>;

/**
 * __useCreateProfileMutation__
 *
 * To run a mutation, you first call `useCreateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProfileMutation, { data, loading, error }] = useCreateProfileMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCreateProfileMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateProfileMutation,
    CreateProfileMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateProfileMutation,
    CreateProfileMutationVariables
  >(CreateProfileDocument, baseOptions);
}
export type CreateProfileMutationHookResult = ReturnType<
  typeof useCreateProfileMutation
>;
export type CreateProfileMutationResult = ApolloReactCommon.MutationResult<
  CreateProfileMutation
>;
export type CreateProfileMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateProfileMutation,
  CreateProfileMutationVariables
>;
export const GetProfileByUsernameDocument = gql`
  query getProfileByUsername($username: String!) {
    getProfileByUsername(username: $username) {
      usernameAvailable
      usernameInvalid
    }
  }
`;

/**
 * __useGetProfileByUsernameQuery__
 *
 * To run a query within a React component, call `useGetProfileByUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileByUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileByUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetProfileByUsernameQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetProfileByUsernameQuery,
    GetProfileByUsernameQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetProfileByUsernameQuery,
    GetProfileByUsernameQueryVariables
  >(GetProfileByUsernameDocument, baseOptions);
}
export function useGetProfileByUsernameLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetProfileByUsernameQuery,
    GetProfileByUsernameQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetProfileByUsernameQuery,
    GetProfileByUsernameQueryVariables
  >(GetProfileByUsernameDocument, baseOptions);
}
export type GetProfileByUsernameQueryHookResult = ReturnType<
  typeof useGetProfileByUsernameQuery
>;
export type GetProfileByUsernameLazyQueryHookResult = ReturnType<
  typeof useGetProfileByUsernameLazyQuery
>;
export type GetProfileByUsernameQueryResult = ApolloReactCommon.QueryResult<
  GetProfileByUsernameQuery,
  GetProfileByUsernameQueryVariables
>;
export const GetProfileByIdDocument = gql`
  query getProfileById($id: String!) {
    getProfileById(id: $id) {
      ...SelectedProfileFragment
    }
  }
  ${SelectedProfileFragmentFragmentDoc}
`;

/**
 * __useGetProfileByIdQuery__
 *
 * To run a query within a React component, call `useGetProfileByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProfileByIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetProfileByIdQuery,
    GetProfileByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetProfileByIdQuery,
    GetProfileByIdQueryVariables
  >(GetProfileByIdDocument, baseOptions);
}
export function useGetProfileByIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetProfileByIdQuery,
    GetProfileByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetProfileByIdQuery,
    GetProfileByIdQueryVariables
  >(GetProfileByIdDocument, baseOptions);
}
export type GetProfileByIdQueryHookResult = ReturnType<
  typeof useGetProfileByIdQuery
>;
export type GetProfileByIdLazyQueryHookResult = ReturnType<
  typeof useGetProfileByIdLazyQuery
>;
export type GetProfileByIdQueryResult = ApolloReactCommon.QueryResult<
  GetProfileByIdQuery,
  GetProfileByIdQueryVariables
>;
export const CreateUserDocument = gql`
  mutation createUser($id: String!, $email: String!, $photoURL: String) {
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
    getUserProfiles {
      id
      username
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
export const GetUserProfilesDocument = gql`
  query getUserProfiles {
    getUserProfiles {
      id
      username
    }
  }
`;

/**
 * __useGetUserProfilesQuery__
 *
 * To run a query within a React component, call `useGetUserProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProfilesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserProfilesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetUserProfilesQuery,
    GetUserProfilesQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetUserProfilesQuery,
    GetUserProfilesQueryVariables
  >(GetUserProfilesDocument, baseOptions);
}
export function useGetUserProfilesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetUserProfilesQuery,
    GetUserProfilesQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetUserProfilesQuery,
    GetUserProfilesQueryVariables
  >(GetUserProfilesDocument, baseOptions);
}
export type GetUserProfilesQueryHookResult = ReturnType<
  typeof useGetUserProfilesQuery
>;
export type GetUserProfilesLazyQueryHookResult = ReturnType<
  typeof useGetUserProfilesLazyQuery
>;
export type GetUserProfilesQueryResult = ApolloReactCommon.QueryResult<
  GetUserProfilesQuery,
  GetUserProfilesQueryVariables
>;
