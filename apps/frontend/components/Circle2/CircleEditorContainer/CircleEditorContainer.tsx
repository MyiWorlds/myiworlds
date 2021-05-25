import AppControllerEditor from './components/UIEditorComponents/AppControllerEditor';
import CircleField from './components/CircleField';
import ContentEditor from './components/UIEditorComponents/ContentEditor';
import GridItem from './components/GridItem';
import React, { useEffect, useState } from 'react';
import ReactGridLayoutViewer from './components/ReactGridLayout/Viewer/ReactGridLayoutViewer';
import { CircleHydrated } from '../../../../../libs/types/src/circle';
import { convertHydratedCircleToFlatCircle } from '../../Circle/functions/convertHydratedCircleToFlatCircle';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useSetRecoilState } from 'recoil';
import {
  appControllerItemsAtom,
  contentControllerAtom,
} from '../../../atoms/userInterfaceAtoms';

interface Props {
  circle: CircleHydrated;
  initialIsEditing: boolean;
}

// Shouldnt this be determined by the layout for fields shown
const fieldsDisplayed = [
  'type',
  'parent',
  'cached',
  'cache',
  'pii',
  'clonedFrom',
  'copiedFrom',
  'copiedFromClone',
  'autoUpdate',
  'slug',
  'public',
  'passwordRequired',
  'tags',
  'title',
  'subtitle',
  'description',
  'media',
  'creator',
  'owner',
  'viewers',
  'editors',
  'ui',
  'layouts',
  'dateCreated',
  'dateUpdated',
  'key',
  'string',
  'data',
  'number',
  'bigNumber',
  'boolean',
  'date',
  'geoPoint',
  'line',
  'lines',
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
  }),
);

export default function CircleEditorContainer({
  circle,
  initialIsEditing,
}: Props) {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(initialIsEditing);
  const [viewingHistory, setViewingHistory] = useState(false);
  const [isEditingGrid, setIsEditingGrid] = useState(false);
  const setAppControllerItems = useSetRecoilState(appControllerItemsAtom);
  const setContentControllerAtom = useSetRecoilState(contentControllerAtom);

  const updateEditingUI = () => {
    setAppControllerItems(
      <AppControllerEditor
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        circleId={circle.id}
        viewingHistory={viewingHistory}
        setViewingHistory={setViewingHistory}
        isEditingGrid={isEditingGrid}
        setIsEditingGrid={setIsEditingGrid}
      />,
    );

    setContentControllerAtom(
      <ContentEditor circle={circle} viewingHistory={viewingHistory} />,
    );

    return () => {
      if (setAppControllerItems) {
        setAppControllerItems(null);
        setContentControllerAtom(null);
      }
    };
  };

  useEffect(updateEditingUI, [
    isEditing,
    circle.id,
    setAppControllerItems,
    viewingHistory,
    setContentControllerAtom,
    isEditingGrid,
  ]);

  console.log('Editor re-rendered');

  return (
    <div className={classes.root}>
      <ReactGridLayoutViewer
        isEditingGrid={isEditingGrid}
        circle={convertHydratedCircleToFlatCircle(circle)}
      />
    </div>
  );
}
