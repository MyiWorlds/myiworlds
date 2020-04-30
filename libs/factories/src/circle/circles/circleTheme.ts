import { Circle, Header } from '@myiworlds/types';
import { HeaderFactory } from './headerFactory';

export class CircleTheme implements Circle {
  id: string;
  collection: 'circles';
  type: 'THEME';
  data: {
    [key: string]: any;
  };

  constructor() {
    this.collection = 'circles';
    this.type = 'THEME';
  }

  create({
    selectedProfileId,
    header,
  }: {
    selectedProfileId: string;
    header: Header;
  }) {
    header = new HeaderFactory().create({
      selectedProfileId,
      defaultValues: header,
    });

    return {
      ...header,
      type: this.type,
      collection: this.collection,
      data: {
        theme: {
          palette: {
            primary: {
              main: '#2196f3',
            },
            secondary: {
              main: '#f44336',
            },
            type: 'dark',
          },
        },
      },
    };
  }
}
