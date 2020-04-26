import { Circle, Header } from '@myiworlds/types';
import { HeaderFactory } from './headerFactory';

export class CircleMediaFontIcon implements Circle {
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
        type: 'MEDIA_FONT_ICON',
      },
    });

    return {
      ...header,
      collection: this.collection,
      string,
    };
  }
}
