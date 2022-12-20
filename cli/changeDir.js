import { resolve } from 'path';
import { APP_MESSAGES } from './messages.js';

export const changeDir = (path) => {
    try {
        process.chdir(resolve(path));
    } catch {
        console.log(APP_MESSAGES.OPERATION_FAILED);
    }
};