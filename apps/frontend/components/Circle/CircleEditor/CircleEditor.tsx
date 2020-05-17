import Card from '@material-ui/core/Card';
import CircleEditorAppBarItems from './CircleEditorAppBarItems';
import CircleFieldController from './components/CircleFieldController';
import CircleFieldsController from './components/CircleFieldsController';
import CircleGridLayoutAppBarItems from '../../ReactGridLayout/Editor/CircleGridLayoutAppBarItems';
import CircleHistoryAppBarItems from './components/CircleHistoryAppBarItems';
import CircleHistoryEditor from './components/CircleHistoryController';
import Error from '../../Error';
import firestoreClient from './../../../lib/firebase/firestoreClient';
import generateDefaultGridLayouts from '../../ReactGridLayout/Viewer/gridLayoutHelperFunctions';
import LoginModal from '../../../contexts/UserInterface/LoginModal';
import ProgressWithMessage from './../../ProgressWithMessage/ProgressWithMessage';
import React, {
  useContext,
  useEffect,
  useRef,
  useState
  } from 'react';
import ReactGridLayoutViewer from './../../ReactGridLayout/Viewer/ReactGridLayoutViewer';
import RequestCreationModal from '../../../contexts/UserInterface/RequestCreationModal';
import ThemeEditor from '../../Theme/Editor/ThemeEditor';
import ThemeViewer from '../../Theme/Viewer';
import { Circle } from '@myiworlds/types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FIRESTORE_COLLECTIONS, RESPONSE_CODES } from '@myiworlds/enums';
import { SystemMessagesContext } from './../../../contexts/SystemMessages/SystemMessagesContext';
import { Typography } from '@material-ui/core';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { UserContext } from './../../../contexts/User/UserContext';
import { UserInterfaceContext } from './../../../contexts/UserInterface/UserInterfaceContext';
import { useRouter } from 'next/router';
import { useUpdateCircleMutation } from '../../../generated/apolloComponents';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflow: 'auto',
      height: '100%',
      width: '100%',
    },
    appBar: {
      position: 'relative',
    },
  }),
);

interface Props {
  id: string;
  onSavePath?: string;
  onCancelPath?: string;
}

const CircleEditor = ({ id, onSavePath, onCancelPath }: Props) => {
  const classes = useStyles();
  const router = useRouter();
  const {
    setController,
    setNavWidth,
    setAppBarItems,
    setAppDialog,
  } = useContext(UserInterfaceContext);
  const { setAppSnackbar } = useContext(SystemMessagesContext);
  const { user } = useContext(UserContext);
  const timerToSaveCircle = useRef<any>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [viewer, setViewer] = useState<null | React.ReactElement>(null);
  const [viewingHistory, setViewingHistory] = useState(false);
  const [editingGrid, setEditingGrid] = useState(false);
  const [savingCircle, setSavingCircle] = useState(false);
  const [circleId, setCircleId] = useState<string | undefined>(id);
  const [fieldEditing, setFieldEditing] = useState<null | string>(null);
  const [displaySize, setDisplaySize] = useState<null | number>(null);
  const [collection, setCollection] = useState<'circles' | 'circles-clones'>(
    FIRESTORE_COLLECTIONS.CIRCLES,
  );
  const [updateCircleVariables, setUpdateCircleVariables] = useState<Circle>({
    id: '',
    collection: FIRESTORE_COLLECTIONS.CIRCLES,
  });
  const [circleLayouts, setCircleLayouts] = useState<Circle>({
    id: 'default-circle-layout',
    type: 'LAYOUTS',
    collection: FIRESTORE_COLLECTIONS.CIRCLES,
    data: {
      layouts: generateDefaultGridLayouts(
        Object.getOwnPropertyNames(updateCircleVariables),
      ),
    },
  });
  const [circleData, loadingCircle, errorCircle] = useDocumentDataOnce(
    circleId ? firestoreClient.collection(collection).doc(circleId) : undefined,
  );
  const [
    circleLayoutsData,
    loadingCircleLayouts,
    errorCircleLayouts,
  ] = useDocumentDataOnce(
    updateCircleVariables.layouts
      ? firestoreClient
          .collection(FIRESTORE_COLLECTIONS.CIRCLES)
          .doc(updateCircleVariables.layouts)
      : null,
  );

  const circleLayoutsBeingEditedChanged = () => {
    if (loadingCircleLayouts) {
      console.log('Loading circle layouts.');
      return;
    }
    if (errorCircleLayouts) {
      setAppSnackbar({
        title: `There was an error getting the layout. ${errorCircleLayouts.message}`,
        autoHideDuration: 3000,
        severity: 'error',
      });
      return;
    }

    const circle: Circle | null = circleLayoutsData
      ? (circleLayoutsData as Circle)
      : null;
    if (circle) {
      console.log('There was a change to the layouts, updating...');
      const layouts = JSON.parse(circle.data.layouts, function(key, value) {
        return value === 'Infinity' ? Infinity : value;
      });
      setCircleLayouts({
        ...circle,
        data: {
          layouts,
        },
      });
    }
  };

  const updateCircleToFetch = (
    newId: string | null,
    newCollection: 'circles' | 'circles-clones' | null,
  ) => {
    setCircleId(newId ? newId : id);
    setCollection(
      newCollection ? newCollection : FIRESTORE_COLLECTIONS.CIRCLES,
    );
  };

  const [
    updateLayoutCircle,
    {
      data: updateLayoutCircleData,
      loading: updateLayoutCircleLoading,
      error: updateLayoutCircleError,
    },
  ] = useUpdateCircleMutation({
    variables: {
      ...circleLayouts,
      data: {
        layouts: JSON.stringify(
          circleLayouts.data.layouts,
          (key, value: any) => {
            if (value === Infinity) {
              return 'Infinity';
            }
            return value;
          },
        ),
      },
      merge: false,
    },
  });

  const [
    updateCircle,
    { data: updateCircleData, loading: updateCircleLoading },
  ] = useUpdateCircleMutation({
    variables: {
      ...updateCircleVariables,
      merge: false,
    },
  });

  const componentDidMount = () => {
    if (!user.id) {
      setHasUnsavedChanges(false);
      setAppDialog(<LoginModal />);
    }
    return () => {
      if (setController) {
        setController(null);
      }
      if (setAppBarItems) {
        setAppBarItems(null);
      }
    };
  };

  const layoutCircleWasUpdated = () => {
    if (updateLayoutCircleLoading) {
      console.log('Saving layout circle');
    }

    if (updateLayoutCircleError) {
      setAppSnackbar({
        title: `There was an error updating the layout. ${updateLayoutCircleError.message}`,
        autoHideDuration: 3000,
        severity: 'error',
      });
    }

    if (
      updateLayoutCircleData &&
      updateLayoutCircleData.updateCircle &&
      updateLayoutCircleData.updateCircle.status === RESPONSE_CODES.SUCCESS
    ) {
      setEditingGrid(false);
      setAppSnackbar({
        title: 'Layout was saved!',
        autoHideDuration: 3000,
      });
      if (
        updateCircleVariables.layouts !==
          updateLayoutCircleData.updateCircle.updatedDocumentId &&
        updateLayoutCircleData.updateCircle.updatedDocumentId
      ) {
        handleUpdateCircleAndSave({
          ...updateCircleVariables,
          layouts: updateLayoutCircleData.updateCircle.updatedDocumentId,
        });
      }
    }
  };

  const navigateToViewCircle = () => {
    if (onSavePath) {
      console.log('Changing path to one requested.');
      router.push(onSavePath);
    } else {
      console.log('Changing path to view saved circle.', `/id/${id}`);
      router.push(`/id/[id]?=${id}`, `/id/${id}`);
    }
  };

  const circleWasUpdated = () => {
    setSavingCircle(false);
    if (
      updateCircleData &&
      updateCircleData.updateCircle &&
      updateCircleData.updateCircle.status === RESPONSE_CODES.SUCCESS
    ) {
      console.log('Saved Circle');
    } else if (
      updateCircleData &&
      updateCircleData.updateCircle &&
      updateCircleData.updateCircle.status === RESPONSE_CODES.ERROR
    ) {
      setAppSnackbar({
        title: updateCircleData.updateCircle.message || '',
        autoHideDuration: 2000,
      });
    }
  };

  const handleSave = () => {
    console.log('Saving circle');
    setController(null);
    if (
      updateCircleVariables.collection ===
        FIRESTORE_COLLECTIONS.CIRCLES_CLONES &&
      updateCircleVariables.clonedFrom
    ) {
      const circleToUdate: Circle = {
        ...updateCircleVariables,
        id: updateCircleVariables.clonedFrom,
      };
      handleUpdateCircleAndSave(circleToUdate);
    }
  };

  // const saveToDatabase = () => {
  //   if (save) {
  //     updateCircle();
  //   }
  // };

  const handleGoBack = () => {
    setViewingHistory(false);
    setController(null);
    setUpdateCircleVariables({ id: '' });
    if (
      // eslint-disable-next-line no-restricted-globals
      document.referrer.indexOf(location.protocol + '//' + location.host) === 0
    ) {
      console.log('Changing path to previous one.', document.referrer);
      router.back();
    } else {
      console.log(
        'Canceled editing and the previous route was from another domain.  Navigating to home',
      );
      router.push('/');
    }
  };

  const circleBeingEditedChanged = () => {
    // Need to add if data changes and you have unsaved changes, merge with them
    const circle: Circle | null = circleData ? (circleData as Circle) : null;
    if (user.id && !user.canCreate) {
      setAppDialog(<RequestCreationModal />);
    } else {
      setAppDialog(null);
    }

    if (circle) {
      console.log('Circle updated, updating...');
      setCircleId(undefined);
      setUpdateCircleVariables(circle);

      if (circleLayouts.id !== '' && circle.id !== '') {
        if (!circle.layouts) {
          setCircleLayouts({
            id: '',
            collection: FIRESTORE_COLLECTIONS.CIRCLES,
            type: 'LAYOUTS',
            data: {
              layouts: generateDefaultGridLayouts(
                Object.getOwnPropertyNames(circle),
              ),
            },
          });
        }
      }
    }
  };

  const handleUpdateCircleAndSave = (newValues: Circle) => {
    setUpdateCircleVariables(newValues);
    setSavingCircle(true);
    if (timerToSaveCircle.current) {
      clearTimeout(timerToSaveCircle.current);
    }
    timerToSaveCircle.current = setTimeout(() => {
      updateCircle();
      setHasUnsavedChanges(false);
    }, 2000);
    return () => {
      if (timerToSaveCircle) {
        clearTimeout(timerToSaveCircle.current);
      }
    };
  };

  const updateAppBarItems = (appBarItems?: React.ReactElement) => {
    let newAppBarItems = null;

    if (editingGrid) {
      newAppBarItems = (
        <CircleGridLayoutAppBarItems
          circle={updateCircleVariables}
          displaySize={displaySize}
          setDisplaySize={setDisplaySize}
          editingGrid={editingGrid}
          updateLayoutCircle={updateLayoutCircle}
          isSaving={updateLayoutCircleLoading}
          handleCancel={() => setEditingGrid(false)}
        />
      );
    } else if (viewingHistory) {
      newAppBarItems = (
        <CircleHistoryAppBarItems
          handleSave={handleSave}
          updateCircleLoading={updateCircleLoading}
          setViewingHistory={setViewingHistory}
          viewingClone={updateCircleVariables.clonedFrom ? true : false}
          viewingId={updateCircleVariables.id}
        />
      );
    } else {
      newAppBarItems = (
        <CircleEditorAppBarItems
          circle={updateCircleVariables}
          hasUnsavedChanges={hasUnsavedChanges}
          handleFinished={navigateToViewCircle}
          isSaving={updateCircleLoading || savingCircle}
          setViewingHistory={setViewingHistory}
          updateControllerAndViewer={updateControllerAndViewer}
          viewingHistory={viewingHistory}
          setEditingGrid={setEditingGrid}
          displaySize={displaySize}
          setDisplaySize={setDisplaySize}
          handleGoBack={handleGoBack}
        />
      );
    }
    setAppBarItems(newAppBarItems);
  };

  const updateControllerAndViewer = () => {
    let newController = null;
    let newViewer = null;

    const circle = updateCircleVariables;
    if (circle && circle.id !== '') {
      console.log('There was a change to the Circle, updating the editor.');
      newViewer = viewer;
      switch (circle.type) {
        case 'THEME': {
          newController = (
            <ThemeEditor
              circle={circle}
              updateCircle={setUpdateCircleVariables}
            />
          );
          newViewer = (
            <ThemeViewer
              circle={circle}
              setHasUnsavedChanges={setHasUnsavedChanges}
            />
          );
          break;
        }
        default: {
          newViewer = (
            <ReactGridLayoutViewer
              circle={circle}
              editingGrid={editingGrid}
              setFieldEditing={setFieldEditing}
              fieldEditing={fieldEditing}
              displaySize={displaySize}
              circleLayouts={circleLayouts}
              setCircleLayouts={setCircleLayouts}
            />
          );
          newController = fieldEditing ? (
            <CircleFieldController
              fieldEditing={fieldEditing}
              setFieldEditing={setFieldEditing}
              updateCircle={handleUpdateCircleAndSave}
              circle={circle}
              circleLayouts={circleLayouts}
              setCircleLayouts={setCircleLayouts}
            />
          ) : (
            <CircleFieldsController
              circle={circle}
              setFieldEditing={setFieldEditing}
            />
          );
        }
      }
    }

    if (editingGrid) {
      newController = (
        <CircleFieldController
          fieldEditing={fieldEditing}
          setFieldEditing={setFieldEditing}
          updateCircle={handleUpdateCircleAndSave}
          circle={circle}
          circleLayouts={circleLayouts}
          setCircleLayouts={setCircleLayouts}
          editingGrid={true}
        />
      );
    }

    if (viewingHistory) {
      newController = (
        <CircleHistoryEditor
          circleId={circle.clonedFrom ? circle.clonedFrom : circle.id}
          clonedCircleIdViewing={
            viewingHistory && circle.clonedFrom ? circle.id : null
          }
          updateCircleToFetch={updateCircleToFetch}
          handleSave={handleSave}
          contentCircle={circle}
        />
      );
    }

    if (displaySize) {
      newViewer = (
        <Card style={{ width: displaySize, margin: '0px auto' }}>
          {newViewer}
        </Card>
      );
    }

    setViewer(newViewer);
    setController(newController);
  };

  const updateNavWidth = () => {
    console.log('Updating the editors navigation width.');
    let navWidth = null;

    const circle = updateCircleVariables;
    if (circle) {
      switch (circle.type) {
        case 'THEME': {
          navWidth = 600;
          break;
        }
        default: {
          navWidth = 400;
        }
      }
    }

    if (viewingHistory) {
      navWidth = 400;
    }

    if (navWidth) {
      setNavWidth(navWidth);
    }
  };

  useEffect(componentDidMount, []);
  useEffect(circleBeingEditedChanged, [loadingCircle, user, viewingHistory]);
  useEffect(circleLayoutsBeingEditedChanged, [
    // circleData,
    // circleLayoutsData,
    loadingCircleLayouts,
    errorCircleLayouts,
  ]);
  useEffect(updateAppBarItems, [
    hasUnsavedChanges,
    circleData,
    user,
    viewingHistory,
    updateCircleVariables,
    updateCircleLoading,
    savingCircle,
    loadingCircle,
    editingGrid,
    displaySize,
  ]);
  useEffect(updateControllerAndViewer, [
    updateCircleVariables,
    viewingHistory,
    editingGrid,
    fieldEditing,
    displaySize,
    circleLayouts,
  ]);
  useEffect(updateNavWidth, [
    viewingHistory,
    loadingCircle,
    // circleData
  ]);
  useEffect(circleWasUpdated, [updateCircleData]);
  useEffect(layoutCircleWasUpdated, [
    updateLayoutCircleData,
    updateLayoutCircleLoading,
    updateLayoutCircleError,
  ]);
  // useEffect(saveToDatabase, [save]);

  if (!user.canCreate) {
    return (
      <>
        <Typography variant="h1">
          You are currently not able to create
        </Typography>
        <Typography variant="h4">
          Please wait until this is ready for public use.
        </Typography>
      </>
    );
  }

  if (errorCircle) {
    return <Error error={errorCircle} />;
  }

  if (loadingCircle) {
    return <ProgressWithMessage message="Loading Circle" />;
  }

  return <div className={classes.root}>{viewer}</div>;
};

export default CircleEditor;
