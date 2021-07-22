const api = require("./api.js");

const mdlinks = (path, options) =>
  new Promise((resolve, reject) => {
    const absPath = api.absolutePath(path);
    const validPath = api.validPath(absPath);
    if (validPath === false) {
      reject("The path is not valid.");
    } else {
      const getFiles = api.getMdFiles(absPath);
      const getLinks = api.getLinksMd(getFiles);
      if (options && options.validate === true) {
        const validatingLinks = getLinks.map((link) => {
          const validating = api.statusLink(link);
          return validating;
        });
        resolve(Promise.all(validatingLinks));
      } else {
        resolve(getLinks);
      }
    }
  });

module.exports = mdlinks;
