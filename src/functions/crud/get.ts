export const sortFiles = (files: Array<any>) =>
  files.sort((x, y) => x.timestamp - y.timestamp).reverse()