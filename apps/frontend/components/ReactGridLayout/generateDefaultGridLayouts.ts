import { Layouts } from 'react-grid-layout';

export default function generateDefaultGridLayouts(properties: string[]) {
  let layouts: Layouts = {
    xl: [],
    lg: [],
    md: [],
    sm: [],
    xs: [],
  };

  if (properties) {
    properties.forEach((property: string, index) => {
      layouts.xl.push({
        h: 1,
        i: property,
        w: 16,
        x: (index * 16) % 64,
        y: Infinity,
      });
      layouts.lg.push({
        h: 1,
        i: property,
        w: 12,
        x: (index * 12) % 48,
        y: Infinity,
      });
      layouts.md.push({
        h: 1,
        i: property,
        w: 8,
        x: (index * 8) % 32,
        y: Infinity,
      });
      layouts.sm.push({
        h: 1,
        i: property,
        w: 8,
        x: (index * 8) % 24,
        y: Infinity,
      });
      layouts.xs.push({
        h: 1,
        i: property,
        w: 12,
        x: (index * 12) % 12,
        y: Infinity,
      });
    });
  }

  return layouts;
}
