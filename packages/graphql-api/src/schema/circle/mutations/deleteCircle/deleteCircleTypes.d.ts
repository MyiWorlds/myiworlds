export interface IDeleteCircleResponse {
  status: string;
  message: string;
  circleIdToDelete: string;
  circleDeleted: boolean;
  numberOfPiiCircleClones: number;
  piiCircleClonesDeleted: boolean;
}
