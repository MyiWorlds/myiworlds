import CircleViewerAppBarItems from './CircleViewerAppBarItems';
import Error from '../../Error';
import generateDefaultGridLayouts from './../../ReactGridLayout/Viewer/gridLayoutHelperFunctions';
import Progress from '../../Progress/Progress';
import React, { useContext, useEffect } from 'react';
import ReactGridLayoutViewer from './../../ReactGridLayout/Viewer/ReactGridLayoutViewer';
import ThemeViewer from './../../Theme/Viewer/ThemeViewer';
import { Circle, CircleHydrated } from '@myiworlds/types';
import { convertHydratedCircleToFlatCircle } from '../functions/convertHydratedCircleToFlatCircle';
import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
import { useGetCircleToViewByIdQuery } from './../../../generated/apolloComponents';
import { UserInterfaceContext } from '../../../contexts/UserInterface/UserInterfaceContext';
// import CircleFieldsMapperViewer from './CircleFieldsMapperViewer';

interface Props {
  id: string;
}

export default function CircleViewer({ id }: Props) {
  const { setContentViewing, contentViewing, setAppBarItems } = useContext(
    UserInterfaceContext,
  );
  const [circleLayouts, setCircleLayouts] = React.useState<Circle | null>(null);

  const {
    data: circleData,
    loading: loadingCircle,
    error: errorCircle,
  } = useGetCircleToViewByIdQuery({
    skip: !id,
    variables: {
      id: id as string,
    },
  });

  // const [circleUiData, loadingCircleUi, errorCircleUi] = useDocument(
  //   firestoreClient.collection(FIRESTORE_COLLECTIONS.CIRCLES).doc(id),
  // );

  const updateContentViewing = () => {
    // Need to add if data changes and you have unsaved changes, merge with them
    let circle: CircleHydrated | null = null;

    if (circleData && circleData?.getCircleById) {
      circle = circleData.getCircleById as CircleHydrated;
    }

    if (circle) {
      console.log('Circle updated, updating...');
      const flattenedCircle = convertHydratedCircleToFlatCircle(circle);
      setContentViewing(flattenedCircle);
      setAppBarItems(<CircleViewerAppBarItems circle={flattenedCircle} />);
      if (circle.layouts) {
        const layouts = JSON.parse(circle.layouts.data.layouts, function(
          key,
          value,
        ) {
          return value === 'Infinity' ? Infinity : value;
        });
        setCircleLayouts(
          convertHydratedCircleToFlatCircle({
            ...circle.layouts,
            data: {
              layouts,
            },
          }),
        );
      } else {
        setCircleLayouts({
          id: 'default-circle-layout',
          type: 'LAYOUTS',
          collection: FIRESTORE_COLLECTIONS.CIRCLES,
          data: {
            layouts: generateDefaultGridLayouts(
              Object.getOwnPropertyNames(circle),
            ),
          },
        });
      }
    }
  };

  useEffect(updateContentViewing, [loadingCircle]);

  if (errorCircle) {
    return <Error error={errorCircle} />;
  }

  if (loadingCircle) {
    return <Progress />;
  }

  if (contentViewing && circleLayouts) {
    const circle = contentViewing as Circle;

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
