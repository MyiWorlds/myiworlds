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
  const { setAppSnackbar } = useContext(SystemMessagesContext);
  const { setAppBarItems, setAppDialog } = useContext(UserInterfaceContext);
  const { user } = useContext(UserContext);
  const [canSave, setCanSave] = useState(false);
  const { setNavItems, setNavWidth } = useContext(UserInterfaceContext);
  const [editor, setEditor] = useState<null | React.ReactElement>(null);
  const [viewingHistory, setViewingHistory] = useState(false);
  const [updateCircleVariables, setUpdateCircleVariables] = useState<Circle>({
    id: '',
  });

  const [circleData, loadingCircle, errorCircle] = useDocument(
    firestoreClient.collection(FIRESTORE_COLLECTIONS.CIRCLES).doc(id),
  );

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
    updateCircle();
  };

  const handleCancel = () => {
    console.log(
      'Changing path to previous one as editing circle was canceled.',
    );
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

  const handleViewHistory = () => {
    setViewingHistory(true);
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
          handleViewHistory={handleViewHistory}
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
          handleViewHistory={handleViewHistory}
        />,
      );
    }
  };

  const updateEditorAndViewer = () => {
    console.log('There was a change to the Circle, updating the editor.');
    let navItems = null;
    let navWidth = 0;
    let editor = null;

    if (updateCircleVariables) {
      const circle = updateCircleVariables;
      if (circle) {
        switch (circle.type) {
          case 'THEME': {
            navWidth = 600;
            navItems = (
              <BasicThemeEditor
                circle={updateCircleVariables}
                updateCircle={handleUpdateCircle}
              />
            );
            editor = <ThemeViewer circle={circle} setCanSave={setCanSave} />;
            break;
          }
          default: {
            editor = <CircleFieldsMapperViewer circle={circle} />;
            navWidth = 400;
            navItems = (
              <CircleFieldsMapperEditor
                circle={updateCircleVariables}
                updateCircle={handleUpdateCircle}
              />
            );
          }
        }
      }
    }

    if (user.canCreate) {
      setCanSave(true);
    }

    setEditor(editor);
    setNavWidth(navWidth);
    setNavItems(navItems);
  };

  const showHistoryEditor = () => {
    if (updateCircleVariables) {
      setNavItems(<CircleHistoryEditor id={updateCircleVariables.id} />);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(componentDidMount, []);
  useEffect(componentDidUpdate, [circleData, loadingCircle, user, canSave]);
  useEffect(circleUpdated, [updateCircleData]);
  useEffect(updateEditorAndViewer, [updateCircleVariables]);
  useEffect(showHistoryEditor, [viewingHistory]);

  if (errorCircle) {
    return <Error error={errorCircle} />;
  }

  if (loadingCircle) {
    return <ProgressWithMessage message="Loading Circle" />;
  }

  return <div className={classes.root}>{editor}</div>;
};

export default CircleEditor;
