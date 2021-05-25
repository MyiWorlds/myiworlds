import GetCircleAndEditById from '../../components/Circle2/GetCircleAndEditById';
import React from 'react';
import { useRouter } from 'next/router';

interface Props {
  id?: string;
}

const EditCircle = ({ id }: Props) => {
  const router = useRouter();
  let circleId = null;

  if (Array.isArray(router.query.id)) {
    circleId = router.query.id[0];
  } else {
    circleId = router.query.id;
  }

  return <GetCircleAndEditById id={circleId} />;
};

export default EditCircle;
