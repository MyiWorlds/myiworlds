import { Circle, Header } from '@myiworlds/types';
import { HeaderFactory } from './headerFactory';

export class CircleMediaImageHref implements Circle {
  id: string;
  collection: 'circles';

  constructor() {
    this.collection = 'circles';
  }

  create({
    selectedProfileId,
    header,
    string,
  }: {
    selectedProfileId: string;
    header: Header;
    string: string;
  }) {
    header = new HeaderFactory().create({
      selectedProfileId,
      defaultValues: {
        ...header,
        type: 'MEDIA_IMAGE_HREF',
      },
    });

    return {
      ...header,
      collection: this.collection,
      string,
    };
  }
}
