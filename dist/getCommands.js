import fs from 'fs/promises';
import YAML from 'yaml';
export const getCommands = async () => {
    try {
        const file = await fs.readFile('./.anyshell.yaml');
        return YAML.parse(file.toString('utf8'));
    }
    catch (err) {
        console.error({ anyshellYamlFileError: err });
    }
};
