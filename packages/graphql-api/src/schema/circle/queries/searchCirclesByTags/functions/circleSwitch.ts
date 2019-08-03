import getDocumentsAndRemoveInvalid from './getDocumentsAndRemoveInvalid';
import mapLines from './mapLines';
import { Context, SearchCircle } from '@myiworlds/types';

const circleSwitch = async (circle: SearchCircle, context: Context) => {
  switch (circle.type) {
    case 'QUERY': {
      circle = await getDocumentsAndRemoveInvalid(circle, context);
      return circle;
    }

    case 'QUERIES':
    case 'LINES': {
      circle = await mapLines(circle, context);
      return circle;
    }

    default: {
      return circle;
    }
  }
};

export default circleSwitch;
