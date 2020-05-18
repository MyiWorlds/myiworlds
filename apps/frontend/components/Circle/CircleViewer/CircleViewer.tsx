import CircleViewerAppBarItems from './CircleViewerAppBarItems';
import Error from '../../Error';
import firestoreClient from '../../../lib/firebase/firestoreClient';
import generateDefaultGridLayouts from './../../ReactGridLayout/Viewer/gridLayoutHelperFunctions';
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
    circleData &&
      circleData.data() &&
      circleData.data().layouts &&
      circleData.data().layouts !== ''
      ? firestoreClient
          .collection(FIRESTORE_COLLECTIONS.CIRCLES)
          .doc(circleData.data().layouts)
      : undefined,
  );

  // const [circleUiData, loadingCircleUi, errorCircleUi] = useDocument(
  //   firestoreClient.collection(FIRESTORE_COLLECTIONS.CIRCLES).doc(id),
  // );

  const updateContentViewing = () => {
    if (circleData) {
      const circle = circleData.data() as Circle;
      if (
        circle &&
        ((contentViewing && circle.id !== contentViewing.id) ||
          (contentViewing && circle.dateUpdated !== contentViewing.dateUpdated))
      ) {
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

  useEffect(componentDidUpdate, [loadingCircle, loadingCircleLayouts]);
  useEffect(updateContentViewing, [loadingCircle, loadingCircleLayouts]);

  if (errorCircle) {
    return <Error error={errorCircle} />;
  }

  if (errorCircleLayouts) {
    return <Error error={errorCircleLayouts} />;
  }

  if (loadingCircle || loadingCircleLayouts) {
    return <Progress />;
  }

  if (circleData) {
    const circle = circleData.data() as Circle;
    let circleLayouts = null;

    if (circleLayoutsData) {
      const circleLayoutsResponse = circleLayoutsData.data() as Circle;

      const layouts = JSON.parse(circleLayoutsResponse.data.layouts, function(
        key,
        value,
      ) {
        return value === 'Infinity' ? Infinity : value;
      });
      circleLayouts = {
        ...circleLayoutsResponse,
        data: {
          layouts,
        },
      };
    } else {
      circleLayouts = {
        id: 'default-circle-layout',
        type: 'LAYOUTS',
        collection: FIRESTORE_COLLECTIONS.CIRCLES,
        data: {
          layouts: generateDefaultGridLayouts(
            Object.getOwnPropertyNames(circle),
          ),
        },
      } as Circle;
    }
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
