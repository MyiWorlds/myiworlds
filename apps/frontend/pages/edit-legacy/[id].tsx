import CircleEditor from './../../components/Circle/CircleEditor/CircleEditor';
import React from 'react';
import { Typography } from '@material-ui/core';
import { useRouter } from 'next/router';

const EditCircle = () => {
  const router = useRouter();
  let circleId = null;
  if (router.query.id) {
    if (Array.isArray(router.query.id)) {
      circleId = router.query.id[0];
    } else {
      circleId = router.query.id;
    }

    return <CircleEditor id={circleId} />;
  }

  return <Typography>Circle Editor requires an id</Typography>;
};

export default EditCircle;
