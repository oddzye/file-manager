export const parseArgs = (args) => {
    const result = [];

    for (const arg of args) {
        if (arg.startsWith('--')) {
            const [key, value] = arg.slice(2).split('=');  
            result.push({ key, value });
        }
    }

    return result;
};