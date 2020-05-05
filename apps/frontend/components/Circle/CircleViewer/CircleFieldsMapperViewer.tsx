import BooleanViewer from '../../Boolean/Viewer/BooleanViewer';
import CircleCloneListItemViewer from './../CircleEditor/components/CircleCloneListItemViewer';
import CircleListItemViewer from '../CircleEditor/components/CircleListItemViewer';
import CircleListViewer from './../CircleEditor/components/CircleListViewer';
import List from '@material-ui/core/List';
import NumberViewer from '../../Number/Viewer/NumberViewer';
import ProfileListItemViewer from '../../Profile/Viewer/ProfileListItemViewer';
import React from 'react';
import ReactGridLayout from './../../ReactGridLayout/ReactGridLayout';
import StringViewer from '../../String/Viewer/StringViewer';
import Typography from '@material-ui/core/Typography';
import { Circle } from '@myiworlds/types';
import { format } from 'date-fns';

interface Props {
  circle: Circle;
}

const CircleFieldsMapperViewer: React.FC<Props> = ({ circle }) => {
  const renderObject = (obj: any): any => {
    const renderElements = [];
    for (const [property, value] of Object.entries(obj)) {
      const circleFields = [
        'parent',
        'cache',
        'copiedFrom',
        'media',
        'ui',
        'line',
      ];
      const circleListFields = ['lines'];
      const profileFields = ['creator', 'owner'];
      const profileListFields = ['editors', 'viewers'];
      const stringFields = [
        'slug',
        'type',
        'title',
        'subtitle',
        'description',
        'key',
        'string',
        'geoPoint',
      ];
      const stringListFields = ['tags'];
      const booleanFields = [
        'cached',
        'pii',
        'autoUpdate',
        'public',
        'passwordRequired',
        'boolean',
      ];
      const numberFields = ['number'];
      const dateFields = ['date'];
      const dateDisplayFields = ['dateCreated', 'dateUpdated'];

      if (circleFields.includes(property) && value !== null) {
        const circleDisplay = (
          <div key={property}>
            <Typography variant="caption">{property}:</Typography>
            {circle.copiedFromClone ? (
              <CircleCloneListItemViewer id={value as string} />
            ) : (
              <CircleListItemViewer id={value as string} />
            )}
          </div>
        );
        renderElements.push(circleDisplay);
      } else if (
        circleListFields.includes(property) &&
        value !== null &&
        value.length
      ) {
        renderElements.push(
          <span key={property}>
            <Typography variant="caption">{property}:</Typography>
            <CircleListViewer ids={value as string[]} />
          </span>,
        );
      } else if (profileFields.includes(property) && value !== null) {
        renderElements.push(
          <span key={property}>
            <Typography variant="caption">{property}:</Typography>
            <List>
              <ProfileListItemViewer id={value as string} />
            </List>
          </span>,
        );
      } else if (
        profileListFields.includes(property) &&
        value &&
        value.length
      ) {
        const profiles = (value as string[]).map((id: string) => (
          <ProfileListItemViewer key={id} id={id} />
        ));

        renderElements.push(
          <span key={property}>
            <Typography variant="caption">{property}:</Typography>
            <List>{profiles}</List>
          </span>,
        );
      } else if (stringFields.includes(property)) {
        renderElements.push(
          <div key={property}>
            <StringViewer label={property} string={value as string} />
          </div>,
        );
      } else if (numberFields.includes(property)) {
        renderElements.push(
          <div key={property}>
            <NumberViewer label={property} number={value as number} />
          </div>,
        );
      } else if (booleanFields.includes(property)) {
        renderElements.push(
          <div key={property}>
            <BooleanViewer label={property} boolean={value as boolean} />
          </div>,
        );
      } else if (Array.isArray(value)) {
        renderElements.push(<div key={property}>ArrayEditor</div>);
      } else if (dateDisplayFields.includes(property)) {
        renderElements.push(
          <span key={property}>
            <Typography variant="caption">{property}:</Typography>
            <Typography>
              {format(value as number, 'MMMM dd, yyyy h:mm a')}
            </Typography>
          </span>,
        );
      } else {
        console.log('Returned nothing.  Received: ', property, value);
        renderElements.push(<div key={property}>{property}</div>);
      }
    }

    return <>{renderElements}</>;
  };

  return <ReactGridLayout gridItems={renderObject(circle)} />;
};

export default CircleFieldsMapperViewer;
