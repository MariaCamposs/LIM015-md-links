const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

// Resolver si la ruta es relativa
const absolutePath = (filePath) => (path.isAbsolute(filePath) ? filePath : path.resolve(filePath));

// Valida si archivo existe
const validPath = (filePath) => fs.existsSync(filePath);

const getMdFiles = (filePath) => {
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

const regx = /\[([\w\s\d.()]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg;
const regxLink = /\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg;
const regxText = /\[([\w\s\d.()]+)\]/g;

const getLinksMd = (filePath) => {
  const linksArr = [];
  filePath.forEach((myfile) => {
    const fileRead = fs.readFileSync(myfile, 'utf-8');
    const links = fileRead.match(regx);
    if (links) {
      links.forEach((link) => {
        const myhref = link.match(regxLink).join().slice(1, -1);
        const mytext = link.match(regxText).join().slice(1, -1);
        const linksObj = {
          href: myhref,
          text: mytext,
          file: myfile,
        };
        return linksArr.push(linksObj);
      });
    }
  });
  return linksArr;
};

const statusLink = (arrLinks) => fetch(arrLinks.href) 
    .then((res) => {
      const mystatus = res.status;
      const mymessage = res.status !== 200 ? 'FAIL' : res.statusText;
        return {
          ...arrLinks,
          status: mystatus,
          message: mymessage,
        };
      })
    .catch(() => {
      return {
        ...arrLinks,
        status: 'no status',
        message: 'FAIL',
      }
    });

module.exports = {
  absolutePath,
  validPath,
  getMdFiles,
  getLinksMd,
  statusLink
};
