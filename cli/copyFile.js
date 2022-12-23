import { createReadStream, createWriteStream } from 'node:fs';
import { APP_MESSAGES } from './messages.js';
import { basename, resolve } from 'node:path';

export const copyFile = async (pathToFile, pathToNewDirectory) => {
    const rs = createReadStream(pathToFile, 'utf-8');
    const pathToNewFile = resolve(pathToNewDirectory, basename(pathToFile));
    const ws = createWriteStream(pathToNewFile);

    try {
        rs.pipe(ws);
    } catch {
        console.log(APP_MESSAGES.OPERATION_FAILED);
    }
}