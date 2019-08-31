import types from './circles';
import { Circle } from '@myiworlds/types';

export const typesList: Circle[] = [
  {
    id: 'types',
    // icon: '',
    // img: '',
    // gif: '',
    // video: '',
    public: true,
    settings: 'settings',
    type: 'LINES',
    lines: types.map(type => type.id) as string[],
  },
  {
    id: 'baseTypes',
    type: 'LINES',
    public: true,
    settings: 'settings',
    lines: types
      .filter(
        type =>
          type.type &&
          ['STRING', 'NUMBER', 'BOOLEAN', 'DATA'].includes(type.type),
      )
      .map(circle => circle.id) as string[],
  },
];
