import CircleEditorContainer from './CircleEditorContainer/CircleEditorContainer';
import Error from './../../components/Error';
import ProgressWithMessage from '../ProgressWithMessage';
import React, { useEffect } from 'react';
import { CircleHydrated } from '@myiworlds/types';
import { circlePropertyValueByIdAndPropertyAtom } from '../../atoms/circleAtoms';
import { Typography } from '@material-ui/core';
import { useGetCircleToEditByIdQuery } from '../../generated/apolloComponents';
import { useSetRecoilState } from 'recoil';

interface Props {
  id: string;
}

export default function GetCircleAndEditById({ id }: Props) {
  const {
    data: circleData,
    loading: loadingCircle,
    error: errorCircle,
  } = useGetCircleToEditByIdQuery({
    skip: !id,
    variables: {
      id,
    },
  });

  const circleChanged = () => {
    if (id && circleData && circleData.getCircleById) {
      Object.keys(circleData.getCircleById).forEach(
        (property: keyof CircleHydrated) => {
          circlePropertyValueByIdAndPropertyAtom(id + property);
        },
      );
    }
  };

  useEffect(circleChanged, [id]);

  if (loadingCircle) {
    return <ProgressWithMessage message="Loading Circle" />;
  }

  if (errorCircle) {
    return <Error error={errorCircle} />;
  }

  if (circleData && circleData?.getCircleById) {
    return (
      <CircleEditorContainer
        initialIsEditing={true}
        circle={circleData.getCircleById as CircleHydrated}
      />
    );
  }

  return (
    <Typography>Could not find the content you are looking for</Typography>
  );
}
