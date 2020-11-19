import React from 'react';
import StringEditor from './StringEditor';
import StringViewer from './StringViewer';
import { Circle } from '@myiworlds/types';
import { TextFieldProps } from '@material-ui/core';

interface Props {
  isEditing: boolean;
  property: keyof Circle;
  circleId: string;
  textFieldProps: TextFieldProps;
  stringProperties: React.HTMLAttributes<HTMLSpanElement>;
}

export default function String({
  circleId,
  isEditing,
  property,
  textFieldProps,
  stringProperties,
}: Props) {
  return isEditing ? (
    <StringEditor
      property={property}
      circleId={circleId}
      textFieldProps={textFieldProps}
    />
  ) : (
    <StringViewer
      property={property}
      circleId={circleId}
      stringProperties={stringProperties}
    />
  );
}
