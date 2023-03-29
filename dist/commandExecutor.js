import shelljs from 'shelljs';
const agregateDockerComposeChunk = (chunk) => {
    const match = chunk.match(/#\d{1,} \[\S+ \d{1,}\/\d{1,}\]/gm);
    if (match)
        console.log({ chunk_match: match });
};
export const commandExecutor = ({ shellCommand, setup }, cb) => {
    const shellProcess = shelljs.exec(shellCommand, { async: true, silent: true });
    if (setup) {
        if (setup === 'docker_compose') {
            console.log('docker_compose !!!');
            shellProcess.on('close', (code, signal) => {
                console.log({ exitCode: code, isDone: code === 0 ? true : false });
                // cb({ dockerComposeExitCode: code })
            });
            shellProcess.stdout?.on('data', (chunk) => {
                agregateDockerComposeChunk(chunk);
                // cb({ stdoChunk: chunk.toString() })
            });
        }
    }
};
