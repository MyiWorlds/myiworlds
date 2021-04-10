import Button from '@material-ui/core/Button';
import React, { useContext } from 'react';
import { blue } from '@material-ui/core/colors';
import { CircleHydrated } from '../../../../../libs/types/src/circle';
import { convertHydratedCircleToFlatCircle } from '../../Circle/functions/convertHydratedCircleToFlatCircle';
import { getAllCircleState } from '../../../atoms/circleWithIdState';
import { ProfileContext } from '../../../contexts/Profile/ProfileContext';
import { useRecoilValue } from 'recoil';
import { useUpdateCircleMutation } from '../../../generated/apolloComponents';
import {
  makeStyles,
  Theme,
  createStyles,
  CircularProgress,
} from '@material-ui/core';

interface Props {
  id: string;
  handleSuccess: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonProgress: {
      color: blue[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  }),
);

export default function SaveCircle({ id, handleSuccess }: Props) {
  const { selectedProfile } = useContext(ProfileContext);
  const classes = useStyles();

  const fullCircleEditingValue = useRecoilValue(
    getAllCircleState({ id }),
  ) as CircleHydrated;

  const prepCircleForSave = () => {
    if (selectedProfile && selectedProfile.id) {
      const circleToSave = {
        merge: true,
        ...convertHydratedCircleToFlatCircle(fullCircleEditingValue),
        id,
      };

      if (!circleToSave.creator) {
        circleToSave.creator = selectedProfile.id;
      }

      return circleToSave;
    }
  };

  const [
    updateCircle,
    { data: updateCircleData, loading: updateCircleLoading },
  ] = useUpdateCircleMutation({
    variables: prepCircleForSave(),
  });

  const saveItem = () => {
    console.log('Saving Circle');
    updateCircle();
  };

  const handleFinishSaving = () => {
    if (
      !updateCircleLoading &&
      updateCircleData &&
      updateCircleData.updateCircle
    ) {
      handleSuccess();
    }
  };

  React.useEffect(saveItem, []);
  React.useEffect(handleFinishSaving, [updateCircleData, updateCircleLoading]);

  return (
    updateCircleLoading && (
      <CircularProgress size={24} className={classes.buttonProgress} />
    )
  );
}
