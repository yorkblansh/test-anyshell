import { Command } from './interfaces/commandList.interface.js'
import { ExecutorCallbackProps } from './interfaces/executor.callback.props.interface.js'
import shelljs from 'shelljs'
import { dockerComposeProcessHandler } from './utils/stdout/dockerCompose.js'
import { StdHandler } from './interfaces/StdHandler.interface.js'

// const agregateDockerComposeChunk = (chunk: string) => {
// 	const match = chunk.match(/#\d{1,} \[\S+ \d{1,}\/\d{1,}\]/gm)
// 	if (match) console.log({ chunk_match: match })
// }

export const commandExecutor = (
	{ shellCommand, setup }: Command,
	cb: (ecbProps: ExecutorCallbackProps) => void,
) => {
	const childProcess = shelljs.exec(shellCommand, { async: true, silent: true })

	if (setup) {
		const handlersMap: { [everyName in typeof setup]: StdHandler } = {
			docker_compose: dockerComposeProcessHandler,
		}

		handlersMap[setup](childProcess, cb)
	}
}
