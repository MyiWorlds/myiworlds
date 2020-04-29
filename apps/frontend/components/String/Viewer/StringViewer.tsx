import * as React from 'react';
import Typography from '@material-ui/core/Typography';

interface Props {
  label?: string;
  string: string;
}

const StringViewer: React.FunctionComponent<Props> = ({ label, string }) => {
  console.log(label, string);
  if (label) {
    return (
      <span>
        <Typography variant="caption">{label}</Typography>
        <Typography variant="h4">
          {string !== '' ? string : 'String value'}
        </Typography>
      </span>
    );
  } else {
    return (
      <Typography variant="h4">
        {string !== '' ? string : 'String value'}
      </Typography>
    );
  }
};

export default StringViewer;
