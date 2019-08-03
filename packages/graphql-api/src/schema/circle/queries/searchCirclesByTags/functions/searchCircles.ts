import circleSwitch from './circleSwitch';
import { Context, SearchCircle } from '@myiworlds/types';

export default async function searchCircles(
  circle: SearchCircle,
  context: Context,
) {
  circle = await circleSwitch(circle, context);

  return circle;
}
