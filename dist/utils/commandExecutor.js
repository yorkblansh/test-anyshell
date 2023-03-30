import shelljs from 'shelljs';
import { dockerComposeHandler } from './StdHandlers/dockerComposeHandler.js';
export const commandExecutor = ({ shellCommand, setup }, cb) => {
    const childProcess = shelljs.exec(shellCommand, { async: true, silent: true });
    if (setup) {
        const handlersMap = {
            docker_compose: dockerComposeHandler,
        };
        handlersMap[setup](childProcess, cb);
    }
};
