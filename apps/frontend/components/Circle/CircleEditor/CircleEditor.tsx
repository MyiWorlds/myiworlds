import CircleEditorAppBarItems from './CircleEditorAppBarItems';
import Error from '../../Error';
import firestoreClient from './../../../lib/firebase/firestoreClient';
import Progress from './../../Progress/Progress';
import React, { useContext, useEffect, useState } from 'react';
import ThemeEditor from './../../Theme/Editor/ThemeEditor';
import { Circle } from '@myiworlds/types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FIRESTORE_COLLECTIONS, RESPONSE_CODES } from '@myiworlds/enums';
import { SystemMessagesContext } from './../../../contexts/SystemMessages/SystemMessagesContext';
import { useDocument } from 'react-firebase-hooks/firestore';
import { UserInterfaceContext } from './../../../contexts/UserInterface/UserInterfaceContext';
import { useRouter } from 'next/router';
import { useUpdateCircleMutation } from '../../../generated/apolloComponents';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
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
  const { setAppBarItems } = useContext(UserInterfaceContext);

  const [circleData, loadingCircle, errorCircle] = useDocument(
    firestoreClient.collection(FIRESTORE_COLLECTIONS.CIRCLES).doc(id),
  );

  const [updateCircleVariables, setUpdateCircleVariables] = useState<Circle>({
    id: '',
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
        console.log('Changing path to view saved circle.');
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

  const componentDidUpdate = () => {
    const circle: Circle | null =
      circleData && circleData.data() ? (circleData.data() as Circle) : null;
    if (updateCircleVariables.id === '' && circle) {
      setUpdateCircleVariables(circle);

      setAppBarItems(
        <CircleEditorAppBarItems
          circle={circle}
          handleSave={handleSave}
          handleCancel={handleCancel}
          updateCircleLoading={updateCircleLoading}
        />,
      );
    }
  };

  useEffect(() => {
    return () => {
      if (setAppBarItems) {
        setAppBarItems(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(componentDidUpdate, [circleData, loadingCircle]);
  useEffect(circleUpdated, [updateCircleData]);

  if (errorCircle) {
    return <Error error={errorCircle} />;
  }

  if (loadingCircle) {
    return <Progress />;
  }

  if (circleData) {
    const circle = updateCircleVariables;
    if (circle) {
      let editor = null;

      if (circle.component) {
        switch (circle.component) {
          case 'THEME':
            editor = (
              <ThemeEditor
                circle={updateCircleVariables}
                updateCircle={handleUpdateCircle}
              />
            );
            break;
          default:
            editor = null;
        }
      } else {
        switch (circle.type) {
          default:
            editor = null;
        }
      }

      return <div className={classes.root}>{editor}</div>;
    }
  }
  return null;
};

export default CircleEditor;
