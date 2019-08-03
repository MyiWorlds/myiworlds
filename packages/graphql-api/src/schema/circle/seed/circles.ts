import { Circle } from '@myiworlds/types';

// Make it so everything gets added at time of creation
// Do not store all that information in browsers while they are stockpiling data to send to the servers
const circles: Circle[] = [
  {
    id: 'lines',
    public: true,
    settings: 'settings',
    title: 'Lines',
    icon: 'view_list',
    type: 'LINES',
    lines: [],
  },
  {
    id: 'line',
    public: true,
    settings: 'settings',
    title: 'Line',
    icon: 'call_missed_outgoing',
    type: 'LINE',
    line: null,
  },
  {
    id: 'object',
    public: true,
    settings: 'settings',
    title: 'Object',
    icon: 'usb',
    type: 'OBJ',
    data: {},
  },
  {
    id: 'boolean',
    public: true,
    settings: 'settings',
    title: 'Boolean',
    icon: 'toggle_on',
    type: 'BOOLEAN',
    boolean: false,
  },
  {
    id: 'number',
    public: true,
    settings: 'settings',
    title: 'Number',
    icon: 'looks_one',
    type: 'NUMBER',
    number: 0,
  },
  {
    id: 'string',
    public: true,
    settings: 'settings',
    title: 'String',
    icon: 'chat',
    type: 'STRING',
    string: '',
  },
  {
    id: 'geopoint',
    public: true,
    settings: 'settings',
    title: 'Geo Point',
    icon: 'gps_fixed',
    type: 'GEOPOINT',
    geoPoint: {},
  },
  {
    id: 'img-gs',
    public: true,
    settings: 'settings',
    title: 'Google Storage Image',
    icon: 'image',
    type: 'IMAGE-GOOGLE_STORAGE',
    string: '',
  },
  {
    id: 'img-src',
    public: true,
    settings: 'settings',
    title: 'Linked Image',
    icon: 'image',
    type: 'IMAGE-SRC',
    data: {
      src: '',
      srcSet: '',
    },
  },
  {
    id: 'settings',
    public: true,
    settings: 'settings',
    title: 'Settings',
    description: 'A settings circle that contains a list of settings items.',
    icon: 'settings',
    type: 'LINES',
    lines: ['layout'],
  },
  {
    id: 'layout',
    public: true,
    settings: 'settings',
    title: 'Layout',
    subtitle: 'A responsive layout',
    type: 'LAYOUT',
    description:
      'This is a base responsive layout that works at xsmall, small, medium, large, xlarge',
    data: {
      sm: [
        {
          moved: false,
          h: 7,
          y: 106,
          x: 0,
          i: 'public',
          w: 4,
          static: false,
        },
        {
          h: 12,
          y: 32,
          x: 4,
          i: 'title',
          w: 20,
          static: false,
          moved: false,
        },
        {
          h: 12,
          y: 32,
          x: 0,
          i: 'icon',
          w: 4,
          static: false,
          moved: false,
        },
        {
          moved: false,
          h: 7,
          y: 106,
          x: 4,
          i: 'type',
          w: 4,
          static: false,
        },
        {
          x: 0,
          i: 'string',
          w: 24,
          static: false,
          moved: false,
          h: 7,
          y: 126,
        },
        {
          h: 14,
          y: 92,
          x: 0,
          i: 'parent',
          w: 8,
          static: false,
          moved: false,
        },
        {
          w: 8,
          static: false,
          moved: false,
          h: 14,
          y: 92,
          x: 8,
          i: 'clonedFrom',
        },
        {
          h: 14,
          y: 92,
          x: 16,
          i: 'rating',
          w: 8,
          static: false,
          moved: false,
        },
        {
          moved: false,
          h: 9,
          y: 50,
          x: 0,
          i: 'tags',
          w: 24,
          static: false,
        },
        {
          w: 24,
          static: false,
          moved: false,
          h: 6,
          y: 70,
          x: 0,
          i: 'slug',
        },
        {
          moved: false,
          h: 6,
          y: 44,
          x: 0,
          i: 'subtitle',
          w: 24,
          static: false,
        },
        {
          moved: false,
          h: 32,
          y: 0,
          x: 0,
          i: 'media',
          w: 24,
          static: false,
        },
        {
          x: 0,
          i: 'description',
          w: 24,
          static: false,
          moved: false,
          h: 11,
          y: 59,
        },
        {
          moved: false,
          h: 9,
          y: 76,
          x: 12,
          i: 'creator',
          w: 12,
          static: false,
        },
        {
          static: false,
          moved: false,
          h: 9,
          y: 76,
          x: 0,
          i: 'owner',
          w: 12,
        },
        {
          x: 12,
          i: 'viewers',
          w: 12,
          static: false,
          moved: false,
          h: 7,
          y: 85,
        },
        {
          y: 85,
          x: 0,
          i: 'editors',
          w: 12,
          static: false,
          moved: false,
          h: 7,
        },
        {
          w: 8,
          static: false,
          moved: false,
          h: 6,
          y: 106,
          x: 8,
          i: 'dateCreated',
        },
        {
          moved: false,
          h: 6,
          y: 106,
          x: 16,
          i: 'dateUpdated',
          w: 8,
          static: false,
        },
        {
          moved: false,
          h: 6,
          y: 113,
          x: 0,
          i: 'key',
          w: 24,
          static: false,
        },
        {
          h: 22,
          y: 181,
          x: 0,
          i: 'data',
          w: 24,
          static: false,
          moved: false,
        },
        {
          h: 6,
          y: 148,
          x: 0,
          i: 'number',
          w: 24,
          static: false,
          moved: false,
        },
        {
          x: 0,
          i: 'bigNumber',
          w: 24,
          static: false,
          moved: false,
          h: 8,
          y: 154,
        },
        {
          moved: false,
          h: 7,
          y: 162,
          x: 0,
          i: 'boolean',
          w: 24,
          static: false,
        },
        {
          w: 24,
          static: false,
          moved: false,
          h: 7,
          y: 119,
          x: 0,
          i: 'date',
        },
        {
          static: false,
          moved: false,
          h: 15,
          y: 133,
          x: 0,
          i: 'geoPoint',
          w: 24,
        },
        {
          w: 24,
          static: false,
          moved: false,
          h: 12,
          y: 169,
          x: 0,
          i: 'line',
        },
        {
          x: 0,
          i: 'lines',
          w: 24,
          static: false,
          moved: false,
          h: 21,
          y: 203,
        },
      ],
      lg: [
        {
          h: 5,
          y: 41,
          x: 36,
          i: 'public',
          w: 6,
          static: false,
          moved: false,
        },
        {
          x: 12,
          i: 'title',
          w: 24,
          static: false,
          moved: false,
          h: 12,
          y: 41,
        },
        {
          y: 41,
          x: 6,
          i: 'icon',
          w: 6,
          static: false,
          moved: false,
          h: 12,
        },
        {
          x: 42,
          i: 'type',
          w: 6,
          static: false,
          moved: false,
          h: 5,
          y: 41,
        },
        {
          h: 16,
          y: 159,
          x: 12,
          i: 'string',
          w: 24,
          static: false,
          moved: false,
        },
        {
          x: 36,
          i: 'parent',
          w: 12,
          static: false,
          moved: false,
          h: 8,
          y: 105,
        },
        {
          moved: false,
          h: 9,
          y: 62,
          x: 36,
          i: 'clonedFrom',
          w: 12,
          static: false,
        },
        {
          x: 36,
          i: 'rating',
          w: 12,
          static: false,
          moved: false,
          h: 12,
          y: 113,
        },
        {
          w: 24,
          static: false,
          moved: false,
          h: 12,
          y: 78,
          x: 12,
          i: 'tags',
        },
        {
          static: false,
          moved: false,
          h: 6,
          y: 59,
          x: 12,
          i: 'slug',
          w: 24,
        },
        {
          moved: false,
          h: 6,
          y: 53,
          x: 12,
          i: 'subtitle',
          w: 24,
          static: false,
        },
        {
          moved: false,
          h: 41,
          y: 0,
          x: 0,
          i: 'media',
          w: 48,
          static: false,
        },
        {
          moved: false,
          h: 13,
          y: 65,
          x: 12,
          i: 'description',
          w: 24,
          static: false,
        },
        {
          h: 8,
          y: 46,
          x: 36,
          i: 'creator',
          w: 12,
          static: false,
          moved: false,
        },
        {
          w: 12,
          static: false,
          moved: false,
          h: 8,
          y: 54,
          x: 36,
          i: 'owner',
        },
        {
          static: false,
          moved: false,
          h: 17,
          y: 88,
          x: 36,
          i: 'viewers',
          w: 12,
        },
        {
          h: 17,
          y: 71,
          x: 36,
          i: 'editors',
          w: 12,
          static: false,
          moved: false,
        },
        {
          moved: false,
          h: 6,
          y: 90,
          x: 12,
          i: 'dateCreated',
          w: 12,
          static: false,
        },
        {
          x: 24,
          i: 'dateUpdated',
          w: 12,
          static: false,
          moved: false,
          h: 6,
          y: 90,
        },
        {
          w: 24,
          static: false,
          moved: false,
          h: 6,
          y: 96,
          x: 12,
          i: 'key',
        },
        {
          y: 175,
          x: 12,
          i: 'data',
          w: 24,
          static: false,
          moved: false,
          h: 28,
        },
        {
          static: false,
          moved: false,
          h: 6,
          y: 102,
          x: 12,
          i: 'number',
          w: 24,
        },
        {
          h: 6,
          y: 108,
          x: 12,
          i: 'bigNumber',
          w: 24,
          static: false,
          moved: false,
        },
        {
          w: 24,
          static: false,
          moved: false,
          h: 5,
          y: 114,
          x: 12,
          i: 'boolean',
        },
        {
          x: 12,
          i: 'date',
          w: 24,
          static: false,
          moved: false,
          h: 6,
          y: 119,
        },
        {
          w: 24,
          static: false,
          moved: false,
          h: 15,
          y: 144,
          x: 12,
          i: 'geoPoint',
        },
        {
          moved: false,
          h: 19,
          y: 125,
          x: 12,
          i: 'line',
          w: 24,
          static: false,
        },
        {
          w: 24,
          static: false,
          moved: false,
          h: 41,
          y: 203,
          x: 12,
          i: 'lines',
        },
      ],
      xs: [
        {
          static: false,
          moved: false,
          h: 5,
          y: 75,
          x: 6,
          i: 'public',
          w: 3,
        },
        {
          static: false,
          moved: false,
          h: 10,
          y: 27,
          x: 3,
          i: 'title',
          w: 9,
        },
        {
          static: false,
          moved: false,
          h: 10,
          y: 27,
          x: 0,
          i: 'icon',
          w: 3,
        },
        {
          moved: false,
          h: 6,
          y: 42,
          x: 0,
          i: 'type',
          w: 12,
          static: false,
        },
        {
          moved: false,
          h: 12,
          y: 130,
          x: 0,
          i: 'string',
          w: 12,
          static: false,
        },
        {
          w: 6,
          static: false,
          moved: false,
          h: 9,
          y: 66,
          x: 6,
          i: 'parent',
        },
        {
          moved: false,
          h: 9,
          y: 66,
          x: 0,
          i: 'clonedFrom',
          w: 6,
          static: false,
        },
        {
          h: 9,
          y: 75,
          x: 0,
          i: 'rating',
          w: 6,
          static: false,
          moved: false,
        },
        {
          moved: false,
          h: 15,
          y: 94,
          x: 0,
          i: 'tags',
          w: 12,
          static: false,
        },
        {
          w: 12,
          static: false,
          moved: false,
          h: 10,
          y: 84,
          x: 0,
          i: 'slug',
        },
        {
          moved: false,
          h: 5,
          y: 37,
          x: 0,
          i: 'subtitle',
          w: 12,
          static: false,
        },
        {
          x: 0,
          i: 'media',
          w: 12,
          static: false,
          moved: false,
          h: 27,
          y: 0,
        },
        {
          h: 11,
          y: 48,
          x: 0,
          i: 'description',
          w: 12,
          static: false,
          moved: false,
        },
        {
          static: false,
          moved: false,
          h: 6,
          y: 121,
          x: 0,
          i: 'creator',
          w: 6,
        },
        {
          moved: false,
          h: 9,
          y: 121,
          x: 6,
          i: 'owner',
          w: 6,
          static: false,
        },
        {
          y: 115,
          x: 6,
          i: 'viewers',
          w: 6,
          static: false,
          moved: false,
          h: 6,
        },
        {
          h: 6,
          y: 115,
          x: 0,
          i: 'editors',
          w: 6,
          static: false,
          moved: false,
        },
        {
          h: 6,
          y: 109,
          x: 6,
          i: 'dateCreated',
          w: 6,
          static: false,
          moved: false,
        },
        {
          moved: false,
          h: 6,
          y: 109,
          x: 0,
          i: 'dateUpdated',
          w: 6,
          static: false,
        },
        {
          h: 7,
          y: 59,
          x: 0,
          i: 'key',
          w: 12,
          static: false,
          moved: false,
        },
        {
          h: 19,
          y: 142,
          x: 0,
          i: 'data',
          w: 12,
          static: false,
          moved: false,
        },
        {
          static: false,
          moved: false,
          h: 7,
          y: 161,
          x: 0,
          i: 'number',
          w: 12,
        },
        {
          x: 0,
          i: 'bigNumber',
          w: 12,
          static: false,
          moved: false,
          h: 7,
          y: 168,
        },
        {
          x: 0,
          i: 'boolean',
          w: 12,
          static: false,
          moved: false,
          h: 5,
          y: 175,
        },
        {
          h: 6,
          y: 180,
          x: 0,
          i: 'date',
          w: 12,
          static: false,
          moved: false,
        },
        {
          moved: false,
          h: 11,
          y: 186,
          x: 0,
          i: 'geoPoint',
          w: 12,
          static: false,
        },
        {
          x: 0,
          i: 'line',
          w: 12,
          static: false,
          moved: false,
          h: 17,
          y: 197,
        },
        {
          moved: false,
          h: 24,
          y: 214,
          x: 0,
          i: 'lines',
          w: 12,
          static: false,
        },
      ],
      xl: [
        {
          moved: false,
          h: 5,
          y: 64,
          x: 7,
          i: 'public',
          w: 9,
          static: false,
        },
        {
          y: 47,
          x: 16,
          i: 'title',
          w: 27,
          static: false,
          moved: false,
          h: 14,
        },
        {
          x: 7,
          i: 'icon',
          w: 9,
          static: false,
          moved: false,
          h: 17,
          y: 47,
        },
        {
          y: 53,
          x: 54,
          i: 'type',
          w: 10,
          static: false,
          moved: false,
          h: 13,
        },
        {
          static: false,
          moved: false,
          h: 18,
          y: 164,
          x: 16,
          i: 'string',
          w: 27,
        },
        {
          w: 11,
          static: false,
          moved: false,
          h: 12,
          y: 66,
          x: 43,
          i: 'parent',
        },
        {
          h: 12,
          y: 66,
          x: 54,
          i: 'clonedFrom',
          w: 10,
          static: false,
          moved: false,
        },
        {
          moved: false,
          h: 13,
          y: 53,
          x: 43,
          i: 'rating',
          w: 11,
          static: false,
        },
        {
          moved: false,
          h: 11,
          y: 95,
          x: 16,
          i: 'tags',
          w: 27,
          static: false,
        },
        {
          moved: false,
          h: 6,
          y: 89,
          x: 16,
          i: 'slug',
          w: 27,
          static: false,
        },
        {
          x: 16,
          i: 'subtitle',
          w: 27,
          static: false,
          moved: false,
          h: 7,
          y: 61,
        },
        {
          h: 47,
          y: 0,
          x: 0,
          i: 'media',
          w: 64,
          static: false,
          moved: false,
        },
        {
          h: 21,
          y: 68,
          x: 16,
          i: 'description',
          w: 27,
          static: false,
          moved: false,
        },
        {
          moved: false,
          h: 8,
          y: 78,
          x: 43,
          i: 'creator',
          w: 11,
          static: false,
        },
        {
          moved: false,
          h: 8,
          y: 78,
          x: 54,
          i: 'owner',
          w: 10,
          static: false,
        },
        {
          y: 86,
          x: 54,
          i: 'viewers',
          w: 10,
          static: false,
          moved: false,
          h: 19,
        },
        {
          w: 11,
          static: false,
          moved: false,
          h: 19,
          y: 86,
          x: 43,
          i: 'editors',
        },
        {
          y: 47,
          x: 43,
          i: 'dateCreated',
          w: 11,
          static: false,
          moved: false,
          h: 6,
        },
        {
          static: false,
          moved: false,
          h: 6,
          y: 47,
          x: 54,
          i: 'dateUpdated',
          w: 10,
        },
        {
          y: 106,
          x: 16,
          i: 'key',
          w: 27,
          static: false,
          moved: false,
          h: 6,
        },
        {
          h: 36,
          y: 182,
          x: 16,
          i: 'data',
          w: 27,
          static: false,
          moved: false,
        },
        {
          static: false,
          moved: false,
          h: 7,
          y: 152,
          x: 16,
          i: 'number',
          w: 27,
        },
        {
          static: false,
          moved: false,
          h: 7,
          y: 145,
          x: 16,
          i: 'bigNumber',
          w: 27,
        },
        {
          moved: false,
          h: 5,
          y: 159,
          x: 16,
          i: 'boolean',
          w: 27,
          static: false,
        },
        {
          h: 10,
          y: 112,
          x: 16,
          i: 'date',
          w: 27,
          static: false,
          moved: false,
        },
        {
          moved: false,
          h: 23,
          y: 122,
          x: 16,
          i: 'geoPoint',
          w: 27,
          static: false,
        },
        {
          moved: false,
          h: 19,
          y: 218,
          x: 16,
          i: 'line',
          w: 27,
          static: false,
        },
        {
          w: 27,
          static: false,
          moved: false,
          h: 38,
          y: 237,
          x: 16,
          i: 'lines',
        },
      ],
      md: [
        {
          h: 5,
          y: 49,
          x: 0,
          i: 'public',
          w: 6,
          static: false,
          moved: false,
        },
        {
          h: 11,
          y: 35,
          x: 6,
          i: 'title',
          w: 20,
          static: false,
          moved: false,
        },
        {
          moved: false,
          h: 14,
          y: 35,
          x: 0,
          i: 'icon',
          w: 6,
          static: false,
        },
        {
          h: 8,
          y: 52,
          x: 26,
          i: 'type',
          w: 6,
          static: false,
          moved: false,
        },
        {
          w: 20,
          static: false,
          moved: false,
          h: 7,
          y: 63,
          x: 6,
          i: 'string',
        },
        {
          moved: false,
          h: 8,
          y: 69,
          x: 26,
          i: 'parent',
          w: 6,
          static: false,
        },
        {
          h: 9,
          y: 60,
          x: 26,
          i: 'clonedFrom',
          w: 6,
          static: false,
          moved: false,
        },
        {
          y: 45,
          x: 26,
          i: 'rating',
          w: 6,
          static: false,
          moved: false,
          h: 7,
        },
        {
          h: 10,
          y: 53,
          x: 6,
          i: 'tags',
          w: 20,
          static: false,
          moved: false,
        },
        {
          y: 118,
          x: 6,
          i: 'slug',
          w: 20,
          static: false,
          moved: false,
          h: 6,
        },
        {
          h: 7,
          y: 46,
          x: 6,
          i: 'subtitle',
          w: 20,
          static: false,
          moved: false,
        },
        {
          x: 0,
          i: 'media',
          w: 32,
          static: false,
          moved: false,
          h: 35,
          y: 0,
        },
        {
          x: 6,
          i: 'description',
          w: 20,
          static: false,
          moved: false,
          h: 11,
          y: 107,
        },
        {
          moved: false,
          h: 8,
          y: 85,
          x: 26,
          i: 'creator',
          w: 6,
          static: false,
        },
        {
          w: 6,
          static: false,
          moved: false,
          h: 8,
          y: 77,
          x: 26,
          i: 'owner',
        },
        {
          h: 15,
          y: 93,
          x: 26,
          i: 'viewers',
          w: 6,
          static: false,
          moved: false,
        },
        {
          x: 26,
          i: 'editors',
          w: 6,
          static: false,
          moved: false,
          h: 17,
          y: 108,
        },
        {
          moved: false,
          h: 5,
          y: 40,
          x: 26,
          i: 'dateCreated',
          w: 6,
          static: false,
        },
        {
          h: 5,
          y: 35,
          x: 26,
          i: 'dateUpdated',
          w: 6,
          static: false,
          moved: false,
        },
        {
          moved: false,
          h: 7,
          y: 124,
          x: 6,
          i: 'key',
          w: 20,
          static: false,
        },
        {
          moved: false,
          h: 19,
          y: 147,
          x: 6,
          i: 'data',
          w: 20,
          static: false,
        },
        {
          x: 6,
          i: 'number',
          w: 20,
          static: false,
          moved: false,
          h: 6,
          y: 87,
        },
        {
          h: 6,
          y: 81,
          x: 6,
          i: 'bigNumber',
          w: 20,
          static: false,
          moved: false,
        },
        {
          y: 70,
          x: 6,
          i: 'boolean',
          w: 20,
          static: false,
          moved: false,
          h: 5,
        },
        {
          moved: false,
          h: 6,
          y: 75,
          x: 6,
          i: 'date',
          w: 20,
          static: false,
        },
        {
          w: 20,
          static: false,
          moved: false,
          h: 14,
          y: 93,
          x: 6,
          i: 'geoPoint',
        },
        {
          h: 16,
          y: 131,
          x: 6,
          i: 'line',
          w: 20,
          static: false,
          moved: false,
        },
        {
          y: 166,
          x: 6,
          i: 'lines',
          w: 20,
          static: false,
          moved: false,
          h: 39,
        },
      ],
    },
  },
];

export default circles;

// TO ADD:
// {
//   id: 'audio',
// public: true,
//   title: 'Audio',
//   icon: 'audiotrack',
//   type: 'AUDIO',
//   properties: ['string', 'icon', 'title'],
//   string: '',
// },
// {
//   id: 'gs-video',
// public: true,
//   title: 'Google Storage Video',
//   icon: 'video_library',
//   type: 'IMAGE-GOOGLE-STORAGE',
//   properties: ['string', 'icon', 'title'],
//   string: '',
// },
// {
//   id: 'video',
// public: true,
//   title: 'Video',
//   icon: 'ondemand_video',
//   type: 'VIDEO-URL',
//   properties: ['string', 'icon', 'title'],
//   string: '',
// },
// {
//   id: 'image',
// public: true,
//   title: 'Image',
//   icon: 'image',
//   type: 'IMAGE-URL',
//   settings: {},
//   properties: ['string', 'icon', 'title'],
//   string: '',
// },
