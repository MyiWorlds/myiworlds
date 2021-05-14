import { AlertProps, Color } from '@material-ui/lab/Alert';

export interface SystemMessageTypes {
  title: string;
  autoHideDuration?: number;
  showClose?: boolean;
  severity?: Color;
  variant?: AlertProps.variant;
}
