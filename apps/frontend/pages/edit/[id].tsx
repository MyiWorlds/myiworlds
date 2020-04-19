import CircleEditor from './../../components/Circle/CircleEditor/CircleEditor';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { Typography } from '@material-ui/core';
import { useRouter } from 'next/router';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditCircle = () => {
  const router = useRouter();
  let circleId = null;
  if (router.query.id) {
    if (Array.isArray(router.query.id)) {
      circleId = router.query.id[0];
    } else {
      circleId = router.query.id;
    }

    return (
      <Dialog fullScreen open={true} TransitionComponent={Transition}>
        <CircleEditor id={circleId} />
      </Dialog>
    );
  }

  return <Typography>Circle Editor requires an id</Typography>;
};

export default EditCircle;
