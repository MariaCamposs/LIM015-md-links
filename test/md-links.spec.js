const mdlinks = require('../src/index.js');

describe('mdlinks', () => {
    it('is a function', () => {
      expect(typeof mdlinks).toBe('function');
    });
  
    test('returns an array of href, text and file', () => {
      const obj = [
        {
          href: 'https://es.wikipedia.org/wiki/Markdown',
          text: 'Markdown',
          file: `${__dirname}\\files_test\\link.md`,
        },
      ];
      expect(mdlinks('./test/files_test/link.md')).resolves.toEqual(obj);
    });
  
    test('returns an array of href, text and file when option is false', () => {
      const obj = [
        {
          href: 'https://es.wikipedia.org/wiki/Markdown',
          text: 'Markdown',
          file: `${__dirname}\\files_test\\link.md`,
        },
      ];
      expect(mdlinks('./test/files_files/link.md', { validate: false })).resolves.toEqual(obj);
    });
  
    test('returns an array of all when option validate is true', () => {
      const obj = [{
        file: `${__dirname}\\files_test\\link.md`,
        href: 'https://es.wikipedia.org/wiki/Markdown',
        message: 'OK',
        status: 200,
        text: 'Markdown',
      }];
      expect(mdlinks('./test/files_test/link.md', { validate: true })).resolves.toEqual(obj);
    });
  
    test('returns an error when path is not valid', () => {
      const err = 'The path is not valid.';
      return mdlinks('./link.md', { validate: true }).catch((error) => {
        expect(error).toEqual(err);
      });
    });
  });