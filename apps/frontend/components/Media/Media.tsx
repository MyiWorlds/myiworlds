import * as React from 'react';
import FontIcon from './types/FontIcon/FontIcon';
import Image from './types/Image/Image';
import Video from './types/Video/Video';
import { CircleHydrated } from '@myiworlds/types';

interface Props {
  circle: CircleHydrated;
}

const Media: React.FunctionComponent<Props> = ({ circle }) => {
  if (circle) {
    switch (circle.type) {
      case 'MEDIA_VIDEO_GCS':
      case 'MEDIA_VIDEO_HREF':
        return <Video circle={circle} />;
      case 'MEDIA_IMAGE_GCS':
      case 'MEDIA_IMAGE_HREF':
        return <Image circle={circle} />;
      case 'MEDIA_FONT_ICON':
        return <FontIcon circle={circle} />;
      default:
        return null;
    }
  } else {
    return null;
  }
};

export default Media;
