import { Layouts } from 'react-grid-layout';

export const generateXl = (property: string, index: number) => {
  return {
    h: 16,
    i: property,
    w: 16,
    x: (index * 16) % 64,
    y: (index / 4) % 64,
    static: false,
    minW: 0,
    maxW: Infinity,
    minH: 0,
    maxH: Infinity,
  };
};
export const generateL = (property: string, index: number) => {
  return {
    h: 16,
    i: property,
    w: 12,
    x: (index * 12) % 48,
    y: (index / 4) % 48,
    static: false,
    minW: 0,
    maxW: Infinity,
    minH: 0,
    maxH: Infinity,
  };
};
export const generateMd = (property: string, index: number) => {
  return {
    h: 16,
    i: property,
    w: 8,
    x: (index * 8) % 32,
    y: (index / 4) % 3,
    static: false,
    minW: 0,
    maxW: Infinity,
    minH: 0,
    maxH: Infinity,
  };
};
export const generateSm = (property: string, index: number) => {
  return {
    h: 16,
    i: property,
    w: 8,
    x: (index * 8) % 24,
    y: (index / 3) % 2,
    static: false,
    minW: 0,
    maxW: Infinity,
    minH: 0,
    maxH: Infinity,
  };
};
export const generateXs = (property: string, index: number) => {
  return {
    h: 16,
    i: property,
    w: 12,
    x: (index * 12) % 12,
    y: (index / 1) % 12,
    static: false,
    minW: 0,
    maxW: Infinity,
    minH: 0,
    maxH: Infinity,
  };
};

export const generateLayoutFromSize = (
  size: 'xl' | 'lg' | 'md' | 'sm' | 'xs',
  property: string,
  index: number,
) => {
  switch (size) {
    case 'xs':
      return generateXs(property, index);
    case 'sm':
      return generateSm(property, index);
    case 'md':
      return generateMd(property, index);
    case 'lg':
      return generateL(property, index);
    case 'xl':
    default:
      return generateXl(property, index);
  }
};

export default function generateDefaultGridLayouts(properties: string[]) {
  const layouts: Layouts = {
    xl: [],
    lg: [],
    md: [],
    sm: [],
    xs: [],
  };

  if (properties) {
    properties.forEach((property: string, index) => {
      layouts.xl.push(generateXl(property, index));
      layouts.lg.push(generateL(property, index));
      layouts.md.push(generateMd(property, index));
      layouts.sm.push(generateSm(property, index));
      layouts.xs.push(generateXs(property, index));
    });
  }

  return layouts;
}
