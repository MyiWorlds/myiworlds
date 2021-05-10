import React from 'react';
import SaveCircle from './SaveCircle';
import {
  Button,
  createStyles,
  makeStyles,
  Theme
  } from '@material-ui/core';

interface Props {
  id: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
  }),
);

export default function SaveCircleButton({ id }: Props) {
  const classes = useStyles();

  const [saving, setSaving] = React.useState(false);

  const handleSuccessSave = () => {
    setSaving(false);
  };

  const handleSave = () => {
    setSaving(true);
  };

  return (
    <div className={classes.wrapper}>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSave}
        disabled={saving}
      >
        Save
      </Button>
      {saving && id ? (
        <SaveCircle handleSuccess={handleSuccessSave} id={id} />
      ) : null}
    </div>
  );
}
