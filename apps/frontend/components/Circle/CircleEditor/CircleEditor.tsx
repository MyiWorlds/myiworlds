import Card from '@material-ui/core/Card';
import CircleEditorAppBarItems from './CircleEditorAppBarItems';
import CircleFieldController from './components/CircleFieldController';
import CircleFieldsController from './components/CircleFieldsController';
import CircleGridLayoutAppBarItems from '../../ReactGridLayout/Editor/CircleGridLayoutAppBarItems';
import CircleHistoryAppBarItems from './components/CircleHistoryAppBarItems';
import CircleHistoryController from './components/CircleHistoryController';
import Error from '../../Error';
import generateDefaultGridLayouts from '../../ReactGridLayout/Viewer/gridLayoutHelperFunctions';
import LoginModal from '../../../contexts/UserInterface/LoginModal';
import ProfileCanNotEdit from './components/ProfileCanNotEdit';
import ProgressWithMessage from './../../ProgressWithMessage/ProgressWithMessage';
import React, {
  useContext,
  useEffect,
  useRef,
  useState
  } from 'react';
import ReactGridLayoutViewer from './../../ReactGridLayout/Viewer/ReactGridLayoutViewer';
import RequestCreationModal from '../../../contexts/UserInterface/RequestCreationModal';
import ThemeEditor from '../../Theme/Editor/ThemeEditor';
import ThemeViewer from '../../Theme/Viewer';
import UserCanNotCreate from './components/UserCanNotCreate';
import { canEdit } from '@myiworlds/helper-functions';
import { Circle, CircleHydrated } from '@myiworlds/types';
import { CircleFactory } from '@myiworlds/factories';
import { convertHydratedCircleToFlatCircle } from '../functions/convertHydratedCircleToFlatCircle';
import { createCollectionIdClient } from './../../../functions/createCollectionIdClient';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FIRESTORE_COLLECTIONS, RESPONSE_CODES } from '@myiworlds/enums';
import { ProfileContext } from './../../../contexts/Profile/ProfileContext';
import { useGetCircleToEditByIdQuery } from './../../../generated/apolloComponents';
import { UserContext } from './../../../contexts/User/UserContext';
import { UserInterfaceContext } from './../../../contexts/UserInterface/UserInterfaceContext';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import {
  appControllerItemsAtom,
  systemMessagesAtom,
  contentControllerItemsAtom,
  appDialogAtom,
} from '../../../atoms/userInterfaceAtoms';
import {
  useGetFullCircleCloneByIdQuery,
  useUpdateCircleMutation,
} from '../../../generated/apolloComponents';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflow: 'auto',
      height: '100%',
      width: '100%',
    },
    appBar: {
      position: 'relative',
    },
  }),
);

interface Props {
  id: string;
  onSavePath?: string;
  onCancelPath?: string;
}

const CircleEditor = ({ id, onSavePath, onCancelPath }: Props) => {
  const classes = useStyles();
  const router = useRouter();
  const { setContentControllerWidth } = useContext(UserInterfaceContext);
  const setAppDialog = useSetRecoilState(appDialogAtom);
  const setContentControllerItems = useSetRecoilState(
    contentControllerItemsAtom,
  );
  const setAppControllerItems = useSetRecoilState(appControllerItemsAtom);
  const setSystemMessages = useSetRecoilState(systemMessagesAtom);

  const { user } = useContext(UserContext);
  const { selectedProfile } = useContext(ProfileContext);
  const timerToSaveCircle = useRef<any>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [viewer, setViewer] = useState<null | React.ReactElement>(null);
  const [viewingHistory, setViewingHistory] = useState(false);
  const [editingGrid, setEditingGrid] = useState(false);
  const [savingCircle, setSavingCircle] = useState(false);
  const [circleId, setCircleId] = useState<string | undefined>(id);
  const [fieldEditing, setFieldEditing] = useState<null | string>(null);
  const [displaySize, setDisplaySize] = useState<null | number>(null);
  const [
    updateCircleVariables,
    setUpdateCircleVariables,
  ] = useState<Circle | null>(null);
  const [collection, setCollection] = useState<'circles' | 'circles-clones'>(
    FIRESTORE_COLLECTIONS.CIRCLES,
  );
  const [circleLayouts, setCircleLayouts] = useState<Circle | null>(null);
  const [circleEditingsUi, setCircleEditingsUi] = useState<Circle | null>(null);
  const [circleUiElements, setCircleUiElements] = useState<Circle[] | null>(
    null,
  );
  const [circleUiElement, setCircleUiElement] = useState<Circle | null>(null);
  const {
    data: circleData,
    loading: loadingCircle,
    error: errorCircle,
  } = useGetCircleToEditByIdQuery({
    skip: !circleId || collection !== FIRESTORE_COLLECTIONS.CIRCLES,
    variables: {
      id: circleId as string,
    },
  });

  const {
    data: circleCloneData,
    loading: loadingCircleClone,
    error: errorCircleClone,
  } = useGetFullCircleCloneByIdQuery({
    skip: !circleId || collection !== FIRESTORE_COLLECTIONS.CIRCLES_CLONES,
    variables: {
      id: circleId || ('' as string),
    },
  });

  const updateCircleToFetch = (
    newId: string | null,
    newCollection: 'circles' | 'circles-clones' | null,
  ) => {
    setCircleId(newId ? newId : id);
    setCollection(
      newCollection ? newCollection : FIRESTORE_COLLECTIONS.CIRCLES,
    );
  };

  const [
    updateLayoutCircle,
    {
      data: updateLayoutCircleData,
      loading: updateLayoutCircleLoading,
      error: updateLayoutCircleError,
    },
  ] = useUpdateCircleMutation({
    variables: {
      ...(circleLayouts as Circle),
      data: {
        layouts:
          circleLayouts &&
          circleLayouts.data &&
          (circleLayouts as Circle).data.layouts
            ? JSON.stringify(
                (circleLayouts as Circle).data.layouts,
                (key, value: any) => {
                  if (value === Infinity) {
                    return 'Infinity';
                  }
                  return value;
                },
              )
            : {},
      },
      merge: true,
    },
  });

  const [
    updateCircleUiElement,
    {
      data: updateCircleUiElementData,
      loading: updateCircleUiElementLoading,
      error: updateCircleUiElementError,
    },
  ] = useUpdateCircleMutation({
    variables: {
      ...(circleUiElement as Circle),
      merge: true,
    },
  });

  console.log(
    'UPDATE UI ELEMENT',
    circleUiElement,
    updateCircleUiElementData,
    updateCircleUiElementLoading,
    updateCircleUiElementError,
  );

  const [
    updateCircleEditingsUi,
    {
      data: updateCircleEditingsUiData,
      loading: updateCircleEditingsUiLoading,
      error: updateCircleEditingsUiError,
    },
  ] = useUpdateCircleMutation({
    variables: {
      ...(circleEditingsUi as Circle),
      merge: true,
    },
  });

  const [
    updateCircle,
    { data: updateCircleData, loading: updateCircleLoading },
  ] = useUpdateCircleMutation({
    variables: {
      ...(updateCircleVariables as Circle),
      merge: true,
    },
  });

  const componentDidMount = () => {
    if (!user.id) {
      setHasUnsavedChanges(false);
      setAppDialog(<LoginModal />);
    }
    return () => {
      if (setContentControllerItems) {
        setContentControllerItems(null);
      }
      if (setAppControllerItems) {
        setAppControllerItems(null);
      }
    };
  };

  const layoutCircleWasUpdated = () => {
    if (updateLayoutCircleLoading) {
      console.log('Saving layout circle');
    }

    if (updateLayoutCircleError) {
      setSavingCircle(false);
      setSystemMessages({
        title: `There was an error updating the layout. ${updateLayoutCircleError.message}`,
        autoHideDuration: 3000,
        severity: 'error',
      });
    }

    if (
      updateLayoutCircleData &&
      updateLayoutCircleData.updateCircle &&
      updateLayoutCircleData.updateCircle.status === RESPONSE_CODES.SUCCESS
    ) {
      setSavingCircle(false);
      setEditingGrid(false);
      setSystemMessages({
        title: 'Layout was saved!',
        autoHideDuration: 3000,
      });
      if (
        updateCircleVariables &&
        updateCircleVariables.layouts !==
          updateLayoutCircleData.updateCircle.updatedDocumentId &&
        updateLayoutCircleData.updateCircle.updatedDocumentId
      ) {
        handleUpdateCircleAndSave({
          ...updateCircleVariables,
          layouts: updateLayoutCircleData.updateCircle.updatedDocumentId,
        });
      }
    }
  };

  const circleEditingsUiWasUpdated = () => {
    if (updateCircleEditingsUiLoading) {
      console.log('Saving ui circle');
    }
    if (updateCircleEditingsUiError) {
      setSavingCircle(false);
      setSystemMessages({
        title: `There was an error updating the user interface. ${updateCircleEditingsUiError.message}`,
        autoHideDuration: 3000,
        severity: 'error',
      });
    }

    if (
      updateCircleEditingsUiData &&
      updateCircleEditingsUiData.updateCircle &&
      updateCircleEditingsUiData.updateCircle.status === RESPONSE_CODES.SUCCESS
    ) {
      if (
        updateCircleVariables &&
        !updateCircleVariables.ui &&
        updateCircleEditingsUiData.updateCircle.updatedDocumentId
      ) {
        const circleUiId = createCollectionIdClient(
          FIRESTORE_COLLECTIONS.CIRCLES,
        );
        const circleUiToCreate = new CircleFactory().use('LINES').create({
          selectedProfileId: selectedProfile.id,
          header: {
            id: circleUiId,
            title: 'User Interface elements',
            public: true,
          },
          lines: [updateCircleEditingsUiData.updateCircle.updatedDocumentId],
        });
        setCircleEditingsUi(circleUiToCreate);
        handleUpdateCircleAndSave({
          ...updateCircleVariables,
          ui: circleUiId,
        });
      }
      setSavingCircle(false);
      setEditingGrid(false);
      setSystemMessages({
        title: 'User interface was saved!',
        autoHideDuration: 3000,
      });
    }
  };

  const navigateToViewCircle = () => {
    if (onSavePath) {
      console.log('Changing path to one requested.');
      router.push(onSavePath);
    } else {
      console.log('Changing path to view saved circle.', `/id/${id}`);
      router.push(`/id/[id]?=${id}`, `/id/${id}`);
    }
  };

  const circleWasUpdated = () => {
    setSavingCircle(false);
    if (
      updateCircleData &&
      updateCircleData.updateCircle &&
      updateCircleData.updateCircle.status === RESPONSE_CODES.SUCCESS
    ) {
      console.log('Saved Circle');
    } else if (
      updateCircleData &&
      updateCircleData.updateCircle &&
      updateCircleData.updateCircle.status === RESPONSE_CODES.ERROR
    ) {
      setSystemMessages({
        title: updateCircleData.updateCircle.message || '',
        autoHideDuration: 2000,
      });
    }
  };

  const handleSave = () => {
    console.log('Saving circle');
    setContentControllerItems(null);
    if (
      updateCircleVariables &&
      updateCircleVariables.collection ===
        FIRESTORE_COLLECTIONS.CIRCLES_CLONES &&
      updateCircleVariables.clonedFrom
    ) {
      const circleToUdate: Circle = {
        ...updateCircleVariables,
        id: updateCircleVariables.clonedFrom,
      };
      handleUpdateCircleAndSave(circleToUdate);
    }
  };

  const handleGoBack = () => {
    setViewingHistory(false);
    setContentControllerItems(null);
    setUpdateCircleVariables({ id: '' });
    if (
      // eslint-disable-next-line no-restricted-globals
      document.referrer.indexOf(location.protocol + '//' + location.host) ===
        0 &&
      document.referrer !== document.URL
    ) {
      console.log('Changing path to previous one.', document.referrer);
      router.back();
    } else {
      console.log(
        'Canceled editing and the previous route was from another domain.  Navigating to home',
      );
      router.push('/');
    }
  };

  const circleBeingEditedChanged = () => {
    // Need to add if data changes and you have unsaved changes, merge with them
    let circle: CircleHydrated | null = null;

    if (circleData && circleData?.getCircleById) {
      circle = circleData.getCircleById as CircleHydrated;
    } else if (circleCloneData && circleCloneData?.getCircleCloneById) {
      const clonedCircle = {
        ...circleCloneData.getCircleCloneById,
        __typename: 'Circle',
        clonedFrom: undefined,
      };
      circle = clonedCircle as CircleHydrated;
    }

    if (user.id && !user.canCreate) {
      setAppDialog(<RequestCreationModal />);
    } else {
      setAppDialog(null);
    }

    if (circle) {
      console.log('Circle updated, updating...');
      setCircleId(undefined);
      setUpdateCircleVariables(convertHydratedCircleToFlatCircle(circle));

      if (circle.layouts && circle.layouts.data) {
        const layouts = JSON.parse(
          circle.layouts.data.layouts,
          function (key, value) {
            return value === 'Infinity' ? Infinity : value;
          },
        );
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

      if (circle.ui) {
        const cUis: Circle[] = [];
        if (circle.ui && circle.ui.lines && circle.ui.lines?.length) {
          circle.ui.lines.forEach((cUi: CircleHydrated) => {
            if (cUi) {
              const circleUiToPush = convertHydratedCircleToFlatCircle(cUi);
              if (circleUiToPush) {
                cUis.push(circleUiToPush);
              }
            }
          });
          setCircleUiElements(cUis);
        }
      }
    }
  };

  const handleUpdateCircleAndSave = (newValues: Circle) => {
    setUpdateCircleVariables(newValues);
    setSavingCircle(true);
    if (timerToSaveCircle.current) {
      clearTimeout(timerToSaveCircle.current);
    }
    timerToSaveCircle.current = setTimeout(() => {
      updateCircle();
      setHasUnsavedChanges(false);
    }, 1500);
    return () => {
      if (timerToSaveCircle) {
        clearTimeout(timerToSaveCircle.current);
      }
    };
  };

  const handleUpdateLayoutsCircleAndSave = (newValues: Circle) => {
    setCircleLayouts(newValues);
    setSavingCircle(true);
    if (timerToSaveCircle.current) {
      clearTimeout(timerToSaveCircle.current);
    }
    timerToSaveCircle.current = setTimeout(() => {
      if (circleLayouts) {
        updateLayoutCircle();
      }
      setHasUnsavedChanges(false);
    }, 1500);
    return () => {
      if (timerToSaveCircle) {
        clearTimeout(timerToSaveCircle.current);
      }
    };
  };

  const uiElementUpdated = () => {
    if (circleUiElement) {
      timerToSaveCircle.current = setTimeout(() => {
        console.log(
          'circleUiElementcircleUiElementcircleUiElement',
          circleUiElement,
        );
        if (circleUiElement) {
          updateCircleUiElement();
          setCircleUiElement(null);
        }
        setHasUnsavedChanges(false);
      }, 1500);
    }
  };

  // Infinite re render
  // const updateUiCircle = () => {
  //   if (circleEditingsUi) {
  //     updateCircleEditingsUi();
  //   }
  // };

  const handleUpdateUiElementCircleAndSave = (uiElement: Circle) => {
    if (!updateCircleVariables) {
      return;
    }
    const circleHasCircleUi =
      updateCircleVariables &&
      updateCircleVariables.ui !== null &&
      updateCircleVariables.ui !== '';

    if (circleHasCircleUi) {
      // UPDATE UI with current id
      // Use update circle generic?
      const circleUiElementToUpdate = circleUiElements?.find(
        (element: Circle) => element.id === uiElement.id,
      );
      if (circleUiElementToUpdate) {
        // Update ui element
        // TODO I dont think this should be here and it should be moved out to its own function
        updateCircleEditingsUi();
      } else {
        // create new ui element
        // Add ui element to circleUi lines
        setCircleUiElement(uiElement);
      }
      setSavingCircle(true);
      if (timerToSaveCircle.current) {
        clearTimeout(timerToSaveCircle.current);
      }

      return () => {
        if (timerToSaveCircle) {
          clearTimeout(timerToSaveCircle.current);
        }
      };
    } else {
      const circleUiId = `ui-${updateCircleVariables.id}`;
      const circleUiToCreate = new CircleFactory().use('LINES').create({
        selectedProfileId: selectedProfile.id,
        header: {
          id: circleUiId,
          title: 'User Interface elements',
          public: true,
        },
        lines: [uiElement.id],
      });
      setCircleUiElement(uiElement); //Not sure if this is correct DOUBLE CHECK
      setCircleEditingsUi(circleUiToCreate);
      setUpdateCircleVariables({
        ...updateCircleVariables,
        ui: circleUiId,
      } as Circle);
    }
    // const uiIds: string[] = [];
    // const updatedUis =
    //   circleUiElements && circleUiElements.length
    //     ? circleUiElements?.map(ui => {
    //         uiIds.push(ui.id);
    //         if (ui.id === uiElement.id) {
    //           return uiElement;
    //         } else {
    //           return ui;
    //         }
    //       })
    //     : [uiElement];

    // if (circleEditingsUi) {
    //   setCircleEditingsUi({
    //     ...circleEditingsUi,
    //     lines: uiIds,
    //   } as Circle);
    // } else {
    //   // setCircleEditingsUi();
    // }
    // setCircleUiElement(uiElement);
    // setCircleUiElements(updatedUis);
    // setSavingCircle(true);
    // if (timerToSaveCircle.current) {
    //   clearTimeout(timerToSaveCircle.current);
    // }
    // timerToSaveCircle.current = setTimeout(() => {
    //   if (circleUiElement) {
    //     updateCircleUiElement();
    //   }
    //   setHasUnsavedChanges(false);
    // }, 1500);
    // return () => {
    //   if (timerToSaveCircle) {
    //     clearTimeout(timerToSaveCircle.current);
    //   }
    // };
  };

  const handleSaveHistory = () => {
    setViewingHistory(false);
    handleSave();
  };

  const handleCancelViewingHistory = () => {
    setViewingHistory(false);
    if (updateCircleVariables && updateCircleVariables.id !== id) {
      setCircleId(id);
      setCollection(FIRESTORE_COLLECTIONS.CIRCLES);
    }
  };

  const updateAppBarItems = (appBarItems?: React.ReactElement) => {
    let newAppBarItems = null;

    if (!updateCircleVariables) {
      return;
    }

    if (editingGrid) {
      newAppBarItems = (
        <CircleGridLayoutAppBarItems
          circle={updateCircleVariables}
          displaySize={displaySize}
          setDisplaySize={setDisplaySize}
          editingGrid={editingGrid}
          updateLayoutCircle={updateLayoutCircle}
          isSaving={updateLayoutCircleLoading}
          handleCancel={() => setEditingGrid(false)}
        />
      );
    } else if (viewingHistory) {
      newAppBarItems = (
        <CircleHistoryAppBarItems
          handleSave={handleSaveHistory}
          updateCircleLoading={updateCircleLoading}
          setViewingHistory={setViewingHistory}
          viewingClone={updateCircleVariables.clonedFrom ? true : false}
          viewingId={updateCircleVariables.id}
          handleCancel={handleCancelViewingHistory}
        />
      );
    } else {
      newAppBarItems = (
        <CircleEditorAppBarItems
          circle={updateCircleVariables}
          hasUnsavedChanges={hasUnsavedChanges}
          handleFinished={navigateToViewCircle}
          isSaving={
            updateCircleLoading || savingCircle || updateLayoutCircleLoading
          }
          setViewingHistory={setViewingHistory}
          updateControllerAndViewer={updateControllerAndViewer}
          viewingHistory={viewingHistory}
          setEditingGrid={setEditingGrid}
          displaySize={displaySize}
          setDisplaySize={setDisplaySize}
          handleGoBack={handleGoBack}
        />
      );
    }
    setAppControllerItems(newAppBarItems);
  };

  const updateControllerAndViewer = () => {
    let newController = null;
    let newViewer = null;

    const circle = updateCircleVariables;

    if (!circle || !circleLayouts) {
      return;
    }

    console.log('There was a change to the Circle, updating the editor.');
    newViewer = viewer;
    switch (circle.type) {
      case 'THEME': {
        setDisplaySize(null);
        newController = (
          <ThemeEditor
            circle={circle}
            updateCircle={handleUpdateCircleAndSave}
          />
        );
        newViewer = (
          <ThemeViewer
            circle={circle}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
        );
        break;
      }
      default: {
        newViewer = (
          <ReactGridLayoutViewer
            circle={circle}
            editingGrid={editingGrid}
            setFieldEditing={setFieldEditing}
            fieldEditing={fieldEditing}
            displaySize={displaySize}
            circleLayouts={circleLayouts}
            setCircleLayouts={setCircleLayouts}
          />
        );
        newController = fieldEditing ? (
          <CircleFieldController
            fieldEditing={fieldEditing}
            setFieldEditing={setFieldEditing}
            updateCircle={handleUpdateCircleAndSave}
            circle={circle}
            circleLayouts={circleLayouts}
            setCircleLayouts={
              editingGrid ? setCircleLayouts : handleUpdateLayoutsCircleAndSave
            }
            setCircleUi={handleUpdateUiElementCircleAndSave}
            displaySize={displaySize}
            circleUis={circleUiElements}
          />
        ) : (
          <CircleFieldsController
            circle={circle}
            setFieldEditing={setFieldEditing}
          />
        );
      }
    }

    if (editingGrid && fieldEditing) {
      newController = (
        <CircleFieldController
          fieldEditing={fieldEditing}
          setFieldEditing={setFieldEditing}
          updateCircle={handleUpdateCircleAndSave}
          circle={circle}
          circleLayouts={circleLayouts}
          setCircleLayouts={setCircleLayouts}
          displaySize={displaySize}
          circleUis={circleUiElements}
          setCircleUi={handleUpdateUiElementCircleAndSave}
        />
      );
    }

    if (viewingHistory) {
      setDisplaySize(null);
      newController = (
        <CircleHistoryController
          circleId={circle.clonedFrom ? circle.clonedFrom : circle.id}
          clonedCircleIdViewing={
            viewingHistory && circle.clonedFrom ? circle.id : null
          }
          updateCircleToFetch={updateCircleToFetch}
          handleSave={handleSave}
          contentCircle={circle}
        />
      );
    }

    if (displaySize) {
      newViewer = (
        <Card style={{ width: displaySize, margin: '0px auto' }}>
          {newViewer}
        </Card>
      );
    }

    setViewer(newViewer);
    setContentControllerItems(newController);
  };

  const updateNavWidth = () => {
    console.log('Updating the editors navigation width.');
    let contentControllerWidth = null;

    const circle = updateCircleVariables;
    if (circle) {
      switch (circle.type) {
        case 'THEME': {
          contentControllerWidth = 500;
          break;
        }
        default: {
          contentControllerWidth = 400;
        }
      }
    }

    if (viewingHistory) {
      contentControllerWidth = 400;
    }

    if (contentControllerWidth) {
      setContentControllerWidth(contentControllerWidth);
    }
  };

  useEffect(componentDidMount, []);
  useEffect(circleBeingEditedChanged, [
    loadingCircle,
    loadingCircleClone,
    user,
    viewingHistory,
  ]);
  useEffect(uiElementUpdated, [circleUiElement]);
  useEffect(updateAppBarItems, [
    hasUnsavedChanges,
    circleData,
    user,
    viewingHistory,
    updateCircleVariables,
    updateCircleLoading,
    updateLayoutCircleLoading,
    savingCircle,
    loadingCircle,
    loadingCircleClone,
    editingGrid,
    displaySize,
  ]);
  useEffect(updateControllerAndViewer, [
    updateCircleVariables,
    viewingHistory,
    editingGrid,
    fieldEditing,
    displaySize,
    circleLayouts,
  ]);
  useEffect(updateNavWidth, [
    viewingHistory,
    loadingCircle,
    loadingCircleClone,
  ]);
  useEffect(circleWasUpdated, [updateCircleData]);
  useEffect(layoutCircleWasUpdated, [
    updateLayoutCircleData,
    updateLayoutCircleLoading,
    updateLayoutCircleError,
  ]);

  useEffect(circleEditingsUiWasUpdated, [
    updateCircleEditingsUiData,
    updateCircleEditingsUiLoading,
    updateCircleEditingsUiError,
  ]);

  if (!user.canCreate) {
    return <UserCanNotCreate />;
  }

  if (errorCircle) {
    return <Error error={errorCircle} />;
  }

  if (errorCircleClone) {
    return <Error error={errorCircleClone} />;
  }

  if (loadingCircle || loadingCircleClone) {
    return <ProgressWithMessage message="Loading Circle" />;
  }

  if (!updateCircleVariables) {
    return null;
  }

  if (
    !selectedProfile ||
    (updateCircleVariables &&
      !canEdit(updateCircleVariables, selectedProfile.id)) ||
    !user.isSystemAdmin
  ) {
    return <ProfileCanNotEdit />;
  }

  return <div className={classes.root}>{viewer}</div>;
};

export default CircleEditor;
