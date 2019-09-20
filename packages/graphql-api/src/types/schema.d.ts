// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: 'Query';
    getCircleById: ICircle | null;
    getCircleByProfileUsername: ICircle | null;
    getCirclesByFilters: ICircle | null;
    getCirclesByIds: Array<ICircle | null> | null;
    searchCirclesByTags: ICircle | null;
    getProfileById: IProfile | null;
    getProfileByUsername: IGetProfileByUsernameResponse | null;
    getProfilesByIds: Array<IProfile | null> | null;
    getUserById: IUser | null;
  }

  interface IGetCircleByIdOnQueryArguments {
    id: string;
  }

  interface IGetCircleByProfileUsernameOnQueryArguments {
    username: string;
  }

  interface IGetCirclesByFiltersOnQueryArguments {
    filters?: any | null;
    orderBy: any;
    cursor?: any | null;
    numberOfResults?: number | null;
    selectFields?: Array<string | null> | null;
  }

  interface IGetCirclesByIdsOnQueryArguments {
    ids: Array<string | null>;
  }

  interface ISearchCirclesByTagsOnQueryArguments {
    circle: any;
  }

  interface IGetProfileByIdOnQueryArguments {
    id: string;
  }

  interface IGetProfileByUsernameOnQueryArguments {
    username: string;
  }

  interface IGetProfilesByIdsOnQueryArguments {
    ids: Array<string | null>;
  }

  interface ICircle {
    __typename: 'Circle';
    id: string | null;
    collection: string | null;
    pii: boolean | null;
    parent: ICircle | null;
    copiedFrom: ICircle | null;
    slug: string | null;
    public: boolean | null;
    passwordRequired: boolean | null;
    type: string | null;
    properties: Array<string | null> | null;
    settings: ICircle | null;
    rating: ICircle | null;
    tags: Array<string | null> | null;
    title: string | null;
    subtitle: string | null;
    description: string | null;
    media: ICircle | null;
    icon: string | null;
    creator: IProfile | null;
    owner: IProfile | null;
    viewers: Array<IProfile | null> | null;
    editors: Array<IProfile | null> | null;
    dateCreated: any | null;
    dateUpdated: any | null;
    key: string | null;
    string: string | null;
    data: any | null;
    number: number | null;
    bigNumber: any | null;
    boolean: boolean | null;
    date: any | null;
    geoPoint: any | null;
    line: ICircle | null;
    lines: Array<ICircle | null> | null;
  }

  interface IProfile {
    __typename: 'Profile';
    id: string;
    collection: string | null;
    public: boolean | null;
    username: string | null;
    canCreate: boolean | null;
    profileMedia: ICircle | null;
    dateCreated: any | null;
    dateUpdated: any | null;
    level: ICircle | null;
    rating: ICircle | null;
    isDarkTheme: boolean | null;
    circleTypeOverrides: ICircle | null;
    overrideCircleTypes: boolean | null;
    myTheme: ICircle | null;
    homePublic: ICircle | null;
    home: ICircle | null;
    following: ICircle | null;
    addToHistory: boolean | null;
    history: ICircle | null;
  }

  interface IGetProfileByUsernameResponse {
    __typename: 'getProfileByUsernameResponse';
    usernameAvailable: boolean | null;
    usernameInvalid: boolean | null;
  }

  interface IUser {
    __typename: 'User';
    id: string;
    collection: string | null;
    email: string | null;
    canCreate: boolean | null;
    dateCreated: any | null;
    dateUpdated: any | null;
    levelTotal: ICircle | null;
    balanceTotal: ICircle | null;
    ratingTotal: ICircle | null;
    allMyThemes: ICircle | null;
    allMyTypeStyles: ICircle | null;
    inbox: ICircle | null;
    search: ICircle | null;
    profiles: Array<IProfile | null> | null;
  }

  interface IMutation {
    __typename: 'Mutation';
    cloneCircle: ICloneCircleResponse | null;
    createCircle: ICreateCircleResponse | null;
    deleteCircle: IDeleteCircleResponse | null;
    fileUpload: IFileUploadResponse | null;
    updateCircle: IUpdateCircleResponse | null;
    createProfile: ICreateProfileResponse | null;
    deleteProfile: IDeleteProfileResponse | null;
    updateProfile: IUpdateProfileResponse | null;
    createUser: ICreateUserResponse | null;
    updateUser: IUpdateUserResponse | null;
  }

  interface ICloneCircleOnMutationArguments {
    id?: string | null;
  }

  interface ICreateCircleOnMutationArguments {
    circle?: ICreateCircleInput | null;
  }

  interface IDeleteCircleOnMutationArguments {
    id: string;
  }

  interface IFileUploadOnMutationArguments {
    file: any;
  }

  interface IUpdateCircleOnMutationArguments {
    circle: IUpdateCircleInput;
    merge: boolean;
  }

  interface ICreateProfileOnMutationArguments {
    username: string;
  }

  interface IDeleteProfileOnMutationArguments {
    id: string;
  }

  interface IUpdateProfileOnMutationArguments {
    profile?: IUpdateProfileInput | null;
  }

  interface ICreateUserOnMutationArguments {
    id: string;
    email: string;
  }

  interface IUpdateUserOnMutationArguments {
    user?: IUpdateUserInput | null;
    merge: boolean;
  }

  interface ICloneCircleResponse {
    __typename: 'CloneCircleResponse';
    message: string | null;
    clonedCircle: ICircle | null;
    clonedCircleId: string | null;
  }

  interface ICreateCircleInput {
    pii?: boolean | null;
    parent?: string | null;
    slug?: string | null;
    public?: boolean | null;
    passwordRequired?: boolean | null;
    type: string;
    properties?: Array<string | null> | null;
    settings?: string | null;
    rating?: string | null;
    tags?: Array<string | null> | null;
    title?: string | null;
    subtitle?: string | null;
    description?: string | null;
    media?: string | null;
    icon?: string | null;
    creator: string;
    owner?: string | null;
    viewers?: Array<string | null> | null;
    editors?: Array<string | null> | null;
    string?: string | null;
    data?: any | null;
    number?: number | null;
    bigNumber?: any | null;
    boolean?: boolean | null;
    date?: any | null;
    geoPoint?: any | null;
    lines?: Array<string | null> | null;
  }

  interface ICreateCircleResponse {
    __typename: 'CreateCircleResponse';
    status: string | null;
    message: string | null;
    createdCircle: ICircle | null;
    creator: IProfile | null;
  }

  interface IDeleteCircleResponse {
    __typename: 'DeleteCircleResponse';
    status: string | null;
    message: string | null;
    circleIdToDelete: string | null;
    circleDeleted: boolean | null;
    numberOfPiiCircleClones: number | null;
    piiCircleClonesDeleted: boolean | null;
  }

  interface IFileUploadResponse {
    __typename: 'FileUploadResponse';
    url: string | null;
    sizes: Array<string | null> | null;
  }

  interface IUpdateCircleInput {
    id: string;
    collection?: string | null;
    pii?: boolean | null;
    parent?: string | null;
    copiedFrom?: string | null;
    slug?: string | null;
    public?: boolean | null;
    passwordRequired?: boolean | null;
    type?: string | null;
    properties?: Array<string | null> | null;
    settings?: string | null;
    rating?: string | null;
    tags?: Array<string | null> | null;
    title?: string | null;
    subtitle?: string | null;
    description?: string | null;
    media?: string | null;
    icon?: string | null;
    owner?: string | null;
    viewers?: Array<string | null> | null;
    editors?: Array<string | null> | null;
    key?: string | null;
    string?: string | null;
    data?: any | null;
    number?: number | null;
    bigNumber?: any | null;
    boolean?: boolean | null;
    date?: any | null;
    geoPoint?: any | null;
    line?: string | null;
    lines?: Array<string | null> | null;
  }

  interface IUpdateCircleResponse {
    __typename: 'UpdateCircleResponse';
    status: string | null;
    message: string | null;
    updatedCircle: ICircle | null;
    creator: IProfile | null;
  }

  interface ICreateProfileResponse {
    __typename: 'CreateProfileResponse';
    status: string | null;
    message: string | null;
    createdProfile: IProfile | null;
  }

  interface IDeleteProfileResponse {
    __typename: 'DeleteProfileResponse';
    status: string | null;
    message: string | null;
    profileIdToDelete: string | null;
    profileDeleted: boolean | null;
    numberOfPiiCircles: number | null;
    piiCirclesDeleted: boolean | null;
    numberOfPiiCircleClones: number | null;
    piiCircleClonesDeleted: boolean | null;
    numberOfAppCreatedCirclesForProfile: number | null;
    appCreatedCirclesForProfileDeleted: boolean | null;
    numberOfAppCreatedCircleClonesForProfile: number | null;
    appCreatedCircleClonesForProfileDeleted: boolean | null;
  }

  interface IUpdateProfileInput {
    id: string;
    public?: boolean | null;
    username?: string | null;
    canCreate?: boolean | null;
    profileMedia?: string | null;
    level?: string | null;
    rating?: string | null;
    isDarkTheme?: boolean | null;
    circleTypeOverrides?: string | null;
    overrideStringTypes?: boolean | null;
    myTheme?: string | null;
    homePublic?: string | null;
    home?: string | null;
    following?: string | null;
    addToHistory?: boolean | null;
    history?: string | null;
  }

  interface IUpdateProfileResponse {
    __typename: 'UpdateProfileResponse';
    status: string | null;
    message: string | null;
    updatedProfile: IProfile | null;
  }

  interface ICreateUserResponse {
    __typename: 'CreateUserResponse';
    status: string | null;
    message: string | null;
    createdUser: IUser | null;
  }

  interface IUpdateUserInput {
    id: string;
    email?: string | null;
    canCreate?: boolean | null;
    levelTotal?: string | null;
    balanceTotal?: string | null;
    ratingTotal?: string | null;
    allMyThemes?: string | null;
    allMyTypeStyles?: string | null;
    inbox?: string | null;
    search?: string | null;
    profiles?: Array<string | null> | null;
  }

  interface IUpdateUserResponse {
    __typename: 'UpdateUserResponse';
    status: string | null;
    message: string | null;
    updatedUser: IUser | null;
    creator: IProfile | null;
  }
}

// tslint:enable
