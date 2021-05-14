import { appDialogAtom } from '../../../atoms/userInterfaceAtoms';
import { useRecoilValue } from 'recoil';

const AppDialog = () => {
  const appDialog = useRecoilValue(appDialogAtom);
  return appDialog;
};

export default AppDialog;
