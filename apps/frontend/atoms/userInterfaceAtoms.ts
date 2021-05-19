import { atom } from 'recoil';
import { Circle } from '@myiworlds/types';
import { SystemMessageTypes } from '../contexts/UserInterface/SystemMessages/systemMessagesTypes';

export const appControllerItemsAtom = atom({
  key: `appControllerItemsAtom`,
  default: null as React.ReactElement | null,
});

export const contentAtom = atom({
  key: `contentAtom`,
  default: null as Circle | null,
});

export const contentControllerAtom = atom({
  key: `contentControllerAtom`,
  default: null as React.ReactElement | null,
});

export const systemMessagesAtom = atom({
  key: `systemMessagesAtom`,
  default: null as SystemMessageTypes | null,
});

export const draggableDialogContentAtom = atom({
  key: `draggableDialogContentAtom`,
  default: null as React.ReactElement | null,
});

export const appDialogAtom = atom({
  key: `appDialogAtom`,
  default: null as React.ReactElement | null,
});
