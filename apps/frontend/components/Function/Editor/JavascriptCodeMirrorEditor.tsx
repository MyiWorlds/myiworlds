import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import React, { useContext, useState } from 'react';
import { appDialogAtom } from '../../../atoms/userInterfaceAtoms';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { JSHINT } from 'jshint';
import { makeStyles } from '@material-ui/core/styles';
import { UserInterfaceContext } from './../../../contexts/UserInterface/UserInterfaceContext';
import { useSetRecoilState } from 'recoil';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/javascript-lint';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/theme/monokai.css';

(window as any).JSHINT = JSHINT;

interface Props {
  value: string;
  setValue: (newValue: string) => void;
}

const useStyles = makeStyles({
  codeEditor: {},
});

const JavascriptCodeMirrorEditor: React.FunctionComponent<Props> = ({
  value,
  setValue,
}) => {
  const classes = useStyles();
  const [hasErrors, setHasErrors] = useState(false);
  const [editorValue, setEditorValue] = useState(value);
  const setAppDialog = useSetRecoilState(appDialogAtom);

  const handleClose = () => {
    setAppDialog(null);
  };

  const handleSave = () => {
    setValue(editorValue);
  };

  const handleEditorChange = () => {
    JSHINT(editorValue);
    // Annoying warning that should not be there
    const errors = JSHINT.errors.filter(
      (e: any) => !e.reason.includes('Confusing'),
    );
    if (errors.length && !hasErrors) {
      setHasErrors(true);
    } else if (!errors.length && hasErrors) {
      setHasErrors(false);
    }
  };

  return (
    <div>
      <DialogContent>
        <CodeMirror
          value={editorValue}
          options={{
            theme: 'monokai',
            mode: 'javascript',
            lint: true,
            lineNumbers: true,
            gutters: ['CodeMirror-lint-markers'],
          }}
          onBeforeChange={(editor, data, newValue) => {
            setEditorValue(newValue);
          }}
          onChange={() => handleEditorChange()}
          className={classes.codeEditor}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          autoFocus
          disabled={hasErrors}
        >
          Save
        </Button>
      </DialogActions>
    </div>
  );
};

export default JavascriptCodeMirrorEditor;
