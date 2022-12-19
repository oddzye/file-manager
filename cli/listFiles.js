import { readdir, lstat } from 'fs/promises';

export const listFiles = async (folderPath) => {
    const items = await readdir(folderPath);
    const dirs = [];
    const files = [];

    for (const item of items) {
        const stats = await lstat(item);
        
        if (stats.isDirectory()) {
            dirs.push(item);
        }

        if (stats.isFile()) {
            files.push(item);
        }
    }

    const resultDirs = dirs.sort().map((dir) => ({ Name: dir, Type: 'directory' }));
    const resultFiles = files.sort().map((file) => ({ Name: file, Type: 'file' }));

    return [...resultDirs, ...resultFiles];
};