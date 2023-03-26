import { useEffect, useState } from 'react';
import fs from 'fs/promises';
import YAML from 'yaml';
export const useCommandList = () => {
    const [data, setData] = useState(null);
    const isLoading = data === null;
    const isError = data !== null && data.error !== undefined;
    useEffect(() => {
        fs.readFile('./.anyshell.yaml')
            .then((buffer) => YAML.parse(buffer.toString('utf8')))
            .then(setData);
    }, []);
    return {
        parsedYaml: data,
        isLoading,
        isError,
        errorCode: isError && data ? data.error.code : undefined,
    };
};
