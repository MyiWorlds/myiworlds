import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";
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

export type Circle = {
  __typename?: "Circle";
  id?: Maybe<Scalars["ID"]>;
  collection?: Maybe<Scalars["String"]>;
  pii?: Maybe<Scalars["Boolean"]>;
  parent?: Maybe<Circle>;
  copiedFrom?: Maybe<Circle>;
  slug?: Maybe<Scalars["String"]>;
  public?: Maybe<Scalars["Boolean"]>;
  passwordRequired?: Maybe<Scalars["Boolean"]>;
  type?: Maybe<Scalars["String"]>;
  properties?: Maybe<Array<Maybe<Scalars["String"]>>>;
  settings?: Maybe<Circle>;
  rating?: Maybe<Circle>;
  tags?: Maybe<Array<Maybe<Scalars["String"]>>>;
  title?: Maybe<Scalars["String"]>;
  subtitle?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  media?: Maybe<Circle>;
  icon?: Maybe<Scalars["String"]>;
  creator?: Maybe<Profile>;
  owner?: Maybe<Profile>;
  viewers?: Maybe<Array<Maybe<Profile>>>;
  editors?: Maybe<Array<Maybe<Profile>>>;
  dateCreated?: Maybe<Scalars["BigInt"]>;
  dateUpdated?: Maybe<Scalars["BigInt"]>;
  key?: Maybe<Scalars["String"]>;
  string?: Maybe<Scalars["String"]>;
  data?: Maybe<Scalars["JSON"]>;
  number?: Maybe<Scalars["Int"]>;
  bigNumber?: Maybe<Scalars["BigInt"]>;
  boolean?: Maybe<Scalars["Boolean"]>;
  date?: Maybe<Scalars["BigInt"]>;
  geoPoint?: Maybe<Scalars["JSON"]>;
  line?: Maybe<Circle>;
  lines?: Maybe<Array<Maybe<Circle>>>;
};

export type CloneCircleResponse = {
  __typename?: "CloneCircleResponse";
  message?: Maybe<Scalars["String"]>;
  clonedCircle?: Maybe<Circle>;
  clonedCircleId?: Maybe<Scalars["String"]>;
};

export type CreateCircleInput = {
  pii?: Maybe<Scalars["Boolean"]>;
  parent?: Maybe<Scalars["String"]>;
  slug?: Maybe<Scalars["String"]>;
  public?: Maybe<Scalars["Boolean"]>;
  passwordRequired?: Maybe<Scalars["Boolean"]>;
  type: Scalars["String"];
  properties?: Maybe<Array<Maybe<Scalars["String"]>>>;
  settings?: Maybe<Scalars["String"]>;
  rating?: Maybe<Scalars["String"]>;
  tags?: Maybe<Array<Maybe<Scalars["String"]>>>;
  title?: Maybe<Scalars["String"]>;
  subtitle?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  media?: Maybe<Scalars["String"]>;
  icon?: Maybe<Scalars["String"]>;
  creator: Scalars["String"];
  owner?: Maybe<Scalars["String"]>;
  viewers?: Maybe<Array<Maybe<Scalars["String"]>>>;
  editors?: Maybe<Array<Maybe<Scalars["String"]>>>;
  string?: Maybe<Scalars["String"]>;
  data?: Maybe<Scalars["JSON"]>;
  number?: Maybe<Scalars["Int"]>;
  bigNumber?: Maybe<Scalars["BigInt"]>;
  boolean?: Maybe<Scalars["Boolean"]>;
  date?: Maybe<Scalars["BigInt"]>;
  geoPoint?: Maybe<Scalars["JSON"]>;
  lines?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type CreateCircleResponse = {
  __typename?: "CreateCircleResponse";
  status?: Maybe<Scalars["String"]>;
  message?: Maybe<Scalars["String"]>;
  createdCircle?: Maybe<Circle>;
  creator?: Maybe<Profile>;
};

export type CreateProfileResponse = {
  __typename?: "CreateProfileResponse";
  status?: Maybe<Scalars["String"]>;
  message?: Maybe<Scalars["String"]>;
  createdProfile?: Maybe<Profile>;
};

export type CreateUserResponse = {
  __typename?: "CreateUserResponse";
  status?: Maybe<Scalars["String"]>;
  message?: Maybe<Scalars["String"]>;
  createdUser?: Maybe<User>;
};

export type DeleteCircleResponse = {
  __typename?: "DeleteCircleResponse";
  status?: Maybe<Scalars["String"]>;
  message?: Maybe<Scalars["String"]>;
  circleIdToDelete?: Maybe<Scalars["String"]>;
  circleDeleted?: Maybe<Scalars["Boolean"]>;
  numberOfPiiCircleClones?: Maybe<Scalars["Int"]>;
  piiCircleClonesDeleted?: Maybe<Scalars["Boolean"]>;
};

export type DeleteProfileResponse = {
  __typename?: "DeleteProfileResponse";
  status?: Maybe<Scalars["String"]>;
  message?: Maybe<Scalars["String"]>;
  profileIdToDelete?: Maybe<Scalars["String"]>;
  profileDeleted?: Maybe<Scalars["Boolean"]>;
  numberOfPiiCircles?: Maybe<Scalars["Int"]>;
  piiCirclesDeleted?: Maybe<Scalars["Boolean"]>;
  numberOfPiiCircleClones?: Maybe<Scalars["Int"]>;
  piiCircleClonesDeleted?: Maybe<Scalars["Boolean"]>;
  numberOfAppCreatedCirclesForProfile?: Maybe<Scalars["Int"]>;
  appCreatedCirclesForProfileDeleted?: Maybe<Scalars["Boolean"]>;
  numberOfAppCreatedCircleClonesForProfile?: Maybe<Scalars["Int"]>;
  appCreatedCircleClonesForProfileDeleted?: Maybe<Scalars["Boolean"]>;
};

export type FileUploadResponse = {
  __typename?: "FileUploadResponse";
  url?: Maybe<Scalars["String"]>;
  sizes?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type GetProfileByUsernameResponse = {
  __typename?: "getProfileByUsernameResponse";
  usernameAvailable?: Maybe<Scalars["Boolean"]>;
  usernameInvalid?: Maybe<Scalars["Boolean"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  cloneCircle?: Maybe<CloneCircleResponse>;
  createCircle?: Maybe<CreateCircleResponse>;
  deleteCircle?: Maybe<DeleteCircleResponse>;
  fileUpload?: Maybe<FileUploadResponse>;
  updateCircle?: Maybe<UpdateCircleResponse>;
  createProfile?: Maybe<CreateProfileResponse>;
  deleteProfile?: Maybe<DeleteProfileResponse>;
  updateProfile?: Maybe<UpdateProfileResponse>;
  createUser?: Maybe<CreateUserResponse>;
  updateUser?: Maybe<UpdateUserResponse>;
};

export type MutationCloneCircleArgs = {
  id?: Maybe<Scalars["String"]>;
};

export type MutationCreateCircleArgs = {
  circle?: Maybe<CreateCircleInput>;
};

export type MutationDeleteCircleArgs = {
  id: Scalars["String"];
};

export type MutationFileUploadArgs = {
  file: Scalars["Upload"];
};

export type MutationUpdateCircleArgs = {
  circle: UpdateCircleInput;
  merge: Scalars["Boolean"];
};

export type MutationCreateProfileArgs = {
  username: Scalars["String"];
};

export type MutationDeleteProfileArgs = {
  id: Scalars["String"];
};

export type MutationUpdateProfileArgs = {
  profile?: Maybe<UpdateProfileInput>;
};

export type MutationCreateUserArgs = {
  id: Scalars["ID"];
  email: Scalars["String"];
};

export type MutationUpdateUserArgs = {
  user?: Maybe<UpdateUserInput>;
  merge: Scalars["Boolean"];
};

export type Profile = {
  __typename?: "Profile";
  id: Scalars["ID"];
  collection?: Maybe<Scalars["String"]>;
  public?: Maybe<Scalars["Boolean"]>;
  username?: Maybe<Scalars["String"]>;
  canCreate?: Maybe<Scalars["Boolean"]>;
  profileMedia?: Maybe<Circle>;
  dateCreated?: Maybe<Scalars["BigInt"]>;
  dateUpdated?: Maybe<Scalars["BigInt"]>;
  level?: Maybe<Circle>;
  rating?: Maybe<Circle>;
  isDarkTheme?: Maybe<Scalars["Boolean"]>;
  circleTypeOverrides?: Maybe<Circle>;
  overrideCircleTypes?: Maybe<Scalars["Boolean"]>;
  myTheme?: Maybe<Circle>;
  homePublic?: Maybe<Circle>;
  home?: Maybe<Circle>;
  following?: Maybe<Circle>;
  addToHistory?: Maybe<Scalars["Boolean"]>;
  history?: Maybe<Circle>;
};

export type Query = {
  __typename?: "Query";
  getCircleById?: Maybe<Circle>;
  getCircleByProfileUsername?: Maybe<Circle>;
  getCirclesByFilters?: Maybe<Circle>;
  getCirclesByIds?: Maybe<Array<Maybe<Circle>>>;
  searchCirclesByTags?: Maybe<Circle>;
  getProfileById?: Maybe<Profile>;
  getProfileByUsername?: Maybe<GetProfileByUsernameResponse>;
  getProfilesByIds?: Maybe<Array<Maybe<Profile>>>;
  getUserById?: Maybe<User>;
};

export type QueryGetCircleByIdArgs = {
  id: Scalars["String"];
};

export type QueryGetCircleByProfileUsernameArgs = {
  username: Scalars["String"];
};

export type QueryGetCirclesByFiltersArgs = {
  filters?: Maybe<Scalars["JSON"]>;
  orderBy: Scalars["JSON"];
  cursor?: Maybe<Scalars["JSON"]>;
  numberOfResults?: Maybe<Scalars["Int"]>;
  selectFields?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type QueryGetCirclesByIdsArgs = {
  ids: Array<Maybe<Scalars["String"]>>;
};

export type QuerySearchCirclesByTagsArgs = {
  circle: Scalars["JSON"];
};

export type QueryGetProfileByIdArgs = {
  id: Scalars["String"];
};

export type QueryGetProfileByUsernameArgs = {
  username: Scalars["String"];
};

export type QueryGetProfilesByIdsArgs = {
  ids: Array<Maybe<Scalars["String"]>>;
};

export type UpdateCircleInput = {
  id: Scalars["ID"];
  collection?: Maybe<Scalars["String"]>;
  pii?: Maybe<Scalars["Boolean"]>;
  parent?: Maybe<Scalars["String"]>;
  copiedFrom?: Maybe<Scalars["String"]>;
  slug?: Maybe<Scalars["String"]>;
  public?: Maybe<Scalars["Boolean"]>;
  passwordRequired?: Maybe<Scalars["Boolean"]>;
  type?: Maybe<Scalars["String"]>;
  properties?: Maybe<Array<Maybe<Scalars["String"]>>>;
  settings?: Maybe<Scalars["String"]>;
  rating?: Maybe<Scalars["String"]>;
  tags?: Maybe<Array<Maybe<Scalars["String"]>>>;
  title?: Maybe<Scalars["String"]>;
  subtitle?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  media?: Maybe<Scalars["String"]>;
  icon?: Maybe<Scalars["String"]>;
  owner?: Maybe<Scalars["String"]>;
  viewers?: Maybe<Array<Maybe<Scalars["String"]>>>;
  editors?: Maybe<Array<Maybe<Scalars["String"]>>>;
  key?: Maybe<Scalars["String"]>;
  string?: Maybe<Scalars["String"]>;
  data?: Maybe<Scalars["JSON"]>;
  number?: Maybe<Scalars["Int"]>;
  bigNumber?: Maybe<Scalars["BigInt"]>;
  boolean?: Maybe<Scalars["Boolean"]>;
  date?: Maybe<Scalars["BigInt"]>;
  geoPoint?: Maybe<Scalars["JSON"]>;
  line?: Maybe<Scalars["String"]>;
  lines?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type UpdateCircleResponse = {
  __typename?: "UpdateCircleResponse";
  status?: Maybe<Scalars["String"]>;
  message?: Maybe<Scalars["String"]>;
  updatedCircle?: Maybe<Circle>;
  creator?: Maybe<Profile>;
};

export type UpdateProfileInput = {
  id: Scalars["ID"];
  public?: Maybe<Scalars["Boolean"]>;
  username?: Maybe<Scalars["String"]>;
  canCreate?: Maybe<Scalars["Boolean"]>;
  profileMedia?: Maybe<Scalars["String"]>;
  level?: Maybe<Scalars["String"]>;
  rating?: Maybe<Scalars["String"]>;
  isDarkTheme?: Maybe<Scalars["Boolean"]>;
  circleTypeOverrides?: Maybe<Scalars["String"]>;
  overrideStringTypes?: Maybe<Scalars["Boolean"]>;
  myTheme?: Maybe<Scalars["String"]>;
  homePublic?: Maybe<Scalars["String"]>;
  home?: Maybe<Scalars["String"]>;
  following?: Maybe<Scalars["String"]>;
  addToHistory?: Maybe<Scalars["Boolean"]>;
  history?: Maybe<Scalars["String"]>;
};

export type UpdateProfileResponse = {
  __typename?: "UpdateProfileResponse";
  status?: Maybe<Scalars["String"]>;
  message?: Maybe<Scalars["String"]>;
  updatedProfile?: Maybe<Profile>;
};

export type UpdateUserInput = {
  id: Scalars["String"];
  email?: Maybe<Scalars["String"]>;
  canCreate?: Maybe<Scalars["Boolean"]>;
  levelTotal?: Maybe<Scalars["String"]>;
  balanceTotal?: Maybe<Scalars["String"]>;
  ratingTotal?: Maybe<Scalars["String"]>;
  allMyThemes?: Maybe<Scalars["String"]>;
  allMyTypeStyles?: Maybe<Scalars["String"]>;
  inbox?: Maybe<Scalars["String"]>;
  search?: Maybe<Scalars["String"]>;
  profiles?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type UpdateUserResponse = {
  __typename?: "UpdateUserResponse";
  status?: Maybe<Scalars["String"]>;
  message?: Maybe<Scalars["String"]>;
  updatedUser?: Maybe<User>;
  creator?: Maybe<Profile>;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  collection?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  canCreate?: Maybe<Scalars["Boolean"]>;
  dateCreated?: Maybe<Scalars["BigInt"]>;
  dateUpdated?: Maybe<Scalars["BigInt"]>;
  levelTotal?: Maybe<Circle>;
  balanceTotal?: Maybe<Circle>;
  ratingTotal?: Maybe<Circle>;
  allMyThemes?: Maybe<Circle>;
  allMyTypeStyles?: Maybe<Circle>;
  inbox?: Maybe<Circle>;
  search?: Maybe<Circle>;
  profiles?: Maybe<Array<Maybe<Profile>>>;
};
export type GetCircleByIdQueryVariables = {
  id: Scalars["String"];
};

export type GetCircleByIdQuery = { __typename?: "Query" } & {
  getCircleById: Maybe<
    { __typename?: "Circle" } & Pick<Circle, "id" | "title" | "data">
  >;
};

export type GetProfileByIdQueryVariables = {
  id: Scalars["String"];
};

export type GetProfileByIdQuery = { __typename?: "Query" } & {
  getProfileById: Maybe<
    { __typename?: "Profile" } & Pick<
      Profile,
      "id" | "username" | "isDarkTheme" | "overrideCircleTypes" | "addToHistory"
    > & {
        history: Maybe<{ __typename?: "Circle" } & Pick<Circle, "id">>;
        myTheme: Maybe<
          { __typename?: "Circle" } & Pick<Circle, "id" | "type" | "data">
        >;
        home: Maybe<{ __typename?: "Circle" } & Pick<Circle, "id">>;
        homePublic: Maybe<{ __typename?: "Circle" } & Pick<Circle, "id">>;
      }
  >;
};

export type CreateUserMutationVariables = {
  id: Scalars["ID"];
  email: Scalars["String"];
};

export type CreateUserMutation = { __typename?: "Mutation" } & {
  createUser: Maybe<
    { __typename?: "CreateUserResponse" } & Pick<
      CreateUserResponse,
      "status" | "message"
    > & { createdUser: Maybe<{ __typename?: "User" } & LoggedInUserFragment> }
  >;
};

export type GetUserByIdQueryVariables = {};

export type GetUserByIdQuery = { __typename?: "Query" } & {
  getUserById: Maybe<{ __typename?: "User" } & LoggedInUserFragment>;
};

export type LoggedInUserFragment = { __typename?: "User" } & Pick<
  User,
  "email" | "id" | "canCreate" | "dateCreated" | "dateUpdated"
> & {
    profiles: Maybe<
      Array<
        Maybe<{ __typename?: "Profile" } & Pick<Profile, "id" | "username">>
      >
    >;
  };
export const LoggedInUserFragmentDoc = gql`
  fragment LoggedInUser on User {
    email
    id
    email
    canCreate
    dateCreated
    dateUpdated
    profiles {
      id
      username
    }
  }
`;
export const GetCircleByIdDocument = gql`
  query GetCircleById($id: String!) {
    getCircleById(id: $id) {
      id
      title
      data
    }
  }
`;

export function useGetCircleByIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCircleByIdQuery,
    GetCircleByIdQueryVariables
  >
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
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetCircleByIdQuery,
    GetCircleByIdQueryVariables
  >(GetCircleByIdDocument, baseOptions);
}

export type GetCircleByIdQueryHookResult = ReturnType<
  typeof useGetCircleByIdQuery
>;
export type GetCircleByIdQueryResult = ApolloReactCommon.QueryResult<
  GetCircleByIdQuery,
  GetCircleByIdQueryVariables
>;
export const GetProfileByIdDocument = gql`
  query getProfileById($id: String!) {
    getProfileById(id: $id) {
      id
      username
      isDarkTheme
      overrideCircleTypes
      addToHistory
      history {
        id
      }
      myTheme {
        id
        type
        data
      }
      home {
        id
      }
      homePublic {
        id
      }
    }
  }
`;

export function useGetProfileByIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetProfileByIdQuery,
    GetProfileByIdQueryVariables
  >
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
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetProfileByIdQuery,
    GetProfileByIdQueryVariables
  >(GetProfileByIdDocument, baseOptions);
}

export type GetProfileByIdQueryHookResult = ReturnType<
  typeof useGetProfileByIdQuery
>;
export type GetProfileByIdQueryResult = ApolloReactCommon.QueryResult<
  GetProfileByIdQuery,
  GetProfileByIdQueryVariables
>;
export const CreateUserDocument = gql`
  mutation createUser($id: ID!, $email: String!) {
    createUser(id: $id, email: $email) {
      status
      message
      createdUser {
        ...LoggedInUser
      }
    }
  }
  ${LoggedInUserFragmentDoc}
`;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

export function useCreateUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >
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
export const GetUserByIdDocument = gql`
  query getUserById {
    getUserById {
      ...LoggedInUser
    }
  }
  ${LoggedInUserFragmentDoc}
`;

export function useGetUserByIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetUserByIdQuery,
    GetUserByIdQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(
    GetUserByIdDocument,
    baseOptions
  );
}
export function useGetUserByIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetUserByIdQuery,
    GetUserByIdQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetUserByIdQuery,
    GetUserByIdQueryVariables
  >(GetUserByIdDocument, baseOptions);
}

export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdQueryResult = ApolloReactCommon.QueryResult<
  GetUserByIdQuery,
  GetUserByIdQueryVariables
>;
