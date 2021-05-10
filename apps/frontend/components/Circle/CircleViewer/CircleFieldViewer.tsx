import BooleanViewer from '../../Boolean/Viewer/BooleanViewer';
import CircleCloneListItemViewer from './../CircleEditor/components/CircleCloneListItemViewer';
import CircleFieldViewerContainer from './CircleFieldViewerContainer';
import CircleListItemViewer from '../CircleEditor/components/CircleListItemViewer';
import CircleListViewer from './../CircleEditor/components/CircleListViewer';
import List from '@material-ui/core/List';
import NumberViewer from '../../Number/Viewer/NumberViewer';
import ProfileListItemViewer from '../../Profile/Viewer/ProfileListItemViewer';
import React from 'react';
import StringViewer from '../../String/Viewer/StringViewer';
import Typography from '@material-ui/core/Typography';
import { Circle } from '@myiworlds/types';
import { format } from 'date-fns';
import {
  circleFields,
  circleListFields,
  profileFields,
  profileListFields,
  stringFields,
  numberFields,
  booleanFields,
  dateDisplayFields,
} from '../../../constants/circleFieldsStrings';

interface Props {
  property: string;
  value: any;
  setFieldEditing?: (newFieldEditing: string | null) => void;
  fieldEditing?: string | null;
  circle: Circle;
  editingGrid?: boolean;
}

export default function CircleFieldViewer({
  fieldEditing,
  setFieldEditing,
  property,
  circle,
  value,
  editingGrid,
}: Props) {
  let cellContent = null;
  if (circleFields.includes(property) && value !== null) {
    cellContent = (
      <>
        <Typography variant="caption">{property}:</Typography>
        {circle.copiedFromClone ? (
          <CircleCloneListItemViewer id={value as string} />
        ) : (
          <CircleListItemViewer id={value as string} />
        )}
      </>
    );
  } else if (
    circleListFields.includes(property) &&
    value !== null &&
    value.length
  ) {
    cellContent = (
      <>
        <Typography variant="caption">{property}:</Typography>
        <CircleListViewer ids={value as string[]} />
      </>
    );
  } else if (profileFields.includes(property) && value !== null) {
    cellContent = (
      <>
        <Typography variant="caption">{property}:</Typography>
        <List>
          <ProfileListItemViewer id={value as string} />
        </List>
      </>
    );
  } else if (profileListFields.includes(property) && value && value.length) {
    const profiles = (value as string[]).map((id: string) => (
      <ProfileListItemViewer key={id} id={id} />
    ));

    cellContent = (
      <>
        <Typography variant="caption">{property}:</Typography>
        <List>{profiles}</List>
      </>
    );
  } else if (stringFields.includes(property)) {
    cellContent = <StringViewer label={property} string={value as string} />;
  } else if (numberFields.includes(property)) {
    cellContent = <NumberViewer label={property} number={value as number} />;
  } else if (booleanFields.includes(property)) {
    cellContent = <BooleanViewer label={property} boolean={value as boolean} />;
  } else if (Array.isArray(value)) {
    cellContent = <>'ArrayEditor'</>;
  } else if (dateDisplayFields.includes(property)) {
    console.log('LLLLLLLLLLLLLLLLLLL', property, value);
    if (value) {
      cellContent = (
        <>
          <Typography variant="caption">{property}:</Typography>
          <Typography>
            {format(value as number, 'MMMM dd, yyyy h:mm a')}
          </Typography>
        </>
      );
    }
  }

  return (
    <CircleFieldViewerContainer
      key={property}
      fieldEditing={fieldEditing}
      property={property}
      setFieldEditing={setFieldEditing}
      editingGrid={editingGrid}
    >
      {cellContent}
    </CircleFieldViewerContainer>
  );
}
