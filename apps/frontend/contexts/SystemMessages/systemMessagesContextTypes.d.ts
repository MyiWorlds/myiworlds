import { AlertProps, Color } from '@material-ui/lab/Alert';

export interface ProviderStore {
  setAppSnackbar: (values: SnackbarObject) => void;
}

export interface SnackbarObject {
  title: string;
  autoHideDuration?: number;
  showClose?: boolean;
  severity?: Color;
  variant?: AlertProps.variant;
}
