const path = require('path');
const fs = require('fs');
const marked = require('marked');
const fetch = require('node-fetch');

// Resolver si la ruta es relativa
const absolutePath = (filePath) => (path.isAbsolute(filePath) ? paths : path.resolve(filePath));

// Valida si archivo existe
const validPath = (filePath) => fs.existsSync(filePath);

getMdFiles = (filePath) => {
    const elemArray = [];
    const infoPath = fs.statSync(filePath);

    if(infoPath.isDirectory()) {
      const dirElem = fs.readdirSync(filePath);
        if(dirElem.length > 0){
          return dirElem.reduce((acc, elem) => {
            const newAbsPath = path.join(filePath, elem);
            return acc.concat(getMdFiles(newAbsPath));
          }, []);
        }
    }else if(path.extname(filePath) === '.md'){
        elemArray.push(filePath);
    }
    return elemArray;
};

getLinksMd = () => {
  let arrayLinks = [];
  filePath.forEach((file) => {
    const readFile = (filePath) => (fs.readFileSync(filePath, 'utf8'))
    const renderer = new marked.Renderer();
    renderer.link = (href, title, text) => {
      const validHref = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/
      if(validHref.test(href)){
        const linkProperties = {
          href,
          text,
          file
        }
      }
      arrayLinks.push(linkProperties);
    };
    marked(readFile(file), { renderer });
  });
  return arrayLinks;
}

statusLink = (arrayLinks) => {
  const status = arrayLinks.map((elem) =>{
    fetch(elem.href)
    .then((res) => {
      if(status.ok){
        return {
          ...arrayLinks,
          status: res.ok,
          message: message,
        };
      }
    })
    .catch(() => {
      return {
        ...arrayLinks,
        status: res.status,
        message: res.statusText,
      }
    })
  })
  return Promise.all(status);
}

console.log(statusLink('https://form.jotformeu.com/62361464969366'))

module.exports = () => {
  absolutePath,
  validPath,
  getMdFiles,
  getLinksMd,
  statusLink
};
