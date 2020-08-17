import React from 'react';
import StyleEditor from './StyleEditor';

interface Props {
  styles: any;
  handleUpdate: (path: string[], newValues: any) => void;
}

export default function StylesEditor({ styles, handleUpdate }: Props) {
  return (
    <div>
      {Object.keys(styles).map((uiField: string) => {
        if (!Object.keys(styles[uiField]).length) {
          return null;
        }
        return (
          <StyleEditor
            key={uiField}
            property={uiField}
            value={styles[uiField]}
            handleUpdate={handleUpdate}
          />
        );
      })}
    </div>
  );
}
