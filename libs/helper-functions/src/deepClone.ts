export function deepClone(obj: any): any {
  if (Array.isArray(obj)) {
    var arr = [];
    for (var i = 0; i < obj.length; i++) {
      arr[i] = deepClone(obj[i]);
    }
    return arr;
  }

  if (typeof obj == 'object') {
    var cloned = {};
    for (let key in obj) {
      cloned[key] = deepClone(obj[key]);
    }
    return cloned;
  }
  return obj;
}
