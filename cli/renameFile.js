import { rename } from 'node:fs/promises';
import { APP_MESSAGES } from './messages.js';

export const renameFile = async (oldFileName, newFileName) => {
    try {
        return await rename(oldFileName, newFileName);
    } catch {
        console.log(APP_MESSAGES.OPERATION_FAILED) 
    }
};