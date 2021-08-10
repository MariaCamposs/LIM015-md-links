const { spawn } = require('child_process');

const execute = (comand, args = []) => {
  const createProcess = spawn(comand, args, { shell: process.platform === 'win32' });
  return new Promise((resolve, reject) => {
    createProcess.stdout.on('data', (data) => resolve(data.toString()));
    createProcess.stderr.on('data', (data) => reject(data.toString()));
    createProcess.on('exit', (code) => resolve(code));
  });
};

describe('Command line interface on cli.js', () => {
  test('Path with no option', () => {
    execute('md-links', ['C:\\Users\\Mari\\Documents\\GitHub\\LIM015-md-links\\test\\files_test\\link.md']).then((res) => {
      expect(res).toBe(`\nfile: C:\\Users\\Mari\\Documents\\GitHub\\LIM015-md-links\\test\\files_test\\link.md\nhref: https://es.wikipedia.org/wiki/Markdown\ntext: Markdown`);
    });
  });

  test('Path with validate flag', () => {
    execute('md-links', ['C:\\Users\\Mari\\Documents\\GitHub\\LIM015-md-links\\test\\files_test\\link.md', '--validate']).then((res) => {
      expect(res).toBe(`\nfile: C:\\Users\\Mari\\Documents\\GitHub\\LIM015-md-links\\test\\files_test\\link.md\nhref: https://es.wikipedia.org/wiki/Markdown\nmessage: OK\nstatus: 200\ntext: Markdown`);
    });
  });

  test('Path with stats flags', () => {
    execute('md-links', ['C:\\Users\\Mari\\Documents\\GitHub\\LIM015-md-links\\test\\files_test\\link.md', '--stats']).then((res) => {
      expect(res).toBe('Total: 1\nUnique: 1\n');
    });
  });

  test('Path with stats and validate flags', () => {
    execute('md-links', ['C:\\Users\\Mari\\Documents\\GitHub\\LIM015-md-links\\test\\files_test\\link.md', '--stats --validate']).then((res) => {
      expect(res).toBe('Total: 1\nUnique: 1\nBroken: 0\n');
    });
  });

  test('Path with help flag', () => {
    execute('md-links', ['C:\\Users\\Mari\\Documents\\GitHub\\LIM015-md-links\\test\\files_test\\link.md', '--help']).then((res) => {
      expect(typeof res).toBe('string');
    });
  });
});