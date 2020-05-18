import { Layouts } from 'react-grid-layout';
import { Theme } from '@material-ui/core/styles';

export const generateXl = (
  property: string,
  index: number,
  yOverride?: number,
) => {
  return {
    h: 16,
    i: property,
    w: 16,
    x: (index * 16) % 64,
    y: yOverride ? yOverride : (index / 4) % 64,
    static: false,
    minW: 1,
    maxW: Infinity,
    minH: 1,
    maxH: Infinity,
  };
};
export const generateL = (
  property: string,
  index: number,
  yOverride?: number,
) => {
  return {
    h: 16,
    i: property,
    w: 12,
    x: (index * 12) % 48,
    y: yOverride ? yOverride : (index / 4) % 48,
    static: false,
    minW: 1,
    maxW: Infinity,
    minH: 1,
    maxH: Infinity,
  };
};
export const generateMd = (
  property: string,
  index: number,
  yOverride?: number,
) => {
  return {
    h: 16,
    i: property,
    w: 8,
    x: (index * 8) % 32,
    y: yOverride ? yOverride : (index / 4) % 3,
    static: false,
    minW: 1,
    maxW: Infinity,
    minH: 1,
    maxH: Infinity,
  };
};
export const generateSm = (
  property: string,
  index: number,
  yOverride?: number,
) => {
  return {
    h: 16,
    i: property,
    w: 8,
    x: (index * 8) % 24,
    y: yOverride ? yOverride : (index / 3) % 2,
    static: false,
    minW: 1,
    maxW: Infinity,
    minH: 1,
    maxH: Infinity,
  };
};
export const generateXs = (
  property: string,
  index: number,
  yOverride?: number,
) => {
  return {
    h: 16,
    i: property,
    w: 12,
    x: (index * 12) % 12,
    y: yOverride ? yOverride : (index / 1) % 12,
    static: false,
    minW: 1,
    maxW: Infinity,
    minH: 1,
    maxH: Infinity,
  };
};

export const generateLayoutFromSize = (
  size: 'xl' | 'lg' | 'md' | 'sm' | 'xs',
  property: string,
  index: number,
  yOverride?: number,
) => {
  switch (size) {
    case 'xs':
      return generateXs(property, index, yOverride);
    case 'sm':
      return generateSm(property, index, yOverride);
    case 'md':
      return generateMd(property, index, yOverride);
    case 'lg':
      return generateL(property, index, yOverride);
    case 'xl':
    default:
      return generateXl(property, index, yOverride);
  }
};

export const getCurrentLayoutSize = (
  displaySize: number | null | undefined,
  theme: Theme,
) => {
  switch (displaySize) {
    case theme.breakpoints.values.sm + 1:
      return 'sm';
    case theme.breakpoints.values.md + 1:
      return 'md';
    case theme.breakpoints.values.lg + 1:
      return 'lg';
    case theme.breakpoints.values.xl + 1:
      return 'xl';
    case 300:
    default:
      return 'xs';
  }
};

export const generateSpacerLayoutFromSize = (
  size: 'xl' | 'lg' | 'md' | 'sm' | 'xs',
  index: number,
) => {
  const property = `spacer-${Date.now()}-${Math.floor(
    Math.random() * Math.floor(1000),
  )}`;
  return generateLayoutFromSize(size, property, index, Infinity);
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
