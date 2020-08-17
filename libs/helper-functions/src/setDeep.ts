export function setDeep(
  obj: any,
  path: string[],
  property: string,
  value: any,
  setrecursively = false,
) {
  path.reduce((a: any, b: any, level: any) => {
    console.log(a, b, level);
    if (
      setrecursively &&
      typeof a[b] === 'undefined' &&
      level !== path.length
    ) {
      a[b] = {};
      return a[b];
    }

    if (level === path.length - 1) {
      a[b] = {
        ...a[b],
        [property]: value,
      };
      return value;
    }
    return a[b];
  }, obj);
}
