jest.mock('node-fetch');
const fetch = require('node-fetch');

const { statusLink } = require('../src/api.js');

describe('Validate link', () => {
  test('OK', () => {
    const arr = {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: `${__dirname}\\files_test\\link.md`,
    };
    const obj = {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: `${__dirname}\\files_test\\link.md`,
        status: 200,
        message: 'OK',
      };
    fetch.mockImplementation(() => Promise.resolve({
      status: 200,
      statusText: 'OK',
    }));
    return statusLink(arr)
    .then((res) => {
      expect(res).toEqual(obj);
    });
  });

  test('FAIL', () => {
    const arr = {
      href: 'https://abc.github.io/assets404/',
      text: 'Fail 1',
      file: `${__dirname}\\files_test\\fail_test\\fail.md`,
    };
    const obj = {
      href: 'https://abc.github.io/assets404/',
      text: 'Fail 1',
      file: `${__dirname}\\files_test\\fail_test\\fail.md`,
      status: 404,
      message: 'FAIL',
    };
    fetch.mockImplementation(() => Promise.resolve({
      status: 404,
      statusText: 'Not Found',
    }));
    return statusLink(arr)
    .then((res) => {
      expect(res).toEqual(obj);
    });
  });

  test('FAIL', () => {
    const arr = {
      href: 'https://helloeveryone.imjanedoe/',
      text: 'Fail 2',
      file: `${__dirname}\\files_test\\fail_test\\fail.md`,
    };
    const obj = {
      href: 'https://helloeveryone.imjanedoe/',
      text: 'Fail 2',
      file: `${__dirname}\\files_test\\fail_test\\fail.md`,
      status: 'no status',
      message: 'FAIL',
    };
    // eslint-disable-next-line prefer-promise-reject-errors
    fetch.mockImplementation(() => Promise.reject({}));
    return statusLink(arr)
    .catch((err) => {
      expect(err).toEqual(obj);
    });
  });
});