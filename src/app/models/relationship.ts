import { AccountBasicData } from './accountBasicData';

export class Relationship {
  idRelationship: number;
  userOneId: number;
  userTwoId: number;
  status: number;
  doneBy?: AccountBasicData;
}
