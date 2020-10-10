import dynamic from 'next/dynamic';
import React, { forwardRef, useImperativeHandle } from 'react';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false },
) as any;

interface Props {
  string?: string;
  setValue: (string: string) => void;
}

const RichTextEditor = forwardRef(({ string, setValue }: Props, ref) => {
  const [editorState, setEditorState] = React.useState(
    string
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(string)))
      : EditorState.createEmpty(),
  );

  const onEditorStateChange = (editorState: EditorState) => {
    console.log('editorState', editorState);
    setEditorState(editorState);
  };

  const handleSaveEditorData = () => {
    const contentState = editorState.getCurrentContent();
    console.log('handleSaveEditorData');
    return {
      string: JSON.stringify(convertToRaw(contentState)),
    };
  };

  useImperativeHandle(ref, () => ({
    handleBeforeSave() {
      return handleSaveEditorData();
    },
  }));

  return (
    <Editor
      editorState={editorState as EditorState}
      wrapperClassName="demo-wrapper"
      editorClassName="demo-editor"
      onEditorStateChange={onEditorStateChange}
    />
  );
});

export default RichTextEditor;
