import { Command } from './interfaces/commandList.interface.js'
import { ExecutorCallbackProps } from './interfaces/executor.callback.props.interface.js'
import shelljs from 'shelljs'
import { containersBuildStepList } from './utils/stdout/dockerCompose.js'

const agregateDockerComposeChunk = (chunk: string) => {
	const match = chunk.match(/#\d{1,} \[\S+ \d{1,}\/\d{1,}\]/gm)
	if (match) console.log({ chunk_match: match })
}

export const commandExecutor = (
	{ shellCommand, setup }: Command,
	cb: (ecbProps: ExecutorCallbackProps) => void,
) => {
	const shellProcess = shelljs.exec(shellCommand, { async: true, silent: true })

	if (setup) {
		if (setup === 'docker_compose') {
			console.log('docker_compose !!!')
			shellProcess.on('close', (code, signal) => {
				console.log({ exitCode: code, isDone: code === 0 ? true : false })
				// cb({ dockerComposeExitCode: code })
			})
			shellProcess.stdout?.on('data', (chunk) => {
				console.dir({ check: containersBuildStepList(chunk) })
				// cb({ stdoChunk: chunk.toString() })
			})
		}
	}
}
