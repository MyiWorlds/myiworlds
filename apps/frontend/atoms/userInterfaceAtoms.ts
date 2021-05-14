import { atom } from 'recoil';

export const appBar = atom({
  key: `appBar`,
  default: null as React.ReactElement | null,
});

export const content = atom({
  key: `content`,
  default: null as React.ReactElement | null,
});

export const contentEditor = atom({
  key: `contentController`,
  default: null as React.ReactElement | null,
});

export const systemMessage = atom({
  key: `systemMssage`,
  default: null as React.ReactElement | null,
});
