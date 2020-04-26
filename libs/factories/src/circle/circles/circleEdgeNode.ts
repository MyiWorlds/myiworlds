import { Circle, Header } from '@myiworlds/types';
import { googleCloud } from '@myiworlds/credentials';
import { HeaderFactory } from './headerFactory';
import { isEditor } from '@myiworlds/helper-functions';

export class CircleEdgeNode implements Circle {
  id: string;
  collection: 'circles';
  type: 'EDGE_NODE';
  parent?: string;

  constructor() {
    this.type = 'EDGE_NODE';
    this.collection = 'circles';
  }

  updateParentDateUpdatedFunction(parent: Circle) {
    const circle = {
      id: parent.id,
      collection: parent.collection,
      type: parent.type,
      dateUpdated: Date.now(),
    };
    return circle;
  }

  create({
    selectedProfileId,
    header,
    parentCircle,
  }: {
    selectedProfileId: string;
    header: Header;
    parentCircle: Circle;
  }) {
    if (isEditor(parentCircle.editors, selectedProfileId)) {
      header = new HeaderFactory().create({
        selectedProfileId,
        defaultValues: {
          ...header,
          creator: googleCloud.applicationCreatorProfile,
          owner: googleCloud.applicationCreatorProfile,
          viewers: [selectedProfileId],
        },
      });

      return {
        ...header,
        type: this.type,
        collection: this.collection,
        parent: parentCircle.id,
      };
    } else {
      return null;
    }
  }
}
