import CodeIcon from '@material-ui/icons/Code';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import dynamic from 'next/dynamic';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { appDialogAtom } from '../../../atoms/userInterfaceAtoms';
import { makeStyles } from '@material-ui/core/styles';
import { useSetRecoilState } from 'recoil';

const JavascriptCodeMirrorEditor = dynamic(
  () => import('./JavascriptCodeMirrorEditor'),
  {
    ssr: false,
  },
);

interface Props {
  property: string;
  value: string;
  setValue: (newValue: string) => void;
}

const useStyles = makeStyles({
  modal: {
    zIndex: 99999,
  },
});

const FunctionEditor: React.FunctionComponent<Props> = ({
  property,
  value,
  setValue,
}) => {
  const classes = useStyles();
  const setAppDialog = useSetRecoilState(appDialogAtom);

  const showEditor = () => {
    setAppDialog(
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{
          root: classes.modal,
        }}
      >
        <DialogTitle id="alert-dialog-title">
          Edit {property} Function
        </DialogTitle>
        <JavascriptCodeMirrorEditor value={value} setValue={setValue} />
      </Dialog>,
    );
  };

  return (
    <ListItem>
      <ListItemIcon>
        <CodeIcon />
      </ListItemIcon>
      <ListItemText id="switch-list-label-dark-theme" primary={property} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="edit" onClick={() => showEditor()}>
          <EditIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default FunctionEditor;
