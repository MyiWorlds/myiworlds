import CircleViewer from './../../components/Circle/CircleViewer/CircleViewer';
import React from 'react';
import { Typography } from '@material-ui/core';
import { useRouter } from 'next/router';

const ViewCircle = () => {
  const router = useRouter();
  let circleId = null;
  if (router.query.id) {
    if (Array.isArray(router.query.id)) {
      circleId = router.query.id[0];
    } else {
      circleId = router.query.id;
    }

    return <CircleViewer id={circleId} />;
  }

  return <Typography>Circle Viewer requires an id</Typography>;
};

export default ViewCircle;
