export const parserAttr = (params: any) => {
  const newParams: any = {}
  for (const param of Object.keys(params)) {
    let newAttribute;
    if (param.indexOf('ID') > -1) {
      newAttribute = param.replace('ID', '_id');
      newParams[newAttribute] = params[param];
      continue;
    }
    const chars = []
    for (const c of param) {
      if (c === c.toUpperCase()) {
        chars.push(`_${c.toLowerCase()}`);
        continue;
      }
      chars.push(c);
    }
    newParams[chars.join('')] = params[param];
  }
  return newParams
}