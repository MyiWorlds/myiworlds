import React from 'react';

interface Props {
  appDialog: React.ReactElement;
}

const AppDialog: React.FC<Props> = React.memo(({ appDialog }) => {
  return appDialog;
});

export default AppDialog;
