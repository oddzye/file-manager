import { parseArgs } from './cli/parseArgs.js';

const parsedArgs = parseArgs(process.argv.slice(2));
const userNameArg = parsedArgs.find(({ key }) => key === 'username');

console.log(`Welcome to the File Manager, ${ userNameArg?.value }!`);