export interface ProviderStore {
  setAppSnackbar: (values: SnackbarObject) => void;
}

export interface SnackbarObject {
  title: string;
  autoHideDuration?: number;
  showClose?: boolean;
}
