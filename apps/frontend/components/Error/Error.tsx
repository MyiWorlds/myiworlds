import Icon from '@material-ui/core/Icon';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { ApolloError } from 'apollo-client';
import { createStyles, withStyles } from '@material-ui/styles';

// TODOs:
// Send error to server

interface Props {
  classes: {
    container: string;
  };
  error: ApolloError | Error;
  iconFontSize?: 'inherit' | 'default' | 'small' | 'large';
  icon?: string;
  message?: JSX.Element | string;
  messageVariant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body2'
    | 'caption'
    | 'button'
    | undefined;
}

const styles = () =>
  createStyles({
    container: {
      margin: '24px auto',
      textAlign: 'center',
      display: 'block',
    },
  });

const Error: React.FunctionComponent<Props> = ({
  classes,
  error,
  icon,
  iconFontSize,
  message,
  messageVariant,
}) => {
  const errorMessage = message || '';
  const variant = messageVariant || 'h3';
  const displayIcon = icon || 'error';

  console.error('ERROR', '\n', error);

  return (
    <div className={classes.container}>
      <Icon color="inherit" fontSize={iconFontSize || 'large'}>
        {displayIcon}
      </Icon>
      <Typography variant="h2">I'm sorry, I had an error</Typography>
      <Typography variant={variant}>{errorMessage}</Typography>
      <br />
      <br />
      <Typography>I have let someone know about this</Typography>
    </div>
  );
};

export default withStyles(styles)(Error);
