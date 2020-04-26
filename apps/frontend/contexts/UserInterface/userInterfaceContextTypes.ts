import { Circle } from '@myiworlds/types';
export interface ProviderStore {
  creatingCircle: boolean;
  isResizingNav: boolean;
  setIsResizingNav: (isResizingNav: boolean) => void;
  setCreatingCircle: (value: boolean) => void;
  navWidth: number;
  setNavWidth: (value: number) => void;
  contentViewing: null | Circle;
  setContentViewing: (val: null | Circle) => void;
  setNavItems: (navItems: React.ReactElement | null) => void;
  setAppBarItems: (appBarItems: React.ReactElement | null) => void;
  setDraggableDialogContent: (
    draggableDialogContent: React.ReactElement | null,
  ) => void;
}
