import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface Props {
  children: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flexGrow: 1,
      zIndex: theme.zIndex.drawer - 1,
    },
  }),
);

const ContentArea: React.FC<Props> = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

export default ContentArea;
