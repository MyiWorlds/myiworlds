import { Circle } from '@myiworlds/types';
import { isCreator, isEditor, isOwner } from '@myiworlds/helper-functions';

export const canEdit = (circle: Circle, selectedProfileId: string) => {
  return (
    isOwner(circle.owner, selectedProfileId) ||
    isCreator(circle.creator, selectedProfileId) ||
    isEditor(circle.editors, selectedProfileId)
  );
};
