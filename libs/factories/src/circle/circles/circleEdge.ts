import { Circle, Header } from '@myiworlds/types';
import { googleCloud } from '@myiworlds/credentials';
import { HeaderFactory } from './headerFactory';

export class CircleEdge implements Circle {
  id: string;
  collection: 'circles';
  type: 'EDGE';

  constructor() {
    this.type = 'EDGE';
    this.collection = 'circles';
  }

  create({
    selectedProfileId,
    header,
    updateParentFunction,
  }: {
    selectedProfileId: string;
    header: Header;
    updateParentFunction?: (
      thisCircle: Circle,
      circleUpdatingThis: Circle,
    ) => Circle;
  }) {
    header = new HeaderFactory().create({
      selectedProfileId,
      defaultValues: {
        ...header,
        creator: googleCloud.applicationCreatorProfile,
        owner: googleCloud.applicationCreatorProfile,
        viewers: [selectedProfileId],
        editors: [],
      },
    });

    return {
      ...header,
      type: this.type,
      collection: this.collection,
      data: {
        updateParentFunction: updateParentFunction
          ? updateParentFunction.toString()
          : '',
      },
    };
  }

  createCounterEdge({
    selectedProfileId,
    header,
  }: {
    selectedProfileId: string;
    header: Header;
  }) {
    header = new HeaderFactory().create({
      selectedProfileId,
      defaultValues: {
        ...header,
        creator: googleCloud.applicationCreatorProfile,
        owner: googleCloud.applicationCreatorProfile,
        viewers: [selectedProfileId],
      },
    });

    const updateFunction = (thisCircle: Circle, circleUpdatingThis: Circle) => {
      if (
        thisCircle.number !== undefined &&
        circleUpdatingThis.number !== undefined
      ) {
        thisCircle.number = thisCircle.number + circleUpdatingThis.number;
      } else if (circleUpdatingThis !== undefined) {
        thisCircle.number = circleUpdatingThis.number;
      }
      return thisCircle;
    };

    return {
      ...header,
      type: this.type,
      collection: this.collection,
      data: {
        updateFunction: updateFunction.toString(),
      },
    };
  }
}
