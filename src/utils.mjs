export function sanitize(v:Record<string, any>) {
  if (typeof v === "object") {
      for (var key in v) {
        console.log(key,/^\$/.test(key) )
        if (/^\$/.test(key) ) {
          delete v[key];
        } else {
          sanitize(v[key]);
        }
      }
    }
    return v;
};