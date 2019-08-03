import circleSwitch from './circleSwitch';
import { Context, SearchCircle } from '@myiworlds/types';

const mapLines = async (circle: SearchCircle, context: Context) => {
  circle.lines = await Promise.all(
    circle.lines.map(async circleChild => circleSwitch(circleChild, context)),
  );

  return circle;
};

export default mapLines;
