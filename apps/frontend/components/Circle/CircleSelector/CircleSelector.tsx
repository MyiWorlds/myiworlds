import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Error from './../../../components/Error';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Media from '../../Media/Media';
import Progress from './../../Progress/Progress';
import React, { useContext, useEffect, useState } from 'react';
import SearchTextField from '../../../contexts/UserInterface/AppController/SearchTextField';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { CircleHydrated } from '@myiworlds/types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FIRESTORE_COLLECTIONS, RESPONSE_CODES } from '@myiworlds/enums';
import { systemMessagesAtom } from '../../../atoms/userInterfaceAtoms';
import { TransitionProps } from '@material-ui/core/transitions';
import { UserInterfaceContext } from '../../../contexts/UserInterface/UserInterfaceContext';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import {
  CopyCircleMutation,
  useCopyCircleMutation,
  useGetCircleAndLinesByIdLazyQuery,
} from './../../../generated/apolloComponents';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    root: {
      flexGrow: 1,
      margin: theme.spacing(2),
    },
    cardActionsArea: {
      textAlign: 'center',
    },
    media: {
      margin: theme.spacing(2),
      height: 64,
      fontSize: 64,
    },
    sectionMedia: {
      fontSize: 32,
      marginTop: 3,
    },
  }),
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CircleSelector = React.memo(() => {
  const router = useRouter();
  const classes = useStyles();
  const { creatingCircle, setCreatingCircle } = useContext(
    UserInterfaceContext,
  );
  const [idToCopy, setIdToCopy] = useState<null | string>(null);
  const setSystemMessages = useSetRecoilState(systemMessagesAtom);

  const [
    getCircle,
    {
      loading: loadingGetCircle,
      data: getCircleByIdQuery,
      error: errorGettingCircle,
    },
  ] = useGetCircleAndLinesByIdLazyQuery({
    variables: {
      id: 'baseTypesList',
    },
  });

  const [
    copyCircle,
    {
      data: copyCircleData,
      loading: copyCircleLoading,
      error: copyCircleError,
    },
  ] = useCopyCircleMutation({
    variables: {
      id: idToCopy as string,
      collection: FIRESTORE_COLLECTIONS.CIRCLES,
    },
  });

  const copyCircleDataChanged = () => {
    const copyCircleResponse: CopyCircleMutation | undefined = copyCircleData;

    if (
      copyCircleResponse &&
      copyCircleResponse.copyCircle &&
      copyCircleResponse?.copyCircle?.status === RESPONSE_CODES.SUCCESS &&
      copyCircleResponse.copyCircle.copiedCircleId
    ) {
      setCreatingCircle(false);
      router.push(
        `/edit/[id]?=${copyCircleResponse.copyCircle.copiedCircleId}`,
        `/edit/${copyCircleResponse.copyCircle.copiedCircleId}`,
      );
    } else if (
      copyCircleResponse?.copyCircle?.status === RESPONSE_CODES.ERROR
    ) {
      setSystemMessages({
        title: copyCircleResponse?.copyCircle?.message
          ? copyCircleResponse?.copyCircle?.message
          : 'There was an error copying the circle. Please try again',
        autoHideDuration: 2000,
      });
    }
  };

  const handleClose = () => {
    setCreatingCircle(false);
  };

  const handleGetCircles = () => {
    if (creatingCircle) {
      getCircle();
    }
  };

  const handleSelectContentType = () => {
    if (idToCopy) {
      copyCircle();
    }
  };

  useEffect(handleGetCircles, [creatingCircle]);
  useEffect(handleSelectContentType, [idToCopy]);
  useEffect(copyCircleDataChanged, [
    copyCircleData,
    copyCircleLoading,
    copyCircleError,
  ]);

  let content = null;
  if (copyCircleLoading) {
    content = <Progress />;
  }
  if (loadingGetCircle) {
    content = <Progress />;
  }
  if (copyCircleError) {
    content = (
      <Error
        error={copyCircleError}
        message={'There was an copying the content'}
      />
    );
  }
  if (errorGettingCircle) {
    content = (
      <Error
        error={errorGettingCircle}
        message={'There was an error getting the content types'}
      />
    );
  }

  let circle: CircleHydrated | null = null;

  if (getCircleByIdQuery) {
    if (getCircleByIdQuery.getCircleById) {
      circle = getCircleByIdQuery.getCircleById as CircleHydrated;
    }
  }

  if (!circle) {
    return null;
  } else {
    content = (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item sm={12} key={circle.title}>
            <CardHeader
              avatar={
                circle.media && (
                  <Media
                    circle={circle.media}
                    classes={{ icon: classes.sectionMedia }}
                  />
                )
              }
              title={circle.title}
            />
          </Grid>
          {circle.lines &&
            circle.lines.length &&
            circle.lines.map((creationType: CircleHydrated) => {
              return (
                <Grid item xs={6} sm={3} lg={2} key={creationType.title}>
                  <Card>
                    <CardActionArea
                      className={classes.cardActionsArea}
                      disabled={copyCircleLoading}
                      onClick={() => setIdToCopy(creationType.id)}
                    >
                      {creationType.media && (
                        <Media
                          circle={creationType.media}
                          classes={{ icon: classes.media }}
                        />
                      )}
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                          {creationType.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </div>
    );
  }

  return (
    <Dialog
      fullScreen
      open={creatingCircle}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Select Content Type to create
          </Typography>
        </Toolbar>
      </AppBar>

      <SearchTextField />

      {content}
    </Dialog>
  );
});

export default CircleSelector;
