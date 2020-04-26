export function deepMerge(source: any, dest: any) {
  for (const prop in source) {
    if (!source.hasOwnProperty(prop)) {
      continue;
    }

    if (source[prop] === null) {
      // property is null
      dest[prop] = source[prop];
      continue;
    }

    if (typeof source[prop] === 'object') {
      // if property is object let's dive into in
      if (Array.isArray(source[prop])) {
        dest[prop] = [];
      } else {
        if (
          !dest.hasOwnProperty(prop) ||
          typeof dest[prop] !== 'object' ||
          dest[prop] === null ||
          Array.isArray(dest[prop]) ||
          !Object.keys(dest[prop]).length
        ) {
          dest[prop] = {};
        }
      }
      deepMerge(source[prop], dest[prop]);
      continue;
    }

    // property is simple type: string, number, e.t.c
    dest[prop] = source[prop];
  }
  return dest;
}
