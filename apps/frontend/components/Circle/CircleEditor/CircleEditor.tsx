import CircleEditorAppBarItems from './CircleEditorAppBarItems';
import CircleFieldsMapperEditor from './components/CircleFieldsMapperEditor';
import CircleFieldsMapperViewer from '../CircleViewer/CircleFieldsMapperViewer';
import CircleHistoryAppBarItems from './components/CircleHistoryAppBarItems';
import CircleHistoryEditor from './components/CircleHistoryEditor';
import Error from '../../Error';
import firestoreClient from './../../../lib/firebase/firestoreClient';
import LoginModal from '../../../contexts/UserInterface/LoginModal';
import ProgressWithMessage from './../../ProgressWithMessage/ProgressWithMessage';
import React, { useContext, useEffect, useState } from 'react';
import RequestCreationModal from '../../../contexts/UserInterface/RequestCreationModal';
import ThemeEditor from '../../Theme/Editor/ThemeEditor';
import ThemeViewer from '../../Theme/Viewer';
import { Circle } from '@myiworlds/types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FIRESTORE_COLLECTIONS, RESPONSE_CODES } from '@myiworlds/enums';
import { SystemMessagesContext } from './../../../contexts/SystemMessages/SystemMessagesContext';
import { useDocument } from 'react-firebase-hooks/firestore';
import { UserContext } from './../../../contexts/User/UserContext';
import { UserInterfaceContext } from './../../../contexts/UserInterface/UserInterfaceContext';
import { useRouter } from 'next/router';
import { useUpdateCircleMutation } from '../../../generated/apolloComponents';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflow: 'auto',
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
  const { setNavItems, setNavWidth, setAppBarItems, setAppDialog } = useContext(
    UserInterfaceContext,
  );
  const { setAppSnackbar } = useContext(SystemMessagesContext);
  const { user } = useContext(UserContext);
  const [canSave, setCanSave] = useState(false);
  const [viewer, setViewer] = useState<null | React.ReactElement>(null);
  const [viewingHistory, setViewingHistory] = useState(false);
  const [circleId, setCircleId] = useState(id);
  const [save, setSave] = useState(false);
  const [collection, setCollection] = useState<'circles' | 'circles-clones'>(
    FIRESTORE_COLLECTIONS.CIRCLES,
  );
  const [updateCircleVariables, setUpdateCircleVariables] = useState<Circle>({
    id: '',
    collection: FIRESTORE_COLLECTIONS.CIRCLES,
  });
  const [circleData, loadingCircle, errorCircle] = useDocument(
    firestoreClient.collection(collection).doc(circleId),
  );

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
      setCanSave(false);
      setAppDialog(<LoginModal />);
    }
    return () => {
      setNavItems(null);
      setAppBarItems(null);
    };
  };

  const circleWasUpdated = () => {
    if (
      updateCircleData &&
      updateCircleData.updateCircle &&
      updateCircleData.updateCircle.status === RESPONSE_CODES.SUCCESS
    ) {
      console.log('Saved Circle');
      setAppSnackbar({
        title: updateCircleData.updateCircle.message || '',
        autoHideDuration: 2000,
      });

      if (onSavePath) {
        console.log('Changing path to one requested.');
        router.push(onSavePath);
      } else {
        console.log('Changing path to view saved circle.', `/id/${id}`);
        router.push(`/id/[id]?=${id}`, `/id/${id}`);
      }
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
    setCanSave(false);
    setNavItems(null);
    if (
      updateCircleVariables.collection ===
        FIRESTORE_COLLECTIONS.CIRCLES_CLONES &&
      updateCircleVariables.clonedFrom
    ) {
      const circleToUdate: Circle = {
        ...updateCircleVariables,
        id: updateCircleVariables.clonedFrom,
      };
      setUpdateCircleVariables(circleToUdate);
    }
    setSave(true);
  };

  const saveToDatabase = () => {
    if (save) {
      updateCircle();
    }
  };

  const handleCancel = () => {
    setViewingHistory(false);
    setNavItems(null);
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
    console.log(
      'There was a change to the circleData or loadingCircle or user or canSave, updating the top navigation items.',
    );

    // Need to add if data changes and you have unsaved changes, merge with them

    const circle: Circle | null =
      circleData && circleData.data() ? (circleData.data() as Circle) : null;
    if (user.id && !user.canCreate) {
      setAppDialog(<RequestCreationModal />);
    } else {
      setAppDialog(null);
    }

    if (circle) {
      setUpdateCircleVariables(circle);
    }
  };

  const updateAppBarItems = (appBarItems?: React.ReactElement) => {
    setAppBarItems(
      viewingHistory ? (
        <CircleHistoryAppBarItems
          canSave={canSave && !loadingCircle}
          handleSave={handleSave}
          updateCircleLoading={updateCircleLoading}
          setViewingHistory={setViewingHistory}
          viewingClone={updateCircleVariables.clonedFrom ? true : false}
          viewingId={updateCircleVariables.id}
        />
      ) : (
        <CircleEditorAppBarItems
          circle={updateCircleVariables}
          canSave={canSave}
          handleSave={handleSave}
          handleCancel={handleCancel}
          updateCircleLoading={updateCircleLoading}
          setViewingHistory={setViewingHistory}
          updateNavItemsAndViewer={updateNavItemsAndViewer}
          viewingHistory={viewingHistory}
        />
      ),
    );
  };

  const updateNavItemsAndViewer = () => {
    let newNavItems = null;
    let newViewer = null;

    const circle = updateCircleVariables;
    if (circle && circle.id !== '') {
      console.log('There was a change to the Circle, updating the editor.');
      newViewer = viewer;
      switch (circle.type) {
        case 'THEME': {
          newNavItems = (
            <ThemeEditor
              circle={circle}
              updateCircle={setUpdateCircleVariables}
            />
          );
          newViewer = <ThemeViewer circle={circle} setCanSave={setCanSave} />;
          break;
        }
        default: {
          newViewer = <CircleFieldsMapperViewer circle={circle} />;
          newNavItems = (
            <CircleFieldsMapperEditor
              circle={circle}
              updateCircle={setUpdateCircleVariables}
            />
          );
        }
      }
    }

    if (viewingHistory) {
      newNavItems = (
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

    if (user.canCreate) {
      setCanSave(true);
    }

    setViewer(newViewer);
    setNavItems(newNavItems);
  };

  const updateNavWidth = () => {
    console.log('Updating the editors navigation width.');
    let navWidth = 0;

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

    setNavWidth(navWidth);
  };

  useEffect(componentDidMount, []);
  useEffect(circleBeingEditedChanged, [circleData, user, viewingHistory]);
  useEffect(updateAppBarItems, [
    canSave,
    circleData,
    user,
    viewingHistory,
    updateCircleVariables,
    loadingCircle,
  ]);
  useEffect(updateNavItemsAndViewer, [updateCircleVariables, viewingHistory]);
  useEffect(updateNavWidth, [viewingHistory, circleData]);
  useEffect(circleWasUpdated, [updateCircleData]);
  useEffect(saveToDatabase, [save]);

  if (errorCircle) {
    return <Error error={errorCircle} />;
  }

  if (loadingCircle) {
    return <ProgressWithMessage message="Loading Circle" />;
  }

  return <div className={classes.root}>{viewer}</div>;
};

export default CircleEditor;
