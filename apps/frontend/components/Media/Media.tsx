import * as React from 'react';
import FontIcon from './types/FontIcon/FontIcon';
import Image from './types/Image/Image';
import Video from './types/Video/Video';
import { CircleHydrated } from '@myiworlds/types';

interface Props {
  circle: CircleHydrated;
  classes?: { [key: string]: string };
}

const Media: React.FunctionComponent<Props> = ({ circle, classes }) => {
  if (circle) {
    switch (circle.type) {
      case 'MEDIA_VIDEO_GCS':
      case 'MEDIA_VIDEO_HREF':
        return <Video circle={circle} classes={classes} />;
      case 'MEDIA_IMAGE_GCS':
      case 'MEDIA_IMAGE_HREF':
        return <Image circle={circle} classes={classes} />;
      case 'MEDIA_FONT_ICON':
        return <FontIcon circle={circle} classes={classes} />;
      default:
        return null;
    }
  } else {
    return null;
  }
};

export default Media;
