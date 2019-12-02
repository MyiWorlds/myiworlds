import Divider from '@material-ui/core/Divider';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { format } from 'date-fns';

interface Props {
  title?: string;
  subtitle?: string;
  description?: string;
  actions?: React.ReactElement[];
  media?: React.ReactElement;
  dateCreated?: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    avatar: {
      height: 124,
      width: 124,
    },
    title: {
      marginBottom: theme.spacing(2),
    },
    subtitle: {
      marginBottom: theme.spacing(2),
    },
    description: {
      marginBottom: theme.spacing(2),
    },
    main: {
      padding: theme.spacing(2),
      display: 'flex',
    },
    textArea: {
      margin: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
    },
    action: {
      marginRight: theme.spacing(2),
    },
  }),
);

const Header: React.FunctionComponent<Props> = ({
  title,
  media,
  subtitle,
  description,
  actions,
  dateCreated,
}) => {
  const classes = useStyles();

  const mediaWithCustomStyles = media
    ? React.cloneElement(media, {
        className: classes.avatar,
      })
    : null;

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        {media && mediaWithCustomStyles}
        <div className={classes.textArea}>
          {title && (
            <Typography variant="h3" className={classes.title}>
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography className={classes.subtitle}>{subtitle}</Typography>
          )}
          {description && (
            <Typography className={classes.description}>
              {description}
            </Typography>
          )}
          {dateCreated && (
            <span>
              <Typography variant="caption">Date Created:</Typography>
              <Typography>
                {format(dateCreated, 'MMMM dd, yyyy h:mm a')}
              </Typography>
            </span>
          )}
        </div>
      </div>

      {actions && (
        <>
          <Divider />
          <Toolbar>
            {actions.map(action =>
              React.cloneElement(action, {
                className: classes.action,
              }),
            )}
          </Toolbar>
        </>
      )}
    </div>
  );
};

export default Header;
