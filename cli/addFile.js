import { writeFile } from 'node:fs/promises';
import { APP_MESSAGES } from './messages.js';

export const addFile = async (fileName) => {
    try {
        return await writeFile(fileName, '', { flag: 'wx'});
    } catch {
        console.log(APP_MESSAGES.OPERATION_FAILED) 
    }
};