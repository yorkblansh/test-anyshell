import shelljs from 'shelljs';
import { dockerComposeProcessHandler } from './utils/stdout/dockerCompose.js';
// const agregateDockerComposeChunk = (chunk: string) => {
// 	const match = chunk.match(/#\d{1,} \[\S+ \d{1,}\/\d{1,}\]/gm)
// 	if (match) console.log({ chunk_match: match })
// }
export const commandExecutor = ({ shellCommand, setup }, cb) => {
    const childProcess = shelljs.exec(shellCommand, { async: true, silent: true });
    if (setup) {
        const handlersMap = {
            docker_compose: dockerComposeProcessHandler,
        };
        handlersMap[setup](childProcess, cb);
    }
};
