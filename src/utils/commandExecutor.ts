import { Command } from '../interfaces/YamlConfig.interface.js'
import { ExecutorCallbackProps } from '../interfaces/ExecutorCallbackProps.interface.js'
import shelljs from 'shelljs'
import { dockerComposeHandler } from './StdHandlers/dockerComposeHandler.js'
import { StdHandler } from '../interfaces/StdHandler.interface.js'

export const commandExecutor = (
	{ shellCommand, setup }: Command,
	cb: (ecbProps: ExecutorCallbackProps) => void,
) => {
	const childProcess = shelljs.exec(shellCommand, { async: true, silent: true })

	if (setup) {
		const handlersMap: { [everyName in typeof setup]: StdHandler } = {
			docker_compose: dockerComposeHandler,
		}

		handlersMap[setup](childProcess, cb)
	}
}
