const {absolutePath, validPath, getMdFiles, getLinksMd } = require('../src/api.js');

  describe('absolutePath', () => {
    it('it is a function', () => {
      expect(typeof absolutePath).toBe('function');
    });
    it('Returns the same path if it is absolute', () => {
      const result = `${__dirname}/test/files_test`;
      expect(absolutePath(`${__dirname}/test/files_test`)).toStrictEqual(result);
    });
  
    it('Resolves the path if it is relative', () => {
      const result = `${__dirname}\\files_test`;
      expect(absolutePath('./test/files_test')).toStrictEqual(result);
    });
  });


  describe('Valid Path', () => {
    it('is a function', () => {
      expect(typeof validPath).toBe('function');
    });
    it('verifies if a path is valid', () => {
      const result = true;
      expect(validPath(`${__dirname}\\files_test`)).toStrictEqual(result);
    });
  });

  describe('Get MD files', () => {
    it('is a function', () => {
      expect(typeof getMdFiles).toBe('function');
    });

    it('verifies if the path is a directory, analize the content and returns only the mdfiles in an array', () => {
      const result = [
        'C:\\Users\\Mari\\Documents\\GitHub\\LIM015-md-links\\test\\files_test\\fail_test\\fail.md',
        'C:\\Users\\Mari\\Documents\\GitHub\\LIM015-md-links\\test\\files_test\\link.md',
        'C:\\Users\\Mari\\Documents\\GitHub\\LIM015-md-links\\test\\files_test\\no_link.md'
      ];
      expect(getMdFiles('C:\\Users\\Mari\\Documents\\GitHub\\LIM015-md-links\\test\\files_test')).toStrictEqual(result);
    });
    it('returns en empty array if the folder has no files .md', () => {
      const result = [
        'C:\\Users\\Mari\\Documents\\GitHub\\LIM015-md-links\\test\\files_test\\link.md'
      ]
      expect(getMdFiles('C:\\Users\\Mari\\Documents\\GitHub\\LIM015-md-links\\test\\files_test\\link.md')).toStrictEqual(result);
    });
    it('returns an empty array if the file is not .md', () => {
      expect(getMdFiles('C:\\Users\\Mari\\Documents\\GitHub\\LIM015-md-links\\test\\files_test\\hola_mundo.js')).toStrictEqual([]);
    });
    it('returns an empty array if the folder does not have elements', () => {
      expect(getMdFiles(`${__dirname}\\files_test\\empty`)).toStrictEqual([]);
    });
  });
 
  describe('Get md links', () => {
    it('is a function', () => {
      expect(typeof getLinksMd).toBe('function');
    });

    it('returns links of .md', () => {
      const result = [
        {
          href: 'https://es.wikipedia.org/wiki/Markdown',
          text: 'Markdown',
          file: 'C:\\Users\\Mari\\Documents\\GitHub\\LIM015-md-links\\test\\files_test\\link.md',
      }]
      expect(getLinksMd('C:\\Users\\Mari\\Documents\\GitHub\\LIM015-md-links\\test\\files_test\\link.md')).toStrictEqual(result);
    })
    it('returns links of .md', () => {
      expect(getLinksMd('C:\\Users\\Mari\\Documents\\GitHub\\LIM015-md-links\\test\\files_test\\no_link.md')).toStrictEqual([]);
    })
});
