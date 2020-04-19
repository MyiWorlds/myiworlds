import * as React from 'react';
import Button from '@material-ui/core/Button';
import MaterialUiTheme from '../MaterialUiTheme';

interface Props {
  circleId: string;
}

const ThemeEditor: React.FunctionComponent<Props> = ({ circleId }) => {
  return (
    <MaterialUiTheme>
      <Button variant="contained" color="primary">
        Primary
      </Button>
    </MaterialUiTheme>
  );
};

export default ThemeEditor;
