export interface IDeleteProfileResponse {
  status: string;
  message: string;
  profileIdToDelete: string;
  profileDeleted: boolean;
  numberOfPiiCircles: number;
  piiCirclesDeleted: boolean;
  numberOfPiiCircleClones: number;
  piiCircleClonesDeleted: boolean;
  numberOfAppCreatedCirclesForProfile: number;
  appCreatedCirclesForProfileDeleted: boolean;
  numberOfAppCreatedCircleClonesForProfile: number;
  appCreatedCircleClonesForProfileDeleted: boolean;
}
