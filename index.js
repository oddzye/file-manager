import { parseArgs } from './cli/parseArgs.js';
import readlinePromises from 'readline/promises';
import { homedir } from 'node:os';
import { changeDir } from './cli/changeDir.js';
import { listFiles } from './cli/listFiles.js';
import { readFile } from './cli/readFile.js';
import path from 'node:path';

const parsedArgs = parseArgs(process.argv.slice(2));
const userNameArg = parsedArgs.find(({ key }) => key === 'username');

process.chdir(homedir());

console.log(`Welcome to the File Manager, ${ userNameArg?.value }!`);
console.log(`You are currently in ${process.cwd()}`);

const readline = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.on('line', async (line) => {
    const [command, arg] = line.split(' ');

    if (command === 'up') {
        changeDir('..');
    } else if (command === 'cd') {
        changeDir(arg);
    } else if (command === 'ls') {
        const list = await listFiles(process.cwd());
        console.table(list);
    } else if (command === 'cat') {
        const content = await readFile(arg);
        console.log(content);
    } else if (command === '.exit') {
        readline.close();
        return;
    } else {
        console.log('Invalid input');
    }

    console.log(`You are currently in ${process.cwd()}`);
});

readline.on('close', () => {
    console.log(`Thank you for using File Manager, ${ userNameArg?.value }, goodbye!`);
});
