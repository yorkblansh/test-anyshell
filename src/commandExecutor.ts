import { Command } from './interfaces/commandList.interface.js'
import { ExecutorCallbackProps } from './interfaces/executor.callback.props.interface.js'
import shelljs from 'shelljs'

const agregateDockerComposeChunk = (chunk: string) => {}

export const commandExecutor = (
	{ shellCommand, setup }: Command,
	cb: (ecbProps: ExecutorCallbackProps) => void,
) => {
	const shellProcess = shelljs.exec(shellCommand, { async: true, silent: true })

	if (setup) {
		if (setup === 'docker_compose') {
			console.log('docker_compose !!!')
			shellProcess.on('close', (code, signal) => {
				cb({ dockerComposeExitCode: code })
			})
			shellProcess.stdout?.on('data', (chunk) => {
				cb({ stdoChunk: chunk.toString() })
			})
		}
	}
}
