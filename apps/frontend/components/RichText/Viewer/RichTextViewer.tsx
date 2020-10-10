import dynamic from 'next/dynamic';
import React from 'react';
import { convertFromRaw, EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false },
) as any;

interface Props {
  string?: string;
}

export default function RichTextEditor({ string }: Props) {
  return (
    <>
      <Editor
        editorState={
          string
            ? EditorState.createWithContent(convertFromRaw(JSON.parse(string)))
            : EditorState.createEmpty()
        }
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        readOnly={true}
        toolbarHidden={true}
      />
    </>
  );
}
