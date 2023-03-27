import shelljs from 'shelljs';
export const commandExecutor = ({ shellCommand, setup }, cb) => {
    const shellProcess = shelljs.exec(shellCommand, { async: true, silent: true });
    if (setup) {
        if (setup === 'docker_compose') {
            console.log('docker_compose !!!');
            shellProcess.on('close', (code, signal) => {
                cb({ dockerComposeExitCode: code });
            });
            shellProcess.stdout?.on('data', (chunk) => {
                cb({ stdoChunk: chunk });
            });
        }
    }
};
