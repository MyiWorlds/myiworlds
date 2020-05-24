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
  id: Scalars['String'];
  collection?: Maybe<Scalars['String']>;
  cached?: Maybe<Scalars['Boolean']>;
  pii?: Maybe<Scalars['Boolean']>;
  autoUpdate?: Maybe<Scalars['Boolean']>;
  parent?: Maybe<Circle>;
  copiedFrom?: Maybe<Circle>;
  copiedFromClone?: Maybe<Scalars['Boolean']>;
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
  styles?: Maybe<Circle>;
  layouts?: Maybe<Circle>;
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
  __typename?: 'CircleClone';
  id?: Maybe<Scalars['String']>;
  collection?: Maybe<Scalars['String']>;
  cached?: Maybe<Scalars['Boolean']>;
  pii?: Maybe<Scalars['Boolean']>;
  autoUpdate?: Maybe<Scalars['Boolean']>;
  parent?: Maybe<Circle>;
  clonedFrom?: Maybe<Circle>;
  copiedFrom?: Maybe<Circle>;
  copiedFromClone?: Maybe<Scalars['Boolean']>;
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
  styles?: Maybe<Circle>;
  layouts?: Maybe<Circle>;
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
  copiedCircleId?: Maybe<Scalars['String']>;
};

export type CreateCirclePayload = {
  __typename?: 'CreateCirclePayload';
  status?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  createdCircle?: Maybe<Circle>;
};

/** user who can create and interact with circles. */
export type CreatedProfile = {
  __typename?: 'CreatedProfile';
  id?: Maybe<Scalars['String']>;
  collection?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  dateCreated?: Maybe<Scalars['BigInt']>;
  dateUpdated?: Maybe<Scalars['BigInt']>;
  addToHistory?: Maybe<Scalars['Boolean']>;
  userId?: Maybe<Scalars['String']>;
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

export type GetCircleClonesByIdResponse = {
  __typename?: 'GetCircleClonesByIdResponse';
  status?: Maybe<Scalars['String']>;
  hasMoreResults?: Maybe<Scalars['Boolean']>;
  cursor?: Maybe<Scalars['String']>;
  clones?: Maybe<Array<Maybe<CircleClone>>>;
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
  updateCircle?: Maybe<UpdateCirclePayload>;
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
  merge: Scalars['Boolean'];
  id: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  dateCreated?: Maybe<Scalars['BigInt']>;
  dateUpdated?: Maybe<Scalars['BigInt']>;
  addToHistory?: Maybe<Scalars['Boolean']>;
  home?: Maybe<Scalars['String']>;
  history?: Maybe<Scalars['String']>;
  overrideCircleUIs?: Maybe<Scalars['Boolean']>;
  userId?: Maybe<Scalars['String']>;
  media?: Maybe<Scalars['String']>;
  theme?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['String']>;
  following?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['String']>;
  publicHome?: Maybe<Scalars['String']>;
  circleUIs?: Maybe<Scalars['String']>;
};

export type MutationCopyCircleArgs = {
  id: Scalars['String'];
  collection: Scalars['String'];
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
  styles?: Maybe<Scalars['String']>;
  layouts?: Maybe<Scalars['String']>;
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

export type MutationUpdateCircleArgs = {
  merge: Scalars['Boolean'];
  id: Scalars['String'];
  type?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['String']>;
  cached?: Maybe<Scalars['Boolean']>;
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
  styles?: Maybe<Scalars['String']>;
  layouts?: Maybe<Scalars['String']>;
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
  line?: Maybe<Scalars['String']>;
  lines?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** CreatedProfile which only a user can access clone. */
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
  getCirclesByIds?: Maybe<Array<Maybe<Circle>>>;
  getCircleCloneById?: Maybe<CircleClone>;
  getCircleClonesById?: Maybe<GetCircleClonesByIdResponse>;
  getCircleByProfileUsername?: Maybe<Circle>;
  getProfileById?: Maybe<CreatedProfile>;
  getPublicProfileById?: Maybe<PublicProfile>;
  getPublicProfilesByIds?: Maybe<Array<Maybe<PublicProfile>>>;
  getProfileCloneById?: Maybe<ProfileClone>;
  getProfileByUsername?: Maybe<GetProfileByUsernamePayload>;
  getUserProfiles?: Maybe<Array<Maybe<CreatedProfile>>>;
};

export type QueryGetCircleByIdArgs = {
  id: Scalars['String'];
};

export type QueryGetCirclesByIdsArgs = {
  ids: Array<Maybe<Scalars['String']>>;
};

export type QueryGetCircleCloneByIdArgs = {
  id: Scalars['String'];
};

export type QueryGetCircleClonesByIdArgs = {
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

export type QueryGetPublicProfilesByIdsArgs = {
  ids: Array<Maybe<Scalars['String']>>;
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

export type UpdateCirclePayload = {
  __typename?: 'UpdateCirclePayload';
  status?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  updatedDocumentId?: Maybe<Scalars['String']>;
  updatedCircle?: Maybe<Circle>;
};

export type UpdateProfilePayload = {
  __typename?: 'UpdateProfilePayload';
  status?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  updatedProfile?: Maybe<CreatedProfile>;
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

export type GetCircleClonesByIdQueryVariables = {
  id: Scalars['String'];
};

export type GetCircleClonesByIdQuery = { __typename?: 'Query' } & {
  getCircleClonesById: Maybe<
    { __typename?: 'GetCircleClonesByIdResponse' } & Pick<
      GetCircleClonesByIdResponse,
      'status' | 'hasMoreResults' | 'cursor'
    > & {
        clones: Maybe<
          Array<
            Maybe<
              { __typename?: 'CircleClone' } & Pick<
                CircleClone,
                'id' | 'title' | 'dateUpdated' | 'data'
              > & {
                  clonedFrom: Maybe<
                    { __typename?: 'Circle' } & Pick<Circle, 'id'>
                  >;
                  media: Maybe<
                    { __typename?: 'Circle' } & Pick<
                      Circle,
                      'id' | 'type' | 'title' | 'string'
                    >
                  >;
                }
            >
          >
        >;
      }
  >;
};

export type GetCircleToEditByIdQueryVariables = {
  id: Scalars['String'];
};

export type GetCircleToEditByIdQuery = { __typename?: 'Query' } & {
  getCircleById: Maybe<{ __typename?: 'Circle' } & FullCircleFragmentFragment>;
};

export type GetFullCircleCloneByIdQueryVariables = {
  id: Scalars['String'];
};

export type GetFullCircleCloneByIdQuery = { __typename?: 'Query' } & {
  getCircleCloneById: Maybe<
    { __typename?: 'CircleClone' } & FullCircleCloneFragmentFragment
  >;
};

export type GetCircleAndLinesByIdQueryVariables = {
  id: Scalars['String'];
};

export type GetCircleAndLinesByIdQuery = { __typename?: 'Query' } & {
  getCircleById: Maybe<
    { __typename?: 'Circle' } & Pick<Circle, 'id' | 'title'> & {
        media: Maybe<
          { __typename?: 'Circle' } & Pick<
            Circle,
            'id' | 'type' | 'title' | 'string'
          >
        >;
        lines: Maybe<
          Array<
            Maybe<
              { __typename?: 'Circle' } & Pick<
                Circle,
                'id' | 'type' | 'title' | 'description'
              > & {
                  media: Maybe<
                    { __typename?: 'Circle' } & Pick<
                      Circle,
                      'id' | 'type' | 'title' | 'string'
                    >
                  >;
                }
            >
          >
        >;
      }
  >;
};

export type GetCircleToViewByIdQueryVariables = {
  id: Scalars['String'];
};

export type GetCircleToViewByIdQuery = { __typename?: 'Query' } & {
  getCircleById: Maybe<{ __typename?: 'Circle' } & FullCircleFragmentFragment>;
};

export type CopyCircleMutationVariables = {
  id: Scalars['String'];
  collection: Scalars['String'];
};

export type CopyCircleMutation = { __typename?: 'Mutation' } & {
  copyCircle: Maybe<
    { __typename?: 'CopyCirclePayload' } & Pick<
      CopyCirclePayload,
      'status' | 'message' | 'copiedCircleId'
    >
  >;
};

export type UpdateCircleMutationVariables = {
  id: Scalars['String'];
  merge: Scalars['Boolean'];
  type?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['String']>;
  cached?: Maybe<Scalars['Boolean']>;
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
  styles?: Maybe<Scalars['String']>;
  layouts?: Maybe<Scalars['String']>;
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
  line?: Maybe<Scalars['String']>;
  lines?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UpdateCircleMutation = { __typename?: 'Mutation' } & {
  updateCircle: Maybe<
    { __typename?: 'UpdateCirclePayload' } & Pick<
      UpdateCirclePayload,
      'status' | 'message' | 'updatedDocumentId'
    >
  >;
};

export type CircleCloneHeaderFragmentFragment = {
  __typename?: 'CircleClone';
} & Pick<
  CircleClone,
  | 'id'
  | 'collection'
  | 'cached'
  | 'pii'
  | 'autoUpdate'
  | 'copiedFromClone'
  | 'slug'
  | 'public'
  | 'passwordRequired'
  | 'type'
  | 'tags'
  | 'title'
  | 'subtitle'
  | 'description'
  | 'dateCreated'
  | 'dateUpdated'
> & {
    clonedFrom: Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id'>>;
    parent: Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id'>>;
    copiedFrom: Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id'>>;
    media: Maybe<
      { __typename?: 'Circle' } & Pick<
        Circle,
        'id' | 'type' | 'title' | 'string' | 'data'
      >
    >;
    creator: Maybe<
      { __typename?: 'PublicProfile' } & Pick<PublicProfile, 'id' | 'username'>
    >;
    owner: Maybe<
      { __typename?: 'PublicProfile' } & Pick<PublicProfile, 'id' | 'username'>
    >;
    viewers: Maybe<
      Array<
        Maybe<
          { __typename?: 'PublicProfile' } & Pick<
            PublicProfile,
            'id' | 'username'
          >
        >
      >
    >;
    editors: Maybe<
      Array<
        Maybe<
          { __typename?: 'PublicProfile' } & Pick<
            PublicProfile,
            'id' | 'username'
          >
        >
      >
    >;
    styles: Maybe<
      { __typename?: 'Circle' } & Pick<Circle, 'id' | 'title' | 'data'>
    >;
    layouts: Maybe<
      { __typename?: 'Circle' } & Pick<Circle, 'id' | 'title' | 'data'>
    >;
  };

export type CircleHeaderFragmentFragment = { __typename?: 'Circle' } & Pick<
  Circle,
  | 'id'
  | 'collection'
  | 'cached'
  | 'pii'
  | 'autoUpdate'
  | 'copiedFromClone'
  | 'slug'
  | 'public'
  | 'passwordRequired'
  | 'type'
  | 'tags'
  | 'title'
  | 'subtitle'
  | 'description'
  | 'dateCreated'
  | 'dateUpdated'
> & {
    parent: Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id'>>;
    copiedFrom: Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id'>>;
    media: Maybe<
      { __typename?: 'Circle' } & Pick<
        Circle,
        'id' | 'type' | 'title' | 'string' | 'data'
      >
    >;
    creator: Maybe<
      { __typename?: 'PublicProfile' } & Pick<PublicProfile, 'id' | 'username'>
    >;
    owner: Maybe<
      { __typename?: 'PublicProfile' } & Pick<PublicProfile, 'id' | 'username'>
    >;
    viewers: Maybe<
      Array<
        Maybe<
          { __typename?: 'PublicProfile' } & Pick<
            PublicProfile,
            'id' | 'username'
          >
        >
      >
    >;
    editors: Maybe<
      Array<
        Maybe<
          { __typename?: 'PublicProfile' } & Pick<
            PublicProfile,
            'id' | 'username'
          >
        >
      >
    >;
    styles: Maybe<
      { __typename?: 'Circle' } & Pick<Circle, 'id' | 'title' | 'data'>
    >;
    layouts: Maybe<
      { __typename?: 'Circle' } & Pick<Circle, 'id' | 'title' | 'data'>
    >;
  };

export type FullCircleCloneFragmentFragment = {
  __typename?: 'CircleClone';
} & Pick<
  CircleClone,
  | 'key'
  | 'string'
  | 'data'
  | 'number'
  | 'bigNumber'
  | 'boolean'
  | 'date'
  | 'geoPoint'
> & {
    line: Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id' | 'title'>>;
    lines: Maybe<
      Array<Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id' | 'title'>>>
    >;
  } & CircleCloneHeaderFragmentFragment;

export type FullCircleFragmentFragment = { __typename?: 'Circle' } & Pick<
  Circle,
  | 'key'
  | 'string'
  | 'data'
  | 'number'
  | 'bigNumber'
  | 'boolean'
  | 'date'
  | 'geoPoint'
> & {
    line: Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id' | 'title'>>;
    lines: Maybe<
      Array<Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id' | 'title'>>>
    >;
  } & CircleHeaderFragmentFragment;

export type GetCircleByIdQueryVariables = {
  id: Scalars['String'];
};

export type GetCircleByIdQuery = { __typename?: 'Query' } & {
  getCircleById: Maybe<
    { __typename?: 'Circle' } & Pick<Circle, 'id' | 'title'> & {
        media: Maybe<
          { __typename?: 'Circle' } & Pick<
            Circle,
            'id' | 'type' | 'title' | 'string'
          >
        >;
      }
  >;
};

export type GetCircleCloneByIdQueryVariables = {
  id: Scalars['String'];
};

export type GetCircleCloneByIdQuery = { __typename?: 'Query' } & {
  getCircleCloneById: Maybe<
    { __typename?: 'CircleClone' } & Pick<CircleClone, 'id' | 'title'> & {
        media: Maybe<
          { __typename?: 'Circle' } & Pick<
            Circle,
            'id' | 'type' | 'title' | 'string'
          >
        >;
      }
  >;
};

export type GetCirclesByIdsQueryVariables = {
  ids: Array<Maybe<Scalars['String']>>;
};

export type GetCirclesByIdsQuery = { __typename?: 'Query' } & {
  getCirclesByIds: Maybe<
    Array<
      Maybe<
        { __typename?: 'Circle' } & Pick<Circle, 'id' | 'title'> & {
            media: Maybe<
              { __typename?: 'Circle' } & Pick<
                Circle,
                'id' | 'type' | 'title' | 'string'
              >
            >;
          }
      >
    >
  >;
};

export type GetPublicProfileByIdQueryVariables = {
  id: Scalars['String'];
};

export type GetPublicProfileByIdQuery = { __typename?: 'Query' } & {
  getPublicProfileById: Maybe<
    { __typename?: 'PublicProfile' } & Pick<
      PublicProfile,
      'id' | 'username'
    > & {
        media: Maybe<
          { __typename?: 'Circle' } & Pick<
            Circle,
            'id' | 'type' | 'title' | 'string'
          >
        >;
      }
  >;
};

export type SeedFirestoreCirclesMutationVariables = {};

export type SeedFirestoreCirclesMutation = { __typename?: 'Mutation' } & {
  seedFirestoreCircles: Maybe<
    { __typename?: 'SeedFirestoreCirclesPayload' } & Pick<
      SeedFirestoreCirclesPayload,
      'status' | 'message'
    > & {
        created: Maybe<
          Array<
            Maybe<
              { __typename?: 'Circle' } & Pick<Circle, 'id' | 'title'> & {
                  media: Maybe<
                    { __typename?: 'Circle' } & Pick<
                      Circle,
                      'id' | 'type' | 'title' | 'string'
                    >
                  >;
                }
            >
          >
        >;
        edited: Maybe<
          Array<
            Maybe<
              { __typename?: 'Circle' } & Pick<Circle, 'id' | 'title'> & {
                  media: Maybe<
                    { __typename?: 'Circle' } & Pick<
                      Circle,
                      'id' | 'type' | 'title' | 'string'
                    >
                  >;
                }
            >
          >
        >;
      }
  >;
};

export type GetSeededCirclesByIdsQueryVariables = {};

export type GetSeededCirclesByIdsQuery = { __typename?: 'Query' } & {
  getSeededCirclesByIds: Maybe<
    Array<
      Maybe<
        { __typename?: 'Circle' } & Pick<Circle, 'id' | 'title'> & {
            media: Maybe<
              { __typename?: 'Circle' } & Pick<
                Circle,
                'id' | 'type' | 'title' | 'string'
              >
            >;
          }
      >
    >
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

export type UpdateProfileMutationVariables = {
  id: Scalars['String'];
  merge: Scalars['Boolean'];
  username?: Maybe<Scalars['String']>;
  dateCreated?: Maybe<Scalars['BigInt']>;
  dateUpdated?: Maybe<Scalars['BigInt']>;
  addToHistory?: Maybe<Scalars['Boolean']>;
  home?: Maybe<Scalars['String']>;
  history?: Maybe<Scalars['String']>;
  overrideCircleUIs?: Maybe<Scalars['Boolean']>;
  userId?: Maybe<Scalars['String']>;
  media?: Maybe<Scalars['String']>;
  theme?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['String']>;
  following?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['String']>;
  publicHome?: Maybe<Scalars['String']>;
  circleUIs?: Maybe<Scalars['String']>;
};

export type UpdateProfileMutation = { __typename?: 'Mutation' } & {
  updateProfile: Maybe<
    { __typename?: 'UpdateProfilePayload' } & Pick<
      UpdateProfilePayload,
      'status' | 'message'
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
    { __typename?: 'CreatedProfile' } & SelectedProfileFragmentFragment
  >;
};

export type GetUserProfilesQueryVariables = {};

export type GetUserProfilesQuery = { __typename?: 'Query' } & {
  getUserProfiles: Maybe<
    Array<
      Maybe<
        { __typename?: 'CreatedProfile' } & Pick<
          CreatedProfile,
          'id' | 'username'
        > & {
            media: Maybe<
              { __typename?: 'Circle' } & Pick<
                Circle,
                'id' | 'type' | 'title' | 'string'
              >
            >;
          }
      >
    >
  >;
};

export type SelectedProfileFragmentFragment = {
  __typename?: 'CreatedProfile';
} & Pick<
  CreatedProfile,
  | 'id'
  | 'collection'
  | 'username'
  | 'userId'
  | 'dateCreated'
  | 'dateUpdated'
  | 'overrideCircleUIs'
  | 'addToHistory'
> & {
    media: Maybe<
      { __typename?: 'Circle' } & Pick<
        Circle,
        'id' | 'type' | 'title' | 'string'
      >
    >;
    level: Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id' | 'type'>>;
    rating: Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id' | 'type'>>;
    circleUIs: Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id' | 'type'>>;
    theme: Maybe<
      { __typename?: 'Circle' } & Pick<Circle, 'id' | 'type' | 'data'>
    >;
    publicHome: Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id' | 'type'>>;
    home: Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id' | 'type'>>;
    following: Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id' | 'type'>>;
    history: Maybe<{ __typename?: 'Circle' } & Pick<Circle, 'id' | 'type'>>;
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

export const CircleCloneHeaderFragmentFragmentDoc = gql`
  fragment CircleCloneHeaderFragment on CircleClone {
    id
    collection
    cached
    pii
    autoUpdate
    clonedFrom {
      id
    }
    parent {
      id
    }
    copiedFrom {
      id
    }
    copiedFromClone
    slug
    public
    passwordRequired
    type
    tags
    title
    subtitle
    description
    media {
      id
      type
      title
      string
      data
    }
    creator {
      id
      username
    }
    owner {
      id
      username
    }
    viewers {
      id
      username
    }
    editors {
      id
      username
    }
    styles {
      id
      title
      data
    }
    layouts {
      id
      title
      data
    }
    dateCreated
    dateUpdated
  }
`;
export const FullCircleCloneFragmentFragmentDoc = gql`
  fragment FullCircleCloneFragment on CircleClone {
    ...CircleCloneHeaderFragment
    key
    string
    data
    number
    bigNumber
    boolean
    date
    geoPoint
    line {
      id
      title
    }
    lines {
      id
      title
    }
  }
  ${CircleCloneHeaderFragmentFragmentDoc}
`;
export const CircleHeaderFragmentFragmentDoc = gql`
  fragment CircleHeaderFragment on Circle {
    id
    collection
    cached
    pii
    autoUpdate
    parent {
      id
    }
    copiedFrom {
      id
    }
    copiedFromClone
    slug
    public
    passwordRequired
    type
    tags
    title
    subtitle
    description
    media {
      id
      type
      title
      string
      data
    }
    creator {
      id
      username
    }
    owner {
      id
      username
    }
    viewers {
      id
      username
    }
    editors {
      id
      username
    }
    styles {
      id
      title
      data
    }
    layouts {
      id
      title
      data
    }
    dateCreated
    dateUpdated
  }
`;
export const FullCircleFragmentFragmentDoc = gql`
  fragment FullCircleFragment on Circle {
    ...CircleHeaderFragment
    key
    string
    data
    number
    bigNumber
    boolean
    date
    geoPoint
    line {
      id
      title
    }
    lines {
      id
      title
    }
  }
  ${CircleHeaderFragmentFragmentDoc}
`;
export const SelectedProfileFragmentFragmentDoc = gql`
  fragment SelectedProfileFragment on CreatedProfile {
    id
    collection
    username
    userId
    media {
      id
      type
      title
      string
    }
    dateCreated
    dateUpdated
    level {
      id
      type
    }
    rating {
      id
      type
    }
    overrideCircleUIs
    circleUIs {
      id
      type
    }
    overrideCircleUIs
    theme {
      id
      type
      data
    }
    publicHome {
      id
      type
    }
    home {
      id
      type
    }
    following {
      id
      type
    }
    addToHistory
    history {
      id
      type
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
export const GetCircleClonesByIdDocument = gql`
  query getCircleClonesById($id: String!) {
    getCircleClonesById(id: $id) {
      status
      hasMoreResults
      cursor
      clones {
        id
        clonedFrom {
          id
        }
        title
        dateUpdated
        data
        media {
          id
          type
          title
          string
        }
      }
    }
  }
`;

/**
 * __useGetCircleClonesByIdQuery__
 *
 * To run a query within a React component, call `useGetCircleClonesByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCircleClonesByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCircleClonesByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCircleClonesByIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCircleClonesByIdQuery,
    GetCircleClonesByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetCircleClonesByIdQuery,
    GetCircleClonesByIdQueryVariables
  >(GetCircleClonesByIdDocument, baseOptions);
}
export function useGetCircleClonesByIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCircleClonesByIdQuery,
    GetCircleClonesByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetCircleClonesByIdQuery,
    GetCircleClonesByIdQueryVariables
  >(GetCircleClonesByIdDocument, baseOptions);
}
export type GetCircleClonesByIdQueryHookResult = ReturnType<
  typeof useGetCircleClonesByIdQuery
>;
export type GetCircleClonesByIdLazyQueryHookResult = ReturnType<
  typeof useGetCircleClonesByIdLazyQuery
>;
export type GetCircleClonesByIdQueryResult = ApolloReactCommon.QueryResult<
  GetCircleClonesByIdQuery,
  GetCircleClonesByIdQueryVariables
>;
export const GetCircleToEditByIdDocument = gql`
  query getCircleToEditById($id: String!) {
    getCircleById(id: $id) {
      ...FullCircleFragment
    }
  }
  ${FullCircleFragmentFragmentDoc}
`;

/**
 * __useGetCircleToEditByIdQuery__
 *
 * To run a query within a React component, call `useGetCircleToEditByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCircleToEditByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCircleToEditByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCircleToEditByIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCircleToEditByIdQuery,
    GetCircleToEditByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetCircleToEditByIdQuery,
    GetCircleToEditByIdQueryVariables
  >(GetCircleToEditByIdDocument, baseOptions);
}
export function useGetCircleToEditByIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCircleToEditByIdQuery,
    GetCircleToEditByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetCircleToEditByIdQuery,
    GetCircleToEditByIdQueryVariables
  >(GetCircleToEditByIdDocument, baseOptions);
}
export type GetCircleToEditByIdQueryHookResult = ReturnType<
  typeof useGetCircleToEditByIdQuery
>;
export type GetCircleToEditByIdLazyQueryHookResult = ReturnType<
  typeof useGetCircleToEditByIdLazyQuery
>;
export type GetCircleToEditByIdQueryResult = ApolloReactCommon.QueryResult<
  GetCircleToEditByIdQuery,
  GetCircleToEditByIdQueryVariables
>;
export const GetFullCircleCloneByIdDocument = gql`
  query getFullCircleCloneById($id: String!) {
    getCircleCloneById(id: $id) {
      ...FullCircleCloneFragment
    }
  }
  ${FullCircleCloneFragmentFragmentDoc}
`;

/**
 * __useGetFullCircleCloneByIdQuery__
 *
 * To run a query within a React component, call `useGetFullCircleCloneByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFullCircleCloneByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFullCircleCloneByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetFullCircleCloneByIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetFullCircleCloneByIdQuery,
    GetFullCircleCloneByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetFullCircleCloneByIdQuery,
    GetFullCircleCloneByIdQueryVariables
  >(GetFullCircleCloneByIdDocument, baseOptions);
}
export function useGetFullCircleCloneByIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetFullCircleCloneByIdQuery,
    GetFullCircleCloneByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetFullCircleCloneByIdQuery,
    GetFullCircleCloneByIdQueryVariables
  >(GetFullCircleCloneByIdDocument, baseOptions);
}
export type GetFullCircleCloneByIdQueryHookResult = ReturnType<
  typeof useGetFullCircleCloneByIdQuery
>;
export type GetFullCircleCloneByIdLazyQueryHookResult = ReturnType<
  typeof useGetFullCircleCloneByIdLazyQuery
>;
export type GetFullCircleCloneByIdQueryResult = ApolloReactCommon.QueryResult<
  GetFullCircleCloneByIdQuery,
  GetFullCircleCloneByIdQueryVariables
>;
export const GetCircleAndLinesByIdDocument = gql`
  query getCircleAndLinesById($id: String!) {
    getCircleById(id: $id) {
      id
      title
      media {
        id
        type
        title
        string
      }
      lines {
        id
        type
        title
        description
        media {
          id
          type
          title
          string
        }
      }
    }
  }
`;

/**
 * __useGetCircleAndLinesByIdQuery__
 *
 * To run a query within a React component, call `useGetCircleAndLinesByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCircleAndLinesByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCircleAndLinesByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCircleAndLinesByIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCircleAndLinesByIdQuery,
    GetCircleAndLinesByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetCircleAndLinesByIdQuery,
    GetCircleAndLinesByIdQueryVariables
  >(GetCircleAndLinesByIdDocument, baseOptions);
}
export function useGetCircleAndLinesByIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCircleAndLinesByIdQuery,
    GetCircleAndLinesByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetCircleAndLinesByIdQuery,
    GetCircleAndLinesByIdQueryVariables
  >(GetCircleAndLinesByIdDocument, baseOptions);
}
export type GetCircleAndLinesByIdQueryHookResult = ReturnType<
  typeof useGetCircleAndLinesByIdQuery
>;
export type GetCircleAndLinesByIdLazyQueryHookResult = ReturnType<
  typeof useGetCircleAndLinesByIdLazyQuery
>;
export type GetCircleAndLinesByIdQueryResult = ApolloReactCommon.QueryResult<
  GetCircleAndLinesByIdQuery,
  GetCircleAndLinesByIdQueryVariables
>;
export const GetCircleToViewByIdDocument = gql`
  query getCircleToViewById($id: String!) {
    getCircleById(id: $id) {
      ...FullCircleFragment
    }
  }
  ${FullCircleFragmentFragmentDoc}
`;

/**
 * __useGetCircleToViewByIdQuery__
 *
 * To run a query within a React component, call `useGetCircleToViewByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCircleToViewByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCircleToViewByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCircleToViewByIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCircleToViewByIdQuery,
    GetCircleToViewByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetCircleToViewByIdQuery,
    GetCircleToViewByIdQueryVariables
  >(GetCircleToViewByIdDocument, baseOptions);
}
export function useGetCircleToViewByIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCircleToViewByIdQuery,
    GetCircleToViewByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetCircleToViewByIdQuery,
    GetCircleToViewByIdQueryVariables
  >(GetCircleToViewByIdDocument, baseOptions);
}
export type GetCircleToViewByIdQueryHookResult = ReturnType<
  typeof useGetCircleToViewByIdQuery
>;
export type GetCircleToViewByIdLazyQueryHookResult = ReturnType<
  typeof useGetCircleToViewByIdLazyQuery
>;
export type GetCircleToViewByIdQueryResult = ApolloReactCommon.QueryResult<
  GetCircleToViewByIdQuery,
  GetCircleToViewByIdQueryVariables
>;
export const CopyCircleDocument = gql`
  mutation copyCircle($id: String!, $collection: String!) {
    copyCircle(id: $id, collection: $collection) {
      status
      message
      copiedCircleId
    }
  }
`;
export type CopyCircleMutationFn = ApolloReactCommon.MutationFunction<
  CopyCircleMutation,
  CopyCircleMutationVariables
>;

/**
 * __useCopyCircleMutation__
 *
 * To run a mutation, you first call `useCopyCircleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCopyCircleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [copyCircleMutation, { data, loading, error }] = useCopyCircleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      collection: // value for 'collection'
 *   },
 * });
 */
export function useCopyCircleMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CopyCircleMutation,
    CopyCircleMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CopyCircleMutation,
    CopyCircleMutationVariables
  >(CopyCircleDocument, baseOptions);
}
export type CopyCircleMutationHookResult = ReturnType<
  typeof useCopyCircleMutation
>;
export type CopyCircleMutationResult = ApolloReactCommon.MutationResult<
  CopyCircleMutation
>;
export type CopyCircleMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CopyCircleMutation,
  CopyCircleMutationVariables
>;
export const UpdateCircleDocument = gql`
  mutation updateCircle(
    $id: String!
    $merge: Boolean!
    $type: String
    $parent: String
    $cached: Boolean
    $pii: Boolean
    $copiedFrom: String
    $autoUpdate: Boolean
    $slug: String
    $public: Boolean
    $passwordRequired: Boolean
    $tags: [String]
    $title: String
    $subtitle: String
    $description: String
    $media: String
    $creator: String
    $owner: String
    $viewers: [String]
    $editors: [String]
    $styles: String
    $layouts: String
    $dateCreated: BigInt
    $dateUpdated: BigInt
    $key: String
    $string: String
    $data: JSON
    $number: Int
    $bigNumber: BigInt
    $boolean: Boolean
    $date: BigInt
    $geoPoint: String
    $line: String
    $lines: [String]
  ) {
    updateCircle(
      id: $id
      merge: $merge
      type: $type
      parent: $parent
      cached: $cached
      pii: $pii
      copiedFrom: $copiedFrom
      autoUpdate: $autoUpdate
      slug: $slug
      public: $public
      passwordRequired: $passwordRequired
      tags: $tags
      title: $title
      subtitle: $subtitle
      description: $description
      media: $media
      creator: $creator
      owner: $owner
      viewers: $viewers
      editors: $editors
      styles: $styles
      layouts: $layouts
      dateCreated: $dateCreated
      dateUpdated: $dateUpdated
      key: $key
      string: $string
      data: $data
      number: $number
      bigNumber: $bigNumber
      boolean: $boolean
      date: $date
      geoPoint: $geoPoint
      line: $line
      lines: $lines
    ) {
      status
      message
      updatedDocumentId
    }
  }
`;
export type UpdateCircleMutationFn = ApolloReactCommon.MutationFunction<
  UpdateCircleMutation,
  UpdateCircleMutationVariables
>;

/**
 * __useUpdateCircleMutation__
 *
 * To run a mutation, you first call `useUpdateCircleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCircleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCircleMutation, { data, loading, error }] = useUpdateCircleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      merge: // value for 'merge'
 *      type: // value for 'type'
 *      parent: // value for 'parent'
 *      cached: // value for 'cached'
 *      pii: // value for 'pii'
 *      copiedFrom: // value for 'copiedFrom'
 *      autoUpdate: // value for 'autoUpdate'
 *      slug: // value for 'slug'
 *      public: // value for 'public'
 *      passwordRequired: // value for 'passwordRequired'
 *      tags: // value for 'tags'
 *      title: // value for 'title'
 *      subtitle: // value for 'subtitle'
 *      description: // value for 'description'
 *      media: // value for 'media'
 *      creator: // value for 'creator'
 *      owner: // value for 'owner'
 *      viewers: // value for 'viewers'
 *      editors: // value for 'editors'
 *      styles: // value for 'styles'
 *      layouts: // value for 'layouts'
 *      dateCreated: // value for 'dateCreated'
 *      dateUpdated: // value for 'dateUpdated'
 *      key: // value for 'key'
 *      string: // value for 'string'
 *      data: // value for 'data'
 *      number: // value for 'number'
 *      bigNumber: // value for 'bigNumber'
 *      boolean: // value for 'boolean'
 *      date: // value for 'date'
 *      geoPoint: // value for 'geoPoint'
 *      line: // value for 'line'
 *      lines: // value for 'lines'
 *   },
 * });
 */
export function useUpdateCircleMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateCircleMutation,
    UpdateCircleMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateCircleMutation,
    UpdateCircleMutationVariables
  >(UpdateCircleDocument, baseOptions);
}
export type UpdateCircleMutationHookResult = ReturnType<
  typeof useUpdateCircleMutation
>;
export type UpdateCircleMutationResult = ApolloReactCommon.MutationResult<
  UpdateCircleMutation
>;
export type UpdateCircleMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateCircleMutation,
  UpdateCircleMutationVariables
>;
export const GetCircleByIdDocument = gql`
  query getCircleById($id: String!) {
    getCircleById(id: $id) {
      id
      title
      media {
        id
        type
        title
        string
      }
    }
  }
`;

/**
 * __useGetCircleByIdQuery__
 *
 * To run a query within a React component, call `useGetCircleByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCircleByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCircleByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCircleByIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCircleByIdQuery,
    GetCircleByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetCircleByIdQuery,
    GetCircleByIdQueryVariables
  >(GetCircleByIdDocument, baseOptions);
}
export function useGetCircleByIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCircleByIdQuery,
    GetCircleByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetCircleByIdQuery,
    GetCircleByIdQueryVariables
  >(GetCircleByIdDocument, baseOptions);
}
export type GetCircleByIdQueryHookResult = ReturnType<
  typeof useGetCircleByIdQuery
>;
export type GetCircleByIdLazyQueryHookResult = ReturnType<
  typeof useGetCircleByIdLazyQuery
>;
export type GetCircleByIdQueryResult = ApolloReactCommon.QueryResult<
  GetCircleByIdQuery,
  GetCircleByIdQueryVariables
>;
export const GetCircleCloneByIdDocument = gql`
  query getCircleCloneById($id: String!) {
    getCircleCloneById(id: $id) {
      id
      title
      media {
        id
        type
        title
        string
      }
    }
  }
`;

/**
 * __useGetCircleCloneByIdQuery__
 *
 * To run a query within a React component, call `useGetCircleCloneByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCircleCloneByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCircleCloneByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCircleCloneByIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCircleCloneByIdQuery,
    GetCircleCloneByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetCircleCloneByIdQuery,
    GetCircleCloneByIdQueryVariables
  >(GetCircleCloneByIdDocument, baseOptions);
}
export function useGetCircleCloneByIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCircleCloneByIdQuery,
    GetCircleCloneByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetCircleCloneByIdQuery,
    GetCircleCloneByIdQueryVariables
  >(GetCircleCloneByIdDocument, baseOptions);
}
export type GetCircleCloneByIdQueryHookResult = ReturnType<
  typeof useGetCircleCloneByIdQuery
>;
export type GetCircleCloneByIdLazyQueryHookResult = ReturnType<
  typeof useGetCircleCloneByIdLazyQuery
>;
export type GetCircleCloneByIdQueryResult = ApolloReactCommon.QueryResult<
  GetCircleCloneByIdQuery,
  GetCircleCloneByIdQueryVariables
>;
export const GetCirclesByIdsDocument = gql`
  query getCirclesByIds($ids: [String]!) {
    getCirclesByIds(ids: $ids) {
      id
      title
      media {
        id
        type
        title
        string
      }
    }
  }
`;

/**
 * __useGetCirclesByIdsQuery__
 *
 * To run a query within a React component, call `useGetCirclesByIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCirclesByIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCirclesByIdsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useGetCirclesByIdsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCirclesByIdsQuery,
    GetCirclesByIdsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetCirclesByIdsQuery,
    GetCirclesByIdsQueryVariables
  >(GetCirclesByIdsDocument, baseOptions);
}
export function useGetCirclesByIdsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCirclesByIdsQuery,
    GetCirclesByIdsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetCirclesByIdsQuery,
    GetCirclesByIdsQueryVariables
  >(GetCirclesByIdsDocument, baseOptions);
}
export type GetCirclesByIdsQueryHookResult = ReturnType<
  typeof useGetCirclesByIdsQuery
>;
export type GetCirclesByIdsLazyQueryHookResult = ReturnType<
  typeof useGetCirclesByIdsLazyQuery
>;
export type GetCirclesByIdsQueryResult = ApolloReactCommon.QueryResult<
  GetCirclesByIdsQuery,
  GetCirclesByIdsQueryVariables
>;
export const GetPublicProfileByIdDocument = gql`
  query getPublicProfileById($id: String!) {
    getPublicProfileById(id: $id) {
      id
      username
      media {
        id
        type
        title
        string
      }
    }
  }
`;

/**
 * __useGetPublicProfileByIdQuery__
 *
 * To run a query within a React component, call `useGetPublicProfileByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPublicProfileByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPublicProfileByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPublicProfileByIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetPublicProfileByIdQuery,
    GetPublicProfileByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetPublicProfileByIdQuery,
    GetPublicProfileByIdQueryVariables
  >(GetPublicProfileByIdDocument, baseOptions);
}
export function useGetPublicProfileByIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPublicProfileByIdQuery,
    GetPublicProfileByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetPublicProfileByIdQuery,
    GetPublicProfileByIdQueryVariables
  >(GetPublicProfileByIdDocument, baseOptions);
}
export type GetPublicProfileByIdQueryHookResult = ReturnType<
  typeof useGetPublicProfileByIdQuery
>;
export type GetPublicProfileByIdLazyQueryHookResult = ReturnType<
  typeof useGetPublicProfileByIdLazyQuery
>;
export type GetPublicProfileByIdQueryResult = ApolloReactCommon.QueryResult<
  GetPublicProfileByIdQuery,
  GetPublicProfileByIdQueryVariables
>;
export const SeedFirestoreCirclesDocument = gql`
  mutation seedFirestoreCircles {
    seedFirestoreCircles {
      status
      message
      created {
        id
        title
        media {
          id
          type
          title
          string
        }
      }
      edited {
        id
        title
        media {
          id
          type
          title
          string
        }
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
      media {
        id
        type
        title
        string
      }
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
export const UpdateProfileDocument = gql`
  mutation updateProfile(
    $id: String!
    $merge: Boolean!
    $username: String
    $dateCreated: BigInt
    $dateUpdated: BigInt
    $addToHistory: Boolean
    $home: String
    $history: String
    $overrideCircleUIs: Boolean
    $userId: String
    $media: String
    $theme: String
    $rating: String
    $following: String
    $level: String
    $publicHome: String
    $circleUIs: String
  ) {
    updateProfile(
      id: $id
      merge: $merge
      username: $username
      dateCreated: $dateCreated
      dateUpdated: $dateUpdated
      addToHistory: $addToHistory
      home: $home
      history: $history
      overrideCircleUIs: $overrideCircleUIs
      userId: $userId
      media: $media
      theme: $theme
      rating: $rating
      following: $following
      level: $level
      publicHome: $publicHome
      circleUIs: $circleUIs
    ) {
      status
      message
    }
  }
`;
export type UpdateProfileMutationFn = ApolloReactCommon.MutationFunction<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      id: // value for 'id'
 *      merge: // value for 'merge'
 *      username: // value for 'username'
 *      dateCreated: // value for 'dateCreated'
 *      dateUpdated: // value for 'dateUpdated'
 *      addToHistory: // value for 'addToHistory'
 *      home: // value for 'home'
 *      history: // value for 'history'
 *      overrideCircleUIs: // value for 'overrideCircleUIs'
 *      userId: // value for 'userId'
 *      media: // value for 'media'
 *      theme: // value for 'theme'
 *      rating: // value for 'rating'
 *      following: // value for 'following'
 *      level: // value for 'level'
 *      publicHome: // value for 'publicHome'
 *      circleUIs: // value for 'circleUIs'
 *   },
 * });
 */
export function useUpdateProfileMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >(UpdateProfileDocument, baseOptions);
}
export type UpdateProfileMutationHookResult = ReturnType<
  typeof useUpdateProfileMutation
>;
export type UpdateProfileMutationResult = ApolloReactCommon.MutationResult<
  UpdateProfileMutation
>;
export type UpdateProfileMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
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
export const GetUserProfilesDocument = gql`
  query getUserProfiles {
    getUserProfiles {
      id
      username
      media {
        id
        type
        title
        string
      }
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
