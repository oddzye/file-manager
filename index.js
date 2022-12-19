import { parseArgs } from './cli/parseArgs.js';
import readlinePromises from 'readline/promises';
import path from 'path';
import { homedir } from 'node:os';

const parsedArgs = parseArgs(process.argv.slice(2));
const userNameArg = parsedArgs.find(({ key }) => key === 'username');

process.chdir(homedir());

console.log(`Welcome to the File Manager, ${ userNameArg?.value }!`);
console.log(`You are currently in ${process.cwd()}`);

const readline = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.on('line', (line) => {
    const [command, arg] = line.split(' ');

    if (command === 'up') {
        process.chdir(path.resolve('..'));
    }

    if (command === 'cd') {
        process.chdir(path.resolve(arg));
    }

    console.log(`You are currently in ${process.cwd()}`);
});

process.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${ userNameArg?.value }, goodbye!`);
    process.exit();
});
