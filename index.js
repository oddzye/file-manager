import { parseArgs } from './cli/parseArgs.js';
import readlinePromises from 'readline/promises';
import { homedir } from 'node:os';
import { changeDir } from './cli/changeDir.js';
import { listFiles } from './cli/listFiles.js';
import { readFile } from './cli/readFile.js';
import { APP_MESSAGES } from './cli/messages.js';
import { addFile } from './cli/addFile.js';
import { renameFile } from './cli/renameFile.js';

const parsedArgs = parseArgs(process.argv.slice(2));
const userNameArg = parsedArgs.find(({ key }) => key === 'username');

process.chdir(homedir());

console.log(`Welcome to the File Manager, ${ userNameArg?.value || 'Annonymous' }!`);
console.log(`You are currently in ${process.cwd()}`);

const readline = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.on('line', async (line) => {
    const [command, ...args] = line.split(' ');

    switch (command) {
        case 'up':
            changeDir('..');
            break;
        case 'cd':
            changeDir(args[0]);
            break;
        case 'ls':
            const list = await listFiles(process.cwd());
            console.table(list);
            break;
        case 'cat':
            const content = await readFile(args[0]);
            console.log(content);
            break;
        case 'add':
            addFile(args[0]);
            break;
        case 'rn':
            renameFile(args[0], args[1]);
            break;
        case '.exit':
            readline.close();
            return; 
        default:
            console.log(APP_MESSAGES.INVALID_INPUT);           
    }

    console.log(`You are currently in ${process.cwd()}`);
});

readline.on('close', () => {
    console.log(`Thank you for using File Manager, ${ userNameArg?.value }, goodbye!`);
});
