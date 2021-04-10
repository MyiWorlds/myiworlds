import CircleComponent from '../../components/Circle2/Circle';
import Error from './../../components/Error';
import ProgressWithMessage from './../../components/ProgressWithMessage';
import React, { useEffect } from 'react';
import { atomFamily } from 'recoil';
import { Circle } from '@myiworlds/types';
import { Typography } from '@material-ui/core';
import { useGetCircleToEditByIdQuery } from './../../generated/apolloComponents';
import { useRouter } from 'next/router';

const EditCircle = () => {
  const router = useRouter();
  let circleId = null;
  if (Array.isArray(router.query.id)) {
    circleId = router.query.id[0];
  } else {
    circleId = router.query.id;
  }

  const {
    data: circleData,
    loading: loadingCircle,
    error: errorCircle,
  } = useGetCircleToEditByIdQuery({
    skip: !circleId,
    variables: {
      id: circleId,
    },
  });

  if (loadingCircle) {
    return <ProgressWithMessage message="Loading Circle" />;
  }

  if (errorCircle) {
    return <Error error={errorCircle} />;
  }

  if (circleData && circleData?.getCircleById) {
    return (
      <CircleComponent
        initialIsEditing={true}
        circle={circleData.getCircleById as Circle}
        fetch={true}
      />
    );
  }

  return (
    <Typography>Could not find the content you are looking for</Typography>
  );
};

export default EditCircle;
