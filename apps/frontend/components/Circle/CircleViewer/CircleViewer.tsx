import CircleViewerAppBarItems from './CircleViewerAppBarItems';
import Error from '../../Error';
import firestoreClient from '../../../lib/firebase/firestoreClient';
import Progress from '../../Progress/Progress';
import React, { useContext, useEffect } from 'react';
import ReactGridLayoutViewer from './../../ReactGridLayout/Viewer/ReactGridLayoutViewer';
import ThemeViewer from './../../Theme/Viewer/ThemeViewer';
import { Circle } from '@myiworlds/types';
import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
import { useDocument } from 'react-firebase-hooks/firestore';
import { UserInterfaceContext } from '../../../contexts/UserInterface/UserInterfaceContext';
// import CircleFieldsMapperViewer from './CircleFieldsMapperViewer';

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

  const [
    circleLayoutsData,
    loadingCircleLayouts,
    errorCircleLayouts,
  ] = useDocument(
    contentViewing && contentViewing.layouts && contentViewing.layouts !== ''
      ? firestoreClient.collection(FIRESTORE_COLLECTIONS.CIRCLES).doc(id)
      : undefined,
  );

  // const [circleUiData, loadingCircleUi, errorCircleUi] = useDocument(
  //   firestoreClient.collection(FIRESTORE_COLLECTIONS.CIRCLES).doc(id),
  // );

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
  useEffect(updateContentViewing, [circleData, circleLayoutsData]);

  if (errorCircle) {
    return <Error error={errorCircle} />;
  }

  if (errorCircleLayouts) {
    return <Error error={errorCircleLayouts} />;
  }

  if (loadingCircle || loadingCircleLayouts) {
    return <Progress />;
  }

  if (circleData && circleLayoutsData) {
    const circle = circleData.data() as Circle;
    const circleLayouts = circleLayoutsData.data() as Circle;
    if (circle) {
      let viewer = null;

      switch (circle.type) {
        case 'THEME':
          viewer = <ThemeViewer circle={circle} />;
          break;
        default:
          viewer = (
            <ReactGridLayoutViewer
              circle={circle}
              circleLayouts={circleLayouts}
            />
          );
          break;
      }

      return viewer;
    }
  }
  return null;
}
