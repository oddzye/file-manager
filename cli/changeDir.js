import { resolve } from 'path';

export const changeDir = (path) => {
    try {
        process.chdir(resolve(path));
    } catch {
        console.log('Operation failed');
    }
};