import BasicThemeEditor from '../../Theme/Editor/BasicThemeEditor';
import CircleEditorAppBarItems from './CircleEditorAppBarItems';
import CircleFieldsMapperEditor from './components/CircleFieldsMapperEditor';
import CircleFieldsMapperViewer from '../CircleViewer/CircleFieldsMapperViewer';
import CircleHistoryEditor from './components/CircleHistoryEditor';
import Error from '../../Error';
import firestoreClient from './../../../lib/firebase/firestoreClient';
import LoginModal from '../../../contexts/UserInterface/LoginModal';
import ProgressWithMessage from './../../ProgressWithMessage/ProgressWithMessage';
import React, { useContext, useEffect, useState } from 'react';
import RequestCreationModal from '../../../contexts/UserInterface/RequestCreationModal';
import ThemeViewer from '../../Theme/Viewer';
import { Circle, CircleClone } from '@myiworlds/types';
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
  const [updateCircleVariables, setUpdateCircleVariables] = useState<
    CircleClone | Circle
  >({
    id: '',
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
    };
  };

  const circleUpdated = () => {
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

  const handleUpdateCircle = (newValues: any) => {
    setUpdateCircleVariables({
      ...newValues,
    });
  };

  const handleSave = () => {
    console.log('Saving circle');
    setCanSave(false);
    setNavItems(null);
    if (
      updateCircleVariables.collection === FIRESTORE_COLLECTIONS.CIRCLES_CLONES
    ) {
      const circleToUdate = {
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
    console.log(
      'Changing path to previous one as editing circle was canceled.',
    );
    setViewingHistory(false);
    setNavItems(null);
    setUpdateCircleVariables({ id: '' });
    if (
      // eslint-disable-next-line no-restricted-globals
      document.referrer.indexOf(location.protocol + '//' + location.host) === 0
    ) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const componentDidUpdate = () => {
    console.log(
      'There was a change to the circleData or loadingCircle or user or canSave, updating the top navigation items.',
    );

    const circle: Circle | null =
      circleData && circleData.data() ? (circleData.data() as Circle) : null;
    if (user.id && !user.canCreate) {
      setAppDialog(<RequestCreationModal />);
    } else {
      setAppDialog(null);
    }

    if (circle && circle.id === '') {
      setUpdateCircleVariables(circle);
      // do something else
      setAppBarItems(
        <CircleEditorAppBarItems
          circle={circle}
          canSave={canSave}
          handleSave={handleSave}
          handleCancel={handleCancel}
          updateCircleLoading={updateCircleLoading}
          setViewingHistory={setViewingHistory}
          updateEditorAndViewer={updateEditorAndViewer}
          viewingHistory={viewingHistory}
        />,
      );
    } else if (circle) {
      setUpdateCircleVariables(circle);
      setAppBarItems(
        <CircleEditorAppBarItems
          circle={circle}
          canSave={canSave}
          handleSave={handleSave}
          handleCancel={handleCancel}
          updateCircleLoading={updateCircleLoading}
          setViewingHistory={setViewingHistory}
          updateEditorAndViewer={updateEditorAndViewer}
          viewingHistory={viewingHistory}
        />,
      );
    }
  };

  const updateEditorAndViewer = () => {
    console.log('There was a change to the Circle, updating the editor.');
    let navItems = null;
    let navWidth = 0;
    let newViewer = viewer;

    const circle = updateCircleVariables;
    if (circle) {
      switch (circle.type) {
        case 'THEME': {
          navWidth = 600;
          navItems = (
            <BasicThemeEditor
              circle={circle}
              updateCircle={handleUpdateCircle}
            />
          );
          newViewer = <ThemeViewer circle={circle} setCanSave={setCanSave} />;
          break;
        }
        default: {
          newViewer = <CircleFieldsMapperViewer circle={circle} />;
          navWidth = 400;
          navItems = (
            <CircleFieldsMapperEditor
              circle={circle}
              updateCircle={handleUpdateCircle}
            />
          );
        }
      }
    }

    if (viewingHistory) {
      navWidth = 600;
      navItems = (
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
    setNavWidth(navWidth);
    setNavItems(navItems);
  };

  useEffect(saveToDatabase, [save]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(componentDidMount, []);
  useEffect(componentDidUpdate, [
    circleData,
    loadingCircle,
    user,
    canSave,
    viewingHistory,
  ]);
  useEffect(circleUpdated, [updateCircleData]);
  useEffect(updateEditorAndViewer, [updateCircleVariables, viewingHistory]);

  if (errorCircle) {
    return <Error error={errorCircle} />;
  }

  if (loadingCircle) {
    return <ProgressWithMessage message="Loading Circle" />;
  }

  return <div className={classes.root}>{viewer}</div>;
};

export default CircleEditor;
