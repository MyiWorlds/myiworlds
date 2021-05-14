export interface ProviderStore {
  creatingCircle: boolean;
  isResizingContentController: boolean;
  setIsResizingContentController: (
    isResizingContentController: boolean,
  ) => void;
  setCreatingCircle: (value: boolean) => void;
  contentControllerWidth: number;
  setContentControllerWidth: (value: number) => void;
}
