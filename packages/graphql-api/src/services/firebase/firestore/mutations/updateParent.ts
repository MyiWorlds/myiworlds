import updateDocumentById from './updateDocumentById';
import { Context } from '@myiworlds/types';
import { stackdriver } from '@myiworlds/cloud-services';

const updateParent = (
  parentId: string,
  parentCollection: string,
  context: Context,
) => {
  try {
    return updateDocumentById(
      { id: parentId, collection: parentCollection },
      context,
      true,
      false,
    );
  } catch (error) {
    stackdriver.report(error);
    return;
  }
};

export default updateParent;
