import { createReadStream } from 'fs';

export const readFile = async (filePath) => {
    const rs = createReadStream(filePath);
    const rsPromise = new Promise((resolve, reject) => {
        let data = '';

        rs.on('data', (chunk) => {
            data += chunk.toString();
        });
        
        rs.on('end', () => {
           resolve(data);
        });

        rs.on('error', reject)
    });

    return await rsPromise;
}