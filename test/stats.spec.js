const {statistics, broken} = require('../src/stats');

describe('Statistics', () => {
    it('it is a function', () => {
      expect(typeof statistics).toBe('function');
    });
    it('Returns total of links and number of links unique', () => {
        const obj = [{
            file: `${__dirname}\\files_test\\link.md`,
            href: 'https://es.wikipedia.org/wiki/Markdown',
            message: 'OK',
            status: 200,
            text: 'Markdown',
          },
          {
            file: `${__dirname}\\files_test\\link.md`,
            href: 'https://es.wikipedia.org/wiki/Markdown',
            message: 'OK',
            status: 200,
            text: 'Markdown',
          }];
      const result = 'Total: 2\nUnique: 1';
      expect(statistics(obj)).toStrictEqual(result);
    });

  });

  describe('Broken links', () => {
    it('it is a function', () => {
      expect(typeof broken).toBe('function');
    });
    it('Returns total of broken links', () => {
        const obj = [{
            href: 'https://httpstat.us/500',
            text: 'Status 500',
            file: `${__dirname}\\files_test\\fail_test\\fail.md`,
            status: 500,
            message: 'FAIL',
          },
          {
            file: `${__dirname}\\files_test\\link.md`,
            href: 'https://es.wikipedia.org/wiki/Markdown',
            message: 'OK',
            status: 200,
            text: 'Markdown',
          }];
      const result = '\nBroken: 1';
      expect(broken(obj)).toEqual(result);
    });

  });