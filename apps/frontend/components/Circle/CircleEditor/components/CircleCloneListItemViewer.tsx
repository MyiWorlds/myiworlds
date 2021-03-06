import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Circle } from '@myiworlds/types';
import { useGetCircleCloneByIdQuery } from '../../../../generated/apolloComponents';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  ListItemClassKey,
  ListItemTextClassKey,
} from '@material-ui/core';

interface Props {
  id: string;
  secondary?: string | React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  listItemClasses?: Partial<Record<ListItemClassKey, string>> | undefined;
  listItemTextClasses?:
    | Partial<Record<ListItemTextClassKey, string>>
    | undefined;
  listItemSecondaryAction?: React.ReactNode;
  onSelect?: () => void;
}

export default function CircleCloneListItemViewer({
  id,
  secondary,
  listItemClasses,
  listItemTextClasses,
  selected,
  disabled,
  listItemSecondaryAction,
  onSelect,
}: Props) {
  const {
    data: getCircleCloneQuery,
    loading: loadingGetCircle,
    error: errorGettingCircle,
  } = useGetCircleCloneByIdQuery({
    skip: !id,
    variables: {
      id,
    },
  });

  let circle = null;

  if (errorGettingCircle) {
    console.log('Error getting Circle list item.');
    return null;
  }

  if (loadingGetCircle) {
    return (
      <ListItem button key={id}>
        <ListItemAvatar>
          <Avatar>
            <Skeleton variant="circle" width={40} height={40} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={<Skeleton variant="text" />} />
      </ListItem>
    );
  }

  if (getCircleCloneQuery && getCircleCloneQuery.getCircleCloneById) {
    console.log('Rendering Circle list item.');
    circle = getCircleCloneQuery.getCircleCloneById as Circle;
    return (
      <ListItem
        key={circle.id}
        button
        onClick={() => (onSelect ? onSelect() : null)}
        selected={selected || false}
        disabled={disabled || false}
        classes={listItemClasses || {}}
      >
        <ListItemAvatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={circle.title}
          secondary={secondary}
          classes={listItemTextClasses || {}}
        />
        {listItemSecondaryAction ? (
          <ListItemSecondaryAction>
            {listItemSecondaryAction}
          </ListItemSecondaryAction>
        ) : null}
      </ListItem>
    );
  } else {
    return null;
  }
}
