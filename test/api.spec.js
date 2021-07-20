const {
    absolutePath,
    /*validPath,
    getMdfiles,
    statusLink*/
  } = require('../src/api.js');
  
  describe('absolutePath', () => {
    it('it is a function', () => {
      expect(typeof absolutePath).toBe('function');
    });
  });

  /*
    it('Returns the same path if it is absolute', () => {
      const result = `${__dirname}/test/files_test`;
      expect(absolutePath(`${__dirname}/test/files_test`)).toStrictEqual(result);
    });
  
    it('Resolves the path if it is relative', () => {
      const result = `${__dirname}\\files_test`;
      expect(absolutePath('./test/files_test')).toStrictEqual(result);
    });
  });
  */

  /*
  describe('Valid Path', () => {
    it('is a function', () => {
      expect(typeof validPath).toBe('function');
    });
  
    it('verifies if a path is valid', () => {
      const result = true;
      expect(validPath(`${__dirname}\\files_test`)).toStrictEqual(result);
    });
  });
  */
 /*
  describe('Get md files', () => {
    it('is a function', () => {
      expect(typeof getMdfiles).toBe('function');
    });
  
    it('verifies if the path is a directory, analize the content and returns only the mdfiles_test in an array', () => {
      const result = [
        `${__dirname}\\files_test\\fail_test\\fail.md`,
        `${__dirname}\\files_test\\link.md`,
        `${__dirname}\\files_test\\no_link.md`,
      ];
      expect(getMdFiles(`${__dirname}\\files_test`)).toStrictEqual(result);
    });
  
    it('returns an empty array if the folder does not have elements', () => {
      expect(getMdfiles(`${__dirname}\\files_test\\empty`)).toStrictEqual([]);
    });
  
    it('verifies if the path is a file md and returns it in an array', () => {
      const result = [`${__dirname}\\files_test\\link.md`];
      expect(getMdfiles(`${__dirname}\\files_test\\link.md`)).toStrictEqual(result);
    });
    it('returns an empty array if the file is not .md', () => {
      expect(getMdfiles(`${__dirname}\\files_test\\hola_mundo.js`)).toStrictEqual([]);
    });
  });
  */
 /*
  describe('Get md links', () => {
    it('is a function', () => {
      expect(typeof statusLink).toBe('function');
    });
  
    it('Put the links in an array, with the href, text and file', () => {
      const result = [
        {
          href: 'https://nodejs.org/',
          text: 'Node.js',
          file: `${__dirname}\\files_test\\link.md`,
        },
      ];
      expect(statusLink([`${__dirname}\\files_test\\link.md`])).toStrictEqual(result);
    });
  
    it('returns an empty array if the folder does not have links', () => {
      expect(statusLink([`${__dirname}\\files_test\\no_link.md`])).toStrictEqual([]);
    });
});
*/