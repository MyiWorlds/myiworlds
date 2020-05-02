import CircleFieldsMapperViewer from './CircleFieldsMapperViewer';
import CircleViewerAppBarItems from './CircleViewerAppBarItems';
import Error from '../../Error';
import firestoreClient from '../../../lib/firebase/firestoreClient';
import Progress from '../../Progress/Progress';
import React, { useContext, useEffect } from 'react';
import ThemeViewer from './../../Theme/Viewer/ThemeViewer';
import { Circle } from '@myiworlds/types';
import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
import { useDocument } from 'react-firebase-hooks/firestore';
import { UserInterfaceContext } from '../../../contexts/UserInterface/UserInterfaceContext';

interface Props {
  id: string;
}

export default function CircleViewer({ id }: Props) {
  const { setContentViewing, contentViewing, setAppBarItems } = useContext(
    UserInterfaceContext,
  );

  const [circleData, loadingCircle, errorCircle] = useDocument(
    firestoreClient.collection(FIRESTORE_COLLECTIONS.CIRCLES).doc(id),
  );

  const updateContentViewing = () => {
    if (circleData) {
      const circle = circleData.data() as Circle;
      if (circle && circle !== contentViewing) {
        setContentViewing(circle);
      }
    }
  };

  const componentDidUpdate = () => {
    const circle: Circle | null =
      circleData && circleData.data() ? (circleData.data() as Circle) : null;
    if (circle) {
      setAppBarItems(<CircleViewerAppBarItems circle={circle} />);
    }
  };

  useEffect(componentDidUpdate, [circleData, loadingCircle]);
  useEffect(updateContentViewing, [circleData]);

  if (errorCircle) {
    return <Error error={errorCircle} />;
  }

  if (loadingCircle) {
    return <Progress />;
  }

  if (circleData) {
    const circle = circleData.data() as Circle;
    if (circle) {
      let viewer = null;

      switch (circle.type) {
        case 'THEME':
          viewer = <ThemeViewer circle={circle} />;
          break;
        default:
          viewer = <CircleFieldsMapperViewer circle={circle} />;
          break;
      }

      return viewer;
    }
  }
  return null;
}
